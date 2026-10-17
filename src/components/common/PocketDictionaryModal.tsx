import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  X,
  Lightbulb,
  CheckCircle,
  HelpCircle,
  Shield,
  Layers,
  Cpu,
  Smartphone,
  Radio,
  Clock,
  Sparkles,
  Users
} from 'lucide-react';

export interface DictionaryTerm {
  id: string;
  category: 'EVENT' | 'TECH' | 'SECURITY';
  technicalTerm: string;
  simpleTerm: string;
  definition: string;
  realWorldExample: string;
  icon: any;
  color: string;
}

const DICTIONARY_TERMS: DictionaryTerm[] = [
  {
    id: 'eom',
    category: 'EVENT',
    technicalTerm: 'EOM (Event Operational Model)',
    simpleTerm: 'O "Mapa Geral do Evento"',
    definition: 'É a fotografia completa e arrumada de tudo o que vai acontecer: a lista de salas, as horas de cada palestra, quem são os convidados VIP e quais as regras que a equipa tem de cumprir.',
    realWorldExample: 'No CCTA, o EOM sabe que o Salão Nobre precisa de 2 protocolos às 08:30 para receber o Ministro, e que às 10:30 todos os olhos se viram para o Coffee Break.',
    icon: Layers,
    color: 'from-amber-500/20 to-amber-500/5 text-amber-400 border-amber-500/30'
  },
  {
    id: 'fpo',
    category: 'EVENT',
    technicalTerm: 'FPO (Ficha de Posto Operacional)',
    simpleTerm: 'A "Folha de Missão" do Protocolo',
    definition: 'É o cartão digital individual que cada protocolo vê no seu telemóvel. Diz exatamente: onde deves ficar, a que horas começas e acabas, o que deves dizer a quem entra, e o que nunca deves fazer.',
    realWorldExample: 'A FPO do Cristiano Vunge diz: "Entrada Principal, das 08:00 às 11:00. Pede o crachá com um sorriso e não saias da porta durante o intervalo."',
    icon: BookOpen,
    color: 'from-blue-500/20 to-blue-500/5 text-blue-400 border-blue-500/30'
  },
  {
    id: 'deterministic',
    category: 'TECH',
    technicalTerm: 'Validação Determinística',
    simpleTerm: 'A "Calculadora que Não Erra"',
    definition: 'É a verificação matemática sem invenções. O computador faz contas exactas para ter 100% de certeza que ninguém foi marcado em duas portas ao mesmo tempo e que não falta ninguém nos postos críticos.',
    realWorldExample: 'Se colocares o João Baptista na Entrada às 09:00 e também na Sala VIP às 09:30, o sistema acende a luz vermelha porque uma pessoa não pode estar em dois sítios ao mesmo tempo!',
    icon: Cpu,
    color: 'from-emerald-500/20 to-emerald-500/5 text-emerald-400 border-emerald-500/30'
  },
  {
    id: 'deficit',
    category: 'EVENT',
    technicalTerm: 'Défice de Staffing',
    simpleTerm: 'Falta de Braços no Salão',
    definition: 'Acontece quando os postos pedem mais pessoas do que aquelas que a empresa tem disponíveis no momento.',
    realWorldExample: 'No Coffee Break das 10:30, precisamos de 9 pessoas para cobrir todas as portas, mas a equipa só tem 8. O sistema avisa logo: "Falta 1 pessoa! Vamos ajustar o lanche para 2 ou chamar um suplente?"',
    icon: Users,
    color: 'from-red-500/20 to-red-500/5 text-red-400 border-red-500/30'
  },
  {
    id: 'pwa_offline',
    category: 'TECH',
    technicalTerm: 'PWA / Offline-First',
    simpleTerm: 'Funciona Mesmo sem Rede ou Internet',
    definition: 'A aplicação é guardada na memória do telemóvel. Mesmo que a rede da Unitel ou Africell caia ou não apanhe bem no subsolo do centro de eventos, a aplicação continua a abrir e a funcionar normalmente.',
    realWorldExample: 'Se a internet for abaixo durante o evento, a equipa continua a ler as suas instruções e pode registar problemas, que serão enviados automaticamente assim que a rede voltar.',
    icon: Smartphone,
    color: 'from-purple-500/20 to-purple-500/5 text-purple-400 border-purple-500/30'
  },
  {
    id: 'human_loop',
    category: 'SECURITY',
    technicalTerm: 'Human-in-the-Loop',
    simpleTerm: 'Quem Manda é a Pessoa, Não o Computador',
    definition: 'A inteligência artificial ajuda a ler os papéis e sugere a escala, mas nada entra em vigor sem que a Coordenadora Geral veja com os seus próprios olhos, aprove e assine.',
    realWorldExample: 'A máquina pode sugerir uma escala, mas é a Dra. Elsa Ramos quem clica no botão "Aprovar e Publicar" antes de mandar a escala para a rapaziada.',
    icon: Shield,
    color: 'from-amber-500/20 to-amber-500/5 text-amber-400 border-amber-500/30'
  },
  {
    id: 'checkin',
    category: 'EVENT',
    technicalTerm: 'Check-in Presencial',
    simpleTerm: 'O Botão "Já Cheguei ao Posto"',
    definition: 'É o toque rápido no ecrã do telemóvel que confirma que o protocolo já está fisicamente no seu posto de trabalho fardado e a postos.',
    realWorldExample: 'Assim que a Maria Fernandes chega à porta da Sala VIP, toca em "Já cheguei". No ecrã do chefe, o posto passa logo de vermelho para verde sem ser preciso telefonar.',
    icon: CheckCircle,
    color: 'from-emerald-500/20 to-emerald-500/5 text-emerald-400 border-emerald-500/30'
  },
  {
    id: 'provenance',
    category: 'TECH',
    technicalTerm: 'Proveniência da Informação (Confidence)',
    simpleTerm: 'De Onde Veio e Quanta Certeza Temos',
    definition: 'Mostra a origem de cada dado. Se estava preto no branco no documento oficial do cliente, tem "Certeza Total". Se foi uma dedução da IA, avisa para o coordenador confirmar.',
    realWorldExample: 'Se o papel dizia "Ministro do Petróleo chega às 09:00", o sistema marca [CONFIRMADO]. Se dizia apenas "Haverá um almoço mais tarde", o sistema avisa: "Horário não especificado no papel".',
    icon: Sparkles,
    color: 'from-blue-500/20 to-blue-500/5 text-blue-400 border-blue-500/30'
  },
  {
    id: 'contingency',
    category: 'SECURITY',
    technicalTerm: 'Plano de Contingência',
    simpleTerm: 'O "Plano B" Pronto a Usar',
    definition: 'Uma solução já pensada com antecedência para resolver um imprevisto num estalar de dedos, sem pânico.',
    realWorldExample: 'Se faltar 1 protocolo no Coffee Break, o Plano B tira 1 pessoa do buffet e mantém a porta das individualidades VIP 100% protegida.',
    icon: Radio,
    color: 'from-amber-500/20 to-amber-500/5 text-amber-400 border-amber-500/30'
  },
  {
    id: 'audit_log',
    category: 'SECURITY',
    technicalTerm: 'Audit Log Imutável',
    simpleTerm: 'O "Caderno Preto" que Ninguém Apaga',
    definition: 'Um histórico seguro que anota todas as decisões: quem mudou de posto, a que horas e qual foi o motivo. Ninguém pode apagar nem alterar depois.',
    realWorldExample: 'Se o horário da abertura for antecipado 15 minutos às 08:42 pela Dra. Elsa, fica gravado para sempre no histórico do evento.',
    icon: Clock,
    color: 'from-slate-500/20 to-slate-500/5 text-slate-300 border-slate-700'
  }
];

