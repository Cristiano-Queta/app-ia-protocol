/**
 * Corporate Experience 2.0 — Deterministic Rule & Constraint Engine
 * ZERO-HALLUCINATION MATHEMATICAL VERIFICATION LAYER
 */

import {
  Post,
  Shift,
  Assignment,
  User,
  StaffProfile,
  OperationalConflictAlert,
  ContingencySuggestion,
  Activity,
  OperationalRule
} from '../types';

export function timeToMinutes(timeStr: string): number {
  if (!timeStr) return 0;
  const parts = timeStr.trim().split(':');
  const hours = parseInt(parts[0], 10) || 0;
  const minutes = parseInt(parts[1], 10) || 0;
  return hours * 60 + minutes;
}

export function minutesToTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

export function doIntervalsOverlap(
  startA: string,
  endA: string,
  startB: string,
  endB: string
): boolean {
  const a1 = timeToMinutes(startA);
  const a2 = timeToMinutes(endA);
  const b1 = timeToMinutes(startB);
  const b2 = timeToMinutes(endB);
  return a1 < b2 && b1 < a2;
}

export class DeterministicRuleEngine {
  /**
   * Evaluates all hard constraints and capacity requirements.
   * Returns a list of unambiguous mathematical conflicts.
   */
  public static validateAll(params: {
    posts: Post[];
    shifts: Shift[];
    assignments: Assignment[];
    staffUsers: User[];
    staffProfiles: StaffProfile[];
    activities: Activity[];
    rules: OperationalRule[];
  }): OperationalConflictAlert[] {
    const alerts: OperationalConflictAlert[] = [];
    const { posts, shifts, assignments, staffUsers, staffProfiles, activities } = params;

    const postsMap = new Map(posts.map(p => [p.id, p]));
    const staffProfileMap = new Map(staffProfiles.map(sp => [sp.userId, sp]));
    const staffUserMap = new Map(staffUsers.map(u => [u.id, u]));

    // 1. HARD CONSTRAINT: Double Booking Detection
    const staffAssignmentIntervals = new Map<string, { shiftId: string; start: string; end: string; postName: string }[]>();

    for (const a of assignments) {
      const shift = shifts.find(s => s.id === a.shiftId);
      if (!shift) continue;
      const post = postsMap.get(shift.postId);
      const postName = post ? post.name : 'Posto Desconhecido';

      const existing = staffAssignmentIntervals.get(a.staffId) || [];
      for (const prev of existing) {
        if (doIntervalsOverlap(prev.start, prev.end, shift.startTime, shift.endTime)) {
          const staffUser = staffUserMap.get(a.staffId);
          const staffName = staffUser ? staffUser.fullName : 'Protocolo';
          alerts.push({
            id: `double-booking-${a.staffId}-${shift.id}`,
            type: 'DOUBLE_BOOKING',
            severity: 'CRITICAL',
            message: `Sobreposição de horário: ${staffName} está alocado(a) simultaneamente a "${prev.postName}" (${prev.start}-${prev.end}) e "${postName}" (${shift.startTime}-${shift.endTime}).`,
            timeWindow: `${shift.startTime}–${shift.endTime}`,
            affectedStaffId: a.staffId,
            affectedPostId: shift.postId,
            suggestions: [
              {
                id: `sug-reassign-${a.id}`,
                title: `Substituir ${staffName}`,
                description: `Remover ${staffName} de um dos postos e atribuir protocolo volante disponível.`,
                impactScore: 8,
                actionType: 'REALLOCATE_VOLUNTEER',
                actionPayload: { assignmentId: a.id }
              }
            ],
            resolved: false
          });
        }
      }
      existing.push({ shiftId: shift.id, start: shift.startTime, end: shift.endTime, postName });
      staffAssignmentIntervals.set(a.staffId, existing);
    }

    // 2. HARD CONSTRAINT: Mandatory VIP Competency
    for (const a of assignments) {
      const shift = shifts.find(s => s.id === a.shiftId);
      if (!shift) continue;
      const post = postsMap.get(shift.postId);
      if (!post) continue;

      if (post.requiresVipQualification) {
        const profile = staffProfileMap.get(a.staffId);
        if (!profile || !profile.isVipCertified) {
          const staffUser = staffUserMap.get(a.staffId);
          alerts.push({
            id: `vip-mismatch-${a.id}`,
            type: 'SKILL_MISMATCH',
            severity: 'HIGH',
            message: `Requisito VIP violado: O posto "${post.name}" exige certificação protocolar VIP, mas ${staffUser?.fullName || 'o protocolo'} não possui esta habilitação.`,
            timeWindow: `${shift.startTime}–${shift.endTime}`,
            affectedPostId: post.id,
            affectedStaffId: a.staffId,
            suggestions: [
              {
                id: `sug-vip-swap-${a.id}`,
                title: 'Alocar Protocolo VIP Qualificado',
                description: 'Trocar atribuição com um membro certificado da equipa (ex: Maria Fernandes ou Cristiano Vunge).',
                impactScore: 9,
                actionType: 'REALLOCATE_VOLUNTEER',
                actionPayload: { targetAssignmentId: a.id }
              }
            ],
            resolved: false
          });
        }
      }
    }

    // 3. HARD CONSTRAINT: Shift Coverage & Staff Balance (Minute-by-minute discretization)
    // Check key milestone points (e.g. start of activities and shifts)
    const timePoints = new Set<string>();
    shifts.forEach(s => { timePoints.add(s.startTime); timePoints.add(s.endTime); });
    activities.forEach(act => { timePoints.add(act.startTime); timePoints.add(act.endTime); });

    const sortedMinutes = Array.from(timePoints)
      .map(t => timeToMinutes(t))
      .sort((a, b) => a - b);

    // Filter consecutive test checkpoints
    for (let i = 0; i < sortedMinutes.length - 1; i++) {
      const midPoint = Math.floor((sortedMinutes[i] + sortedMinutes[i + 1]) / 2);
      const midTimeStr = minutesToTime(midPoint);

      // Find active shifts at this time
      const activeShiftsAtTime = shifts.filter(s => {
        const sStart = timeToMinutes(s.startTime);
        const sEnd = timeToMinutes(s.endTime);
        return midPoint >= sStart && midPoint < sEnd;
      });

      if (activeShiftsAtTime.length === 0) continue;

      const totalRequiredAtTime = activeShiftsAtTime.reduce((sum, s) => sum + s.requiredStaff, 0);

      // Total available staff
      const availableStaffCount = staffUsers.filter(u => u.isActive).length;

      if (totalRequiredAtTime > availableStaffCount) {
        const deficit = totalRequiredAtTime - availableStaffCount;
        const windowStr = `${minutesToTime(sortedMinutes[i])}–${minutesToTime(sortedMinutes[i + 1])}`;

        // Avoid duplicate alert for same time window
        const alreadyHasAlert = alerts.some(a => a.type === 'COVERAGE_DEFICIT' && a.timeWindow === windowStr);
        if (!alreadyHasAlert) {
          // Identify candidate posts to temporarily downscale (lowest priority first)
          const lowPriorityShifts = activeShiftsAtTime.filter(s => {
            const p = postsMap.get(s.postId);
            return p && (p.priority === 'LOW' || p.priority === 'NORMAL');
          });

          const suggestions: ContingencySuggestion[] = [];
          if (lowPriorityShifts.length > 0) {
            const candidatePost = postsMap.get(lowPriorityShifts[0].postId);
            suggestions.push({
              id: `sug-deficit-reduce-${midPoint}`,
              title: `Reduzir temporariamente cobertura em "${candidatePost?.name}"`,
              description: `Posto com prioridade ${candidatePost?.priority}. Reduzir 1 protocolo durante este intervalo para garantir cobertura dos postos CRITICAL (Sala VIP e Entrada).`,
              impactScore: 7,
              actionType: 'REDUCE_NON_CRITICAL',
              actionPayload: { shiftId: lowPriorityShifts[0].id, postCode: candidatePost?.code }
            });
          }

          suggestions.push({
            id: `sug-deficit-more-staff-${midPoint}`,
            title: 'Solicitar 1 Protocolo Suplente ao Coordenador',
            description: `Défice confirmado de ${deficit} pessoa(s). Acionar lista de reserva presencial.`,
            impactScore: 10,
            actionType: 'REQUEST_MORE_STAFF',
            actionPayload: { deficit }
          });

          alerts.push({
            id: `deficit-${windowStr}`,
            type: 'COVERAGE_DEFICIT',
            severity: 'CRITICAL',
            message: `Défice de Pessoal: Entre as ${windowStr}, a operação exige ${totalRequiredAtTime} protocolos simultâneos, mas a equipa tem apenas ${availableStaffCount} pessoas disponíveis. Défice operacional: ${deficit} protocolo(s).`,
            timeWindow: windowStr,
            requiredStaff: totalRequiredAtTime,
            availableStaff: availableStaffCount,
            deficit,
            suggestions,
            resolved: false
          });
        }
      }
    }

    // 4. Check for Unassigned Critical Shifts
    for (const shift of shifts) {
      const assignedCount = assignments.filter(a => a.shiftId === shift.id).length;
      if (assignedCount < shift.requiredStaff) {
        const post = postsMap.get(shift.postId);
        if (post && (post.priority === 'CRITICAL' || post.priority === 'HIGH')) {
          const missing = shift.requiredStaff - assignedCount;
          alerts.push({
            id: `uncovered-critical-${shift.id}`,
            type: 'UNCOVERED_CRITICAL_POST',
            severity: post.priority === 'CRITICAL' ? 'CRITICAL' : 'HIGH',
            message: `Posto crítico desguarnecido: "${post.name}" (${post.priority}) tem apenas ${assignedCount} de ${shift.requiredStaff} protocolo(s) atribuídos das ${shift.startTime} às ${shift.endTime}.`,
            timeWindow: `${shift.startTime}–${shift.endTime}`,
            affectedPostId: post.id,
            deficit: missing,
            suggestions: [
              {
                id: `sug-fill-critical-${shift.id}`,
                title: `Priorizar preenchimento de "${post.name}"`,
                description: 'Reatribuir membros de postos secundários ou alocar suplente.',
                impactScore: 9,
                actionType: 'REALLOCATE_VOLUNTEER',
                actionPayload: { shiftId: shift.id }
              }
            ],
            resolved: false
          });
        }
      }
    }

    return alerts;
  }
}
