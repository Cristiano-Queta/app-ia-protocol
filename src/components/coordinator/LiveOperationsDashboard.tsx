import React, { useState } from 'react';
import {
  Users,
  AlertTriangle,
  Clock,
  Radio,
  CheckCircle,
  XCircle,
  Zap,
  PhoneCall,
  Activity as ActivityIcon,
  ChevronRight,
  Shield,
  Layers,
  MapPin
} from 'lucide-react';
import { EventOperationalModel } from '../../types';
import { StorageService } from '../../services/storage';

interface LiveOperationsDashboardProps {
  eventModel: EventOperationalModel;
  onRefresh: () => void;
  onNavigateToTab: (tab: string) => void;
}

export const LiveOperationsDashboard: React.FC<LiveOperationsDashboardProps> = ({
  eventModel,
  onRefresh,
  onNavigateToTab
}) => {
  const users = StorageService.getUsers();

  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [emergencyReason, setEmergencyReason] = useState('O Ministro de Estado chegou 15 minutos antes da hora marcada!');
  const [emergencyLevel, setEmergencyLevel] = useState<'N1_OPERATIONAL' | 'N2_CRITICAL_EMERGENCY'>('N2_CRITICAL_EMERGENCY');

  const totalStaff = users.filter(u => u.role === 'PROTOCOL').length;
  const checkedInCount = eventModel.assignments.filter(a => a.status === 'CHECKED_IN').length;

  const activePostsStats = eventModel.posts.map(post => {
    const assigned = eventModel.assignments.filter(a => a.postId === post.id);
    const checkedIn = assigned.filter(a => a.status === 'CHECKED_IN').length;
    const required = post.minStaff;
    const isCovered = checkedIn >= required;
    const isPartial = checkedIn > 0 && checkedIn < required;

    return {
      post,
      assignedCount: assigned.length,
      checkedInCount: checkedIn,
      requiredCount: required,
      status: isCovered ? 'COVERED' : isPartial ? 'PARTIAL' : 'DESERTED'
    };
  });

  const unresolvedConflicts = eventModel.conflicts.filter(c => !c.resolved);
  const openIncidents = eventModel.incidents.filter(i => i.status !== 'RESOLVED');

  const handleApplyEmergencyChange = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.applyEmergencyChange({
      reason: emergencyReason,
      changeLevel: emergencyLevel,
      author: 'Coordenadora Geral',
      impactSummary: 'Aviso sonoro disparado para os telemóveis do Cristiano Vunge e da Maria Fernandes para irem já para o Pórtico Exterior.',
      affectedPosts: ['POST-ENTRADA-01', 'POST-VIP-01'],
      affectedStaff: ['Cristiano Vunge', 'Maria Fernandes']
    });

    setIsEmergencyModalOpen(false);
    onRefresh();
  };

  return (
    <div className="space-y-6">

      {/* FAIXA PRINCIPAL AO VIVO COM BOTÃO DE MUDANÇA RÁPIDA */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30 mt-0.5">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
                A Acontecer Agora • Versão Oficial v{eventModel.activeVersion}.0
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <h2 className="text-base font-black text-white tracking-tight mt-0.5">
              {eventModel.title} — {eventModel.venue.name}
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Horário: das {eventModel.startTime} às {eventModel.endTime} • Olho vivo nos postos e nas portas
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsEmergencyModalOpen(true)}
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs px-5 py-3 rounded-xl shadow-lg shadow-red-950/50 transition active:scale-95"
        >
          <Zap className="w-4 h-4" />
          <span>Aconteceu um Imprevisto Urgente?</span>
        </button>
      </div>

      {/* 4 CARTÕES DE RESUMO FÁCEIS DE LER */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Total da Equipa */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
            <span>Nossa Equipa</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{totalStaff}</span>
            <span className="text-xs text-slate-400 font-medium">protocolos</span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-400 flex items-center gap-1 font-bold">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>{checkedInCount} já confirmaram presença</span>
          </div>
        </div>

        {/* Cobertura das Salas */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
            <span>Salas Vigiadas</span>
            <Shield className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-400">
              {activePostsStats.filter(p => p.status === 'COVERED').length}/{activePostsStats.length}
            </span>
            <span className="text-xs text-slate-400 font-medium">postos com gente</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-300">
            {activePostsStats.filter(p => p.status !== 'COVERED').length > 0 ? (
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                {activePostsStats.filter(p => p.status !== 'COVERED').length} posto(s) a precisar de atenção
              </span>
            ) : (
              <span className="text-emerald-400 font-bold">Nenhum posto abandonado</span>
            )}
          </div>
        </div>

        {/* Alertas de Escala */}
        <div 
          onClick={() => onNavigateToTab('PLAN_VALIDATION')}
          className={`p-4 rounded-xl border cursor-pointer transition ${
            unresolvedConflicts.length > 0 
              ? 'bg-red-950/20 border-red-500/50 hover:border-red-500' 
              : 'bg-slate-900 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
            <span>Buracos na Escala</span>
            <AlertTriangle className={`w-4 h-4 ${unresolvedConflicts.length > 0 ? 'text-red-400 animate-bounce' : 'text-slate-400'}`} />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className={`text-2xl font-black ${unresolvedConflicts.length > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
              {unresolvedConflicts.length}
            </span>
            <span className="text-xs text-slate-400 font-medium">alerta(s)</span>
          </div>
          <div className="mt-2 text-[11px] text-amber-400 font-bold flex items-center justify-between">
            <span>Clique para resolver</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>

        {/* Avisos de Problemas vindos do terreno */}
        <div 
          onClick={() => onNavigateToTab('INCIDENTS')}
          className={`p-4 rounded-xl border cursor-pointer transition ${
            openIncidents.length > 0 
              ? 'bg-amber-950/20 border-amber-500/50 hover:border-amber-500' 
              : 'bg-slate-900 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
            <span>Recados do Terreno</span>
            <ActivityIcon className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-400">{openIncidents.length}</span>
            <span className="text-xs text-slate-400 font-medium">por responder</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-300 flex items-center justify-between">
            <span>Ver a lista de recados</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>

      </div>

      {/* AVISO DESTACADO SE FALTAR GENTE */}
      {unresolvedConflicts.length > 0 && (
        <div className="p-4 rounded-2xl bg-red-950/30 border-2 border-red-500/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center shrink-0 border border-red-500/30 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black text-red-400 uppercase tracking-wider">
                Atenção Coordenador: Falta de Pessoal no Coffee Break
              </div>
              <p className="text-sm font-bold text-white mt-0.5">
                {unresolvedConflicts[0].message}
              </p>
              <p className="text-xs text-slate-300 mt-0.5">
                Solução sugerida: {unresolvedConflicts[0].suggestions[0]?.title}
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateToTab('PLAN_VALIDATION')}
            className="shrink-0 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs shadow-lg transition"
          >
            Arrumar este Problema
          </button>
        </div>
      )}

      {/* CARTÕES GRANDES DAS SALAS E QUEM ESTÁ LÁ DENTRO */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Onde está cada colega neste momento?</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              🟢 Verde = Já confirmou que está lá | 🔴 Vermelho = Posto ainda vazio
            </p>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            {activePostsStats.length} postos no CCTA
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {activePostsStats.map(({ post, assignedCount, checkedInCount, requiredCount, status }) => (
            <div
              key={post.id}
              className={`p-4 rounded-xl border transition ${
                status === 'COVERED'
                  ? 'bg-slate-950 border-slate-800'
                  : status === 'PARTIAL'
                  ? 'bg-amber-950/20 border-amber-500/40'
                  : 'bg-red-950/20 border-red-500/50'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full shrink-0 ${
                      status === 'COVERED' ? 'bg-emerald-400' : status === 'PARTIAL' ? 'bg-amber-400' : 'bg-red-500 animate-pulse'
                    }`} />
                    <h4 className="text-xs font-black text-white truncate">{post.name}</h4>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{post.locationDetails}</p>
                </div>

                <span className={`px-2 py-0.5 rounded text-[10px] font-black shrink-0 ${
                  post.priority === 'CRITICAL'
                    ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                    : 'bg-slate-800 text-slate-300'
                }`}>
                  {post.priority === 'CRITICAL' ? 'Muito Importante' : 'Normal'}
                </span>
              </div>

              {/* Contagem simples */}
              <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">Presentes agora:</span>
                <span className="font-mono font-bold text-white">
                  <span className={checkedInCount >= requiredCount ? 'text-emerald-400' : 'text-red-400'}>
                    {checkedInCount}
                  </span>
                  <span className="text-slate-500"> de {requiredCount} pedidos</span>
                </span>
              </div>

              {/* Nomes dos rapazes e moças no posto */}
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {eventModel.assignments
                  .filter(a => a.postId === post.id)
                  .map(a => {
                    const u = users.find(user => user.id === a.staffId);
                    return (
                      <span
                        key={a.id}
                        className={`px-2 py-0.5 rounded-md text-[11px] font-semibold flex items-center gap-1 ${
                          a.status === 'CHECKED_IN'
                            ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${a.status === 'CHECKED_IN' ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                        {u?.fullName.split(' ')[0]}
                      </span>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* JANELA RÁPIDA: ACONTECEU UM IMPREVISTO */}
      {isEmergencyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl text-slate-100">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-black text-white">Aconteceu uma Mudança Urgente?</h4>
                <p className="text-xs text-slate-400">O sistema avisa os telemóveis dos protocolos num instante</p>
              </div>
            </div>

            <form onSubmit={handleApplyEmergencyChange} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                  Qual é a urgência?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setEmergencyLevel('N1_OPERATIONAL')}
                    className={`py-2 px-3 rounded-xl border font-bold text-xs ${
                      emergencyLevel === 'N1_OPERATIONAL'
                        ? 'bg-amber-500 text-slate-950 border-amber-500'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    Ajuste Normal
                  </button>
                  <button
                    type="button"
                    onClick={() => setEmergencyLevel('N2_CRITICAL_EMERGENCY')}
                    className={`py-2 px-3 rounded-xl border font-bold text-xs ${
                      emergencyLevel === 'N2_CRITICAL_EMERGENCY'
                        ? 'bg-red-600 text-white border-red-600'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    🚨 Emergência Urgente
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                  O que aconteceu? (Escreva com palavras simples)
                </label>
                <input
                  type="text"
                  value={emergencyReason}
                  onChange={(e) => setEmergencyReason(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white outline-hidden focus:border-amber-500 text-xs"
                  required
                />
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                💡 <strong>O que vai acontecer a seguir:</strong> Os telemóveis do Cristiano Vunge e da Maria Fernandes vão apitar avisando para irem imediatamente para a Entrada!
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEmergencyModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black shadow-lg"
                >
                  Avisar Equipas Já!
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
