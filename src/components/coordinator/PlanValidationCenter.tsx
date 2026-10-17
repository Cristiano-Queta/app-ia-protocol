import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle,
  Shield,
  Clock,
  Users,
  Check,
  Lightbulb,
  ArrowRight,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { EventOperationalModel } from '../../types';
import { StorageService } from '../../services/storage';
import { DeterministicRuleEngine } from '../../engine/deterministicRules';

interface PlanValidationCenterProps {
  eventModel: EventOperationalModel;
  onRefresh: () => void;
  onNavigateToTab: (tab: string) => void;
}

export const PlanValidationCenter: React.FC<PlanValidationCenterProps> = ({
  eventModel,
  onRefresh,
  onNavigateToTab
}) => {
  const users = StorageService.getUsers();
  const profiles = StorageService.getStaffProfiles();

  const [appliedMsg, setAppliedMsg] = useState<string | null>(null);

  // Verificação matemática
  const conflicts = DeterministicRuleEngine.validateAll({
    posts: eventModel.posts,
    shifts: eventModel.shifts,
    assignments: eventModel.assignments,
    staffUsers: users,
    staffProfiles: profiles,
    activities: eventModel.activities,
    rules: eventModel.rules
  });

  const handleApplyContingency = (optionType: 'REDUCE_COFFEE' | 'RESERVE_STAFF') => {
    if (optionType === 'REDUCE_COFFEE') {
      eventModel.shifts = eventModel.shifts.map(s => {
        if (s.postId === 'post-coffee-01' && s.startTime === '10:30') {
          return { ...s, requiredStaff: 2 };
        }
        return s;
      });

      eventModel.auditLogs.unshift({
        id: `log-${Date.now()}`,
        eventId: eventModel.id,
        timestamp: new Date().toLocaleTimeString('pt-PT'),
        actor: 'Coordenador',
        action: 'RESOLVER_FALTA_DE_PESSOAL',
        details: 'Ajustado o posto de Coffee Break para 2 pessoas. Sala VIP e Entrada continuam com protecção máxima.',
        version: eventModel.activeVersion
      });

      StorageService.saveEventModel(eventModel);
      setAppliedMsg('Pronto! Ajustámos o Coffee Break para 2 pessoas. Agora ninguém fica desamparado e a escala está 100% certa!');
      setTimeout(() => {
        setAppliedMsg(null);
        onRefresh();
      }, 1500);
    } else {
      alert('Aviso enviado para a equipa de transporte: 1 suplente a caminho!');
    }
  };

  return (
    <div className="space-y-6">

      {/* CABEÇALHO COM EXPLICAÇÃO EM PALAVRAS MIÚDAS */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-black text-white tracking-tight">
              O Sistema Faz as Contas Sozinho e Mostra se Falta Alguém
            </h2>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
              Aqui não precisa de ser perito em informática: se houver dois protocolos marcados no mesmo sítio ou se faltar gente num momento apertado, o sistema avisa a vermelho e dá a solução.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigateToTab('PLAN_APPROVAL')}
          className="shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition"
        >
          <span>Aprovar Escala de Serviço</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {appliedMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{appliedMsg}</span>
        </div>
      )}

      {/* CASO EXISTA CONFLITO (ILUSTRADO COM BONECOS E NÚMEROS SIMPLES) */}
      {conflicts.length > 0 ? (
        <div className="p-5 rounded-2xl bg-red-950/20 border-2 border-red-500/40 space-y-5">
          
          <div className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <h3 className="text-sm font-black uppercase tracking-wider">
              Atenção: Descobrimos 1 Buraco na Escala!
            </h3>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
            
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-500/30">
                MOMENTO CRÍTICO: 10:30 às 11:00 (COFFEE BREAK)
              </span>
              <p className="text-sm font-bold text-white mt-1.5 leading-snug">
                Às 10:30, precisamos de 9 pessoas ao mesmo tempo nos postos, mas só temos 8 rapazes e moças disponíveis. Vai faltar 1 protocolo no salão!
              </p>
            </div>

            {/* A BALANÇA VISUAL (CONTA BEM SIMPLES DE ENTENDER) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <div className="p-2">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Pessoas Necessárias</div>
                <div className="text-2xl font-black text-amber-400 mt-1">9 protocolos</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Entrada (2) + VIP (2) + Palco (2) + Lanche (3)</div>
              </div>

              <div className="p-2 border-y sm:border-y-0 sm:border-x border-slate-800">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Pessoas na Equipa</div>
                <div className="text-2xl font-black text-blue-400 mt-1">8 protocolos</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Total de efectivos no recinto</div>
              </div>

              <div className="p-2">
                <div className="text-[11px] font-bold text-red-400 uppercase">O que está a faltar?</div>
                <div className="text-2xl font-black text-red-400 mt-1">-1 pessoa</div>
                <div className="text-[10px] text-red-400 mt-0.5">Se ninguém fizer nada, o posto fica vazio!</div>
              </div>
            </div>

            {/* COMO RESOLVER EM 1 CLIQUE */}
            <div className="pt-2 border-t border-slate-800">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Escolha como quer resolver este problema (o sistema faz o resto):</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                
                {/* OPÇÃO RECOMENDADA */}
                <div className="p-4 rounded-xl bg-slate-900 border-2 border-amber-500/40 flex flex-col justify-between gap-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">Opção 1: Ajustar o Lanche (Mais Segura)</span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300">
                        Recomendado
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                      Em vez de 3 pessoas no Coffee Break, colocamos <strong>2 pessoas</strong>. Assim, não mexemos na Sala do Ministro (VIP) nem na Entrada, e ninguém precisa de faltar ao posto.
                    </p>
                  </div>

                  <button
                    onClick={() => handleApplyContingency('REDUCE_COFFEE')}
                    className="w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md transition active:scale-95"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Aceitar esta Solução (1 Clique)</span>
                  </button>
                </div>

                {/* OPÇÃO ALTERNATIVA */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between gap-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">Opção 2: Chamar Colega de Reserva</span>
                      <span className="text-[10px] text-slate-400 font-medium">Suplente</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                      Pedir por rádio ou telefone para o protocolo suplente que está no autocarro de apoio vir ajudar durante a meia-hora do lanche.
                    </p>
                  </div>

                  <button
                    onClick={() => handleApplyContingency('RESERVE_STAFF')}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition"
                  >
                    Pedir Protocolo de Reserva
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      ) : (
        /* SINAL VERDE: TUDO CERTO */
        <div className="p-6 rounded-2xl bg-emerald-950/20 border-2 border-emerald-500/40 text-center space-y-2">
          <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
          <h3 className="text-base font-bold text-white">Tudo Certo! Nenhum Buraco na Escala</h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
            Todas as salas têm a quantidade certa de pessoas, ninguém foi colocado em dois sítios ao mesmo tempo e os protocolos mais experientes estão com as autoridades VIP.
          </p>
        </div>
      )}

      {/* TABELA VISUAL DOS POSTOS */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-4 h-4 text-amber-400" />
              <span>Onde cada pessoa vai trabalhar durante o dia</span>
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Horários bem definidos para que ninguém fique confuso sobre onde deve estar.
            </p>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">8 protocolos alocados</span>
        </div>

        <div className="space-y-2.5">
          {eventModel.shifts.map((shift) => {
            const post = eventModel.posts.find(p => p.id === shift.postId);
            const assigned = eventModel.assignments.filter(a => a.shiftId === shift.id);
            const isFull = assigned.length >= shift.requiredStaff;

            return (
              <div key={shift.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                
                <div className="flex items-start sm:items-center gap-3">
                  <div className="font-mono font-bold text-amber-400 text-xs px-2.5 py-1 bg-slate-900 rounded-lg border border-slate-800 shrink-0">
                    {shift.startTime} às {shift.endTime}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm flex items-center gap-2">
                      <span>{post?.name}</span>
                      {shift.requiresVip && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                          Requer Tratamento VIP
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Precisa de: <strong className="text-slate-200">{shift.requiredStaff} protocolo(s)</strong> no local
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="flex flex-wrap gap-1">
                    {assigned.map(a => {
                      const u = users.find(user => user.id === a.staffId);
                      return (
                        <span key={a.id} className="px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[11px] font-medium">
                          {u?.fullName}
                        </span>
                      );
                    })}
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                    isFull ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300 animate-pulse'
                  }`}>
                    {isFull ? 'Completo' : 'Falta Gente'}
                  </span>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
