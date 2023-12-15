import { toast, useToast } from '@/hooks/toast-hook';
import { useWebSocket } from '@/hooks/websocket-hook';
import { ApiService } from '@/services/api-service';
import { workspaceService } from '@/services/workspace-service';
import { Assignment, CreateSubmissionParams, Submission } from '@/types/workspace-type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';

export const useCreateSubmission = (workspaceId: number, assignmentId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ code, language }: CreateSubmissionParams) =>
      workspaceService.createSubmission(workspaceId, assignmentId, code, language),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['workspaces', workspaceId, 'assignments', assignmentId, 'submissions'],
      });
      toast({
        title: 'Submit your code successfully',
        description: 'Our system is grading your code',
      });
    },
    onError: (error) => {
      toast({
        variant: 'danger',
        title: 'Cannot submit your code',
        description: error.message,
      });
    },
  });
};

export const useListSubmission = (workspaceId: number, assignmentId: number) =>
  useQuery({
    queryKey: ['workspaces', workspaceId, 'assignments', assignmentId, 'submissions'],
    queryFn: () => workspaceService.listSubmission(workspaceId, assignmentId),
  });

export const useGetSubmissionCode = (
  workspaceId: number,
  assignmentId: number,
  submissionId: number,
  url: string | undefined,
) =>
  useQuery({
    enabled: !!url,
    queryKey: [
      'workspaces',
      workspaceId,
      'assignments',
      assignmentId,
      'submissions',
      submissionId,
      'code',
    ],
    queryFn: () => workspaceService.getSubmissionCode(url as string),
    retry: (failureCount, error) => {
      if (axios.isAxiosError(error) && error.response?.status === 404) return false;
      if (ApiService.isDomainError(error) && error.code === 3001) return false;
      return failureCount !== 3;
    },
  });

export const useListSubmissionSubscription = (workspaceId: number, assignmentId: number) => {
  const queryClient = useQueryClient();
  const { subscribe, unsubscribe } = useWebSocket();
  const { toast } = useToast();

  useEffect(() => {
    const updateSubmissions = (newSubmission: Submission) => {
      queryClient.setQueryData(
        ['workspaces', workspaceId, 'assignments', assignmentId, 'submissions'],
        (submission: Submission[]) => {
          return submission.map((submission) => {
            if (submission.id === newSubmission.id) return newSubmission;
            return submission;
          });
        },
      );
      toast({
        title: `Submission grading is done!`,
        description: 'Please check the result',
      });
    };

    subscribe('onSubmissionUpdate', updateSubmissions);
    return () => unsubscribe('onSubmissionUpdate', updateSubmissions);
  }, [queryClient, subscribe, unsubscribe, toast, workspaceId, assignmentId]);
};

export const useListWorkspaceQuery = () =>
  useQuery({
    queryKey: ['workspaces'],
    queryFn: () => workspaceService.listWorkspace(),
  });

export const useListWorkspaceParticipantQuery = (workspaceId: number) =>
  useQuery({
    queryKey: ['workspaces', workspaceId, 'participants'],
    queryFn: () => workspaceService.listWorkspaceParticipant(workspaceId),
    staleTime: Infinity,
    gcTime: 0,
  });

export const useListAssignmentQuery = (workspaceId: number) =>
  useQuery({
    queryKey: ['workspaces', workspaceId, 'assignments'],
    queryFn: () => workspaceService.listAssignment(workspaceId),
    staleTime: Infinity,
    gcTime: 0,
  });

export const useGetWorkspaceQuery = (id: number) =>
  useQuery({
    queryKey: ['workspaces', id],
    queryFn: () => workspaceService.getWorkspace(id),
    staleTime: Infinity,
    gcTime: 0,
  });

export const useGetScoreboardQuery = (workspaceId: number) =>
  useQuery({
    queryKey: ['workspace', workspaceId, 'scoreboard'],
    queryFn: () => workspaceService.getScoreboard(workspaceId),
  });

export const useGetAssignmentQuery = (workspaceId: number, assignmentId: number) =>
  useQuery({
    queryKey: ['workspaces', workspaceId, 'assignments', assignmentId],
    queryFn: () => workspaceService.getAssignment(workspaceId, assignmentId),
  });

export const useAssignmentDetail = (workspaceId: number, assignment: Assignment | undefined) =>
  useQuery({
    enabled: !!assignment,
    queryKey: ['workspaces', workspaceId, 'assignments', assignment?.id, 'detail'],
    queryFn: () => workspaceService.getAssignmentDetail(assignment?.detailUrl as string),
    retry: (failureCount, error) => {
      if (axios.isAxiosError(error) && error.response?.status === 404) return false;
      if (ApiService.isDomainError(error) && error.code === 3001) return false;
      return failureCount !== 3;
    },
  });
