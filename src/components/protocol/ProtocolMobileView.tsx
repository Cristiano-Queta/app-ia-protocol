import React, { useState } from 'react';
import {
  Clock,
  MapPin,
  AlertTriangle,
  HelpCircle,
  CheckCircle2,
  PhoneCall,
  ShieldAlert,
  Coffee,
  X,
  Send,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info,
  Lightbulb,
  BookOpen
} from 'lucide-react';
import { EventOperationalModel, StationBrief, IncidentCategory, IncidentPriority } from '../../types';
import { StorageService } from '../../services/storage';
import { PocketDictionaryModal } from '../common/PocketDictionaryModal';

interface ProtocolMobileViewProps {
  staffId: string;
  eventModel: EventOperationalModel;
  onRefresh: () => void;
}

export const ProtocolMobileView: React.FC<ProtocolMobileViewProps> = ({
  staffId,
  eventModel,
  onRefresh
}) => {
  const users = StorageService.getUsers();
  const profiles = StorageService.getStaffProfiles();
  const currentUser = users.find(u => u.id === staffId);
  const currentProfile = profiles.find(p => p.userId === staffId);

  const assignment = eventModel.assignments.find(a => a.staffId === staffId);
  const activePost = eventModel.posts.find(p => p.id === assignment?.postId) || eventModel.posts[0];
  const activeShift = eventModel.shifts.find(s => s.id === assignment?.shiftId) || eventModel.shifts[0];

  const brief: StationBrief = assignment?.stationBrief || {
    id: `brief-${activePost.id}`,
    assignmentId: assignment?.id || 'assign-def',
    postId: activePost.id,
    protocolName: currentUser?.fullName || 'Protocolo',
    postName: activePost.name,
    locationDetails: activePost.locationDetails,
    shiftHours: `${activeShift.startTime} às ${activeShift.endTime}`,
    missionStatement: activePost.missionStatement,
    tasks: [
      { id: 't-1', text: 'Chegar ao posto 10 minutos antes e fardar devidamente', done: true },
      { id: 't-2', text: 'Receber os convidados com postura firme e sorriso acolhedor', done: false },
      { id: 't-3', text: 'Pedir educadamente o crachá e orientar o sentido da sala', done: false },
      { id: 't-4', text: 'Manter a porta desimpedida e não mexer no telemóvel pessoal', done: false }
    ],
    prohibitedActions: [
      {
        id: 'p-1',
        text: 'Não abandonar a porta durante o Coffee Break das 10:30!',
        why: 'Quando o intervalo começa, saem 800 convidados de uma só vez para o pátio. Se saíres da porta para ir lanchar, ninguém orienta o tráfego e convidados sem crachá tentam invadir a Sala dos Ministros!'
      },
      {
        id: 'p-2',
        text: 'Não deixar entrar ninguém na Sala VIP sem crachá Dourado!',
        why: 'Na Sala VIP estão Ministros de Estado e Embaixadores. A segurança presidencial não autoriza a entrada de convidados gerais nesta área reservada.'
      }
    ],
    accessAllowed: ['Delegados com Crachá Azul', 'Convidados VIP com Crachá Dourado', 'Imprensa Credenciada'],
    accessDenied: ['Pessoas sem Crachá Oficial', 'Acompanhantes sem convite nominal', 'Prestadores de serviço do hotel'],
    greetingScriptPt: 'Bom dia! Seja muito bem-vindo ao Corporate Summit. Por favor apresente o seu crachá.',
    vipListForPost: eventModel.vipGuests.slice(0, 2).map(v => `${v.titleOrOffice} - ${v.fullName}`),
    escalationContacts: [
      { name: 'Dra. Elsa Ramos', role: 'Coordenadora Geral', phone: '+244 924 100 200' }
    ],
    breakWindow: { start: '12:15', end: '12:50', coverStaffName: 'Colega de Apoio' },
    whyExplanation: 'A tua presença no posto garante que o evento decorra com ordem e respeito pelos convidados de Estado.',
    version: 1
  };

  const [activeWhy, setActiveWhy] = useState<{ text: string; why: string } | null>(null);
  const [isDictionaryOpen, setIsDictionaryOpen] = useState(false);

  // Modal de Incidentes simples
  const [isIncidentModalOpen, setIsIncidentModalOpen] = useState(false);
  const [incidentCategory, setIncidentCategory] = useState<IncidentCategory>('CREDENTIAL_ISSUE');
  const [incidentPriority, setIncidentPriority] = useState<IncidentPriority>('NORMAL');
  const [incidentDesc, setIncidentDesc] = useState('');
  const [incidentLocation, setIncidentLocation] = useState(activePost.name);
  const [incidentSuccessMsg, setIncidentSuccessMsg] = useState(false);

  const [tasks, setTasks] = useState(brief.tasks);

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, done: !t.done } : t));
  };

  const handleCheckIn = () => {
    StorageService.checkInStaff(staffId, activePost.id);
    onRefresh();
  };

  const handleSubmitIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!incidentDesc.trim()) return;

    StorageService.reportIncident({
      eventId: eventModel.id,
      postId: activePost.id,
      reporterStaffId: staffId,
      reporterName: currentUser?.fullName || 'Protocolo',
      category: incidentCategory,
      priority: incidentPriority,
      description: incidentDesc,
      location: incidentLocation
    });

    setIncidentSuccessMsg(true);
    setIncidentDesc('');
    setTimeout(() => {
      setIncidentSuccessMsg(false);
      setIsIncidentModalOpen(false);
      onRefresh();
    }, 1200);
  };

  const latestEmergencyChange = eventModel.changes[0];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-950 text-slate-100 pb-24 border-x border-slate-900 shadow-2xl">
      
      {/* IDENTIFICAÇÃO DO PROTOCOLO E BOTÕES DE APOIO */}
      <div className="bg-slate-900 border-b border-slate-800 p-4 sticky top-12 z-30 backdrop-blur-md">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-black text-xs shadow-md shrink-0">
              {currentUser?.fullName.split(' ').map(n => n[0]).slice(0, 2).join('')}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-black text-white flex items-center gap-1 truncate">
                <span className="truncate">{currentUser?.fullName}</span>
                {currentProfile?.isVipCertified && (
                  <span className="px-1 py-0.2 rounded text-[8px] font-bold bg-amber-400/20 text-amber-300 shrink-0">
                    VIP
                  </span>
                )}
              </div>
              <div className="text-[11px] text-slate-400 truncate">
                {assignment?.status === 'CHECKED_IN' ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    No Posto ({assignment.checkedInAt})
                  </span>
                ) : (
                  <span className="text-amber-400 font-bold">Por confirmar presença</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setIsDictionaryOpen(true)}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 rounded-xl text-xs font-bold transition"
              title="Dicionário de Bolso"
            >
              <BookOpen className="w-4 h-4" />
            </button>

            <a
              href="tel:+244924100200"
              className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl px-2.5 py-2 text-xs font-bold transition shadow-xs"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>Chefe</span>
            </a>
          </div>
        </div>
      </div>

      {/* AVISO DE MUDANÇA DE EMERGÊNCIA (SE HOUVER) */}
      {latestEmergencyChange && (
        <div className="mx-4 mt-3 p-3.5 rounded-2xl bg-amber-500/15 border-2 border-amber-500/40 flex items-start gap-3">
          <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 animate-bounce" />
          <div className="text-xs">
            <div className="font-black text-amber-300">
              AVISO URGENTE DO CHEFE: {latestEmergencyChange.reason}
            </div>
            <p className="text-slate-200 text-xs mt-1 leading-snug">{latestEmergencyChange.impactSummary}</p>
          </div>
        </div>
      )}

      {/* ÁREA PRINCIPAL DO PROTOCOLO */}
      <div className="p-4 space-y-4">

        {/* CARTÃO GRANDE: ONDE DEVES ESTAR AGORA */}
        <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-900/80 border-2 border-amber-500/40 p-4 shadow-xl relative overflow-hidden">
          
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 text-[11px] font-black uppercase tracking-wide">
              <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
              <span>O Teu Posto Agora</span>
            </div>
            <div className="flex items-center gap-1 text-slate-300 text-xs font-bold">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{brief.shiftHours}</span>
            </div>
          </div>

          <h2 className="text-xl font-black text-white tracking-tight mt-1">{brief.postName}</h2>

          <div className="flex items-start gap-1.5 text-slate-300 text-xs mt-1">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span className="font-medium">{brief.locationDetails}</span>
          </div>

          {/* O QUE FAZER AQUI */}
          <div className="mt-3.5 p-3 rounded-xl bg-slate-950/90 border border-slate-800">
            <div className="text-[10px] font-black text-amber-400 uppercase tracking-wider mb-1">
              A Tua Principal Tarefa
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              {brief.missionStatement}
            </p>
          </div>

          {/* FRASE DE SAUDAÇÃO RECOMENDADA */}
          <div className="mt-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Como deves falar com quem chega:</span>
            <em className="text-amber-200 font-medium">"{brief.greetingScriptPt}"</em>
          </div>

          {/* BOTÃO GRANDE DE CONFIRMAR PRESENÇA */}
          {assignment?.status !== 'CHECKED_IN' ? (
            <button
              onClick={handleCheckIn}
              className="mt-4 w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60 transition transform active:scale-98"
            >
              <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
              <span>Já cheguei ao meu Posto! (Carregar Aqui)</span>
            </button>
          ) : (
            <div className="mt-4 py-2.5 px-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Presença Confirmada neste Posto</span>
            </div>
          )}
        </div>

        {/* LISTA DE TAREFAS QUE DEVES CUMPRIR */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-black text-slate-200 uppercase tracking-wider">
              Tarefas a Cumprir
            </h3>
            <span className="text-[11px] text-slate-400">
              {tasks.filter(t => t.done).length} de {tasks.length} feitas
            </span>
          </div>

          <div className="space-y-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition ${
                  task.done
                    ? 'bg-slate-950/50 border-slate-800 text-slate-400'
                    : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className={`w-5 h-5 rounded-lg mt-0.5 flex items-center justify-center shrink-0 border ${
                  task.done
                    ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                    : 'border-slate-600'
                }`}>
                  {task.done && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
                </div>
                <span className={`text-xs leading-snug font-medium ${task.done ? 'line-through text-slate-400' : ''}`}>
                  {task.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* O QUE NUNCA DEVES FAZER (COM BOTÃO «PORQUÊ?») */}
        <div className="rounded-2xl bg-slate-900 border border-red-500/30 p-4">
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-xs font-black text-red-400 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>O que NUNCA Deves Fazer</span>
            </h3>
            <span className="text-[10px] text-amber-400 font-bold">Toque na Lâmpada 💡</span>
          </div>

          <div className="space-y-2.5">
            {brief.prohibitedActions.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-red-950/20 border border-red-900/40 flex items-start justify-between gap-3"
              >
                <div className="flex items-start gap-2 text-xs text-slate-200 font-medium">
                  <span className="text-red-400 font-black text-sm shrink-0">✕</span>
                  <span className="leading-snug">{item.text}</span>
                </div>

                <button
                  onClick={() => setActiveWhy(item)}
                  className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-[11px] font-black shadow-xs transition active:scale-95"
                  title="Ver explicação simples de por que razão não podes fazer isto"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Porquê?</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* QUEM PODE ENTRAR / QUEM NÃO PODE */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-3 rounded-xl bg-slate-900 border border-emerald-900/40">
            <div className="text-[10px] font-black text-emerald-400 uppercase tracking-wider mb-1.5">
              ✓ Quem pode entrar
            </div>
            <ul className="space-y-1.5 text-slate-300 text-[11px]">
              {brief.accessAllowed.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-1">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-red-900/40">
            <div className="text-[10px] font-black text-red-400 uppercase tracking-wider mb-1.5">
              ✕ Quem NÃO entra
            </div>
            <ul className="space-y-1.5 text-slate-300 text-[11px]">
              {brief.accessDenied.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-1">
                  <span className="text-red-400 font-bold">•</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* HORÁRIO DA TUA REFEIÇÃO / DESCANSO */}
        {brief.breakWindow && (
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                <Coffee className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Hora do Teu Lanche</div>
                <div className="font-black text-white">
                  Das {brief.breakWindow.start} às {brief.breakWindow.end}
                </div>
              </div>
            </div>
            <div className="text-right text-[10px] text-slate-400">
              <span>Quem te substitui:</span>
              <div className="text-white font-bold">{brief.breakWindow.coverStaffName}</div>
            </div>
          </div>
        )}

        {/* BOTÃO DO DICIONÁRIO DE BOLSO NO TELEMÓVEL */}
        <button
          onClick={() => setIsDictionaryOpen(true)}
          className="w-full py-3 px-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 text-slate-300 text-xs font-bold flex items-center justify-between transition"
        >
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Não entendeste uma palavra? Abre o Dicionário</span>
          </div>
          <span className="text-amber-400 text-xs font-black">Ler ➔</span>
        </button>

        {/* BOTÃO GRANDE: AVISAR O CHEFE DE UM PROBLEMA */}
        <button
          onClick={() => setIsIncidentModalOpen(true)}
          className="w-full py-3.5 px-4 rounded-xl bg-slate-900 border-2 border-amber-500/40 hover:bg-slate-800 text-amber-400 font-black text-xs flex items-center justify-center gap-2 shadow-lg transition"
        >
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <span>Aconteceu um Problema? Avisa o Chefe Aqui</span>
        </button>

      </div>

      {/* MODAL GLOBAL DO DICIONÁRIO DE BOLSO */}
      <PocketDictionaryModal
        isOpen={isDictionaryOpen}
        onClose={() => setIsDictionaryOpen(false)}
      />

      {/* JANELA EXPLICATIVA: «POR QUE RAZÃO NÃO POSSO FAZER ISTO?» */}
      {activeWhy && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-xs p-3">
          <div className="w-full max-w-sm rounded-2xl bg-slate-900 border-2 border-amber-500/50 p-5 shadow-2xl text-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-200">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                  <Lightbulb className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider">A Razão Desta Regra</h4>
                  <p className="text-[11px] text-slate-400">Para compreenderes a estratégia do evento</p>
                </div>
              </div>
              <button onClick={() => setActiveWhy(null)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-red-300 font-bold mb-3">
              "{activeWhy.text}"
            </div>

            <div className="p-4 rounded-xl bg-amber-500/15 border border-amber-500/30 text-xs text-slate-100 leading-relaxed mb-4">
              <p className="font-black text-amber-300 mb-1 flex items-center gap-1">
                <span>Por que motivo é tão importante?</span>
              </p>
              <p className="mt-1 font-medium">{activeWhy.why}</p>
            </div>

            <button
              onClick={() => setActiveWhy(null)}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition"
            >
              Compreendi Perfeitamente!
            </button>
          </div>
        </div>
      )}

      {/* JANELA DE REPORTE DE PROBLEMAS (EM 3 TOQUES) */}
      {isIncidentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-xs p-3">
          <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-2xl text-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                <h4 className="text-sm font-black text-white">O que está a acontecer?</h4>
              </div>
              <button onClick={() => setIsIncidentModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {incidentSuccessMsg ? (
              <div className="p-6 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                <h5 className="font-black text-sm text-white">Recado Enviado ao Coordenador!</h5>
                <p className="text-xs text-slate-300">A coordenação já recebeu o aviso no painel.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitIncident} className="space-y-3.5">
                
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                    1. Que tipo de problema é?
                  </label>
                  <select
                    value={incidentCategory}
                    onChange={(e) => setIncidentCategory(e.target.value as IncidentCategory)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white outline-hidden focus:border-amber-500 cursor-pointer"
                  >
                    <option value="CREDENTIAL_ISSUE">Problema de Crachá ou Convite</option>
                    <option value="UNAUTHORIZED_ENTRY">Pessoa a tentar entrar sem permissão</option>
                    <option value="VIP_MISSING_OR_DELAYED">Autoridade ou VIP atrasado/chegou antes</option>
                    <option value="MEDICAL_OR_ACCIDENT">Alguém caiu ou sentiu-se mal</option>
                    <option value="CATERING_CONFLICT">Falta de comida / Bebida acabou</option>
                    <option value="BEHAVIORAL_DISRUPT">Convidado com comportamento agitado</option>
                    <option value="TECHNICAL_FAILURE">Problema com o Som ou Ar Condicionado</option>
                    <option value="OTHER">Outro problema qualquer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                    2. Quão urgente é?
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['NORMAL', 'HIGH', 'URGENT'] as IncidentPriority[]).map((p) => (
                      <button
                        type="button"
                        key={p}
                        onClick={() => setIncidentPriority(p)}
                        className={`py-2 text-xs font-black rounded-lg border transition ${
                          incidentPriority === p
                            ? p === 'URGENT'
                              ? 'bg-red-600 text-white border-red-600'
                              : p === 'HIGH'
                              ? 'bg-amber-500 text-slate-950 border-amber-500'
                              : 'bg-blue-600 text-white border-blue-600'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {p === 'URGENT' ? '🚨 Urgente' : p === 'HIGH' ? '⚠️ Importante' : 'Normal'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                    3. Escreve duas linhas explicando:
                  </label>
                  <textarea
                    rows={2}
                    value={incidentDesc}
                    onChange={(e) => setIncidentDesc(e.target.value)}
                    placeholder="Ex: Convidado da Sonangol perdeu o crachá e está na porta a pedir para entrar..."
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 outline-hidden focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg transition"
                >
                  <Send className="w-4 h-4 text-slate-950" />
                  <span>Enviar para o Chefe Agora</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
