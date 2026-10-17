import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlanApprovalView } from '../../components/coordinator/PlanApprovalView';
import { EventOperationalModel } from '../../types';
import { FileSignature, ArrowRight, ArrowLeft } from 'lucide-react';

interface ApprovalPageProps {
  eventModel: EventOperationalModel;
  onRefresh: () => void;
}

export const ApprovalPage: React.FC<ApprovalPageProps> = ({ eventModel, onRefresh }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <FileSignature className="w-4 h-4" />
            <span>Módulo 1: Pré-Evento & Inteligência</span>
          </div>
          <h1 className="text-xl font-black text-white tracking-tight">
            4. Homologação Formal & Despacho do Plano (Human-in-the-Loop)
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            A IA propõe e o Coordenador valida com assinatura digital. Após homologação, as Fichas de Posto (FPO) são ativadas nos terminais móveis.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => navigate('/pre-evento/validacao')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-xs font-medium transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar à Validação</span>
          </button>
          <button
            onClick={() => navigate('/live')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-md"
          >
            <span>Ir para Cockpit Directo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Approval View */}
      <PlanApprovalView
        eventModel={eventModel}
        onRefresh={onRefresh}
        onNavigateToTab={(tab) => {
          if (tab === 'LIVE_OPS') navigate('/live');
        }}
      />
    </div>
  );
};
