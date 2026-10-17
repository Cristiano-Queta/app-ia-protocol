import React from 'react';
import { Shield, Sparkles, Smartphone, RotateCcw, AlertTriangle } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';
import { OfflineIndicator } from './OfflineIndicator';
import { EventOperationalModel } from '../../types';

interface HeaderProps {
  currentView: 'COORDINATOR' | 'PROTOCOL' | 'ADMIN';
  onViewChange: (view: 'COORDINATOR' | 'PROTOCOL' | 'ADMIN') => void;
  eventModel: EventOperationalModel;
  onResetDemo: () => void;
  activeProtocolName?: string;
  onSelectProtocolUser: (userId: string) => void;
  availableStaff: { id: string; name: string }[];
  selectedStaffId: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  eventModel,
  onResetDemo,
  onSelectProtocolUser,
  availableStaff,
  selectedStaffId
}) => {
  const unresolvedConflicts = eventModel.conflicts.filter(c => !c.resolved).length;

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand & Event Title */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md shadow-amber-950/40 shrink-0">
            <Shield className="w-5 h-5 text-slate-950" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-tight text-white truncate">Corporate Experience 2.0</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-amber-400/10 text-amber-400 border border-amber-400/20 shrink-0">
                v{eventModel.activeVersion}.0
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 truncate">
              <span className="truncate font-medium text-slate-300">{eventModel.title}</span>
              <span className="text-slate-600 hidden md:inline">•</span>
              <span className="text-[11px] text-slate-400 hidden md:inline">{eventModel.venue.name}</span>
            </div>
          </div>
        </div>

        {/* Center Role Mode Switcher */}
        <div className="hidden lg:flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
          <button
            onClick={() => onViewChange('COORDINATOR')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition ${
              currentView === 'COORDINATOR'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cockpit Coordenador</span>
            {unresolvedConflicts > 0 && (
              <span className="px-1 py-0.2 text-[10px] rounded-full bg-red-600 text-white font-bold ml-1">
                {unresolvedConflicts}
              </span>
            )}
          </button>

          <button
            onClick={() => onViewChange('PROTOCOL')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition ${
              currentView === 'PROTOCOL'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Terminal Protocolo (PWA)</span>
          </button>
        </div>

        {/* Right Tools & Indicators */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {currentView === 'PROTOCOL' && (
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1">
              <span className="text-[11px] text-slate-400 hidden sm:inline">Protocolo:</span>
              <select
                value={selectedStaffId}
                onChange={(e) => onSelectProtocolUser(e.target.value)}
                className="bg-transparent text-xs text-amber-400 font-semibold outline-hidden cursor-pointer"
              >
                {availableStaff.map(s => (
                  <option key={s.id} value={s.id} className="bg-slate-900 text-white">
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <OfflineIndicator lastSyncTime="há 1 min" />
          <PWAInstallButton />

          <button
            onClick={onResetDemo}
            className="flex items-center gap-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 px-2.5 py-1.5 text-xs transition"
            title="Reiniciar dados da demonstração para o estado inicial"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Reset Demo</span>
          </button>

          {/* Mobile view toggle */}
          <div className="flex lg:hidden">
            <button
              onClick={() => onViewChange(currentView === 'COORDINATOR' ? 'PROTOCOL' : 'COORDINATOR')}
              className="flex items-center gap-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2.5 py-1.5 rounded-lg text-xs font-semibold"
            >
              {currentView === 'COORDINATOR' ? (
                <>
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Ver PWA</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ver Cockpit</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};
