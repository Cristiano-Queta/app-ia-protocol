/**
 * Corporate Experience 2.0 — Data Persistence Abstraction Layer
 * REPOSITORY PATTERN INTERFACES
 * 
 * Flow:
 * Interface Repository
 *         ↓
 * Local implementation no MVP (LocalStorage / IndexedDB)
 *         ↓
 * PostgreSQL adapter posteriormente (pg / drizzle / prisma)
 */

import {
  EventOperationalModel,
  User,
  StaffProfile,
  Incident,
  EventChange,
  AuditLogEntry,
  Assignment,
  Shift
} from '../types';

export interface IEventRepository {
  getEvent(eventId: string): Promise<EventOperationalModel | null>;
  saveEvent(event: EventOperationalModel): Promise<void>;
  createVersion(eventId: string, reason: string, author: string): Promise<EventChange>;
  getAuditLogs(eventId: string): Promise<AuditLogEntry[]>;
  logAction(eventId: string, actor: string, action: string, details: string, version: number): Promise<AuditLogEntry>;
  resetToDemo(): Promise<EventOperationalModel>;
}

export interface IStaffRepository {
  getStaffUsers(organizationId?: string): Promise<User[]>;
  getStaffProfiles(): Promise<StaffProfile[]>;
  getStaffById(staffId: string): Promise<User | null>;
  updateStaffProfile(profile: Partial<StaffProfile> & { userId: string }): Promise<void>;
  checkInStaff(staffId: string, postId: string): Promise<{ success: boolean; time: string }>;
}

export interface IIncidentRepository {
  getIncidents(eventId: string): Promise<Incident[]>;
  reportIncident(incident: Omit<Incident, 'id' | 'timestamp' | 'status'>): Promise<Incident>;
  updateIncidentStatus(incidentId: string, status: Incident['status'], notes?: string): Promise<void>;
}
