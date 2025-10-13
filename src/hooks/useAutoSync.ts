import { useEffect, useCallback, useState } from 'react';
import { useOfflineStorage } from './useOfflineStorage';

export function useAutoSync() {
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [totalPending, setTotalPending] = useState(0);

  const patients = useOfflineStorage('patients');
  const visits = useOfflineStorage('visits');
  const vaccinations = useOfflineStorage('vaccinations');
  const ancRecords = useOfflineStorage('anc_records');

  const syncAll = useCallback(async () => {
    if (!navigator.onLine) return { success: false, total: 0 };

    const results = await Promise.all([
      patients.syncToServer(),
      visits.syncToServer(),
      vaccinations.syncToServer(),
      ancRecords.syncToServer(),
    ]);

    const totalSynced = results.reduce((sum, r) => sum + r.synced, 0);
    const allSuccess = results.every(r => r.success);

    if (allSuccess) {
      setLastSyncTime(new Date());
    }

    return { success: allSuccess, total: totalSynced };
  }, [patients, visits, vaccinations, ancRecords]);

  const loadAll = useCallback(async () => {
    if (!navigator.onLine) return { success: false, total: 0 };

    const results = await Promise.all([
      patients.loadFromServer(),
      visits.loadFromServer(),
      vaccinations.loadFromServer(),
      ancRecords.loadFromServer(),
    ]);

    const totalLoaded = results.reduce((sum, r) => sum + r.loaded, 0);
    const allSuccess = results.every(r => r.success);

    return { success: allSuccess, total: totalLoaded };
  }, [patients, visits, vaccinations, ancRecords]);

  useEffect(() => {
    const updatePendingCount = () => {
      const total = 
        patients.pendingCount + 
        visits.pendingCount + 
        vaccinations.pendingCount + 
        ancRecords.pendingCount;
      setTotalPending(total);
    };

    updatePendingCount();
  }, [
    patients.pendingCount,
    visits.pendingCount,
    vaccinations.pendingCount,
    ancRecords.pendingCount,
  ]);

  // Auto-sync when coming online
  useEffect(() => {
    const handleOnline = async () => {
      if (totalPending > 0) {
        await syncAll();
      }
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [totalPending, syncAll]);

  // Periodic sync check (every 5 minutes when online)
  useEffect(() => {
    if (!navigator.onLine) return;

    const interval = setInterval(async () => {
      if (totalPending > 0) {
        await syncAll();
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [totalPending, syncAll]);

  return {
    isOnline: navigator.onLine,
    isSyncing: 
      patients.isSyncing || 
      visits.isSyncing || 
      vaccinations.isSyncing || 
      ancRecords.isSyncing,
    totalPending,
    lastSyncTime,
    syncAll,
    loadAll,
  };
}
