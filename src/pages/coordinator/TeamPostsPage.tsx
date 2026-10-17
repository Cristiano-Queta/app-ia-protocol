import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TeamAndPostsView } from '../../components/coordinator/TeamAndPostsView';
import { EventOperationalModel } from '../../types';
import { Users, ArrowLeft, Radio } from 'lucide-react';

interface TeamPostsPageProps {
  eventModel: EventOperationalModel;
  onRefresh: () => void;
}

export const TeamPostsPage: React.FC<TeamPostsPageProps> = ({ eventModel, onRefresh }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            <span>Módulo 2: Operações no Terreno</span>
          </div>
          <h1 className="text-xl font-black text-white tracking-tight">
            Directório de Equipa & Postos Operacionais
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Gestão do efectivo de 8 protocolos (habilitações VIP, idiomas, fardamento) e dos 6 postos (missões tácticas, regras de acesso).
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

      {/* Main Team and Posts View */}
      <TeamAndPostsView
        eventModel={eventModel}
        onRefresh={onRefresh}
      />
    </div>
  );
};
