export type Workspace = {
  id: bigint;
  name: string;
  profileUrl: string;
  createdAt: Date;

  ownerName: string;
  ownerProfileUrl: string;
  participantCount: number;
  totalAssignment: number;
  completedAssignment: number;
  role: WorkspaceRole;
  favortie: boolean;
  joinedAt: Date;
  recentlyVisitedAt: Date;

  participants?: WorkspaceParticipant[];
};

export enum WorkspaceRole {
  MEMBER = 'MEMBER',
  ADMIN = 'ADMIN',
  OWNER = 'OWNER',
}

export type WorkspaceParticipant = {
  userId: string;
  name: string;
  role: WorkspaceRole;
  profileUrl: string;
  joinedAt: Date;
};

export type WorkspaceRank = {
  userId: string;
  displayName: string;
  profileUrl: string;
  score: number;
  completedAssignment: number;
  totalSubmissions: number;
  lastSubmittedAt: Date;
};

export enum AssignmentLevel {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

export enum AssignmentStatus {
  TODO = 'TODO',
  GRADING = 'GRADING',
  INCOMPLETED = 'INCOMPLETED',
  COMPLETED = 'COMPLETED',
}

export type Assignment = {
  id: bigint;
  name: string;
  description: string;
  detailUrl: string;
  memoryLimit: number;
  timeLimit: number;
  score: number | null;
  maxScore: number;
  level: AssignmentLevel;
  updatedAt: Date;
  createdAt: Date;
  dueDate: Date;
  status: AssignmentStatus;
  testcases: Testcase[];
  lastSubmittedAt: Date;
};

export type Testcase = {
  id: bigint;
  inputFileUrl: string;
  outputFileUrl: string;
};

export type Submission = {
  id: bigint;
  submitterId: string;
  submitterName: string;
  submitterProfileUrl: string;
  language: string;
  status: AssignmentStatus;
  score: number;
  fileUrl: string;
  submittedAt: Date;
  compilationLog?: string;
  results?: SubmissionResult[];
};

export type CreateSubmissionParams = {
  code: string;
  language: Submission['language'];
};

export type SubmissionResult = {
  testcaseId: bigint;
  isPassed: boolean;
  status: SubmissionStatusDetail;
  memoryUsage: number;
  timeUsage: number;
  compilationLog: string;
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
