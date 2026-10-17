/**
 * Corporate Experience 2.0 — Pre-configured High-Fidelity Demo Data
 * Context: Corporate Summit Angola 2026 at Centro de Convenções de Talatona (CCTA)
 */

import {
  Organization,
  User,
  StaffProfile,
  Venue,
  Activity,
  VIPGuest,
  OperationalRule,
  Post,
  Shift,
  Assignment,
  StationBrief,
  EventOperationalModel
} from '../types';

export const DEMO_ORGANIZATION: Organization = {
  id: 'org-corporate-exp',
  name: 'Corporate Experience Angola',
  contactEmail: 'operacoes@corporateexperience.ao',
  contactPhone: '+244 923 000 111'
};

export const DEMO_USERS: User[] = [
  {
    id: 'user-coord-1',
    organizationId: 'org-corporate-exp',
    fullName: 'Dra. Elsa Ramos',
    phoneNumber: '+244 924 100 200',
    email: 'elsa.ramos@corporateexperience.ao',
    role: 'COORDINATOR',
    pin: '1234',
    isActive: true
  },
  {
    id: 'staff-01',
    organizationId: 'org-corporate-exp',
    fullName: 'Cristiano Vunge',
    phoneNumber: '+244 923 111 001',
    email: 'cristiano.vunge@protocol.ao',
    role: 'PROTOCOL',
    pin: '1001',
    isActive: true
  },
  {
    id: 'staff-02',
    organizationId: 'org-corporate-exp',
    fullName: 'Maria Fernandes',
    phoneNumber: '+244 923 111 002',
    email: 'maria.fernandes@protocol.ao',
    role: 'PROTOCOL',
    pin: '1002',
    isActive: true
  },
  {
    id: 'staff-03',
    organizationId: 'org-corporate-exp',
    fullName: 'João Baptista',
    phoneNumber: '+244 923 111 003',
    email: 'joao.baptista@protocol.ao',
    role: 'PROTOCOL',
    pin: '1003',
    isActive: true
  },
  {
    id: 'staff-04',
    organizationId: 'org-corporate-exp',
    fullName: 'Ana Paula dos Santos',
    phoneNumber: '+244 923 111 004',
    email: 'ana.santos@protocol.ao',
    role: 'PROTOCOL',
    pin: '1004',
    isActive: true
  },
  {
    id: 'staff-05',
    organizationId: 'org-corporate-exp',
    fullName: 'Edson Manuel',
    phoneNumber: '+244 923 111 005',
    email: 'edson.manuel@protocol.ao',
    role: 'PROTOCOL',
    pin: '1005',
    isActive: true
  },
  {
    id: 'staff-06',
    organizationId: 'org-corporate-exp',
    fullName: 'Teresa Queta',
    phoneNumber: '+244 923 111 006',
    email: 'teresa.queta@protocol.ao',
    role: 'PROTOCOL',
    pin: '1006',
    isActive: true
  },
  {
    id: 'staff-07',
    organizationId: 'org-corporate-exp',
    fullName: 'Hamilton de Sousa',
    phoneNumber: '+244 923 111 007',
    email: 'hamilton.sousa@protocol.ao',
    role: 'PROTOCOL',
    pin: '1007',
    isActive: true
  },
  {
    id: 'staff-08',
    organizationId: 'org-corporate-exp',
    fullName: 'Katia Lumingo',
    phoneNumber: '+244 923 111 008',
    email: 'katia.lumingo@protocol.ao',
    role: 'PROTOCOL',
    pin: '1008',
    isActive: true
  }
];

