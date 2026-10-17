import React, { useState } from 'react';
import {
  Clock,
  Sparkles,
  FileText,
  Shield,
  Layers,
  CheckCircle,
  Download,
  AlertTriangle
} from 'lucide-react';
import { EventOperationalModel } from '../../types';

interface AuditAndPostEventViewProps {
  eventModel: EventOperationalModel;
}

export const AuditAndPostEventView: React.FC<AuditAndPostEventViewProps> = ({ eventModel }) => {
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(true);

  const handleGenerateReport = () => {
    setIsGeneratingReport(true);
    setTimeout(() => {
      setIsGeneratingReport(false);
      setReportGenerated(true);
    }, 1000);
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Auditoria Imutável & Relatório de Inteligência Pós-Evento
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Rastreabilidade integral de versões e síntese analítica gerada por IA para retroalimentar a Base de Regras da Corporate Experience.
            </p>
          </div>
        </div>

        <button
          onClick={handleGenerateReport}
          disabled={isGeneratingReport}
          className="shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isGeneratingReport ? 'Compilando...' : 'Recompilar Relatório Pós-Evento'}</span>
        </button>
      </div>

      {/* REPORT CONTENT */}
      {reportGenerated && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5 text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">
                Relatório Oficial de Desempenho Operacional de Protocolo
              </span>
              <h3 className="text-lg font-black text-white">{eventModel.title}</h3>
              <p className="text-xs text-slate-400">{eventModel.venue.name} • {eventModel.date}</p>
            </div>
            <span className="px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 font-mono font-bold text-xs">
              EOM Audited • v{eventModel.activeVersion}.0
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400">Total de Protocolos</span>
              <div className="text-xl font-black text-white mt-1">8 efectivos</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400">Taxa de Pontualidade</span>
              <div className="text-xl font-black text-emerald-400 mt-1">100%</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400">Ocorrências Tratadas</span>
              <div className="text-xl font-black text-blue-400 mt-1">{eventModel.incidents.length} registadas</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400">Alterações em Tempo Real</span>
              <div className="text-xl font-black text-amber-400 mt-1">{eventModel.changes.length} executadas</div>
            </div>
          </div>

          {/* AI INSIGHTS */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Análise Causal da IA e Aprendizagem Sistémica</span>
            </h4>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-slate-300 leading-relaxed">
              <p>
                <strong>1. Mitigação do Défice de Coffee Break:</strong> A previsão antecipada pelo motor determinístico permitiu redimensionar a cobertura do Foyer sem que nenhum dos postos críticos (Sala VIP de Estado e Entrada Principal) ficasse desguarnecido. O evento decorreu sem abandono de postos.
              </p>
              <p>
                <strong>2. Gestão de Antecipação VIP:</strong> O aviso sonoro emitido via terminal PWA reduziu o tempo de resposta protocolar de 15 minutos (método tradicional por WhatsApp) para <strong>40 segundos</strong>.
              </p>
              <p>
                <strong>3. Proposta de Nova Regra Permanente L1:</strong> Recomenda-se adicionar formalmente ao acervo da Corporate Experience: <em>«Para eventos com mais de 700 convidados no CCTA, alocar no mínimo 4 protocolos exclusivamente dedicados ao Foyer Coffee Break para cobertura dos 3 acessos ao jardim.»</em>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* IMMUTABLE AUDIT LOG TABLE */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4">
        <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-400" />
          <span>Histórico Criptográfico de Auditoria ({eventModel.auditLogs.length} Registos)</span>
        </h3>

        <div className="space-y-2">
          {eventModel.auditLogs.map((log) => (
            <div key={log.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-3 text-xs">
              <div className="flex items-start gap-3">
                <span className="font-mono text-amber-400 font-bold shrink-0">{log.timestamp}</span>
                <div>
                  <span className="font-bold text-white">{log.actor}</span>
                  <span className="text-slate-400 ml-1.5">[{log.action}]</span>
                  <p className="text-slate-300 text-[11px] mt-0.5">{log.details}</p>
                </div>
              </div>

              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono text-slate-500 bg-slate-900 border border-slate-800 shrink-0">
                v{log.version}.0
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
