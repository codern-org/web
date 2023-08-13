import { isDevelopment, mockWorkspaces } from '@/libs/Mock';
import { Workspace } from '@/types/WorkspaceType';
import { create } from 'zustand';

type WorkspaceStore = {
  workspaces: Workspace[];
  filteredWorkspaces: Workspace[];

  actions: {
    filter: (filter: string) => void;
  };
};

const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  workspaces: isDevelopment ? mockWorkspaces : [],
  filteredWorkspaces: isDevelopment ? mockWorkspaces : [],

  actions: {
    filter: (filter) => {
      if (!filter) return;
      set((state) => ({
        filteredWorkspaces: state.workspaces.filter((workspace) => workspace.name.includes(filter)),
      }));
    },
  },
}));

export const useWorkspaces = () => useWorkspaceStore((state) => state.workspaces);
export const useFilteredWorkspaces = () => useWorkspaceStore((state) => state.filteredWorkspaces);
export const useWorkspaceAction = () => useWorkspaceStore((state) => state.actions);
