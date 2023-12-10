import * as z from 'zod';

export const SettingsProfileSchema = z.object({
  displayName: z.string().trim(),
  email: z.string().trim().email({ message: 'Please use a valid email address' }),
  profileUrl: z.instanceof(File).or(z.string().url()).nullable(),
});

export type SettingsProfileValues = z.infer<typeof SettingsProfileSchema>;
