import * as z from 'zod';

export const CreateWorkspaceFormSchema = z.object({
  name: z
    .string({ required_error: 'Please enter a workspace name' })
    .trim()
    .min(1, { message: 'Workspace name must be at least 1 character' }),
  profileUrl: z.string().trim().optional(),
});

export type CreateWorkspaceFormSchemaValues = z.infer<typeof CreateWorkspaceFormSchema>;

export const CreateWorkspaceFormDefaultValues: Partial<CreateWorkspaceFormSchemaValues> = {};

export const JoinWorkspaceFormSchema = z.object({
  invitationId: z
    .string({ required_error: 'Please enter an invitation code' })
    .min(1, { message: 'Please enter an invitation code' }),
});

export type JoinWorkspaceFormSchemaValues = z.infer<typeof JoinWorkspaceFormSchema>;

export const JoinWorkspaceFormDefaultValues: Partial<JoinWorkspaceFormSchemaValues> = {
  invitationId: '',
};

export const UpdateWorkspaceFormSchema = z.object({
  name: z
    .string({ required_error: 'Please enter a workspace name' })
    .trim()
    .min(1, { message: 'Workspace name must be at least 1 character' })
    .optional(),
  favorite: z.boolean().optional(),
  profileUrl: z.string().trim().optional(),
});

export type UpdateWorkspaceFormSchemaValues = z.infer<typeof UpdateWorkspaceFormSchema>;

export const UpdateWorkspaceFormDefaultValues: Partial<UpdateWorkspaceFormSchemaValues> = {};

export const DeleteWorkspaceFormSchema = z.object({
  confirmation: z
    .string({ required_error: 'Please enter current workspace name to confirm' })
    .trim(),
});

export type DeleteWorkspaceFormSchemaValues = z.infer<typeof DeleteWorkspaceFormSchema>;

export const DeleteWorkspaceFormDefaultValues: Partial<DeleteWorkspaceFormSchemaValues> = {};
