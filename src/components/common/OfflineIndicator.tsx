import React from 'react';
import { useOnlineStatus } from '../../hooks/usePWAInstall';
import { WifiOff, Wifi, RefreshCw } from 'lucide-react';

export const OfflineIndicator: React.FC<{ lastSyncTime?: string }> = ({ lastSyncTime }) => {
  const isOnline = useOnlineStatus();

  return (
    <div className="flex items-center gap-2">
      {isOnline ? (
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-medium text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <Wifi className="w-3 h-3" />
          <span>Online</span>
        </div>
      ) : (
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-[11px] font-medium text-amber-300">
          <WifiOff className="w-3 h-3" />
          <span>Modo Offline (Cache Local)</span>
        </div>
      )}
      {lastSyncTime && (
        <span className="text-[10px] text-slate-400 hidden sm:inline-flex items-center gap-1">
          <RefreshCw className="w-2.5 h-2.5 text-slate-500" />
          Sincronizado {lastSyncTime}
        </span>
      )}
    </div>
  );
};
