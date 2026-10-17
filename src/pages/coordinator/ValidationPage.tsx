import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlanValidationCenter } from '../../components/coordinator/PlanValidationCenter';
import { EventOperationalModel } from '../../types';
import { ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

interface ValidationPageProps {
  eventModel: EventOperationalModel;
  onRefresh: () => void;
}

export const ValidationPage: React.FC<ValidationPageProps> = ({ eventModel, onRefresh }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Módulo 1: Pré-Evento & Inteligência</span>
          </div>
          <h1 className="text-xl font-black text-white tracking-tight">
            3. Validador Determinístico de Conflitos & Défice
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            O motor matemático verifica colisões horárias, violações de requisitos VIP e défices de capacidade em tempo real.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => navigate('/pre-evento/eom')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-xs font-medium transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao EOM</span>
          </button>
          <button
            onClick={() => navigate('/pre-evento/aprovacao')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-md"
          >
            <span>Avançar para Homologação</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Validation Center */}
      <PlanValidationCenter
        eventModel={eventModel}
        onRefresh={onRefresh}
        onNavigateToTab={(tab) => {
          if (tab === 'PLAN_APPROVAL') navigate('/pre-evento/aprovacao');
        }}
      />
    </div>
  );
};