export const DEMO_STAFF_PROFILES: StaffProfile[] = [
  {
    userId: 'staff-01',
    spokenLanguages: ['pt', 'en'],
    isVipCertified: true,
    yearsExperience: 5.5,
    uniformSize: 'L',
    emergencyContact: '+244 912 345 678',
    currentStatus: 'ON_POST',
    currentPostId: 'post-entrada-01',
    lastHeartbeat: new Date().toISOString(),
    lastCheckInTime: '07:22'
  },
  {
    userId: 'staff-02',
    spokenLanguages: ['pt', 'en', 'fr'],
    isVipCertified: true,
    yearsExperience: 4.0,
    uniformSize: 'M',
    emergencyContact: '+244 912 345 679',
    currentStatus: 'ON_POST',
    currentPostId: 'post-vip-01',
    lastHeartbeat: new Date().toISOString(),
    lastCheckInTime: '07:25'
  },
  {
    userId: 'staff-03',
    spokenLanguages: ['pt'],
    isVipCertified: false,
    yearsExperience: 2.0,
    uniformSize: 'M',
    emergencyContact: '+244 912 345 680',
    currentStatus: 'ON_POST',
    currentPostId: 'post-cred-01',
    lastHeartbeat: new Date().toISOString(),
    lastCheckInTime: '07:18'
  },
  {
    userId: 'staff-04',
    spokenLanguages: ['pt', 'en'],
    isVipCertified: true,
    yearsExperience: 3.5,
    uniformSize: 'S',
    emergencyContact: '+244 912 345 681',
    currentStatus: 'ON_POST',
    currentPostId: 'post-vip-01',
    lastHeartbeat: new Date().toISOString(),
    lastCheckInTime: '07:20'
  },
  {
    userId: 'staff-05',
    spokenLanguages: ['pt'],
    isVipCertified: false,
    yearsExperience: 1.0,
    uniformSize: 'XL',
    emergencyContact: '+244 912 345 682',
    currentStatus: 'PRESENT',
    currentPostId: 'post-entrada-01',
    lastHeartbeat: new Date().toISOString(),
    lastCheckInTime: '07:28'
  },
  {
    userId: 'staff-06',
    spokenLanguages: ['pt', 'en'],
    isVipCertified: false,
    yearsExperience: 2.5,
    uniformSize: 'M',
    emergencyContact: '+244 912 345 683',
    currentStatus: 'ON_POST',
    currentPostId: 'post-auditorio-01',
    lastHeartbeat: new Date().toISOString(),
    lastCheckInTime: '07:24'
  },
  {
    userId: 'staff-07',
    spokenLanguages: ['pt'],
    isVipCertified: false,
    yearsExperience: 1.5,
    uniformSize: 'L',
    emergencyContact: '+244 912 345 684',
    currentStatus: 'ON_POST',
    currentPostId: 'post-auditorio-01',
    lastHeartbeat: new Date().toISOString(),
    lastCheckInTime: '07:26'
  },
  {
    userId: 'staff-08',
    spokenLanguages: ['pt'],
    isVipCertified: false,
    yearsExperience: 2.0,
    uniformSize: 'S',
    emergencyContact: '+244 912 345 685',
    currentStatus: 'PRESENT',
    currentPostId: 'post-backstage-01',
    lastHeartbeat: new Date().toISOString(),
    lastCheckInTime: '07:30'
  }
];

export const DEMO_VENUE: Venue = {
  id: 'venue-ccta',
  name: 'Centro de Convenções de Talatona (CCTA)',
  city: 'Luanda',
  address: 'Via AL15, Talatona, Luanda, Angola',
  rooms: [
    { id: 'room-entrance', venueId: 'venue-ccta', name: 'Foyer Principal & Entrada', floorLevel: 'Piso 0', capacity: 1500, isVipRestricted: false },
    { id: 'room-vip-lounge', venueId: 'venue-ccta', name: 'Salão Nobre VIP do Estado', floorLevel: 'Piso 1', capacity: 60, isVipRestricted: true },
    { id: 'room-plenary', venueId: 'venue-ccta', name: 'Auditório Plenário Angola', floorLevel: 'Piso 0', capacity: 1200, isVipRestricted: false },
    { id: 'room-foyer-coffee', venueId: 'venue-ccta', name: 'Foyer Jardim Coffee Break', floorLevel: 'Piso 0', capacity: 800, isVipRestricted: false },
    { id: 'room-backstage', venueId: 'venue-ccta', name: 'Regie & Backstage Oradores', floorLevel: 'Piso 0', capacity: 30, isVipRestricted: true }
  ]
};

