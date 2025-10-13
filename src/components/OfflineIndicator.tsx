import { useEffect, useState } from "react";
import { WifiOff, Wifi, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAutoSync } from "@/hooks/useAutoSync";

export const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { isSyncing, totalPending } = useAutoSync();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div className="flex items-center gap-2">
      <Badge variant={isOnline ? "default" : "secondary"} className="gap-1">
        {isOnline ? (
          <>
            <Wifi className="h-3 w-3" />
            Online
          </>
        ) : (
          <>
            <WifiOff className="h-3 w-3" />
            Offline
          </>
        )}
      </Badge>
      {isSyncing && (
        <RefreshCw className="h-4 w-4 animate-spin text-primary" />
      )}
      {totalPending > 0 && (
        <Badge variant="outline" className="gap-1 text-warning">
          {totalPending} pending
        </Badge>
      )}
    </div>
  );
};
