import React, { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Shield,
  FileText,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  Users,
  Radio,
  Clock,
  Sparkles,
  Smartphone,
  ChevronRight,
  RotateCcw,
  Menu,
  X,
  FileSignature,
  HelpCircle,
  Lightbulb,
  BookOpen
} from 'lucide-react';
import { PWAInstallButton } from '../components/common/PWAInstallButton';
import { OfflineIndicator } from '../components/common/OfflineIndicator';
import { PocketDictionaryModal } from '../components/common/PocketDictionaryModal';
import { EventOperationalModel } from '../types';

interface CoordinatorLayoutProps {
  eventModel: EventOperationalModel;
  onResetDemo: () => void;
  onRefreshData: () => void;
}

export const CoordinatorLayout: React.FC<CoordinatorLayoutProps> = ({
  eventModel,
  onResetDemo,
  onRefreshData
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDictionaryOpen, setIsDictionaryOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const unresolvedConflicts = eventModel.conflicts.filter(c => !c.resolved).length;
  const openIncidents = eventModel.incidents.filter(i => i.status !== 'RESOLVED').length;

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* BARRA SUPERIOR MOBILE (TELEMÓVEL DO CHEFE DE EQUIPA) */}
      <header className="md:hidden bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-md">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-xs text-white">Corporate Experience</span>
            <span className="block text-[10px] text-slate-400">Painel do Coordenador</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsDictionaryOpen(true)}
            className="p-2 rounded-lg bg-slate-800 text-amber-400 border border-slate-700"
            title="Dicionário de Bolso"
          >
            <BookOpen className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate('/protocolo')}
            className="flex items-center gap-1 bg-amber-500 text-slate-950 px-2.5 py-1.5 rounded-lg text-xs font-bold shadow-xs"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Telemóvel</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-200"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* MENU LATERAL COM PALAVRAS SIMPLES E ILUSTRATIVO */}
      <aside className={`
        fixed md:sticky top-0 left-0 z-50 h-screen w-72 bg-slate-900 border-r border-slate-800 flex flex-col backdrop-blur-md transition-transform duration-200
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Cabeçalho da Empresa */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-md shrink-0 font-black">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-sm tracking-tight text-white">Corporate Ops</span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  v{eventModel.activeVersion}.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Guia Fácil de Protocolo</p>
            </div>
          </div>
          {mobileMenuOpen && (
            <button onClick={closeMobileMenu} className="md:hidden text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Cartão Simples do Evento Atual */}
        <div className="px-4 py-3 bg-slate-950/60 border-b border-slate-800">
          <div className="text-[10px] uppercase font-bold text-amber-400 flex items-center gap-1">
            <span>Evento de Hoje</span>
          </div>
          <div className="text-xs font-bold text-white truncate mt-0.5">{eventModel.title}</div>
          <div className="text-[11px] text-slate-400 truncate flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
            <span>{eventModel.venue.name}</span>
          </div>
        </div>

        {/* Links em Palavras Miúdas */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-4 text-xs">
          
          {/* FASE 1: ANTES DO EVENTO (PREPARAÇÃO) */}
          <div>
            <div className="px-2 mb-1.5 text-[10px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1">
              <span>Passo a Passo: Antes do Evento</span>
            </div>
            <div className="space-y-1">
              <NavLink
                to="/pre-evento/ingestao"
                onClick={closeMobileMenu}
                className={({ isActive }) => `flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition ${
                  isActive ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <div className="font-semibold">1. Ler o Programa</div>
                  <div className="text-[10px] text-slate-400">O sistema lê o papel sozinho</div>
                </div>
              </NavLink>

              <NavLink
                to="/pre-evento/eom"
                onClick={closeMobileMenu}
                className={({ isActive }) => `flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition ${
                  isActive ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <div>
                  <div className="font-semibold">2. Mapa de Salas & Horas</div>
                  <div className="text-[10px] text-slate-400">Quem vem e onde vai ficar</div>
                </div>
              </NavLink>

              <NavLink
                to="/pre-evento/validacao"
                onClick={closeMobileMenu}
                className={({ isActive }) => `flex items-center justify-between px-3 py-2 rounded-xl font-medium transition ${
                  isActive ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <AlertTriangle className={`w-4 h-4 shrink-0 ${unresolvedConflicts > 0 ? 'text-red-400' : 'text-emerald-400'}`} />
                  <div>
                    <div className="font-semibold">3. Ver se Falta Pessoal</div>
                    <div className="text-[10px] text-slate-400">Descobre buracos na escala</div>
                  </div>
                </div>
                {unresolvedConflicts > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-red-600 text-white font-bold text-[10px] animate-pulse">
                    Falta 1!
                  </span>
                )}
              </NavLink>

              <NavLink
                to="/pre-evento/aprovacao"
                onClick={closeMobileMenu}
                className={({ isActive }) => `flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition ${
                  isActive ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <FileSignature className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-semibold">4. Aprovar e Enviar</div>
                  <div className="text-[10px] text-slate-400">Manda para os telemóveis</div>
                </div>
              </NavLink>
            </div>
          </div>

          {/* FASE 2: NO DIA DO EVENTO (AO VIVO NO TERRENO) */}
          <div>
            <div className="px-2 mb-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1">
              <span>Ao Vivo: No Dia do Evento</span>
            </div>
            <div className="space-y-1">
              <NavLink
                to="/live"
                end
                onClick={closeMobileMenu}
                className={({ isActive }) => `flex items-center justify-between px-3 py-2 rounded-xl font-medium transition ${
                  isActive ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Radio className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-semibold">Painel em Directo</div>
                    <div className="text-[10px] text-slate-400">Ver quem já chegou ao posto</div>
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </NavLink>

              <NavLink
                to="/live/equipa"
                onClick={closeMobileMenu}
                className={({ isActive }) => `flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition ${
                  isActive ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Users className="w-4 h-4 text-purple-400 shrink-0" />
                <div>
                  <div className="font-semibold">Nossa Equipa & Postos</div>
                  <div className="text-[10px] text-slate-400">Os 8 protocolos e tarefas</div>
                </div>
              </NavLink>

              <NavLink
                to="/live/incidentes"
                onClick={closeMobileMenu}
                className={({ isActive }) => `flex items-center justify-between px-3 py-2 rounded-xl font-medium transition ${
                  isActive ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <div className="font-semibold">Avisos & Problemas</div>
                    <div className="text-[10px] text-slate-400">Recados vindos do terreno</div>
                  </div>
                </div>
                {openIncidents > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px]">
                    {openIncidents}
                  </span>
                )}
              </NavLink>
            </div>
          </div>

          {/* FASE 3: DEPOIS DO EVENTO */}
          <div>
            <div className="px-2 mb-1.5 text-[10px] font-black uppercase tracking-wider text-purple-400 flex items-center gap-1">
              <span>Depois do Evento</span>
            </div>
            <div className="space-y-1">
              <NavLink
                to="/governanca/auditoria"
                onClick={closeMobileMenu}
                className={({ isActive }) => `flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition ${
                  isActive ? 'bg-purple-600 text-white font-bold shadow-xs' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Clock className="w-4 h-4 text-purple-400 shrink-0" />
                <div>
                  <div className="font-semibold">O que Aconteceu?</div>
                  <div className="text-[10px] text-slate-400">Relatório e lições aprendidas</div>
                </div>
              </NavLink>
            </div>
          </div>

          {/* BOTÃO DO DICIONÁRIO DE BOLSO NO MENU */}
          <div className="pt-1">
            <button
              onClick={() => { closeMobileMenu(); setIsDictionaryOpen(true); }}
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-500/5 border border-amber-500/40 hover:border-amber-400 text-amber-300 text-xs font-bold flex items-center justify-between transition group shadow-xs"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400 group-hover:scale-110 transition" />
                <span>Dicionário de Bolso</span>
              </div>
              <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded font-mono font-black">
                10 Termos
              </span>
            </button>
          </div>

          {/* BOTÃO EXPERIMENTAR TELEMÓVEL DO PROTOCOLO */}
          <div>
            <button
              onClick={() => { closeMobileMenu(); navigate('/protocolo'); }}
              className="w-full p-3 rounded-xl bg-gradient-to-r from-emerald-500/20 via-emerald-500/10 to-transparent border border-emerald-500/40 text-emerald-300 hover:border-emerald-400 transition text-left flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shadow-md">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-black text-xs text-white block">Ecrã do Protocolo</span>
                  <span className="text-[10px] text-slate-300">Ver como a equipa vê</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-emerald-400" />
            </button>
          </div>

        </nav>

        {/* Rodapé do Menu com Ajuda e Repor */}
        <div className="p-3 border-t border-slate-800 space-y-2 bg-slate-950/80">
          <div className="flex items-center justify-between">
            <OfflineIndicator lastSyncTime="activo" />
            <PWAInstallButton />
          </div>

          <button
            onClick={() => { onResetDemo(); closeMobileMenu(); }}
            className="w-full py-2 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            title="Repor os dados para o início"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Recomeçar Demonstração</span>
          </button>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL DA PÁGINA */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Barra Superior Informativa */}
        <header className="hidden md:flex bg-slate-900/60 border-b border-slate-800 px-6 py-3 items-center justify-between sticky top-0 z-30 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="text-amber-400 font-bold">Corporate Experience Angola</span>
            <span>•</span>
            <span className="text-white font-medium">
              {location.pathname.includes('/pre-evento') ? 'Fase 1: Preparar o Evento com Calma' :
               location.pathname.includes('/live') ? 'Fase 2: O Evento a Acontecer Agora' :
               location.pathname.includes('/governanca') ? 'Fase 3: O Que Aprendemos' : 'Painel'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDictionaryOpen(true)}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 hover:border-amber-500/50 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-xs"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Dicionário de Bolso</span>
            </button>

            <OfflineIndicator />

            <button
              onClick={() => navigate('/protocolo')}
              className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black px-3.5 py-1.5 rounded-xl text-xs shadow-md transition active:scale-95"
            >
              <Smartphone className="w-3.5 h-3.5 text-slate-950" />
              <span>Ver Telemóvel da Rapaziada (PWA)</span>
            </button>
          </div>
        </header>

        {/* Conteúdo da Página */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto">
          <Outlet />
        </main>

        {/* Rodapé Simples */}
        <footer className="border-t border-slate-900 bg-slate-950 py-4 px-6 text-center text-xs text-slate-500 mt-auto">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span>Corporate Experience 2.0 • Feito para facilitar o trabalho no terreno</span>
              <button
                onClick={() => setIsDictionaryOpen(true)}
                className="text-amber-400 hover:underline font-bold"
              >
                Abrir Dicionário
              </button>
            </div>
            <span className="text-[11px] text-slate-600">
              Passo a Passo Simples: Ler Papéis ➔ Ver Faltas ➔ Aprovar ➔ Trabalhar no Terreno
            </span>
          </div>
        </footer>
      </div>

      {/* MODAL GLOBAL DO DICIONÁRIO DE BOLSO */}
      <PocketDictionaryModal
        isOpen={isDictionaryOpen}
        onClose={() => setIsDictionaryOpen(false)}
      />

    </div>
  );
};
