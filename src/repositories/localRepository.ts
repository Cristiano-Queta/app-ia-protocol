/**
 * Corporate Experience 2.0 — Local Repository Implementation (MVP)
 * Implements IEventRepository, IStaffRepository, IIncidentRepository
 * using asynchronous browser storage with IndexedDB/LocalStorage fallback.
 * Prepared for 1:1 drop-in replacement with PostgreSQL adapter later.
 */

import {
  IEventRepository,
  IStaffRepository,
  IIncidentRepository
} from './interfaces';
import {
  EventOperationalModel,
  User,
  StaffProfile,
  Incident,
  EventChange,
  AuditLogEntry
} from '../types';
import { StorageService } from '../services/storage';

export class LocalEventRepository implements IEventRepository {
  public async getEvent(eventId: string): Promise<EventOperationalModel | null> {
    const model = StorageService.getEventModel();
    if (model.id === eventId || !eventId) {
      return model;
    }
    return model;
  }

  public async saveEvent(event: EventOperationalModel): Promise<void> {
    StorageService.saveEventModel(event);
  }

  public async createVersion(eventId: string, reason: string, author: string): Promise<EventChange> {
    return StorageService.applyEmergencyChange({
      reason,
      changeLevel: 'N1_OPERATIONAL',
      author,
      impactSummary: 'Nova versão formal gerada pelo coordenador.',
      affectedPosts: [],
      affectedStaff: []
    });
  }

  public async getAuditLogs(eventId: string): Promise<AuditLogEntry[]> {
    const model = await this.getEvent(eventId);
    return model ? model.auditLogs : [];
  }

  public async logAction(
    eventId: string,
    actor: string,
    action: string,
    details: string,
    version: number
  ): Promise<AuditLogEntry> {
    const model = await this.getEvent(eventId);
    const entry: AuditLogEntry = {
      id: `log-${Date.now()}`,
      eventId,
      timestamp: new Date().toLocaleTimeString('pt-PT'),
      actor,
      action,
      details,
      version
    };
    if (model) {
      model.auditLogs.unshift(entry);
      await this.saveEvent(model);
    }
    return entry;
  }

  public async resetToDemo(): Promise<EventOperationalModel> {
    return StorageService.resetDemoData();
  }
}

export class LocalStaffRepository implements IStaffRepository {
  public async getStaffUsers(organizationId?: string): Promise<User[]> {
    return StorageService.getUsers();
  }

  public async getStaffProfiles(): Promise<StaffProfile[]> {
    return StorageService.getStaffProfiles();
  }

  public async getStaffById(staffId: string): Promise<User | null> {
    const users = StorageService.getUsers();
    return users.find(u => u.id === staffId) || null;
  }

  public async updateStaffProfile(profileUpdate: Partial<StaffProfile> & { userId: string }): Promise<void> {
    const profiles = StorageService.getStaffProfiles();
    const updated = profiles.map(p => {
      if (p.userId === profileUpdate.userId) {
        return { ...p, ...profileUpdate };
      }
      return p;
    });
    StorageService.saveStaffProfiles(updated);
  }

  public async checkInStaff(staffId: string, postId: string): Promise<{ success: boolean; time: string }> {
    return StorageService.checkInStaff(staffId, postId);
  }
}

export class LocalIncidentRepository implements IIncidentRepository {
  public async getIncidents(eventId: string): Promise<Incident[]> {
    const model = StorageService.getEventModel();
    return model.incidents;
  }

  public async reportIncident(incidentData: Omit<Incident, 'id' | 'timestamp' | 'status'>): Promise<Incident> {
    return StorageService.reportIncident(incidentData);
  }

  public async updateIncidentStatus(incidentId: string, status: Incident['status'], notes?: string): Promise<void> {
    const model = StorageService.getEventModel();
    model.incidents = model.incidents.map(inc => {
      if (inc.id === incidentId) {
        return {
          ...inc,
          status,
          resolvedAt: status === 'RESOLVED' ? new Date().toLocaleTimeString('pt-PT') : undefined,
          resolutionNotes: notes || inc.resolutionNotes
        };
      }
      return inc;
    });
    StorageService.saveEventModel(model);
  }
}

// Singleton instances for injection
export const eventRepository: IEventRepository = new LocalEventRepository();
export const staffRepository: IStaffRepository = new LocalStaffRepository();
export const incidentRepository: IIncidentRepository = new LocalIncidentRepository();
