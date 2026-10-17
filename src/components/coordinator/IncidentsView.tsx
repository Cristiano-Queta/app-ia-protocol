import React, { useState } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  Clock,
  MapPin,
  AlertCircle,
  Filter,
  Check
} from 'lucide-react';
import { EventOperationalModel, IncidentStatus, Incident } from '../../types';
import { StorageService } from '../../services/storage';

interface IncidentsViewProps {
  eventModel: EventOperationalModel;
  onRefresh: () => void;
}

export const IncidentsView: React.FC<IncidentsViewProps> = ({
  eventModel,
  onRefresh
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const handleUpdateIncidentStatus = (incidentId: string, newStatus: IncidentStatus) => {
    eventModel.incidents = eventModel.incidents.map(inc => {
      if (inc.id === incidentId) {
        return {
          ...inc,
          status: newStatus,
          resolvedAt: newStatus === 'RESOLVED' ? new Date().toLocaleTimeString('pt-PT') : undefined,
          resolutionNotes: newStatus === 'RESOLVED' ? 'Resolvido no terreno pela coordenação.' : inc.resolutionNotes
        };
      }
      return inc;
    });

    eventModel.auditLogs.unshift({
      id: `log-${Date.now()}`,
      eventId: eventModel.id,
      timestamp: new Date().toLocaleTimeString('pt-PT'),
      actor: 'Dra. Elsa Ramos (Coordenadora)',
      action: `ACTUALIZAR_INCIDENTE_${newStatus}`,
      details: `Incidente ${incidentId} actualizado para ${newStatus}.`,
      version: eventModel.activeVersion
    });

    StorageService.saveEventModel(eventModel);
    onRefresh();
  };

  const filteredIncidents = eventModel.incidents.filter(inc => {
    if (filterStatus === 'ALL') return true;
    return inc.status === filterStatus;
  });

  return (
    <div className="space-y-6">

      {/* HEADER & FILTER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <span>Fila Operacional de Incidentes de Terreno</span>
          </h2>
          <p className="text-xs text-slate-400">
            Registo em tempo real transmitido pelos terminais PWA dos protocolos.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
          {['ALL', 'OPEN', 'IN_PROGRESS', 'RESOLVED'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                filterStatus === st
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {st === 'ALL' ? 'Todos' : st === 'OPEN' ? 'Abertos' : st === 'IN_PROGRESS' ? 'Em Curso' : 'Resolvidos'}
            </button>
          ))}
        </div>
      </div>

      {/* INCIDENT CARDS */}
      <div className="space-y-3">
        {filteredIncidents.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 text-xs">
            Nenhuma ocorrência encontrada para este filtro.
          </div>
        ) : (
          filteredIncidents.map(inc => (
            <div
              key={inc.id}
              className={`p-4 rounded-xl border text-xs space-y-3 transition ${
                inc.status === 'RESOLVED'
                  ? 'bg-slate-950/60 border-slate-800 opacity-80'
                  : inc.priority === 'URGENT'
                  ? 'bg-red-950/20 border-red-500/40'
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                      inc.priority === 'URGENT'
                        ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                        : inc.priority === 'HIGH'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    }`}>
                      {inc.priority}
                    </span>
                    <span className="font-bold text-white text-sm">{inc.category}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400 text-[11px] mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{inc.location}</span>
                    <span>•</span>
                    <span>Reportado por: <strong className="text-slate-300">{inc.reporterName}</strong></span>
                    <span>•</span>
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{inc.timestamp}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                    inc.status === 'RESOLVED'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : inc.status === 'IN_PROGRESS'
                      ? 'bg-blue-500/20 text-blue-300'
                      : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {inc.status === 'RESOLVED' ? 'Resolvido' : inc.status === 'IN_PROGRESS' ? 'Em Resolução' : 'Pendente'}
                  </span>
                </div>
              </div>

              <p className="text-slate-200 bg-slate-950 p-3 rounded-lg border border-slate-800 leading-relaxed">
                "{inc.description}"
              </p>

              {inc.recommendedEscalation && (
                <div className="text-[11px] text-amber-400 font-medium">
                  Directriz de Escalonamento Sugerida: {inc.recommendedEscalation}
                </div>
              )}

              {/* ACTION BUTTONS */}
              {inc.status !== 'RESOLVED' && (
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800/80">
                  {inc.status === 'OPEN' && (
                    <button
                      onClick={() => handleUpdateIncidentStatus(inc.id, 'IN_PROGRESS')}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition"
                    >
                      Assumir em Curso
                    </button>
                  )}
                  <button
                    onClick={() => handleUpdateIncidentStatus(inc.id, 'RESOLVED')}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1 transition"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Marcar Como Resolvido</span>
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

    </div>
  );
};
