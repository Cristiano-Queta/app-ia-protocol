import React, { useState } from 'react';
import {
  Layers,
  MapPin,
  Crown,
  BookOpen,
  Shield,
  Clock,
  ArrowRight,
  Plus,
  Check
} from 'lucide-react';
import { EventOperationalModel } from '../../types';

interface EOMStructureViewProps {
  eventModel: EventOperationalModel;
  onRefresh: () => void;
  onNavigateToTab: (tab: string) => void;
}

export const EOMStructureView: React.FC<EOMStructureViewProps> = ({
  eventModel,
  onRefresh,
  onNavigateToTab
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'ACTIVITIES' | 'ROOMS' | 'VIPS' | 'RULES'>('ACTIVITIES');

  return (
    <div className="space-y-6">

      {/* TOP BAR EXPLANATION */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Event Operational Model (EOM) — Grafo Estruturado
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              O coração semântico do sistema. Cada nó conecta tempo, espaço, autoridades e regras que alimentam o motor de scheduling.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigateToTab('PLAN_VALIDATION')}
          className="shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition"
        >
          <span>Ir para Validador de Conflitos</span>
          <ArrowRight className="w-4 h-4 text-slate-950" />
        </button>
      </div>

      {/* SUB-TABS */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveSubTab('ACTIVITIES')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition shrink-0 ${
            activeSubTab === 'ACTIVITIES'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Timeline & Sessões ({eventModel.activities.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('ROOMS')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition shrink-0 ${
            activeSubTab === 'ROOMS'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Espaços & Salas ({eventModel.venue.rooms.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('VIPS')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition shrink-0 ${
            activeSubTab === 'VIPS'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <Crown className="w-4 h-4" />
          <span>Dignitários & VIPs ({eventModel.vipGuests.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('RULES')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition shrink-0 ${
            activeSubTab === 'RULES'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Base de Regras L1-L4 ({eventModel.rules.length})</span>
        </button>
      </div>

      {/* SUB-TAB CONTENTS */}
      {activeSubTab === 'ACTIVITIES' && (
        <div className="space-y-3">
          {eventModel.activities.map((act) => (
            <div key={act.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start justify-between gap-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-950 font-mono font-bold text-amber-400 text-xs shrink-0">
                  {act.startTime}–{act.endTime}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{act.title}</h4>
                  <div className="flex items-center gap-2 text-slate-400 text-xs mt-1">
                    <span>Tipo: {act.activityType}</span>
                    <span>•</span>
                    <span>Afluência: {act.estimatedAttendees} convidados</span>
                    {act.isCriticalProtocolMoment && (
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-500/30">
                        Momento Crítico de Circulação
                      </span>
                    )}
                  </div>
                  {act.description && (
                    <p className="text-slate-300 text-xs mt-1.5 leading-relaxed">{act.description}</p>
                  )}
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  [{act.provenance.validationStatus}]
                </span>
                <div className="text-[10px] text-slate-400 mt-1">
                  Fonte: {act.provenance.source}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeSubTab === 'ROOMS' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {eventModel.venue.rooms.map((room) => (
            <div key={room.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">{room.name}</h4>
                  <span className="text-slate-400">{room.floorLevel}</span>
                </div>
                {room.isVipRestricted && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Acesso VIP Restrito
                  </span>
                )}
              </div>
              <div className="text-slate-400">
                Capacidade Máxima: <span className="font-semibold text-white">{room.capacity} pessoas</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeSubTab === 'VIPS' && (
        <div className="space-y-3">
          {eventModel.vipGuests.map((vip) => (
            <div key={vip.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start justify-between gap-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Crown className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{vip.fullName}</h4>
                  <div className="text-xs text-amber-400 font-semibold">{vip.titleOrOffice} — {vip.organization}</div>
                  <div className="flex items-center gap-2 text-slate-400 text-xs mt-1">
                    <span>Nível: {vip.protocolLevel}</span>
                    <span>•</span>
                    <span>Chegada Prevista: {vip.arrivalTime || 'Não especificada'}</span>
                  </div>
                  {vip.notes && (
                    <p className="text-slate-300 text-xs mt-1.5 bg-slate-950 p-2 rounded-lg border border-slate-800">
                      {vip.notes}
                    </p>
                  )}
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  [{vip.provenance.validationStatus}]
                </span>
                <div className="text-[10px] text-slate-400 mt-1">
                  Confiança: {Math.round(vip.provenance.confidence * 100)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeSubTab === 'RULES' && (
        <div className="space-y-3">
          {eventModel.rules.map((rule) => (
            <div key={rule.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                    rule.level === 'L1_CORPORATE_SOP'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  }`}>
                    {rule.level}
                  </span>
                  <h4 className="font-bold text-white text-sm">{rule.title}</h4>
                </div>
                <span className="text-[10px] font-bold text-red-400 uppercase">
                  Prioridade: {rule.priority}
                </span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                "{rule.ruleText}"
              </p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
