import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IncidentsView } from '../../components/coordinator/IncidentsView';
import { EventOperationalModel } from '../../types';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

interface IncidentsPageProps {
  eventModel: EventOperationalModel;
  onRefresh: () => void;
}

export const IncidentsPage: React.FC<IncidentsPageProps> = ({ eventModel, onRefresh }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span>Módulo 2: Operações no Terreno</span>
          </div>
          <h1 className="text-xl font-black text-white tracking-tight">
            Central de Triagem & Fila de Ocorrências
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Ocorrências reportadas em tempo real pelos terminais dos protocolos. Actualize o estado, delegue resoluções e registe notas de fecho.
          </p>
        </div>

        <button
          onClick={() => navigate('/live')}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Voltar ao Cockpit Directo</span>
        </button>
      </div>

      {/* Main Incidents View */}
      <IncidentsView
        eventModel={eventModel}
        onRefresh={onRefresh}
      />
    </div>
  );
};
