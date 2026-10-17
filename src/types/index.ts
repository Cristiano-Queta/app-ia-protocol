/**
 * Corporate Experience 2.0 — AI Protocol & Event Operations Platform
 * Event Operational Model (EOM) & Core Domain Types
 */

export type Role = 'EVENT_ADMIN' | 'COORDINATOR' | 'ZONE_LEAD' | 'PROTOCOL' | 'OBSERVER';

export type EventStatus = 
  | 'DRAFT'
  | 'ANALYZED'
  | 'PLAN_GENERATED'
  | 'COORDINATOR_APPROVED'
  | 'PUBLISHED'
  | 'IN_EXECUTION'
  | 'COMPLETED';

export type CriticalityLevel = 'LOW' | 'NORMAL' | 'HIGH' | 'CRITICAL';

export type AssignmentStatus = 'PROPOSED' | 'CONFIRMED' | 'CHECKED_IN' | 'ON_BREAK' | 'REASSIGNED' | 'ABSENT';

export type StaffOperationalStatus = 'OFFLINE' | 'PRESENT' | 'ON_POST' | 'ON_BREAK' | 'ABSENT';

export type IncidentCategory = 
  | 'UNAUTHORIZED_ENTRY'
  | 'VIP_MISSING_OR_DELAYED'
  | 'CREDENTIAL_ISSUE'
  | 'MEDICAL_OR_ACCIDENT'
  | 'CATERING_CONFLICT'
  | 'BEHAVIORAL_DISRUPT'
  | 'TECHNICAL_FAILURE'
  | 'OTHER';

export type IncidentPriority = 'NORMAL' | 'HIGH' | 'URGENT';

export type IncidentStatus = 'OPEN' | 'ACKNOWLEDGED' | 'IN_PROGRESS' | 'RESOLVED';

export type ChangeLevel = 'N0_INFO' | 'N1_OPERATIONAL' | 'N2_CRITICAL_EMERGENCY';

export type ChangeState = 'PENDING_APPROVAL' | 'COMMITTED' | 'REJECTED';

export type ValidationStatus = 'CONFIRMED' | 'INFERENCE' | 'UNKNOWN' | 'NEEDS_HUMAN_VALIDATION';

export interface SourceReference {
  source: string;
  sourceType: 'PDF' | 'DOCX' | 'XLSX' | 'DIRECTOR_NOTE' | 'CLIENT_BRIEF' | 'AI_INFERENCE';
  sourceReference?: string;
  page?: number;
  confidence: number; // 0.0 to 1.0
  validationStatus: ValidationStatus;
  confirmedBy?: string;
  confirmedAt?: string;
}

export interface Organization {
  id: string;
  name: string;
  contactEmail: string;
  contactPhone: string;
}

export interface User {
  id: string;
  organizationId: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  role: Role;
  pin: string; // 4-digit fast mobile PIN
  isActive: boolean;
}

export interface StaffProfile {
  userId: string;
  spokenLanguages: string[];
  isVipCertified: boolean;
  yearsExperience: number;
  uniformSize?: string;
  emergencyContact: string;
  currentStatus: StaffOperationalStatus;
  currentPostId?: string;
  lastHeartbeat?: string;
  lastCheckInTime?: string;
}

export interface Room {
  id: string;
  venueId: string;
  name: string;
  floorLevel: string;
  capacity?: number;
  isVipRestricted: boolean;
}

export interface Venue {
  id: string;
  name: string;
  city: string;
  address: string;
  rooms: Room[];
}

export interface Activity {
  id: string;
  eventId: string;
  roomId?: string;
  title: string;
  activityType: 'CREDENTIALING' | 'OPENING' | 'PLENARY' | 'PANEL' | 'COFFEE_BREAK' | 'LUNCH' | 'DINNER' | 'GALA' | 'BILATERAL' | 'CLOSING';
  startTime: string; // "07:30"
  endTime: string;   // "09:00"
  estimatedAttendees: number;
  isCriticalProtocolMoment: boolean;
  description?: string;
  provenance: SourceReference;
}

export interface VIPGuest {
  id: string;
  eventId: string;
  fullName: string;
  titleOrOffice: string;
  organization: string;
  protocolLevel: 'PRESIDENTIAL' | 'MINISTERIAL' | 'DIPLOMATIC' | 'CORPORATE_C_LEVEL';
  arrivalTime?: string;
  requiresDedicatedEscort: boolean;
  assignedStaffId?: string;
  notes?: string;
  provenance: SourceReference;
}