export const DEMO_ACTIVITIES: Activity[] = [
  {
    id: 'act-01',
    eventId: 'event-summit-2026',
    roomId: 'room-entrance',
    title: 'Credenciação, Boas-Vindas e Acolhimento Geral',
    activityType: 'CREDENTIALING',
    startTime: '07:30',
    endTime: '09:00',
    estimatedAttendees: 850,
    isCriticalProtocolMoment: true,
    provenance: { source: 'Programa_Oficial_Summit_2026.pdf', sourceType: 'PDF', page: 1, confidence: 0.98, validationStatus: 'CONFIRMED' }
  },
  {
    id: 'act-02',
    eventId: 'event-summit-2026',
    roomId: 'room-plenary',
    title: 'Sessão Solene de Abertura & Hino Nacional',
    activityType: 'OPENING',
    startTime: '09:00',
    endTime: '10:30',
    estimatedAttendees: 900,
    isCriticalProtocolMoment: true,
    provenance: { source: 'Programa_Oficial_Summit_2026.pdf', sourceType: 'PDF', page: 1, confidence: 0.99, validationStatus: 'CONFIRMED' }
  },
  {
    id: 'act-03',
    eventId: 'event-summit-2026',
    roomId: 'room-foyer-coffee',
    title: 'Coffee Break Executivo & Networking de Alto Nível',
    activityType: 'COFFEE_BREAK',
    startTime: '10:30',
    endTime: '11:00',
    estimatedAttendees: 800,
    isCriticalProtocolMoment: true,
    description: 'Momento de pico de circulação e dispersão. Protocolo em alerta máximo.',
    provenance: { source: 'Programa_Oficial_Summit_2026.pdf', sourceType: 'PDF', page: 2, confidence: 0.95, validationStatus: 'CONFIRMED' }
  },
  {
    id: 'act-04',
    eventId: 'event-summit-2026',
    roomId: 'room-plenary',
    title: 'Painel 1: Transformação Económica, Energia e Minerais',
    activityType: 'PANEL',
    startTime: '11:00',
    endTime: '13:00',
    estimatedAttendees: 700,
    isCriticalProtocolMoment: false,
    provenance: { source: 'Programa_Oficial_Summit_2026.pdf', sourceType: 'PDF', page: 2, confidence: 0.97, validationStatus: 'CONFIRMED' }
  },
  {
    id: 'act-05',
    eventId: 'event-summit-2026',
    roomId: 'room-foyer-coffee',
    title: 'Almoço Buffet & Almoço Privado de Dignatários',
    activityType: 'LUNCH',
    startTime: '13:00',
    endTime: '14:30',
    estimatedAttendees: 650,
    isCriticalProtocolMoment: true,
    provenance: { source: 'Programa_Oficial_Summit_2026.pdf', sourceType: 'PDF', page: 3, confidence: 0.94, validationStatus: 'CONFIRMED' }
  },
  {
    id: 'act-06',
    eventId: 'event-summit-2026',
    roomId: 'room-plenary',
    title: 'Painel 2 & Reuniões Bilaterais de Investimento',
    activityType: 'PANEL',
    startTime: '14:30',
    endTime: '16:00',
    estimatedAttendees: 600,
    isCriticalProtocolMoment: false,
    provenance: { source: 'Programa_Oficial_Summit_2026.pdf', sourceType: 'PDF', page: 3, confidence: 0.92, validationStatus: 'CONFIRMED' }
  },
  {
    id: 'act-07',
    eventId: 'event-summit-2026',
    roomId: 'room-foyer-coffee',
    title: 'Coffee Break Vespertino',
    activityType: 'COFFEE_BREAK',
    startTime: '16:00',
    endTime: '16:30',
    estimatedAttendees: 550,
    isCriticalProtocolMoment: true,
    provenance: { source: 'Programa_Oficial_Summit_2026.pdf', sourceType: 'PDF', page: 4, confidence: 0.96, validationStatus: 'CONFIRMED' }
  },
  {
    id: 'act-08',
    eventId: 'event-summit-2026',
    roomId: 'room-plenary',
    title: 'Sessão de Encerramento & Declaração de Luanda',
    activityType: 'CLOSING',
    startTime: '16:30',
    endTime: '17:30',
    estimatedAttendees: 600,
    isCriticalProtocolMoment: true,
    provenance: { source: 'Programa_Oficial_Summit_2026.pdf', sourceType: 'PDF', page: 4, confidence: 0.99, validationStatus: 'CONFIRMED' }
  }
];

export const DEMO_VIPS: VIPGuest[] = [
  {
    id: 'vip-01',
    eventId: 'event-summit-2026',
    fullName: 'Sua Excelência Ministro da Coordenação Económica',
    titleOrOffice: 'Ministro de Estado',
    organization: 'Governo de Angola',
    protocolLevel: 'MINISTERIAL',
    arrivalTime: '08:45',
    requiresDedicatedEscort: true,
    assignedStaffId: 'staff-01',
    notes: 'Acesso directo pela Porta de Honra Norte; escolta até à poltrona 01 da fila A.',
    provenance: { source: 'Briefing_VIP_Presidencia.docx', sourceType: 'DOCX', page: 1, confidence: 0.98, validationStatus: 'CONFIRMED' }
  },
  {
    id: 'vip-02',
    eventId: 'event-summit-2026',
    fullName: 'Embaixadora Chefe da Delegação da União Europeia',
    titleOrOffice: 'Embaixadora Extraordinária',
    organization: 'União Europeia em Angola',
    protocolLevel: 'DIPLOMATIC',
    arrivalTime: '08:50',
    requiresDedicatedEscort: true,
    assignedStaffId: 'staff-02',
    notes: 'Exige protocolo com fluência em Inglês e Francês. Acompanhamento à Sala VIP.',
    provenance: { source: 'Briefing_VIP_Presidencia.docx', sourceType: 'DOCX', page: 1, confidence: 0.95, validationStatus: 'CONFIRMED' }
  },
  {
    id: 'vip-03',
    eventId: 'event-summit-2026',
    fullName: 'PCA da Sonangol E.P.',
    titleOrOffice: 'Presidente do Conselho de Administração',
    organization: 'Sonangol E.P.',
    protocolLevel: 'CORPORATE_C_LEVEL',
    arrivalTime: '08:40',
    requiresDedicatedEscort: false,
    provenance: { source: 'Lista_Confirmados_Gabinete.xlsx', sourceType: 'XLSX', page: 1, confidence: 0.90, validationStatus: 'CONFIRMED' }
  }
];

