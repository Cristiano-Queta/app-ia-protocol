import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ImportAndAnalysisView } from '../../components/coordinator/ImportAndAnalysisView';
import { EventOperationalModel } from '../../types';
import { FileText, ArrowRight } from 'lucide-react';

interface IngestionPageProps {
  eventModel: EventOperationalModel;
  onRefresh: () => void;
}

export const IngestionPage: React.FC<IngestionPageProps> = ({ eventModel, onRefresh }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4" />
            <span>Módulo 1: Pré-Evento & Inteligência</span>
          </div>
          <h1 className="text-xl font-black text-white tracking-tight">
            1. Ingestão de Documentos & Extração com Gemini
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Carregue programas oficiais em PDF, Word ou texto. A IA extrai sessões e identifica ambiguidades com níveis estritos de confiança.
          </p>
        </div>

        <button
          onClick={() => navigate('/pre-evento/eom')}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition shrink-0"
        >
          <span>Próxima Etapa: Grafo EOM</span>
          <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
        </button>
      </div>

      {/* Main Ingestion Component */}
      <ImportAndAnalysisView
        eventModel={eventModel}
        onRefresh={onRefresh}
        onNavigateToTab={(tab) => {
          if (tab === 'EOM_STRUCTURE') navigate('/pre-evento/eom');
          else if (tab === 'PLAN_VALIDATION') navigate('/pre-evento/validacao');
        }}
      />
    </div>
  );
};
