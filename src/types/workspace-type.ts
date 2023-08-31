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

export type WorkspaceSelectorQuery = 'ownerName' | 'participants';

export type AssignmentLevel = 'EASY' | 'NORMAL' | 'HARD';

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
};