export const DEMO_OPERATIONAL_RULES: OperationalRule[] = [
  {
    id: 'rule-l1-01',
    organizationId: 'org-corporate-exp',
    level: 'L1_CORPORATE_SOP',
    title: 'Prontidão Operacional em Coffee Break',
    ruleText: 'Nenhum membro da equipa de protocolo pode ausentar-se para pausas, refeições ou descanso durante os momentos de Coffee Break. Todos os postos de corredor, portas de acesso e salões devem manter cobertura máxima.',
    priority: 'CRITICAL',
    contextScope: 'COFFEE_BREAK',
    isActive: true
  },
  {
    id: 'rule-l1-02',
    organizationId: 'org-corporate-exp',
    level: 'L1_CORPORATE_SOP',
    title: 'Inviolabilidade de Postos Críticos',
    ruleText: 'Os postos classificados como CRITICAL (Entrada Principal e Salão Nobre VIP) nunca podem ficar sem cobertura. Em caso de necessidade biológica urgente, o suplente deve assumir fisicamente antes da saída do titular.',
    priority: 'CRITICAL',
    isActive: true
  },
  {
    id: 'rule-l1-03',
    organizationId: 'org-corporate-exp',
    level: 'L1_CORPORATE_SOP',
    title: 'Reserva e Discreção Protocolar',
    ruleText: 'É expressamente proibido aos protocolos utilizar telemóveis para fins pessoais nos postos, tirar fotografias com dignitários ou fornecer informações confidenciais sobre a rota de saída de ministros.',
    priority: 'HIGH',
    isActive: true
  },
  {
    id: 'rule-l2-01',
    organizationId: 'org-corporate-exp',
    level: 'L2_CLIENT_CONTRACT',
    title: 'Acesso Restrito à Sala Nobre',
    ruleText: 'Apenas portadores de Badges "VIP OURO" e "DIPLOMÁTICO" têm acesso ao Salão Nobre do Piso 1. Participantes com crachá Geral devem ser cordialmente encaminhados para o Foyer.',
    priority: 'HIGH',
    contextScope: 'VIP_HANDLING',
    isActive: true
  }
];

