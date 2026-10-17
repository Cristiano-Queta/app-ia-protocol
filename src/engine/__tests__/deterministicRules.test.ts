import { describe, it, expect } from 'vitest';
import { DeterministicRuleEngine, doIntervalsOverlap, timeToMinutes } from '../deterministicRules';
import {
  Post,
  Shift,
  Assignment,
  User,
  StaffProfile,
  Activity,
  OperationalRule
} from '../../types';

describe('Deterministic Rule & Constraint Engine — Corporate Experience 2.0', () => {

  const dummyRules: OperationalRule[] = [
    {
      id: 'rule-l1',
      organizationId: 'org-1',
      level: 'L1_CORPORATE_SOP',
      title: 'Prontidão Coffee Break',
      ruleText: 'Sem pausas durante o coffee break.',
      priority: 'CRITICAL',
      isActive: true
    }
  ];

  it('deve converter correctamente horários em minutos e verificar sobreposição de intervalos', () => {
    expect(timeToMinutes('08:30')).toBe(510);
    expect(timeToMinutes('10:00')).toBe(600);

    // [08:00, 10:00] e [09:30, 11:00] sobrepõem-se
    expect(doIntervalsOverlap('08:00', '10:00', '09:30', '11:00')).toBe(true);

    // [08:00, 10:00] e [10:00, 12:00] NÃO se sobrepõem (são contíguos)
    expect(doIntervalsOverlap('08:00', '10:00', '10:00', '12:00')).toBe(false);

    // [08:00, 09:00] e [11:00, 12:00] são disjuntos
    expect(doIntervalsOverlap('08:00', '09:00', '11:00', '12:00')).toBe(false);
  });

  it('TESTE 1: deve aprovar um plano válido sem conflitos quando há pessoal suficiente e sem sobreposições', () => {
    const posts: Post[] = [
      {
        id: 'p1',
        eventId: 'ev-1',
        roomId: 'r1',
        code: 'POST-01',
        name: 'Entrada',
        priority: 'CRITICAL',
        locationDetails: 'Piso 0',
        minStaff: 1,
        idealStaff: 1,
        requiredSkills: [],
        requiresVipQualification: false,
        missionStatement: 'Controlar entrada',
        prohibitedActions: [],
        accessRulesAllowed: [],
        accessRulesDenied: [],
        doActions: []
      }
    ];

    const shifts: Shift[] = [
      { id: 's1', postId: 'p1', startTime: '08:00', endTime: '10:00', requiredStaff: 1, requiresVip: false, criticality: 'CRITICAL' }
    ];

    const users: User[] = [
      { id: 'u1', organizationId: 'org-1', fullName: 'João Silva', phoneNumber: '123', email: 'j@test.ao', role: 'PROTOCOL', pin: '1111', isActive: true }
    ];

    const profiles: StaffProfile[] = [
      { userId: 'u1', spokenLanguages: ['pt'], isVipCertified: false, yearsExperience: 2, emergencyContact: '999', currentStatus: 'PRESENT' }
    ];

    const assignments: Assignment[] = [
      { id: 'a1', shiftId: 's1', postId: 'p1', staffId: 'u1', status: 'CONFIRMED', isLead: true }
    ];

    const activities: Activity[] = [
      {
        id: 'act1',
        eventId: 'ev-1',
        title: 'Sessão 1',
        activityType: 'OPENING',
        startTime: '08:00',
        endTime: '10:00',
        estimatedAttendees: 100,
        isCriticalProtocolMoment: true,
        provenance: { source: 'test.pdf', sourceType: 'PDF', confidence: 1, validationStatus: 'CONFIRMED' }
      }
    ];

    const conflicts = DeterministicRuleEngine.validateAll({
      posts,
      shifts,
      assignments,
      staffUsers: users,
      staffProfiles: profiles,
      activities,
      rules: dummyRules
    });

    expect(conflicts).toHaveLength(0);
  });

  it('TESTE 2: deve detectar matematicamente o défice de cobertura no Coffee Break (9 necessários vs 8 disponíveis)', () => {
    // 4 turnos simultâneos das 10:30 às 11:00 totalizando 9 protocolos
    const posts: Post[] = [
      { id: 'p-ent', eventId: 'e1', roomId: 'r1', code: 'P-ENT', name: 'Entrada', priority: 'CRITICAL', locationDetails: '', minStaff: 2, idealStaff: 2, requiredSkills: [], requiresVipQualification: false, missionStatement: '', prohibitedActions: [], accessRulesAllowed: [], accessRulesDenied: [], doActions: [] },
      { id: 'p-vip', eventId: 'e1', roomId: 'r2', code: 'P-VIP', name: 'Sala VIP', priority: 'CRITICAL', locationDetails: '', minStaff: 2, idealStaff: 2, requiredSkills: [], requiresVipQualification: true, missionStatement: '', prohibitedActions: [], accessRulesAllowed: [], accessRulesDenied: [], doActions: [] },
      { id: 'p-aud', eventId: 'e1', roomId: 'r3', code: 'P-AUD', name: 'Auditório', priority: 'HIGH', locationDetails: '', minStaff: 2, idealStaff: 2, requiredSkills: [], requiresVipQualification: false, missionStatement: '', prohibitedActions: [], accessRulesAllowed: [], accessRulesDenied: [], doActions: [] },
      { id: 'p-cof', eventId: 'e1', roomId: 'r4', code: 'P-COF', name: 'Coffee Break', priority: 'NORMAL', locationDetails: '', minStaff: 3, idealStaff: 3, requiredSkills: [], requiresVipQualification: false, missionStatement: '', prohibitedActions: [], accessRulesAllowed: [], accessRulesDenied: [], doActions: [] }
    ];

    const shifts: Shift[] = [
      { id: 's-ent', postId: 'p-ent', startTime: '10:30', endTime: '11:00', requiredStaff: 2, requiresVip: false, criticality: 'CRITICAL' },
      { id: 's-vip', postId: 'p-vip', startTime: '10:30', endTime: '11:00', requiredStaff: 2, requiresVip: true, criticality: 'CRITICAL' },
      { id: 's-aud', postId: 'p-aud', startTime: '10:30', endTime: '11:00', requiredStaff: 2, requiresVip: false, criticality: 'HIGH' },
      { id: 's-cof', postId: 'p-cof', startTime: '10:30', endTime: '11:00', requiredStaff: 3, requiresVip: false, criticality: 'NORMAL' }
    ];

    // Apenas 8 protocolos disponíveis
    const users: User[] = Array.from({ length: 8 }).map((_, i) => ({
      id: `u-${i + 1}`,
      organizationId: 'org-1',
      fullName: `Protocolo ${i + 1}`,
      phoneNumber: `92300000${i}`,
      email: `p${i}@test.ao`,
      role: 'PROTOCOL',
      pin: '0000',
      isActive: true
    }));

    const profiles: StaffProfile[] = users.map((u, i) => ({
      userId: u.id,
      spokenLanguages: ['pt'],
      isVipCertified: i < 2, // os 2 primeiros são VIP
      yearsExperience: 2,
      emergencyContact: '000',
      currentStatus: 'PRESENT'
    }));

    const activities: Activity[] = [
      {
        id: 'act-coffee',
        eventId: 'e1',
        title: 'Coffee Break',
        activityType: 'COFFEE_BREAK',
        startTime: '10:30',
        endTime: '11:00',
        estimatedAttendees: 800,
        isCriticalProtocolMoment: true,
        provenance: { source: 'test.pdf', sourceType: 'PDF', confidence: 1, validationStatus: 'CONFIRMED' }
      }
    ];

    const conflicts = DeterministicRuleEngine.validateAll({
      posts,
      shifts,
      assignments: [],
      staffUsers: users,
      staffProfiles: profiles,
      activities,
      rules: dummyRules
    });

    const deficitAlert = conflicts.find(c => c.type === 'COVERAGE_DEFICIT');
    expect(deficitAlert).toBeDefined();
    expect(deficitAlert?.requiredStaff).toBe(9);
    expect(deficitAlert?.availableStaff).toBe(8);
    expect(deficitAlert?.deficit).toBe(1);
    expect(deficitAlert?.suggestions.length).toBeGreaterThan(0);
  });

  it('TESTE 3: deve detectar sobreposição de horário (Double-Booking) para o mesmo protocolo', () => {
    const posts: Post[] = [
      { id: 'p1', eventId: 'e1', roomId: 'r1', code: 'P1', name: 'Porta 1', priority: 'HIGH', locationDetails: '', minStaff: 1, idealStaff: 1, requiredSkills: [], requiresVipQualification: false, missionStatement: '', prohibitedActions: [], accessRulesAllowed: [], accessRulesDenied: [], doActions: [] },
      { id: 'p2', eventId: 'e1', roomId: 'r2', code: 'P2', name: 'Porta 2', priority: 'HIGH', locationDetails: '', minStaff: 1, idealStaff: 1, requiredSkills: [], requiresVipQualification: false, missionStatement: '', prohibitedActions: [], accessRulesAllowed: [], accessRulesDenied: [], doActions: [] }
    ];

    const shifts: Shift[] = [
      { id: 's1', postId: 'p1', startTime: '08:00', endTime: '10:00', requiredStaff: 1, requiresVip: false, criticality: 'HIGH' },
      { id: 's2', postId: 'p2', startTime: '09:30', endTime: '11:00', requiredStaff: 1, requiresVip: false, criticality: 'HIGH' }
    ];

    const users: User[] = [
      { id: 'u1', organizationId: 'org-1', fullName: 'Cristiano Vunge', phoneNumber: '123', email: 'c@test.ao', role: 'PROTOCOL', pin: '1111', isActive: true }
    ];

    const profiles: StaffProfile[] = [
      { userId: 'u1', spokenLanguages: ['pt'], isVipCertified: true, yearsExperience: 5, emergencyContact: '000', currentStatus: 'PRESENT' }
    ];

    // O mesmo protocolo atribuído aos 2 turnos que colidem das 09:30 às 10:00!
    const assignments: Assignment[] = [
      { id: 'a1', shiftId: 's1', postId: 'p1', staffId: 'u1', status: 'CONFIRMED', isLead: true },
      { id: 'a2', shiftId: 's2', postId: 'p2', staffId: 'u1', status: 'CONFIRMED', isLead: false }
    ];

    const conflicts = DeterministicRuleEngine.validateAll({
      posts,
      shifts,
      assignments,
      staffUsers: users,
      staffProfiles: profiles,
      activities: [],
      rules: dummyRules
    });

    const doubleBookingAlert = conflicts.find(c => c.type === 'DOUBLE_BOOKING');
    expect(doubleBookingAlert).toBeDefined();
    expect(doubleBookingAlert?.affectedStaffId).toBe('u1');
    expect(doubleBookingAlert?.severity).toBe('CRITICAL');
  });

  it('TESTE 4: deve barrar atribuição de protocolo sem certificação VIP a posto VIP obrigatório', () => {
    const posts: Post[] = [
      { id: 'p-vip', eventId: 'e1', roomId: 'r1', code: 'P-VIP', name: 'Salão Nobre VIP', priority: 'CRITICAL', locationDetails: '', minStaff: 1, idealStaff: 1, requiredSkills: [], requiresVipQualification: true, missionStatement: '', prohibitedActions: [], accessRulesAllowed: [], accessRulesDenied: [], doActions: [] }
    ];

    const shifts: Shift[] = [
      { id: 's-vip', postId: 'p-vip', startTime: '08:00', endTime: '10:00', requiredStaff: 1, requiresVip: true, criticality: 'CRITICAL' }
    ];

    // Protocolo NÃO certificado para VIP
    const users: User[] = [
      { id: 'u-novato', organizationId: 'org-1', fullName: 'Edson Manuel', phoneNumber: '123', email: 'e@test.ao', role: 'PROTOCOL', pin: '1111', isActive: true }
    ];

    const profiles: StaffProfile[] = [
      { userId: 'u-novato', spokenLanguages: ['pt'], isVipCertified: false, yearsExperience: 1, emergencyContact: '000', currentStatus: 'PRESENT' }
    ];

    const assignments: Assignment[] = [
      { id: 'a-vip', shiftId: 's-vip', postId: 'p-vip', staffId: 'u-novato', status: 'CONFIRMED', isLead: true }
    ];

    const conflicts = DeterministicRuleEngine.validateAll({
      posts,
      shifts,
      assignments,
      staffUsers: users,
      staffProfiles: profiles,
      activities: [],
      rules: dummyRules
    });

    const vipMismatchAlert = conflicts.find(c => c.type === 'SKILL_MISMATCH');
    expect(vipMismatchAlert).toBeDefined();
    expect(vipMismatchAlert?.affectedStaffId).toBe('u-novato');
    expect(vipMismatchAlert?.message).toContain('Requisito VIP violado');
  });

});
