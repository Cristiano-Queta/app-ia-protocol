import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EOMStructureView } from '../../components/coordinator/EOMStructureView';
import { EventOperationalModel } from '../../types';
import { Layers, ArrowRight, ArrowLeft } from 'lucide-react';

interface EOMPageProps {
  eventModel: EventOperationalModel;
  onRefresh: () => void;
}

export const EOMPage: React.FC<EOMPageProps> = ({ eventModel, onRefresh }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4" />
            <span>Módulo 1: Pré-Evento & Inteligência</span>
          </div>
          <h1 className="text-xl font-black text-white tracking-tight">
            2. Grafo Estrutural do Event Operational Model (EOM)
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Inspeção estruturada das 4 dimensões fundamentais do evento: Cronograma de Sessões, Zonas/Salas, Dignitários VIP e Regras L1 a L4.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => navigate('/pre-evento/ingestao')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-xs font-medium transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar à Ingestão</span>
          </button>
          <button
            onClick={() => navigate('/pre-evento/validacao')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition shadow-md"
          >
            <span>Validar Conflitos & Défice</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main EOM View */}
      <EOMStructureView
        eventModel={eventModel}
        onRefresh={onRefresh}
        onNavigateToTab={(tab) => {
          if (tab === 'PLAN_VALIDATION') navigate('/pre-evento/validacao');
        }}
      />
    </div>
  );
};
