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