interface PocketDictionaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PocketDictionaryModal: React.FC<PocketDictionaryModalProps> = ({
  isOpen,
  onClose
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  if (!isOpen) return null;

  const filteredTerms = DICTIONARY_TERMS.filter(term => {
    const matchesSearch =
      term.technicalTerm.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.simpleTerm.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.realWorldExample.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'ALL' || term.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl max-h-[90vh] rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col overflow-hidden text-slate-100">
        
        {/* CABEÇALHO DO DICIONÁRIO */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/70 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-950/50">
              <BookOpen className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white tracking-tight">
                  Dicionário de Bolso
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  Palavras Miúdas
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Explicação simples dos termos difíceis para qualquer pessoa da equipa entender.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* BARRA DE PESQUISA E FILTROS */}
        <div className="p-4 border-b border-slate-800 bg-slate-900 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Escreva uma palavra para procurar (ex: EOM, FPO, Défice, Offline...)"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 outline-hidden focus:border-amber-500 transition"
            />
          </div>

          {/* Categorias Rápidas */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {[
              { id: 'ALL', label: 'Todos os Termos' },
              { id: 'EVENT', label: '📋 Tarefas & Protocolo' },
              { id: 'TECH', label: '💻 Tecnologia & Telemóvel' },
              { id: 'SECURITY', label: '🛡️ Segurança & Regras' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* LISTAGEM DOS TERMOS */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
          {filteredTerms.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-slate-950 border border-slate-800 text-slate-400 text-xs">
              Não encontrámos nenhum termo com esse nome. Tente pesquisar por palavras como "EOM", "Lanche" ou "Telemóvel".
            </div>
          ) : (
            filteredTerms.map(term => {
              const Icon = term.icon;

              return (
                <div
                  key={term.id}
                  className={`p-4 rounded-2xl border bg-gradient-to-br ${term.color} transition hover:border-amber-500/50`}
                >
                  {/* Cabeçalho do Cartão */}
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          Termo Técnico: <span className="text-white font-mono">{term.technicalTerm}</span>
                        </div>
                        <h4 className="text-base font-black text-amber-300 leading-snug">
                          {term.simpleTerm}
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* Definição em Palavras Miúdas */}
                  <div className="text-xs text-slate-200 leading-relaxed font-medium mb-3">
                    {term.definition}
                  </div>

                  {/* Exemplo no Terreno */}
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300">
                    <span className="font-bold text-amber-400 block mb-0.5">
                      💡 Exemplo na Vida Real (CCTA Luanda):
                    </span>
                    <span>{term.realWorldExample}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* RODAPÉ DO MODAL */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
          <span>{filteredTerms.length} termos explicados de forma simples</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition"
          >
            Fechar Dicionário
          </button>
        </div>

      </div>
    </div>
  );
};
