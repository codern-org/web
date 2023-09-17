import { useEditor } from '@/hooks/editor-hook';
import { toast } from '@/hooks/toast-hook';
import { workspaceService } from '@/services/workspace-service';
import { WorkspaceSelectorQuery } from '@/types/workspace-type';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export const useCreateSubmissionQuery = (workspaceId: number, assignmentId: number) => {
  const { getCode, getLanguage } = useEditor();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const code = getCode();

  const submit = () => {
    if (!code) {
      toast({
        variant: 'danger',
        title: 'Try to write some codes',
        description: 'It looks like your editor is empty',
      });
      return;
    }

    setIsSubmitting(true);
    workspaceService
      .createSubmission(workspaceId, assignmentId, new Blob([code]), getLanguage())
      .then(() => {
        toast({
          title: 'Submit your code successfully',
          description: 'Our system is grading your code',
        });
      })
      .catch((error) =>
        toast({
          variant: 'danger',
          title: 'Cannot submit your code',
          description: error,
        }),
      )
      .finally(() => setIsSubmitting(false));
  };

  return { submit, isSubmitting };
};

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
