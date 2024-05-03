import { ToastAction } from '@/components/common/toast';
import { useStrictForm } from '@/hooks/form-hook';
import { useWorkspaceParams } from '@/hooks/router-hook';
import { toast } from '@/hooks/toast-hook';
import { useWebSocket } from '@/hooks/websocket-hook';
import { RoutePath, WorkspaceContent, isDefaultProfileUrl } from '@/libs/constants';
import { ApiService } from '@/services/api-service';
import { workspaceService } from '@/services/workspace-service';
import {
  CreateAssignmentSchema,
  CreateAssignmentSchemaValues,
  parseToCreateAssignmentSchema,
} from '@/types/schema/assignment-schema';
import {
  CreateInvitationSchemaValues,
  CreateWorkspaceFormDefaultValues,
  CreateWorkspaceFormSchema,
  CreateWorkspaceFormSchemaValues,
  UpdateWorkspaceFormDefaultValues,
  UpdateWorkspaceFormSchema,
  UpdateWorkspaceFormSchemaValues,
} from '@/types/schema/workspace-schema';
import { Assignment, CreateSubmissionParams, Submission, Workspace } from '@/types/workspace-type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useEffect, useRef } from 'react';
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
  const { mutate: update, isPending: isUpdating } = useUpdateAssignment(workspaceId, assignmentId);
  const isPending = isCreating || isUpdating;

  const { data: assignment, isLoading: isAssignmentLoading } = useGetAssignmentQuery(
    workspaceId,
    assignmentId,
    true,
  );

  const { data: testcases, isLoading: isTestcaseLoading } = useAssignmentTestcase(
    workspaceId,
    assignment,
    true,
  );
  const { data: detail, isLoading: isDetailLoading } = useAssignmentDetail(
    workspaceId,
    assignment,
    true,
  );
  const isLoading = isAssignmentLoading || isDetailLoading || isTestcaseLoading;

  const form = useStrictForm(CreateAssignmentSchema, { publishDate: new Date() });
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
    isPending,
    isLoading,
    testcases: testcaseFields,
    appendTestcase,
    removeTestcase,
  };
};

export const useCreateInvitation = (workspaceId: bigint) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (invitation: CreateInvitationSchemaValues) =>
      workspaceService.createInvitation(workspaceId, invitation),
    onSuccess: () => {
      toast({
        title: 'Create invitation successfully',
      });
      queryClient.invalidateQueries({ queryKey: ['workspaces', workspaceId, 'invitation'] });
    },
    onError: () => {
      toast({
        variant: 'danger',
        title: 'Cannot create invitation',
      });
    },
  });
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

export const useListSubmission = (workspaceId: bigint, assignmentId: bigint, all: boolean) =>
  useQuery({
    queryKey: [
      'workspaces',
      workspaceId,
      'assignments',
      assignmentId,
      'submissions',
      all ? 'all' : 'individual',
    ],
    queryFn: () => workspaceService.listSubmission(workspaceId, assignmentId, all),
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
    retry: false,
  });

export const useListSubmissionSubscription = (workspaceId: bigint, assignmentId: bigint) => {
  const queryClient = useQueryClient();
  const { subscribe, unsubscribe } = useWebSocket();

  useEffect(() => {
    const updateSubmissions = (newSubmission: Submission) => {
      queryClient.setQueryData(
        ['workspaces', workspaceId, 'assignments', assignmentId, 'submissions', 'individual'],
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

export const useListInvitationQuery = (workspaceId: bigint) =>
  useQuery({
    queryKey: ['workspaces', workspaceId, 'invitation'],
    queryFn: () => workspaceService.listInvitation(workspaceId),
  });

export const useGetWorkspaceQuery = (id: bigint) =>
  useQuery({
    queryKey: ['workspaces', id],
    queryFn: () => workspaceService.getWorkspace(id),
    staleTime: Infinity,
    gcTime: 0,
  });

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (workspace: CreateWorkspaceFormSchemaValues) =>
      workspaceService.createWorkspace(workspace),
    onSuccess: (newWorkspace) => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      toast({
        title: 'Create workspace successfully',
        description: '',
        action: (
          <ToastAction
            altText="View new workspace"
            onClick={() =>
              navigate(RoutePath.WORKSPACE(newWorkspace.id, WorkspaceContent.ASSIGNMENT))
            }
            children="View"
          />
        ),
      });
      navigate(RoutePath.DASHBOARD);
    },
    onError: (error) => {
      toast({
        variant: 'danger',
        title: 'Cannot create workspace',
        description: error.message,
      });
    },
  });
};

export const useCreateWorkspaceForm = () => {
  const { mutate: create, isPending: isCreating } = useCreateWorkspace();

  const form = useStrictForm(CreateWorkspaceFormSchema, CreateWorkspaceFormDefaultValues);
  const profileInputRef = useRef<HTMLInputElement>(null);
  const profileUrl = form.watch('profileUrl');

  const editProfile = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;
    const blobUrl = URL.createObjectURL(event.target.files[0]);
    form.setValue('profileUrl', blobUrl);
  };

  return {
    form,
    profileInputRef,
    profileUrl,
    editProfile,
    create,
    isCreating,
  };
};

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
    refetchInterval: 1 * 60 * 1000,
  });

