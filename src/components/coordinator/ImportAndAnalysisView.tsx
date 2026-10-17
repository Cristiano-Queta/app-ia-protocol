import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  Upload,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Database,
  Layers,
  FileCheck,
  RefreshCw
} from 'lucide-react';
import { EventOperationalModel, Activity } from '../../types';
import { AIService, AIAnalysisResult } from '../../services/aiService';
import { StorageService } from '../../services/storage';

interface ImportAndAnalysisViewProps {
  eventModel: EventOperationalModel;
  onRefresh: () => void;
  onNavigateToTab: (tab: string) => void;
}

const DEFAULT_SAMPLE_PROGRAM = `PROGRAMA OFICIAL — CORPORATE SUMMIT ANGOLA 2026
Local: Centro de Convenções de Talatona (CCTA), Luanda
Cliente: Sonangol & Gabinete de Investimento

07:30 - 09:00 Credenciação e Acolhimento Geral dos Delegados
09:00 - 10:30 Sessão Solene de Abertura com Hino Nacional e Discurso de S. Exa. Ministro de Estado
10:30 - 11:00 Coffee Break Executivo & Networking de Alto Nível
11:00 - 13:00 Painel 1: Transformação Económica, Energia e Minerais de Angola
13:00 - 14:30 Almoço Buffet de Trabalho e Almoço Reservado de Dignatários
14:30 - 16:00 Painel 2 & Reuniões Bilaterais de Investimento Privado
16:00 - 16:30 Coffee Break de Encerramento
16:30 - 17:30 Sessão de Encerramento & Declaração Oficial de Luanda

NOTAS OPERACIONAIS:
- Presença confirmada de 12 Embaixadores e Ministros de Estado.
- Coffee break exige retenção máxima de protocolos nos corredores.`;

export const ImportAndAnalysisView: React.FC<ImportAndAnalysisViewProps> = ({
  eventModel,
  onRefresh,
  onNavigateToTab
}) => {
  const [inputText, setInputText] = useState(DEFAULT_SAMPLE_PROGRAM);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null);
  const [clarifications, setClarifications] = useState<Record<string, string>>({
    'Localização Exata do Coffee Break': 'Foyer Principal Piso 0'
  });

  const handleRunAIAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const result = await AIService.analyzeDocumentText(eventModel.id, inputText, eventModel.rules);
      setAnalysisResult(result);

      // Merge activities into event model and update
      if (result.extractedActivities.length > 0) {
        eventModel.activities = result.extractedActivities;
        eventModel.status = 'ANALYZED';
        StorageService.saveEventModel(eventModel);
        onRefresh();
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleApplyClarification = (field: string, answer: string) => {
    setClarifications(prev => ({ ...prev, [field]: answer }));
  };

  return (
    <div className="space-y-6">

      {/* HEADER EXPLANATION */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/30">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-white tracking-tight">
            Ingestão Multiformato & Extração Semântica para EOM
          </h2>
          <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
            A IA não resume o texto. Ela decompõe o programa num <strong>Event Operational Model (EOM)</strong> estruturado, identifica momentos críticos de fluxo e classifica a proveniência dos dados com níveis estritos de confiança.
          </p>
        </div>
      </div>

      {/* INPUT EDITOR & UPLOAD AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Document input */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Documento do Programa ou Briefing</span>
              </label>
              <button
                onClick={() => setInputText(DEFAULT_SAMPLE_PROGRAM)}
                className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold"
              >
                Carregar Exemplo Angola
              </button>
            </div>

            <textarea
              rows={14}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Cole aqui o texto do programa, horários de sessões, lista de VIPs ou notas do briefing..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 font-mono leading-relaxed outline-hidden focus:border-amber-500"
            />

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Formatos suportados: PDF, DOCX, XLSX, TXT</span>
              </div>

              <button
                onClick={handleRunAIAnalysis}
                disabled={isAnalyzing || !inputText.trim()}
                className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-950/40 transition disabled:opacity-50 active:scale-95"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Compilando com Gemini...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>Analisar e Gerar EOM</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: AI Extraction & Confidence Provenance */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* EOM Extraction Results */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Database className="w-4 h-4 text-blue-400" />
                <span>Entidades Operacionais Extraídas</span>
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                {eventModel.activities.length} Actividades no EOM
              </span>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {eventModel.activities.map((act) => (
                <div key={act.id} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-amber-400 text-xs">
                          {act.startTime}–{act.endTime}
                        </span>
                        <h4 className="font-bold text-white text-xs">{act.title}</h4>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                        <span>Tipo: {act.activityType}</span>
                        <span>•</span>
                        <span>{act.estimatedAttendees} pessoas est.</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                        act.provenance.validationStatus === 'CONFIRMED'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        [{act.provenance.validationStatus}]
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        Confiança: {Math.round(act.provenance.confidence * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* HUMAN-IN-THE-LOOP CLARIFICATION WIZARD */}
          {analysisResult?.unresolvedAmbiguities && analysisResult.unresolvedAmbiguities.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/40 space-y-3">
              <div className="flex items-center gap-2 text-amber-400">
                <AlertCircle className="w-4 h-4" />
                <h4 className="text-xs font-bold uppercase tracking-wider">
                  Clarificação Humana Necessária [NEEDS HUMAN VALIDATION]
                </h4>
              </div>
              <p className="text-xs text-slate-300">
                A IA detectou ambiguidades que não constam no documento. O coordenador deve clarificar antes da aprovação do plano:
              </p>

              {analysisResult.unresolvedAmbiguities.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                  <div className="font-bold text-white">{item.question}</div>
                  <p className="text-slate-400 text-[11px]">{item.context}</p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.suggestedOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleApplyClarification(item.field, opt)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition ${
                          clarifications[item.field] === opt
                            ? 'bg-amber-500 text-slate-950 font-bold border-amber-500'
                            : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* NEXT STEP BUTTON */}
          <div className="pt-2">
            <button
              onClick={() => onNavigateToTab('EOM_STRUCTURE')}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 border border-blue-500/40 hover:bg-slate-800 text-blue-400 font-bold text-xs flex items-center justify-center gap-2 shadow-md transition"
            >
              <span>Avançar para Explorador do EOM</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
