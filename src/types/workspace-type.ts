export type Workspace = {
  id: number;
  name: string;
  profileUrl: string;
  ownerId: string;
  createdAt: Date;

  ownerName: string;
  participantCount: number;
  totalAssignment: number;

  participants?: WorkspaceParticipant[];
};

export type WorkspaceParticipant = {
  userId: string;
  joinedAt: Date;
};

export type WorkspaceSelectorQuery = 'participants';

export type AssignmentLevel = 'EASY' | 'NORMAL' | 'HARD';

export type AssignmentStatus = 'TODO' | 'GRADING' | 'ERROR' | 'DONE';

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
  results: SubmissionResult[];
};

export type SubmissionResultStatus = 'GRADING' | 'ERROR' | 'DONE';

export type SubmissionResult = {
  testcaseId: number;
  status: SubmissionResultStatus;
  statusDetail?: string;
  memoryUsage?: number;
  timeUsage?: number;
  compilationLog?: string;
};
