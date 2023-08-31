import * as z from 'zod';

// prettier-ignore
export const SignInFormSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: 'Please use a valid email address' }),
  password: z
    .string()
    .trim()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(24, { message: 'Password cannot be more than 24 characters' })
});

export type SignInFormValues = z.infer<typeof SignInFormSchema>;

export const SignInFormDefaultValues: Partial<SignInFormValues> = {
  email: '',
  password: '',
};
