import * as z from 'zod';

export const SurveyFormSchema = z.object({
  message: z
    .string({ required_error: 'Please enter a text' })
    .min(1, { message: 'Please enter a text' }),
});

export type SurveyFormSchemaValues = z.infer<typeof SurveyFormSchema>;

export const SurveyFormDefaultValues: Partial<SurveyFormSchemaValues> = {
  message: '',
};
