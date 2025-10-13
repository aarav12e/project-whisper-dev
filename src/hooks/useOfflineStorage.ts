import { useState, useEffect, useCallback } from 'react';
import { 
  saveToLocal, 
  getFromLocal, 
  getAllFromLocal, 
  getPendingSync 
} from '@/lib/db';
import { supabase } from '@/integrations/supabase/client';

export function useOfflineStorage(
  tableName: 'patients' | 'visits' | 'vaccinations' | 'anc_records'
) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    updatePendingCount();
  }, [tableName]);

  const updatePendingCount = useCallback(async () => {
    const pending = await getPendingSync(tableName);
    setPendingCount(pending.length);
  }, [tableName]);

  const saveOffline = useCallback(async (data: any) => {
    const record = {
      ...data,
      _pending_sync: true,
      synced_at: undefined,
      updated_at: new Date().toISOString(),
    };
    
    await saveToLocal(tableName, record);
    await updatePendingCount();
    
    return record;
  }, [tableName, updatePendingCount]);

  const getOffline = useCallback(async (id: string) => {
    return await getFromLocal(tableName, id);
  }, [tableName]);

  const getAllOffline = useCallback(async () => {
    return await getAllFromLocal(tableName);
  }, [tableName]);

  const syncToServer = useCallback(async () => {
    if (!isOnline || isSyncing) return { success: false, synced: 0 };

    setIsSyncing(true);
    let syncedCount = 0;

    try {
      const pending = await getPendingSync(tableName);
      
      for (const record of pending) {
        try {
          const { _pending_sync, ...dataToSync } = record;
          
          // Upsert to Supabase
          const { error } = await supabase
            .from(tableName)
            .upsert(dataToSync);

          if (!error) {
            // Update local record as synced
            await saveToLocal(tableName, {
              ...record,
              _pending_sync: false,
              synced_at: new Date().toISOString(),
            });
            syncedCount++;
          }
        } catch (err) {
          console.error(`Failed to sync record ${record.id}:`, err);
        }
      }

      await updatePendingCount();
      return { success: true, synced: syncedCount };
    } catch (error) {
      console.error('Sync error:', error);
      return { success: false, synced: syncedCount };
    } finally {
      setIsSyncing(false);
    }
  }, [isOnline, isSyncing, tableName, updatePendingCount]);

  const loadFromServer = useCallback(async () => {
    if (!isOnline) return { success: false, loaded: 0 };

    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        for (const record of data) {
          await saveToLocal(tableName, {
            ...record,
            _pending_sync: false,
          });
        }
        return { success: true, loaded: data.length };
      }

      return { success: true, loaded: 0 };
    } catch (error) {
      console.error('Load error:', error);
      return { success: false, loaded: 0 };
    }
  }, [isOnline, tableName]);

  return {
    isOnline,
    isSyncing,
    pendingCount,
    saveOffline,
    getOffline,
    getAllOffline,
    syncToServer,
    loadFromServer,
  };
}
