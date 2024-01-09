import { ToastAction } from '@/components/common/toast';
import { useStrictForm } from '@/hooks/form-hook';
import { useWorkspaceParams } from '@/hooks/router-hook';
import { toast } from '@/hooks/toast-hook';
import { useWebSocket } from '@/hooks/websocket-hook';
import { RoutePath, WorkspaceContent } from '@/libs/constants';
import { ApiService } from '@/services/api-service';
import { workspaceService } from '@/services/workspace-service';
import {
  CreateAssignmentDefaultValues,
  CreateAssignmentSchema,
  CreateAssignmentSchemaValues,
  parseToCreateAssignmentSchema,
} from '@/types/schema/assignment-schema';
import { Assignment, CreateSubmissionParams, Submission, Workspace } from '@/types/workspace-type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const useCreateAssignment = (workspaceId: bigint) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (assignment: CreateAssignmentSchemaValues) =>
      workspaceService.createAssignment(workspaceId, assignment),
    onSuccess: (assignment) => {
      queryClient.invalidateQueries({ queryKey: ['workspaces', workspaceId, 'assignments'] });
      toast({
        title: 'Create assignment successfully',
        description: `New assignment ${assignment.name}`,
      });
      navigate(RoutePath.WORKSPACE(workspaceId, WorkspaceContent.ASSIGNMENT));
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

export const useCreateAssignmentForm = () => {
  const { workspaceId, assignmentId } = useWorkspaceParams();
  const { mutate: create, isPending: isCreating } = useCreateAssignment(workspaceId);
  const { mutate: update, isPending: isDeleting } = useUpdateAssignment(workspaceId, assignmentId);

  const { data: assignment, isLoading: isAssignmentLoading } = useGetAssignmentQuery(
    workspaceId,
    assignmentId,
  );
  const { data: testcases, isLoading: isTestcaseLoading } = useAssignmentTestcase(
    workspaceId,
    assignment,
  );
  const { data: detail, isLoading: isDetailLoading } = useAssignmentDetail(workspaceId, assignment);
  const isLoading = isAssignmentLoading || isDetailLoading || isTestcaseLoading;

  const form = useStrictForm(CreateAssignmentSchema, CreateAssignmentDefaultValues);
  const {
    fields: testcaseFields,
    append: appendTestcase,
    remove: removeTestcase,
  } = useFieldArray({
    control: form.control,
    name: 'testcases',
  });

  useEffect(() => {
    if (!assignment || !detail || !testcases) return;
    form.reset(parseToCreateAssignmentSchema(assignment, detail, testcases));
  }, [form, assignment, detail, testcases]);

  return {
    form,
    create,
    update,
    isEditing: !!assignment,
    isCreating,
    isDeleting,
    isLoading,
    testcases: testcaseFields,
    appendTestcase,
    removeTestcase,
  };
};

export const useCreateSubmission = (workspaceId: bigint, assignmentId: bigint) => {
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

export const useListSubmission = (workspaceId: bigint, assignmentId: bigint) =>
  useQuery({
    queryKey: ['workspaces', workspaceId, 'assignments', assignmentId, 'submissions'],
    queryFn: () => workspaceService.listSubmission(workspaceId, assignmentId),
  });

export const useGetSubmissionCode = (
  workspaceId: bigint,
  assignmentId: bigint,
  submissionId: bigint,
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

export const useListSubmissionSubscription = (workspaceId: bigint, assignmentId: bigint) => {
  const queryClient = useQueryClient();
  const { subscribe, unsubscribe } = useWebSocket();

  useEffect(() => {
    const updateSubmissions = (newSubmission: Submission) => {
      queryClient.setQueryData(
        ['workspaces', workspaceId, 'assignments', assignmentId, 'submissions'],
        (submissions: Submission[]) => {
          return submissions.map((submission) => {
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
  }, [queryClient, subscribe, unsubscribe, workspaceId, assignmentId]);
};

export const useListWorkspaceQuery = () =>
  useQuery({
    queryKey: ['workspaces'],
    queryFn: () => workspaceService.listWorkspace(),
  });

export const useListWorkspaceParticipantQuery = (workspaceId: bigint) =>
  useQuery({
    queryKey: ['workspaces', workspaceId, 'participants'],
    queryFn: () => workspaceService.listWorkspaceParticipant(workspaceId),
    staleTime: Infinity,
    gcTime: 0,
  });

export const useListAssignmentQuery = (workspaceId: bigint) =>
  useQuery({
    queryKey: ['workspaces', workspaceId, 'assignments'],
    queryFn: () => workspaceService.listAssignment(workspaceId),
    staleTime: Infinity,
    gcTime: 0,
  });

export const useGetWorkspaceQuery = (id: bigint) =>
  useQuery({
    queryKey: ['workspaces', id],
    queryFn: () => workspaceService.getWorkspace(id),
    staleTime: Infinity,
    gcTime: 0,
  });

export const useJoinWorkspace = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (invitationCode: string) => workspaceService.joinWorkspace(invitationCode),
    onSuccess: (joinedWorkspace) => {
      queryClient.setQueryData(['workspaces'], (workspaces: Workspace[]) =>
        workspaces.concat(joinedWorkspace),
      );
      toast({
        title: 'Join workspace successfully',
        description: '',
        action: (
          <ToastAction
            altText="View joined workspace"
            onClick={() =>
              navigate(RoutePath.WORKSPACE(joinedWorkspace.id, WorkspaceContent.ASSIGNMENT))
            }
            children="View"
          />
        ),
      });
    },
    onError: (error) => {
      let description = 'Please try again later';
      if (ApiService.isDomainError(error)) {
        const domainErrorMessage = {
          31003: 'Invitation code is incorrect',
          30004: 'You already in the workspace',
        }[error.code];
        domainErrorMessage && (description = domainErrorMessage);
      }
      toast({
        variant: 'danger',
        title: 'Cannot join workspace',
        description,
      });
    },
  });
};

export const useGetScoreboardQuery = (workspaceId: bigint) =>
  useQuery({
    queryKey: ['workspace', workspaceId, 'scoreboard'],
    queryFn: () => workspaceService.getScoreboard(workspaceId),
  });

export const useGetAssignmentQuery = (workspaceId: bigint, assignmentId: bigint | undefined) =>
  useQuery({
    enabled: !!assignmentId,
    queryKey: ['workspaces', workspaceId, 'assignments', assignmentId],
    queryFn: () => workspaceService.getAssignment(workspaceId, assignmentId!),
  });

export const useAssignmentDetail = (workspaceId: bigint, assignment: Assignment | undefined) =>
  useQuery({
    enabled: !!assignment,
    queryKey: ['workspaces', workspaceId, 'assignments', assignment?.id, 'detail'],
    queryFn: () => workspaceService.getAssignmentDetail(assignment?.detailUrl as string),
    retry: (failureCount, error) => {
      if (axios.isAxiosError(error) && error.response?.status === 404) return false;
      if (ApiService.isDomainError(error) && error.code === 30001) return false;
      return failureCount !== 3;
    },
  });

export const useAssignmentTestcase = (workspaceId: bigint, assignment: Assignment | undefined) =>
  useQuery({
    enabled: !!assignment,
    queryKey: ['workspaces', workspaceId, 'assignments', assignment?.id, 'testcases'],
    queryFn: async () => {
      const testcases = assignment!.testcases.map((testcase) => ({
        in: workspaceService.getAssignmentTestcase(testcase.inputFileUrl),
        out: workspaceService.getAssignmentTestcase(testcase.outputFileUrl),
      }));
      await Promise.all(testcases);

      const result = [];
      for (const entry of testcases) {
        result.push({
          in: await entry.in,
          out: await entry.out,
        });
      }
      return result;
    },
    retry: (failureCount, error) => {
      if (axios.isAxiosError(error) && error.response?.status === 404) return false;
      if (ApiService.isDomainError(error) && error.code === 30001) return false;
      return failureCount !== 3;
    },
  });

export const useUpdateAssignment = (workspaceId: bigint, assignmentId: bigint) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (assignment: CreateAssignmentSchemaValues) =>
      workspaceService.updateAssignment(workspaceId, assignmentId, assignment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['workspaces', workspaceId, 'assignments', assignmentId],
      });
      toast({
        title: 'Update assignment successfully',
      });
      navigate(RoutePath.WORKSPACE(workspaceId, WorkspaceContent.ASSIGNMENT));
    },
    onError: (error) => {
      toast({
        variant: 'danger',
        title: 'Cannot update this assignment',
        description: error.message,
      });
    },
  });
};

export const useDeleteAssignment = (workspaceId: bigint, assignmentId: bigint) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => workspaceService.deleteAssignment(workspaceId, assignmentId),
    onSuccess: () => {
      queryClient.setQueryData(
        ['workspaces', workspaceId, 'assignments'],
        (assignments: Assignment[]) => {
          return assignments.filter((assignment) => assignment.id !== assignmentId);
        },
      );
      toast({
        title: 'Delete assignment successfully',
      });
      navigate(RoutePath.WORKSPACE(workspaceId, WorkspaceContent.ASSIGNMENT));
    },
    onError: (error) => {
      toast({
        variant: 'danger',
        title: 'Cannot delete this assignment',
        description: error.message,
      });
    },
  });
};
