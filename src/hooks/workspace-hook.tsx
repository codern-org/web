import { workspaceService } from '@/services/workspace-service';
import { WorkspaceSelectorQuery } from '@/types/workspace-type';
import { useQuery } from '@tanstack/react-query';

export const useListWorkspaceQuery = (selector?: WorkspaceSelectorQuery[]) =>
  useQuery(['workspace', selector], () => workspaceService.listWorkspace(selector));

export const useListAssignmentQuery = (workspaceId: number) =>
  useQuery(['workspace', workspaceId, 'assignment'], () =>
    workspaceService.listAssignment(workspaceId),
  );

export const useGetWorkspaceQuery = (id: number, selector?: WorkspaceSelectorQuery[]) =>
  useQuery(['workspace', id, selector], () => workspaceService.getWorkspace(id, selector));
