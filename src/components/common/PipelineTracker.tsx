import React from 'react';
import {
  FileText,
  Sparkles,
  Layers,
  Cpu,
  ShieldCheck,
  FileSignature,
  Send,
  Smartphone,
  CheckCircle,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import { EventOperationalModel } from '../../types';

interface PipelineTrackerProps {
  eventModel: EventOperationalModel;
  currentCoordinatorTab: string;
  currentView: 'COORDINATOR' | 'PROTOCOL' | 'ADMIN';
  onNavigateTab: (tab: string) => void;
  onNavigateView: (view: 'COORDINATOR' | 'PROTOCOL' | 'ADMIN') => void;
}

export const PipelineTracker: React.FC<PipelineTrackerProps> = ({
  eventModel,
  currentCoordinatorTab,
  currentView,
  onNavigateTab,
  onNavigateView
}) => {
  const unresolvedConflicts = eventModel.conflicts.filter(c => !c.resolved).length;
  const isPublished = eventModel.status === 'PUBLISHED' || eventModel.status === 'IN_EXECUTION';

  const steps = [
    {
      id: 'DOCS',
      label: 'Documentos',
      sublabel: 'Ingestão PDF/TXT',
      icon: FileText,
      status: 'DONE',
      action: () => { onNavigateView('COORDINATOR'); onNavigateTab('IMPORT_ANALYSIS'); }
    },
    {
      id: 'EXTRACTION',
      label: 'Extraction',
      sublabel: 'Gemini 3.8 Flash',
      icon: Sparkles,
      status: eventModel.activities.length > 0 ? 'DONE' : 'ACTIVE',
      action: () => { onNavigateView('COORDINATOR'); onNavigateTab('IMPORT_ANALYSIS'); }
    },
    {
      id: 'EOM',
      label: 'EOM',
      sublabel: 'Grafo Estruturado',
      icon: Layers,
      status: eventModel.activities.length > 0 ? 'DONE' : 'PENDING',
      action: () => { onNavigateView('COORDINATOR'); onNavigateTab('EOM_STRUCTURE'); }
    },
    {
      id: 'AI_PLANNING',
      label: 'AI Planning',
      sublabel: 'Proposta de Postos',
      icon: Cpu,
      status: eventModel.shifts.length > 0 ? 'DONE' : 'ACTIVE',
      action: () => { onNavigateView('COORDINATOR'); onNavigateTab('PLAN_VALIDATION'); }
    },
    {
      id: 'DETERMINISTIC_VALIDATION',
      label: 'Deterministic Validation',
      sublabel: unresolvedConflicts > 0 ? `${unresolvedConflicts} Conflito(s)` : 'Zero Colisão',
      icon: ShieldCheck,
      status: unresolvedConflicts > 0 ? 'ALERT' : 'DONE',
      action: () => { onNavigateView('COORDINATOR'); onNavigateTab('PLAN_VALIDATION'); }
    },
    {
      id: 'HUMAN_APPROVAL',
      label: 'Human Approval',
      sublabel: isPublished ? 'Homologado' : 'Requer Assinatura',
      icon: FileSignature,
      status: isPublished ? 'DONE' : 'ACTIVE',
      action: () => { onNavigateView('COORDINATOR'); onNavigateTab('PLAN_APPROVAL'); }
    },
    {
      id: 'PUBLISHED_PLAN',
      label: 'Published Plan',
      sublabel: `v${eventModel.activeVersion}.0 Oficial`,
      icon: Send,
      status: isPublished ? 'DONE' : 'PENDING',
      action: () => { onNavigateView('COORDINATOR'); onNavigateTab('LIVE_OPS'); }
    },
    {
      id: 'PROTOCOL_PWA',
      label: 'Protocol PWA',
      sublabel: 'Offline & Check-in',
      icon: Smartphone,
      status: currentView === 'PROTOCOL' ? 'ACTIVE' : 'DONE',
      action: () => onNavigateView('PROTOCOL')
    }
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 shadow-lg">
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
            Pipeline Operacional End-to-End
          </span>
          <span className="text-[11px] text-slate-400 hidden sm:inline">• Clique em qualquer etapa para navegar</span>
        </div>
        <span className="text-[10px] text-slate-500 font-mono">
          Status: {isPublished ? 'EXECUÇÃO EM DIRECTO' : 'PLANEAMENTO'}
        </span>
      </div>

      <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1 min-w-max">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isLast = idx === steps.length - 1;

          return (
            <React.Fragment key={step.id}>
              <button
                onClick={step.action}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-left transition shrink-0 group ${
                  step.status === 'ALERT'
                    ? 'bg-red-950/30 border-red-500/60 hover:bg-red-950/50 text-red-200'
                    : step.status === 'DONE'
                    ? 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-200'
                    : 'bg-slate-950/60 border-slate-800/60 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  step.status === 'ALERT'
                    ? 'bg-red-500/20 text-red-400'
                    : step.status === 'DONE'
                    ? 'bg-emerald-500/10 text-emerald-400'
                    : 'bg-amber-500/10 text-amber-400'
                }`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white group-hover:text-amber-400 transition">
                      {step.label}
                    </span>
                    {step.status === 'DONE' ? (
                      <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0" />
                    ) : step.status === 'ALERT' ? (
                      <AlertTriangle className="w-3 h-3 text-red-400 animate-bounce shrink-0" />
                    ) : null}
                  </div>
                  <div className={`text-[10px] font-medium leading-tight ${
                    step.status === 'ALERT' ? 'text-red-400' : 'text-slate-400'
                  }`}>
                    {step.sublabel}
                  </div>
                </div>
              </button>

              {!isLast && (
                <ChevronRight className="w-3.5 h-3.5 text-slate-700 shrink-0" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
