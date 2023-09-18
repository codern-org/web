import { useEditor } from '@/hooks/editor-hook';
import { toast } from '@/hooks/toast-hook';
import { workspaceService } from '@/services/workspace-service';
import { Assignment, WorkspaceSelectorQuery } from '@/types/workspace-type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useCreateSubmissionQuery = (workspaceId: number, assignmentId: number) => {
  const queryClient = useQueryClient();
  const { getCode, getLanguage } = useEditor();

  const { mutate: createSubmission, isLoading: isSubmitting } = useMutation({
    mutationFn: ({ blob, language }: { blob: Blob; language: string }) =>
      workspaceService.createSubmission(workspaceId, assignmentId, blob, language),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submission'] });
      toast({
        title: 'Submit your code successfully',
        description: 'Our system is grading your code',
      });
    },
    onError: (error) => {
      toast({
        variant: 'danger',
        title: 'Cannot submit your code',
        description: error as string,
      });
    },
  });

  const submit = () => {
    const code = getCode();
    if (!code) {
      toast({
        variant: 'danger',
        title: 'Try to write some codes',
        description: 'It looks like your editor is empty',
      });
      return;
    }
    createSubmission({ blob: new Blob([code]), language: getLanguage() });
  };

  return { submit, isSubmitting };
};

export const useListWorkspaceQuery = (selector?: WorkspaceSelectorQuery[]) =>
  useQuery(['workspace', selector], () => workspaceService.listWorkspace(selector));

export const useListRecentWorkspaceQuery = () =>
  useQuery(['workspace', 'recent'], () => workspaceService.listRecentWorkspace());

export const useListAssignmentQuery = (workspaceId: number) =>
  useQuery(['assignment'], () => workspaceService.listAssignment(workspaceId));

export const useListSubmissionQuery = (workspaceId: number, assignmentId: number) =>
  useQuery(['submission'], () => workspaceService.listSubmission(workspaceId, assignmentId));

export const useGetWorkspaceQuery = (id: number, selector?: WorkspaceSelectorQuery[]) =>
  useQuery(['workspace', id, selector], () => workspaceService.getWorkspace(id, selector));

export const useGetAssignmentQuery = (workspaceId: number, assignmentId: number) =>
  useQuery(['assignment', assignmentId], () =>
    workspaceService.getAssignment(workspaceId, assignmentId),
  );

export const useGetProblemDetailQuery = (assignment: Assignment | undefined) => {
  const [problemDetail, setProblemDetail] = useState<string>();

  useEffect(() => {
    if (!assignment?.detailUrl) return;
    axios
      .get(assignment.detailUrl)
      .then((response) => setProblemDetail(response.data))
      .catch(console.error);
  }, [assignment]);

  return { problemDetail };
};
