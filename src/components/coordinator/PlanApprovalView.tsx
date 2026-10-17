import React, { useState } from 'react';
import {
  CheckCircle2,
  Shield,
  FileCheck,
  Send,
  Users,
  Clock,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { EventOperationalModel } from '../../types';
import { StorageService } from '../../services/storage';

interface PlanApprovalViewProps {
  eventModel: EventOperationalModel;
  onRefresh: () => void;
  onNavigateToTab: (tab: string) => void;
}

export const PlanApprovalView: React.FC<PlanApprovalViewProps> = ({
  eventModel,
  onRefresh,
  onNavigateToTab
}) => {
  const [isApproving, setIsApproving] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const users = StorageService.getUsers();

  const handleApproveAndPublish = () => {
    setIsApproving(true);
    setTimeout(() => {
      eventModel.status = 'PUBLISHED';
      eventModel.activeVersion = eventModel.activeVersion + 1;
      
      eventModel.auditLogs.unshift({
        id: `log-${Date.now()}`,
        eventId: eventModel.id,
        timestamp: new Date().toLocaleTimeString('pt-PT'),
        actor: 'Dra. Elsa Ramos (Coordenadora)',
        action: `HOMOLOGAR_E_PUBLICAR_V${eventModel.activeVersion}`,
        details: `Plano Operacional v${eventModel.activeVersion}.0 homologado formalmente. Fichas de Posto (FPO) despachadas para ${eventModel.assignments.length} postos.`,
        version: eventModel.activeVersion
      });

      StorageService.saveEventModel(eventModel);
      setIsApproving(false);
      setSuccessMessage(true);
      setTimeout(() => {
        setSuccessMessage(false);
        onRefresh();
        onNavigateToTab('LIVE_OPS');
      }, 1500);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* HEADER */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
          <FileCheck className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-white tracking-tight">
            Homologação do Coordenador & Despacho Oficial (Human-in-the-Loop)
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Regra Fundamental: A IA propõe, o Coordenador valida, o sistema publica. Nenhuma instrução é despachada para o terreno sem a sua assinatura digital formal.
          </p>
        </div>
      </div>

      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border-2 border-emerald-500 text-emerald-300 text-xs font-bold flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
          <div>
            <div className="text-sm text-white">Plano Oficial Publicado com Sucesso!</div>
            <div>A versão v{eventModel.activeVersion}.0 já está activa nos PWAs de toda a equipa de protocolo.</div>
          </div>
        </div>
      )}

      {/* SUMMARY AUDIT CARD */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
              Documento de Despacho Operacional
            </span>
            <h3 className="text-lg font-black text-white">{eventModel.title}</h3>
            <p className="text-xs text-slate-400">{eventModel.venue.name} • {eventModel.date}</p>
          </div>

          <div className="text-right">
            <span className="px-2.5 py-1 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/30 font-mono font-bold text-xs">
              Versão a Publicar: v{eventModel.activeVersion + 1}.0
            </span>
          </div>
        </div>

        {/* METRICS OF THE PLAN */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-[10px] uppercase font-bold text-slate-400">Postos Activos</div>
            <div className="text-xl font-black text-white mt-1">{eventModel.posts.length}</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-[10px] uppercase font-bold text-slate-400">Turnos Planeados</div>
            <div className="text-xl font-black text-white mt-1">{eventModel.shifts.length}</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-[10px] uppercase font-bold text-slate-400">Protocolos Alocados</div>
            <div className="text-xl font-black text-blue-400 mt-1">{eventModel.assignments.length}</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-[10px] uppercase font-bold text-slate-400">Conflitos Pendentes</div>
            <div className="text-xl font-black text-emerald-400 mt-1">
              {eventModel.conflicts.filter(c => !c.resolved).length}
            </div>
          </div>
        </div>

        {/* CHECKLIST DE CONFORMIDADE */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
          <div className="font-bold text-slate-200 uppercase tracking-wider text-[11px] mb-2">
            Critérios de Homologação Verificados
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Regras L1 da Corporate Experience respeitadas (cobertura mantida no Coffee Break).</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Postos CRITICAL (Sala VIP e Entrada) guarnecidos por pessoal com competências validadas.</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Fichas de Posto Operacional (FPO) geradas com justificativa pedagógica «Porquê?».</span>
          </div>
        </div>

        {/* SIGN & PUBLISH BUTTON */}
        <div className="pt-2">
          <button
            onClick={handleApproveAndPublish}
            disabled={isApproving}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-slate-950 font-black text-sm flex items-center justify-center gap-3 shadow-xl shadow-emerald-950/60 transition active:scale-98 disabled:opacity-50"
          >
            <Send className="w-5 h-5 text-slate-950" />
            <span>Homologar e Publicar Versão Oficial (Despachar para Equipas)</span>
          </button>
        </div>

      </div>

    </div>
  );
};