export const useGetAssignmentQuery = (
  workspaceId: bigint,
  assignmentId: bigint | undefined,
  noRefetch: boolean = false,
) =>
  useQuery({
    enabled: !!assignmentId,
    queryKey: ['workspaces', workspaceId, 'assignments', assignmentId],
    queryFn: () => workspaceService.getAssignment(workspaceId, assignmentId!),
    refetchOnWindowFocus: !noRefetch,
  });

export const useAssignmentDetail = (
  workspaceId: bigint,
  assignment: Assignment | undefined,
  noRefetch: boolean = false,
) =>
  useQuery({
    enabled: !!assignment,
    queryKey: ['workspaces', workspaceId, 'assignments', assignment?.id, 'detail'],
    queryFn: () => workspaceService.getAssignmentDetail(assignment?.detailUrl as string),
    retry: false,
    refetchOnWindowFocus: !noRefetch,
  });

export const useAssignmentTestcase = (
  workspaceId: bigint,
  assignment: Assignment | undefined,
  noRefetch: boolean = false,
) =>
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
    retry: false,
    refetchOnWindowFocus: !noRefetch,
  });

type UseUpdateWorkspaceOptions = Partial<{
  refetchAll: boolean;
  notify: boolean;
}>;

const DefaultUseUpdateWorkspaceOptions: UseUpdateWorkspaceOptions = {
  refetchAll: false,
  notify: true,
};

export const useUpdateWorkspace = (
  workspaceId: bigint,
  options: UseUpdateWorkspaceOptions = DefaultUseUpdateWorkspaceOptions,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (workspace: UpdateWorkspaceFormSchemaValues) =>
      workspaceService.updateWorkspace(workspaceId, workspace),
    onSuccess: () => {
      if (options.refetchAll) {
        queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      } else {
        queryClient.invalidateQueries({ queryKey: ['workspaces', workspaceId] });
      }
      if (options.notify) {
        toast({
          title: 'Update workspace successfully',
        });
      }
    },
    onError: (error) => {
      toast({
        variant: 'danger',
        title: 'Cannot update this workspace',
        description: error.message,
      });
    },
  });
};

export const useUpdateWorkspaceForm = () => {
  const { workspaceId } = useWorkspaceParams();
  const { mutate: update, isPending: isUpdating } = useUpdateWorkspace(workspaceId);

  const { data: workspace, isPending: isLoading } = useGetWorkspaceQuery(workspaceId);

  const form = useStrictForm(UpdateWorkspaceFormSchema, UpdateWorkspaceFormDefaultValues);
  const profileInputRef = useRef<HTMLInputElement>(null);
  const profileUrl = form.watch('profileUrl');

  const editProfile = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;
    const blobUrl = URL.createObjectURL(event.target.files[0]);
    form.setValue('profileUrl', blobUrl);
  };

  useEffect(() => {
    if (!workspace) return;
    form.reset({
      name: workspace.name,
      profileUrl: isDefaultProfileUrl(workspace.profileUrl) ? undefined : workspace.profileUrl,
    });
  }, [form, workspace]);

  return {
    form,
    workspace,
    profileInputRef,
    profileUrl,
    editProfile,
    update,
    isLoading,
    isUpdating,
  };
};

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

export const useDeleteWorkspace = (workspaceId: bigint) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => workspaceService.deleteWorkspace(workspaceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      toast({
        title: 'Delete workspace successfully',
      });
      navigate(RoutePath.DASHBOARD);
    },
    onError: (error) => {
      toast({
        variant: 'danger',
        title: 'Cannot delete this workspace',
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

export const useDeleteInvitation = (workspaceId: bigint, invitationId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => workspaceService.deleteInvitation(workspaceId, invitationId),
    onSuccess: () => {
      toast({
        title: 'Delete invitation successfully',
      });
      queryClient.invalidateQueries({ queryKey: ['workspaces', workspaceId, 'invitation'] });
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

export const useDeleteWorkspaceParticipant = (workspaceId: bigint, userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => workspaceService.deleteParticipant(workspaceId, userId),
    onSuccess: () => {
      toast({
        title: 'Remove participant successfully',
      });
      queryClient.invalidateQueries({ queryKey: ['workspaces', workspaceId] });
    },
    onError: (error) => {
      toast({
        variant: 'danger',
        title: 'Cannot remove this participant',
        description: error.message,
      });
    },
  });
};
