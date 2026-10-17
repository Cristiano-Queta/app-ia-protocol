import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProtocolMobileView } from '../../components/protocol/ProtocolMobileView';
import { EventOperationalModel } from '../../types';
import { StorageService } from '../../services/storage';
import { ArrowLeft, Smartphone, User, ShieldCheck } from 'lucide-react';

interface ProtocolPageProps {
  eventModel: EventOperationalModel;
  onRefresh: () => void;
}

export const ProtocolPage: React.FC<ProtocolPageProps> = ({ eventModel, onRefresh }) => {
  const navigate = useNavigate();
  const { staffId: routeStaffId } = useParams();
  const [selectedStaffId, setSelectedStaffId] = useState<string>(routeStaffId || 'staff-01');

  const users = StorageService.getUsers();
  const protocolStaff = users.filter(u => u.role === 'PROTOCOL');
  const activeUser = users.find(u => u.id === selectedStaffId) || protocolStaff[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Top Banner with Quick Switcher & Back to Cockpit */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 sticky top-0 z-50">
        <div className="max-w-md mx-auto flex items-center justify-between gap-2">
          
          <button
            onClick={() => navigate('/live')}
            className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-bold transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Cockpit Coordenador</span>
            <span className="sm:hidden">Cockpit</span>
          </button>

          {/* Quick Protocol Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1">
            <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-[11px] text-slate-400 hidden sm:inline">Ver como:</span>
            <select
              value={selectedStaffId}
              onChange={(e) => setSelectedStaffId(e.target.value)}
              className="bg-transparent text-xs text-amber-300 font-bold outline-hidden cursor-pointer"
            >
              {protocolStaff.map(s => (
                <option key={s.id} value={s.id} className="bg-slate-900 text-white">
                  {s.fullName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">PWA Activo</span>
          </div>

        </div>
      </div>

      {/* Main Protocol Mobile View Container */}
      <main className="flex-1 py-4 px-2 sm:px-4">
        <ProtocolMobileView
          staffId={selectedStaffId}
          eventModel={eventModel}
          onRefresh={onRefresh}
        />
      </main>

    </div>
  );
};
