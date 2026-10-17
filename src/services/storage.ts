/**
 * Corporate Experience 2.0 — Local & Offline Persistent Storage Layer
 * Manages Event Operational Model, Multi-tenancy, Immutable Plan Versioning,
 * Audit Logs, and Offline Sync Queues.
 */

import {
  EventOperationalModel,
  User,
  StaffProfile,
  Incident,
  EventChange,
  AuditLogEntry,
  Assignment,
  Shift,
  Post,
  OperationalConflictAlert
} from '../types';
import {
  DEMO_EVENT_MODEL,
  DEMO_USERS,
  DEMO_STAFF_PROFILES,
  DEMO_OPERATIONAL_RULES,
  DEMO_POSTS,
  DEMO_SHIFTS,
  DEMO_ASSIGNMENTS
} from '../engine/demoData';
import { DeterministicRuleEngine } from '../engine/deterministicRules';

const STORAGE_KEYS = {
  EVENT_MODEL: 'corporate_ops_event_model',
  USERS: 'corporate_ops_users',
  STAFF_PROFILES: 'corporate_ops_staff_profiles',
  OFFLINE_INCIDENTS_QUEUE: 'corporate_ops_offline_incidents_queue',
  OFFLINE_CHECKINS_QUEUE: 'corporate_ops_offline_checkins_queue',
  ACTIVE_USER_ID: 'corporate_ops_active_user_id',
  ACTIVE_ROLE: 'corporate_ops_active_role'
};

