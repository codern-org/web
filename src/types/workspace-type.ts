export type Workspace = {
  id: number;
  name: string;
  profileUrl: string;
  createdAt: Date;

  ownerName: string;
  ownerProfileUrl: string;
  participantCount: number;
  totalAssignment: number;

  participants?: WorkspaceParticipant[];
};

export enum WorkspaceRole {
  MEMBER = 'MEMBER',
  ADMIN = 'ADMIN',
  OWNER = 'OWNER',
}

export type WorkspaceParticipant = {
  userId: string;
  role: WorkspaceRole;
  joinedAt: Date;
};

export enum WorkspaceFilter {
  PARTICIPANT = 'participants',
}

export enum AssignmentLevel {
  EASY = 'EASY',
  NORMAL = 'NORMAL',
  HARD = 'HARD',
}

export enum AssignmentStatus {
  TODO = 'TODO',
  GRADING = 'GRADING',
  ERROR = 'ERROR',
  DONE = 'DONE',
}

export type Assignment = {
  id: number;
  name: string;
  description: string;
  detailUrl: string;
  memoryLimit: number;
  timeLimit: number;
  level: AssignmentLevel;
  createdAt: Date;
  updatedAt: Date;

  lastSubmittedAt: Date;
  status: AssignmentStatus;
};

export type Submission = {
  id: number;
  language: string;
  submittedAt: Date;
  compilationLog: string;
  results: SubmissionResult[];
};

export enum SubmissionResultStatus {
  GRADING = 'GRADING',
  ERROR = 'ERROR',
  DONE = 'DONE',
}

export type SubmissionResult = {
  testcaseId: number;
  status: SubmissionResultStatus;
  statusDetail?: string;
  memoryUsage?: number;
  timeUsage?: number;
  compilationLog?: string;
};

export enum SubmissionStatusDetail {
  COMPLETED = 'COMPLETED',

  FAIL_COMPILATION = 'FAIL_COMPILATION',
  FAIL_TIMEOUT = 'FAIL_TIMEOUT',
  FAIL_TIMEOUT_HARD = 'FAIL_TIMEOUT_HARD',
  FAIL_MEMORY = 'FAIL_MEMORY',

  SYSTEM_FAIL = 'SYSTEM_FAIL',
  SYSTEM_FAIL_MISSING_IMAGE = 'SYSTEM_FAIL_MISSING_IMAGE',
  SYSTEM_FAIL_FETCH_FILE = 'SYSTEM_FAIL_FETCH_FILE',
  SYSTEM_FAIL_CONTAINER = 'SYSTEM_FAIL_CONTAINER',
  SYSTEM_FAIL_CONTAINER_PING = 'SYSTEM_FAIL_CONTAINER_PING',
  SYSTEM_FAIL_RETRY_EXCEED = 'SYSTEM_FAIL_RETRY_EXCEED',

  UNKNOWN = 'UNKNOWN',
}
