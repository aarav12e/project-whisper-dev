import { useEffect, useState } from "react";
import { useAutoSync } from "@/hooks/useAutoSync";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw, Cloud, CloudOff, Check, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export function SyncManager() {
  const { isOnline, isSyncing, totalPending, lastSyncTime, syncAll, loadAll } = useAutoSync();
  const [showManager, setShowManager] = useState(false);

  useEffect(() => {
    // Show manager if there are pending items
    if (totalPending > 0) {
      setShowManager(true);
    }
  }, [totalPending]);

  const handleManualSync = async () => {
    if (!isOnline) {
      toast.error("No internet connection", {
        description: "Please connect to the internet to sync data",
      });
      return;
    }

    const result = await syncAll();
    if (result.success) {
      toast.success("Sync completed", {
        description: `${result.total} records synchronized successfully`,
      });
      if (result.total === 0) {
        setShowManager(false);
      }
    } else {
      toast.error("Sync failed", {
        description: "Some records could not be synchronized. Will retry later.",
      });
    }
  };

  const handleLoadFromServer = async () => {
    if (!isOnline) {
      toast.error("No internet connection", {
        description: "Please connect to the internet to load data",
      });
      return;
    }

    const result = await loadAll();
    if (result.success) {
      toast.success("Data loaded", {
        description: `${result.total} records loaded from server`,
      });
    } else {
      toast.error("Load failed", {
        description: "Could not load data from server",
      });
    }
  };

  if (!showManager && totalPending === 0) return null;

  return (
    <Card className="fixed bottom-20 left-4 right-4 z-50 shadow-lg md:left-auto md:right-4 md:w-96">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isOnline ? (
              <Cloud className="h-5 w-5 text-success" />
            ) : (
              <CloudOff className="h-5 w-5 text-muted-foreground" />
            )}
            <span className="font-semibold">
              {isOnline ? "Online" : "Offline Mode"}
            </span>
          </div>
          {totalPending === 0 && (
            <Check className="h-5 w-5 text-success" />
          )}
        </div>

        {totalPending > 0 && (
          <div className="flex items-center gap-2 text-sm text-warning">
            <AlertCircle className="h-4 w-4" />
            <span>{totalPending} records pending sync</span>
          </div>
        )}

        {lastSyncTime && (
          <p className="text-xs text-muted-foreground">
            Last synced: {lastSyncTime.toLocaleTimeString()}
          </p>
        )}

        <div className="flex gap-2">
          <Button
            onClick={handleManualSync}
            disabled={!isOnline || isSyncing}
            size="sm"
            className="flex-1 min-h-touch-target"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? "Syncing..." : "Sync Now"}
          </Button>

          <Button
            onClick={handleLoadFromServer}
            disabled={!isOnline}
            variant="outline"
            size="sm"
            className="flex-1 min-h-touch-target"
          >
            <Cloud className="h-4 w-4 mr-2" />
            Load Data
          </Button>
        </div>

        <Button
          onClick={() => setShowManager(false)}
          variant="ghost"
          size="sm"
          className="w-full"
        >
          Dismiss
        </Button>
      </CardContent>
    </Card>
  );
}
