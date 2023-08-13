import { Workspace } from '@/types/WorkspaceType';

export const isDevelopment = import.meta.env.DEV;

export const mockWorkspaces: Workspace[] = Array(5)
  .fill(0)
  .map((_, index) => ({
    id: index,
    name: 'BangMod Hackthon 2023',
    owner: 'KMUTT',
    participants: Math.floor(Math.random() * 1500) + 1,
    completeQuestions: Math.floor(Math.random() * 10) + 0,
    totalQuestions: 10,
  }));
