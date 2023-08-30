import { workspaceService } from '@/services/WorkspaceService';
import { WorkspaceSelectorQuery } from '@/types/WorkspaceTypes';
import { useQuery } from '@tanstack/react-query';

export const useListWorkspaceQuery = (selector?: WorkspaceSelectorQuery[]) =>
  useQuery(['workspace', selector], () => workspaceService.listWorkspace(selector));

export const useGetWorkspaceQuery = (id: number, selector?: WorkspaceSelectorQuery[]) =>
  useQuery(['workspace', id, selector], () => workspaceService.getWorkspace(id, selector));