export const DEMO_POSTS: Post[] = [
  {
    id: 'post-entrada-01',
    eventId: 'event-summit-2026',
    roomId: 'room-entrance',
    code: 'POST-ENTRADA-01',
    name: 'Entrada Principal & Filtro de Acesso',
    priority: 'CRITICAL',
    locationDetails: 'Piso 0 — Pórtico Exterior e Portas de Vidro da Entrada Principal',
    minStaff: 2,
    idealStaff: 2,
    requiredSkills: ['Acolhimento', 'Orientação'],
    requiresVipQualification: false,
    missionStatement: 'Garantir a triagem inicial, acolhimento solene e orientação imediata do fluxo de convidados, encaminhando VIPs para o corredor reservado.',
    prohibitedActions: [
      'Não abandonar o posto sem substituição formal.',
      'Não permitir entrada de convidados sem credencial visível.',
      'Não se envolver em discussões ásperas com convidados bloqueados.'
    ],
    accessRulesAllowed: ['Todos os participantes credenciados', 'Dignitários', 'Imprensa acreditada'],
    accessRulesDenied: ['Pessoas sem credencial', 'Acompanhantes não registados'],
    doActions: [
      'Cumprimentar cordialmente: "Bom dia, bem-vindo ao Corporate Summit Angola".',
      'Direcionar participantes gerais para os balcões de credenciação.',
      'Acionar imediatamente o coordenador caso surja autoridade sem crachá.'
    ]
  },
  {
    id: 'post-vip-01',
    eventId: 'event-summit-2026',
    roomId: 'room-vip-lounge',
    code: 'POST-VIP-01',
    name: 'Salão Nobre / Recepção VIP de Estado',
    priority: 'CRITICAL',
    locationDetails: 'Piso 1 — Porta de Acesso ao Salão Nobre Privativo',
    minStaff: 2,
    idealStaff: 2,
    requiredSkills: ['Protocolo de Estado', 'Inglês', 'Etiqueta'],
    requiresVipQualification: true,
    missionStatement: 'Providenciar assistência protocolar de topo aos Ministros, Embaixadores e Chefes de Delegação, assegurando total privacidade e conforto.',
    prohibitedActions: [
      'Não permitir acesso a convidados sem credencial VIP Ouro.',
      'Não divulgar nomes ou contactos das individualidades presentes.',
      'Não solicitar autógrafos ou fotografias pessoais com autoridades.'
    ],
    accessRulesAllowed: ['Ministros', 'Embaixadores', 'PCA Sonangol', 'Seguranças Oficiais de Estado'],
    accessRulesDenied: ['Participantes Gerais', 'Imprensa não autorizada'],
    doActions: [
      'Receber à porta com vénia de cortesia protocolar.',
      'Conduzir o dignitário ao seu lugar reservado ou ao serviço de cortesia.',
      'Acompanhar até à fila dianteira da Plenária 5 minutos antes da abertura.'
    ]
  },
  {
    id: 'post-auditorio-01',
    eventId: 'event-summit-2026',
    roomId: 'room-plenary',
    code: 'POST-AUDITORIO-01',
    name: 'Auditório Plenário & Apoio às Portas',
    priority: 'HIGH',
    locationDetails: 'Piso 0 — Portas Centrais 1 e 2 do Auditório Plenário',
    minStaff: 2,
    idealStaff: 2,
    requiredSkills: ['Gestão de Fluxo', 'Postura em Sala'],
    requiresVipQualification: false,
    missionStatement: 'Controlar o fecho de portas durante os discursos oficiais e orientar o preenchimento organizado dos assentos da frente para trás.',
    prohibitedActions: [
      'Não permitir entrada com ruído ou copos durante discursos de Estado.',
      'Não ocupar as poltronas da primeira fila reservadas a dignitários.',
      'Não abrir as portas de forma ruidosa após início da sessão.'
    ],
    accessRulesAllowed: ['Todos os participantes credenciados'],
    accessRulesDenied: ['Pessoas sem identificação do evento'],
    doActions: [
      'Fechar suavemente as portas quando anunciado o início dos discursos.',
      'Orientar atrasados para as filas laterais e traseiras para evitar perturbações.'
    ]
  },
  {
    id: 'post-backstage-01',
    eventId: 'event-summit-2026',
    roomId: 'room-backstage',
    code: 'POST-BACKSTAGE-01',
    name: 'Backstage & Apoio a Oradores',
    priority: 'HIGH',
    locationDetails: 'Piso 0 — Bastidores do Palco e Zona Técnica da Regie',
    minStaff: 1,
    idealStaff: 2,
    requiredSkills: ['Apoio Técnico', 'Agilidade'],
    requiresVipQualification: false,
    missionStatement: 'Apoiar o Mestre de Cerimónias e oradores convidados na subida e descida do palco, microfones de lapela e temporização dos discursos.',
    prohibitedActions: [
      'Não permitir circulação de pessoas não autorizadas atrás do ecrã de LED.',
      'Não abandonar o posto enquanto houver orador no palanque.'
    ],
    accessRulesAllowed: ['Oradores da Sessão Actual', 'Técnicos de Som/Vídeo', 'Mestre de Cerimónias'],
    accessRulesDenied: ['Público Geral', 'Participantes'],
    doActions: [
      'Confirmar se o próximo orador está pronto com 10 minutos de antecedência.',
      'Entregar o ponteiro laser/passador de diapositivos testado.'
    ]
  },
  {
    id: 'post-coffee-01',
    eventId: 'event-summit-2026',
    roomId: 'room-foyer-coffee',
    code: 'POST-COFFEE-01',
    name: 'Foyer Coffee Break & Circulação Social',
    priority: 'NORMAL',
    locationDetails: 'Piso 0 — Área das Mesas de Buffet e Jardim de Inverno',
    minStaff: 3,
    idealStaff: 3,
    requiredSkills: ['Orientação Social', 'Polivalência'],
    requiresVipQualification: false,
    missionStatement: 'Apoiar o fluxo no buffet, esclarecer dúvidas de localização de salas e orientar os participantes para o regresso pontual à Plenária.',
    prohibitedActions: [
      'Não se servir de comida ou bebidas nos balcões destinados aos participantes.',
      'Não formar grupos de conversa com outros protocolos de costas para os convidados.'
    ],
    accessRulesAllowed: ['Todos os participantes'],
    accessRulesDenied: [],
    doActions: [
      'Circular elegantemente prestando informação sobre a agenda.',
      'Informar com cortesia a 5 minutos do fim: "Senhores convidados, a sessão plenária vai reiniciar dentro de instantes".'
    ]
  },
  {
    id: 'post-cred-01',
    eventId: 'event-summit-2026',
    roomId: 'room-entrance',
    code: 'POST-CREDENCIACAO-01',
    name: 'Balcão de Credenciação & Resolução de Crachás',
    priority: 'NORMAL',
    locationDetails: 'Piso 0 — Balcões Informatizados de Check-in de Crachás',
    minStaff: 1,
    idealStaff: 2,
    requiredSkills: ['Credenciamento', 'Informática Básica'],
    requiresVipQualification: false,
    missionStatement: 'Efectuar a entrega rápida de credenciais, resolver incongruências de grafia em crachás e prestar apoio inicial.',
    prohibitedActions: [
      'Não emitir credencial VIP sem validação formal do Coordenador de Operações.',
      'Não deixar caixas de crachás sem supervisão.'
    ],
    accessRulesAllowed: ['Participantes por credenciar'],
    accessRulesDenied: [],
    doActions: [
      'Localizar o nome na lista alfabética e entregar o kit de boas-vindas.',
      'Encaminhar casos com dúvidas para a mesa de resolução da Dra. Elsa.'
    ]
  }
];