export interface OperationalRule {
  id: string;
  organizationId: string;
  level: 'L1_CORPORATE_SOP' | 'L2_CLIENT_CONTRACT' | 'L3_VENUE_SPECIFIC' | 'L4_AI_RECOMMENDATION';
  title: string;
  ruleText: string;
  priority: CriticalityLevel;
  contextScope?: string; // e.g. "COFFEE_BREAK", "VIP_HANDLING"
  isActive: boolean;
}

export interface Post {
  id: string;
  eventId: string;
  roomId: string;
  code: string; // e.g. "POST-ENTRADA-01"
  name: string;
  priority: CriticalityLevel;
  locationDetails: string;
  minStaff: number;
  idealStaff: number;
  requiredSkills: string[];
  requiresVipQualification: boolean;
  missionStatement: string;
  prohibitedActions: string[];
  accessRulesAllowed: string[];
  accessRulesDenied: string[];
  doActions: string[];
}

export interface Shift {
  id: string;
  postId: string;
  startTime: string; // "08:00"
  endTime: string;   // "11:00"
  requiredStaff: number;
  requiresVip: boolean;
  criticality: CriticalityLevel;
}

export interface StationBrief {
  id: string;
  assignmentId: string;
  postId: string;
  protocolName: string;
  postName: string;
  locationDetails: string;
  shiftHours: string;
  missionStatement: string;
  tasks: { id: string; text: string; done: boolean }[];
  prohibitedActions: { id: string; text: string; why: string }[]; // with "Porquê?" explanation
  accessAllowed: string[];
  accessDenied: string[];
  greetingScriptPt: string;
  greetingScriptEn?: string;
  vipListForPost: string[];
  escalationContacts: { name: string; role: string; phone: string }[];
  breakWindow?: { start: string; end: string; coverStaffName: string };
  whyExplanation: string;
  version: number;
}

export interface Assignment {
  id: string;
  shiftId: string;
  postId: string;
  staffId: string;
  status: AssignmentStatus;
  isLead: boolean;
  stationBrief?: StationBrief;
  checkedInAt?: string;
}

export interface ContingencySuggestion {
  id: string;
  title: string;
  description: string;
  impactScore: number; // 1-10
  actionType: 'REDUCE_NON_CRITICAL' | 'REALLOCATE_VOLUNTEER' | 'SHIFT_BREAK_TIME' | 'REQUEST_MORE_STAFF';
  actionPayload: any;
}

export interface OperationalConflictAlert {
  id: string;
  type: 'COVERAGE_DEFICIT' | 'DOUBLE_BOOKING' | 'SKILL_MISMATCH' | 'UNCOVERED_CRITICAL_POST' | 'FORBIDDEN_BREAK_COLLISION';
  severity: CriticalityLevel;
  message: string;
  timeWindow: string;
  affectedPostId?: string;
  affectedStaffId?: string;
  requiredStaff?: number;
  availableStaff?: number;
  deficit?: number;
  suggestions: ContingencySuggestion[];
  resolved: boolean;
}

export interface Incident {
  id: string;
  eventId: string;
  postId?: string;
  reporterStaffId: string;
  reporterName: string;
  category: IncidentCategory;
  priority: IncidentPriority;
  status: IncidentStatus;
  description: string;
  location: string;
  photoUrl?: string;
  timestamp: string;
  recommendedEscalation?: string;
  resolvedAt?: string;
  resolutionNotes?: string;
}

export interface EventChange {
  id: string;
  eventId: string;
  version: number;
  changeLevel: ChangeLevel;
  reason: string;
  author: string;
  timestamp: string;
  state: ChangeState;
  impactSummary: string;
  affectedPosts: string[];
  affectedStaff: string[];
  appliedAt?: string;
}

export interface AuditLogEntry {
  id: string;
  eventId: string;
  timestamp: string;
  actor: string;
  action: string;
  details: string;
  version: number;
}

export interface EventOperationalModel {
  id: string;
  title: string;
  clientName: string;
  venue: Venue;
  date: string;
  startTime: string;
  endTime: string;
  status: EventStatus;
  activeVersion: number;
  activities: Activity[];
  vipGuests: VIPGuest[];
  rules: OperationalRule[];
  posts: Post[];
  shifts: Shift[];
  assignments: Assignment[];
  conflicts: OperationalConflictAlert[];
  incidents: Incident[];
  changes: EventChange[];
  auditLogs: AuditLogEntry[];
  unresolvedAmbiguitiesCount: number;
}
