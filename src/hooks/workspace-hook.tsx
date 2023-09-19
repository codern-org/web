import { useEditor } from '@/hooks/editor-hook';
import { toast, useToast } from '@/hooks/toast-hook';
import { useWebSocket } from '@/hooks/websocket-hook';
import { Axios } from '@/libs/axios';
import { workspaceService } from '@/services/workspace-service';
import { Assignment, Submission, WorkspaceSelectorQuery } from '@/types/workspace-type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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

export const useListSubmission = (workspaceId: number, assignmentId: number) => {
  const { data } = useListSubmissionQuery(workspaceId, assignmentId);
  const [submissions, setSubmissions] = useState<Submission[] | undefined>([]);
  const { onSocket } = useWebSocket();
  const { toast } = useToast();

  // Update a new submission from websocket by mutation technique
  // Could `queryClient.invalidateQueries` be a better way?
  useEffect(() => {
    onSocket('onSubmissionUpdate', (newSubmission: Submission) => {
      if (!submissions) return;
      const index = submissions.findIndex((submission) => submission.id === newSubmission.id);
      if (index === -1) return;

      submissions[index] = newSubmission;
      setSubmissions(submissions.slice());

      toast({
        title: `Submission grading is done!`,
        description: 'Please check the result',
      });
    });
  }, [submissions, onSocket, toast]);

  // Sync react-query state with react state for mutation
  useEffect(() => setSubmissions(data), [data]);

  return { submissions };
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

    if (assignment.detailUrl.startsWith('/')) {
      assignment.detailUrl = import.meta.env.VITE_BACKEND_URL + '/file' + assignment.detailUrl;
    }

    Axios.get(assignment.detailUrl)
      .then((response) => setProblemDetail(response.data))
      .catch(console.error);
  }, [assignment]);

  return { problemDetail };
};