export class StorageService {
  /**
   * Initializes or retrieves the current Event Operational Model from localStorage/IndexedDB.
   */
  public static getEventModel(): EventOperationalModel {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.EVENT_MODEL);
      if (stored) {
        const model: EventOperationalModel = JSON.parse(stored);
        // Always run deterministic rule check dynamically
        const users = this.getUsers();
        const profiles = this.getStaffProfiles();
        model.conflicts = DeterministicRuleEngine.validateAll({
          posts: model.posts,
          shifts: model.shifts,
          assignments: model.assignments,
          staffUsers: users,
          staffProfiles: profiles,
          activities: model.activities,
          rules: model.rules
        });
        return model;
      }
    } catch (e) {
      console.error('Error reading event model from storage:', e);
    }

    // Default to seeded demo model
    const initialModel = { ...DEMO_EVENT_MODEL };
    const users = this.getUsers();
    const profiles = this.getStaffProfiles();
    initialModel.conflicts = DeterministicRuleEngine.validateAll({
      posts: initialModel.posts,
      shifts: initialModel.shifts,
      assignments: initialModel.assignments,
      staffUsers: users,
      staffProfiles: profiles,
      activities: initialModel.activities,
      rules: initialModel.rules
    });
    this.saveEventModel(initialModel);
    return initialModel;
  }

  public static saveEventModel(model: EventOperationalModel): void {
    try {
      localStorage.setItem(STORAGE_KEYS.EVENT_MODEL, JSON.stringify(model));
    } catch (e) {
      console.error('Error saving event model to storage:', e);
    }
  }

  public static getUsers(): User[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USERS);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEMO_USERS));
    return DEMO_USERS;
  }

  public static saveUsers(users: User[]): void {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }

  public static getStaffProfiles(): StaffProfile[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.STAFF_PROFILES);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    localStorage.setItem(STORAGE_KEYS.STAFF_PROFILES, JSON.stringify(DEMO_STAFF_PROFILES));
    return DEMO_STAFF_PROFILES;
  }

  public static saveStaffProfiles(profiles: StaffProfile[]): void {
    localStorage.setItem(STORAGE_KEYS.STAFF_PROFILES, JSON.stringify(profiles));
  }

  public static getActiveUserId(): string {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_USER_ID) || 'user-coord-1';
  }

  public static setActiveUserId(userId: string): void {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_USER_ID, userId);
  }

  /**
   * Resets all state to pristine demo baseline with the intentional Coffee Break conflict.
   */
  public static resetDemoData(): EventOperationalModel {
    localStorage.removeItem(STORAGE_KEYS.EVENT_MODEL);
    localStorage.removeItem(STORAGE_KEYS.USERS);
    localStorage.removeItem(STORAGE_KEYS.STAFF_PROFILES);
    localStorage.removeItem(STORAGE_KEYS.OFFLINE_INCIDENTS_QUEUE);
    localStorage.removeItem(STORAGE_KEYS.OFFLINE_CHECKINS_QUEUE);

    const initialModel = {
      ...DEMO_EVENT_MODEL,
      posts: DEMO_POSTS,
      shifts: DEMO_SHIFTS,
      assignments: DEMO_ASSIGNMENTS
    };

    initialModel.conflicts = DeterministicRuleEngine.validateAll({
      posts: initialModel.posts,
      shifts: initialModel.shifts,
      assignments: initialModel.assignments,
      staffUsers: DEMO_USERS,
      staffProfiles: DEMO_STAFF_PROFILES,
      activities: initialModel.activities,
      rules: initialModel.rules
    });

    this.saveEventModel(initialModel);
    this.saveUsers(DEMO_USERS);
    this.saveStaffProfiles(DEMO_STAFF_PROFILES);
    return initialModel;
  }

  /**
   * Records a staff check-in at a specific post.
   */
  public static checkInStaff(staffId: string, postId: string): { success: boolean; time: string } {
    const model = this.getEventModel();
    const nowTime = new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });

    // Update assignment status
    let foundAssignment = false;
    model.assignments = model.assignments.map(a => {
      if (a.staffId === staffId && a.postId === postId) {
        foundAssignment = true;
        return {
          ...a,
          status: 'CHECKED_IN' as const,
          checkedInAt: nowTime
        };
      }
      return a;
    });

    // Update staff profile
    const profiles = this.getStaffProfiles().map(sp => {
      if (sp.userId === staffId) {
        return {
          ...sp,
          currentStatus: 'ON_POST' as const,
          currentPostId: postId,
          lastCheckInTime: nowTime,
          lastHeartbeat: new Date().toISOString()
        };
      }
      return sp;
    });
    this.saveStaffProfiles(profiles);

    // Audit log
    const user = this.getUsers().find(u => u.id === staffId);
    const post = model.posts.find(p => p.id === postId);
    model.auditLogs.unshift({
      id: `log-${Date.now()}`,
      eventId: model.id,
      timestamp: new Date().toLocaleTimeString('pt-PT'),
      actor: user?.fullName || 'Protocolo',
      action: 'CHECK_IN_POSTO',
      details: `Check-in presencial validado no posto "${post?.name || postId}".`,
      version: model.activeVersion
    });

    this.saveEventModel(model);
    return { success: true, time: nowTime };
  }

  /**
   * Reports an operational incident.
   */
  public static reportIncident(incidentData: Omit<Incident, 'id' | 'timestamp' | 'status'>): Incident {
    const model = this.getEventModel();
    const newIncident: Incident = {
      ...incidentData,
      id: `inc-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
      status: 'OPEN'
    };

    model.incidents.unshift(newIncident);

    model.auditLogs.unshift({
      id: `log-${Date.now()}`,
      eventId: model.id,
      timestamp: new Date().toLocaleTimeString('pt-PT'),
      actor: incidentData.reporterName,
      action: 'REPORTAR_INCIDENTE',
      details: `[${incidentData.priority}] ${incidentData.category}: ${incidentData.description.slice(0, 60)}...`,
      version: model.activeVersion
    });

    this.saveEventModel(model);
    return newIncident;
  }

  /**
   * Approves an emergency or dynamic change in the event and cascades the impact.
   */
  public static applyEmergencyChange(params: {
    reason: string;
    changeLevel: 'N0_INFO' | 'N1_OPERATIONAL' | 'N2_CRITICAL_EMERGENCY';
    author: string;
    impactSummary: string;
    affectedPosts: string[];
    affectedStaff: string[];
    modifiedShifts?: Shift[];
  }): EventChange {
    const model = this.getEventModel();
    const newVersion = model.activeVersion + 1;

    if (params.modifiedShifts) {
      model.shifts = params.modifiedShifts;
    }

    const changeRecord: EventChange = {
      id: `chg-${Date.now()}`,
      eventId: model.id,
      version: newVersion,
      changeLevel: params.changeLevel,
      reason: params.reason,
      author: params.author,
      timestamp: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
      state: 'COMMITTED',
      impactSummary: params.impactSummary,
      affectedPosts: params.affectedPosts,
      affectedStaff: params.affectedStaff,
      appliedAt: new Date().toISOString()
    };

    model.activeVersion = newVersion;
    model.changes.unshift(changeRecord);

    model.auditLogs.unshift({
      id: `log-${Date.now()}`,
      eventId: model.id,
      timestamp: new Date().toLocaleTimeString('pt-PT'),
      actor: params.author,
      action: `APROVAR_ALTERAÇÃO_V${newVersion}`,
      details: `[${params.changeLevel}] ${params.reason} — Impacto: ${params.impactSummary}`,
      version: newVersion
    });

    this.saveEventModel(model);
    return changeRecord;
  }
}
