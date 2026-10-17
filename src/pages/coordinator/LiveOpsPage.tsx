import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LiveOperationsDashboard } from '../../components/coordinator/LiveOperationsDashboard';
import { EventOperationalModel } from '../../types';
import { Radio, Users, ShieldAlert, Smartphone } from 'lucide-react';

interface LiveOpsPageProps {
  eventModel: EventOperationalModel;
  onRefresh: () => void;
}

export const LiveOpsPage: React.FC<LiveOpsPageProps> = ({ eventModel, onRefresh }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>Módulo 2: Operações no Terreno (Dia do Evento)</span>
          </div>
          <h1 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Cockpit Directo de Monitorização Operacional</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Telemetria em tempo real: rácios de pessoal por posto (Planeado vs. Real), acionador de emergência de 1 toque e feed de ocorrências.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => navigate('/live/equipa')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
          >
            <Users className="w-3.5 h-3.5 text-blue-400" />
            <span>Ver Equipa</span>
          </button>
          <button
            onClick={() => navigate('/live/incidentes')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>Ocorrências</span>
          </button>
          <button
            onClick={() => navigate('/protocolo')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition shadow-md"
          >
            <Smartphone className="w-3.5 h-3.5 text-slate-950" />
            <span>Terminal Protocolo</span>
          </button>
        </div>
      </div>

      {/* Main Live Operations View */}
      <LiveOperationsDashboard
        eventModel={eventModel}
        onRefresh={onRefresh}
        onNavigateToTab={(tab) => {
          if (tab === 'PLAN_VALIDATION') navigate('/pre-evento/validacao');
          else if (tab === 'INCIDENTS') navigate('/live/incidentes');
          else if (tab === 'AUDIT') navigate('/governanca/auditoria');
        }}
      />
    </div>
  );
};