export const DEMO_SHIFTS: Shift[] = [
  // Turno Matinal Geral (07:30 - 10:30)
  { id: 'shift-ent-01', postId: 'post-entrada-01', startTime: '07:30', endTime: '10:30', requiredStaff: 2, requiresVip: false, criticality: 'CRITICAL' },
  { id: 'shift-vip-01', postId: 'post-vip-01', startTime: '08:00', endTime: '10:30', requiredStaff: 2, requiresVip: true, criticality: 'CRITICAL' },
  { id: 'shift-aud-01', postId: 'post-auditorio-01', startTime: '08:30', endTime: '10:30', requiredStaff: 2, requiresVip: false, criticality: 'HIGH' },
  { id: 'shift-back-01', postId: 'post-backstage-01', startTime: '08:30', endTime: '10:30', requiredStaff: 1, requiresVip: false, criticality: 'HIGH' },
  { id: 'shift-cred-01', postId: 'post-cred-01', startTime: '07:30', endTime: '09:30', requiredStaff: 1, requiresVip: false, criticality: 'NORMAL' },

  // MOMENTO DO COFFEE BREAK (10:30 - 11:00) — ONDE OCORRE O DÉFICE REAL!
  // Entrada = 2, Sala VIP = 2, Palco = 2, Coffee Break = 3 -> Total = 9 protocolos! (Temos 8)
  { id: 'shift-ent-02', postId: 'post-entrada-01', startTime: '10:30', endTime: '11:00', requiredStaff: 2, requiresVip: false, criticality: 'CRITICAL' },
  { id: 'shift-vip-02', postId: 'post-vip-01', startTime: '10:30', endTime: '11:00', requiredStaff: 2, requiresVip: true, criticality: 'CRITICAL' },
  { id: 'shift-aud-02', postId: 'post-auditorio-01', startTime: '10:30', endTime: '11:00', requiredStaff: 2, requiresVip: false, criticality: 'HIGH' },
  { id: 'shift-coffee-01', postId: 'post-coffee-01', startTime: '10:30', endTime: '11:00', requiredStaff: 3, requiresVip: false, criticality: 'NORMAL' },

  // Turno Pós-Coffee Break (11:00 - 13:00)
  { id: 'shift-ent-03', postId: 'post-entrada-01', startTime: '11:00', endTime: '13:00', requiredStaff: 2, requiresVip: false, criticality: 'CRITICAL' },
  { id: 'shift-vip-03', postId: 'post-vip-01', startTime: '11:00', endTime: '13:00', requiredStaff: 2, requiresVip: true, criticality: 'CRITICAL' },
  { id: 'shift-aud-03', postId: 'post-auditorio-01', startTime: '11:00', endTime: '13:00', requiredStaff: 2, requiresVip: false, criticality: 'HIGH' },
  { id: 'shift-back-02', postId: 'post-backstage-01', startTime: '11:00', endTime: '13:00', requiredStaff: 1, requiresVip: false, criticality: 'HIGH' }
];

