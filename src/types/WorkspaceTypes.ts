export type Workspace = {
  id: number;
  name: string;
  profileUrl: string;
  ownerId: string;
  createdAt: Date;

  totalAssignment?: number;
  progression?: number;
  ownerName?: string;
  participants?: WorkspaceParticipant[];
  participantCount?: number;
};

export type WorkspaceParticipant = {
  userId: string;
  joinedAt: Date;
};

export type WorkspaceSelectorQuery = 'ownerName' | 'participants';
