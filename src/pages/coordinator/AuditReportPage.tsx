import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuditAndPostEventView } from '../../components/coordinator/AuditAndPostEventView';
import { EventOperationalModel } from '../../types';
import { Clock, ArrowLeft } from 'lucide-react';

interface AuditReportPageProps {
  eventModel: EventOperationalModel;
}

export const AuditReportPage: React.FC<AuditReportPageProps> = ({ eventModel }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Clock className="w-4 h-4" />
            <span>Módulo 3: Governança & Pós-Evento</span>
          </div>
          <h1 className="text-xl font-black text-white tracking-tight">
            Auditoria Imutável & Relatório de Inteligência Pós-Evento
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Rastreabilidade criptográfica de alterações, causas-raiz de desvios e geração automática de recomendações para o manual SOP da empresa.
          </p>
        </div>

        <button
          onClick={() => navigate('/live')}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Voltar ao Cockpit</span>
        </button>
      </div>

      {/* Main Audit and Report View */}
      <AuditAndPostEventView eventModel={eventModel} />
    </div>
  );
};