export const DEMO_STATION_BRIEFS: StationBrief[] = [
  {
    id: 'brief-staff-01',
    assignmentId: 'assign-01',
    postId: 'post-entrada-01',
    protocolName: 'Cristiano Vunge',
    postName: 'Entrada Principal & Filtro de Acesso',
    locationDetails: 'Piso 0 — Pórtico Exterior e Portas Centrais de Vidro',
    shiftHours: '07:30–10:30',
    missionStatement: 'Controlar o fluxo de acolhimento solene, triar credenciais e escoltar o Ministro da Economia assim que a sua viatura chegar.',
    tasks: [
      { id: 't1', text: 'Conferir crachá e convite oficial de cada convidado à entrada.', done: true },
      { id: 't2', text: 'Garantir distribuição rápida de pastas e auscultadores de tradução.', done: true },
      { id: 't3', text: 'Avisar a Sala VIP via rádio/telemóvel assim que o Ministro chegar.', done: false }
    ],
    prohibitedActions: [
      {
        id: 'p1',
        text: 'Não abandonar a porta durante o Coffee Break das 10:30.',
        why: 'O Coffee Break é o momento de maior fluxo de dispersão e movimentação de convidados. A equipa deve permanecer no posto para orientar os participantes e apoiar o tráfego.'
      },
      {
        id: 'p2',
        text: 'Não permitir acesso a participantes sem credencial visível.',
        why: 'Trata-se de uma directriz estrita de segurança do Estado e controle de lotação do auditório.'
      },
      {
        id: 'p3',
        text: 'Não utilizar o telemóvel para redes sociais ou assuntos pessoais.',
        why: 'A postura protocolar exige prontidão visual e foco ininterrupto nos dignatários e convidados.'
      }
    ],
    accessAllowed: ['Todos os participantes credenciados', 'Autoridades com comitiva', 'Imprensa acreditada'],
    accessDenied: ['Pessoas sem credencial', 'Visitantes ocasionais'],
    greetingScriptPt: 'Bom dia, seja muito bem-vindo ao Corporate Summit Angola. Tenha a gentileza de apresentar a sua credencial.',
    greetingScriptEn: 'Good morning, welcome to the Corporate Summit Angola. Please show your badge.',
    vipListForPost: ['S. Exa. Ministro da Economia (chegada às 08:45)', 'PCA Sonangol (chegada às 08:40)'],
    escalationContacts: [
      { name: 'Dra. Elsa Ramos', role: 'Coordenadora Geral', phone: '+244 924 100 200' },
      { name: 'Comandante da Segurança Presidencial', role: 'Segurança de Estado', phone: '+244 923 999 888' }
    ],
    breakWindow: { start: '12:00', end: '12:35', coverStaffName: 'Edson Manuel' },
    whyExplanation: 'A Entrada Principal define a primeira impressão diplomática e executiva do evento. A assertividade combinada com cortesia transmite a imagem de excelência da Corporate Experience.',
    version: 1
  },
  {
    id: 'brief-staff-02',
    assignmentId: 'assign-02',
    postId: 'post-vip-01',
    protocolName: 'Maria Fernandes',
    postName: 'Salão Nobre / Recepção VIP de Estado',
    locationDetails: 'Piso 1 — Salão Nobre Privativo',
    shiftHours: '08:00–10:30',
    missionStatement: 'Acolher e acompanhar a Embaixadora da União Europeia e demais Chefes de Missão, providenciando serviço de cortesia e escolta diplomática.',
    tasks: [
      { id: 't1', text: 'Verificar serviço de café, água mineral e jornais na Sala VIP.', done: true },
      { id: 't2', text: 'Receber a Embaixadora da UE em Inglês/Francês e acompanhar à poltrona de honra.', done: false },
      { id: 't3', text: 'Escolta até à fila A da Plenária às 08:55.', done: false }
    ],
    prohibitedActions: [
      {
        id: 'p1',
        text: 'Não permitir a entrada de convidados gerais ou sem crachá VIP Ouro.',
        why: 'A Sala Nobre destina-se a conversas reservadas entre governantes e diplomatas protegidas por sigilo de Estado.'
      },
      {
        id: 'p2',
        text: 'Não pedir fotografias ou autógrafos às individualidades.',
        why: 'O protocolo actua como autoridade funcional neutra e não como admirador; a quebra desta regra lesa a dignidade da organização.'
      }
    ],
    accessAllowed: ['Ministros de Estado', 'Embaixadores', 'Presidentes de Conselhos de Administração'],
    accessDenied: ['Público Geral', 'Convidados sem crachá dourado'],
    greetingScriptPt: 'Excelência, é uma honra recebê-lo(a). Por favor, queira acompanhar-me ao seu espaço reservado.',
    greetingScriptEn: 'Your Excellency, it is an honor to welcome you. Please allow me to escort you to the VIP lounge.',
    vipListForPost: ['Embaixadora da UE (chegada às 08:50)', 'Ministro da Economia (chegada às 08:45)'],
    escalationContacts: [
      { name: 'Dra. Elsa Ramos', role: 'Coordenadora Geral', phone: '+244 924 100 200' }
    ],
    breakWindow: { start: '12:35', end: '13:10', coverStaffName: 'Ana Paula dos Santos' },
    whyExplanation: 'A Sala VIP concentra o mais alto risco diplomático do evento. Qualquer deslize de etiqueta reflecte-se directamente na reputação do país e da empresa organizadora.',
    version: 1
  }
];

export const DEMO_ASSIGNMENTS: Assignment[] = [
  // Turno Matinal
  { id: 'assign-01', shiftId: 'shift-ent-01', postId: 'post-entrada-01', staffId: 'staff-01', status: 'CHECKED_IN', isLead: true, checkedInAt: '07:22', stationBrief: DEMO_STATION_BRIEFS[0] },
  { id: 'assign-02', shiftId: 'shift-ent-01', postId: 'post-entrada-01', staffId: 'staff-05', status: 'CHECKED_IN', isLead: false, checkedInAt: '07:28' },
  { id: 'assign-03', shiftId: 'shift-vip-01', postId: 'post-vip-01', staffId: 'staff-02', status: 'CHECKED_IN', isLead: true, checkedInAt: '07:25', stationBrief: DEMO_STATION_BRIEFS[1] },
  { id: 'assign-04', shiftId: 'shift-vip-01', postId: 'post-vip-01', staffId: 'staff-04', status: 'CHECKED_IN', isLead: false, checkedInAt: '07:20' },
  { id: 'assign-05', shiftId: 'shift-aud-01', postId: 'post-auditorio-01', staffId: 'staff-06', status: 'CHECKED_IN', isLead: true, checkedInAt: '07:24' },
  { id: 'assign-06', shiftId: 'shift-aud-01', postId: 'post-auditorio-01', staffId: 'staff-07', status: 'CHECKED_IN', isLead: false, checkedInAt: '07:26' },
  { id: 'assign-07', shiftId: 'shift-back-01', postId: 'post-backstage-01', staffId: 'staff-08', status: 'CHECKED_IN', isLead: false, checkedInAt: '07:30' },
  { id: 'assign-08', shiftId: 'shift-cred-01', postId: 'post-cred-01', staffId: 'staff-03', status: 'CHECKED_IN', isLead: false, checkedInAt: '07:18' }
];

