import { workspaceService } from '@/services/workspace-service';
import { WorkspaceSelectorQuery } from '@/types/workspace-type';
import { useQuery } from '@tanstack/react-query';

export const useListWorkspaceQuery = (selector?: WorkspaceSelectorQuery[]) =>
  useQuery(['workspace', selector], () => workspaceService.listWorkspace(selector));

export const useListRecentWorkspaceQuery = () =>
  useQuery(['workspace', 'recent'], () => workspaceService.listRecentWorkspace());

export const useListAssignmentQuery = (workspaceId: number) =>
  useQuery(['assignment'], () => workspaceService.listAssignment(workspaceId));

export const useGetWorkspaceQuery = (id: number, selector?: WorkspaceSelectorQuery[]) =>
  useQuery(['workspace', id, selector], () => workspaceService.getWorkspace(id, selector));

export const useGetAssignmentQuery = (workspaceId: number, assignmentId: number) =>
  useQuery(['assignment', assignmentId], () =>
    workspaceService.getAssignment(workspaceId, assignmentId),
  );
