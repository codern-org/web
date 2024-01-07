import * as z from 'zod';

export const JoinWorkspaceFormSchema = z.object({
  invitationId: z
    .string({ required_error: 'Please enter an invitation code' })
    .min(1, { message: 'Please enter an invitation code' }),
});

export type JoinWorkspaceFormSchemaValues = z.infer<typeof JoinWorkspaceFormSchema>;

export const JoinWorkspaceFormDefaultValues: Partial<JoinWorkspaceFormSchemaValues> = {
  invitationId: '',
};