export const DEMO_EVENT_MODEL: EventOperationalModel = {
  id: 'event-summit-2026',
  title: 'Corporate Summit Angola 2026',
  clientName: 'Gabinete de Apoio aos Investimentos Corporativos & Sonangol',
  venue: DEMO_VENUE,
  date: '2026-10-15',
  startTime: '07:30',
  endTime: '18:00',
  status: 'IN_EXECUTION',
  activeVersion: 1,
  activities: DEMO_ACTIVITIES,
  vipGuests: DEMO_VIPS,
  rules: DEMO_OPERATIONAL_RULES,
  posts: DEMO_POSTS,
  shifts: DEMO_SHIFTS,
  assignments: DEMO_ASSIGNMENTS,
  conflicts: [],
  incidents: [
    {
      id: 'inc-01',
      eventId: 'event-summit-2026',
      postId: 'post-entrada-01',
      reporterStaffId: 'staff-01',
      reporterName: 'Cristiano Vunge',
      category: 'CREDENTIAL_ISSUE',
      priority: 'NORMAL',
      status: 'RESOLVED',
      description: 'Convidado Dr. Manuel Viana apresentou convite oficial mas o seu nome não constava na folha impressa de crachás.',
      location: 'Entrada Principal — Filtro Sul',
      timestamp: '08:12',
      recommendedEscalation: 'Encaminhar ao balcão de credenciação com autorização provisória.',
      resolvedAt: '08:18',
      resolutionNotes: 'Crachá emitido pelo balcão após confirmação no sistema.'
    },
    {
      id: 'inc-02',
      eventId: 'event-summit-2026',
      postId: 'post-entrada-01',
      reporterStaffId: 'staff-05',
      reporterName: 'Edson Manuel',
      category: 'VIP_MISSING_OR_DELAYED',
      priority: 'HIGH',
      status: 'IN_PROGRESS',
      description: 'Viatura oficial do Ministro de Estado da Economia informou via batedor da polícia que vai chegar 15 minutos mais cedo (08:30 em vez de 08:45).',
      location: 'Pórtico Exterior',
      timestamp: '08:20',
      recommendedEscalation: 'Acionar alteração de emergência no Cockpit para antecipar posicionamento do protocolo de escolta.'
    }
  ],
  changes: [
    {
      id: 'chg-01',
      eventId: 'event-summit-2026',
      version: 1,
      changeLevel: 'N0_INFO',
      reason: 'Plano Operacional Inicial compilado e homologado pela Dra. Elsa Ramos.',
      author: 'Dra. Elsa Ramos',
      timestamp: '07:15',
      state: 'COMMITTED',
      impactSummary: '8 protocolos distribuídos por 6 postos chaves.',
      affectedPosts: ['POST-ENTRADA-01', 'POST-VIP-01', 'POST-AUDITORIO-01'],
      affectedStaff: ['Cristiano Vunge', 'Maria Fernandes'],
      appliedAt: '07:15'
    }
  ],
  auditLogs: [
    {
      id: 'log-01',
      eventId: 'event-summit-2026',
      timestamp: '07:15:00',
      actor: 'Dra. Elsa Ramos (Coordenadora)',
      action: 'PUBLICAR_PLANO_V1',
      details: 'Plano V1 publicado com sucesso e fichas individuais enviadas para os dispositivos móveis.',
      version: 1
    },
    {
      id: 'log-02',
      eventId: 'event-summit-2026',
      timestamp: '07:22:15',
      actor: 'Cristiano Vunge',
      action: 'CHECK_IN_POSTO',
      details: 'Check-in confirmado no Posto POST-ENTRADA-01 via terminal móvel PWA.',
      version: 1
    },
    {
      id: 'log-03',
      eventId: 'event-summit-2026',
      timestamp: '07:25:40',
      actor: 'Maria Fernandes',
      action: 'CHECK_IN_POSTO',
      details: 'Check-in confirmado no Posto POST-VIP-01 via terminal móvel PWA.',
      version: 1
    }
  ],
  unresolvedAmbiguitiesCount: 0
};
