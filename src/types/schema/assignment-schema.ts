import { AssignmentLevel } from '@/types/workspace-type';
import * as z from 'zod';

export const CreateAssignmentSchema = z.object({
  name: z
    .string({ required_error: 'Please enter a name' })
    .min(1, { message: 'Please enter a name' }),
  description: z
    .string({ required_error: 'Please enter a description' })
    .min(1, { message: 'Please enter a description' }),
  memoryLimit: z
    .string({ required_error: 'Please enter a memory limit' })
    .min(1, { message: 'Please enter a memory limit' })
    .pipe(z.coerce.number()),
  timeLimit: z
    .string({ required_error: 'Please enter a time limit' })
    .min(1, { message: 'Please enter a time limit' })
    .pipe(z.coerce.number()),
  level: z.nativeEnum(AssignmentLevel, { required_error: 'Please select a level' }),
  detail: z
    .string({ required_error: 'Please enter a detail' })
    .min(1, { message: 'Please enter a detail' }),
  testcases: z
    .object({
      in: z
        .string({ required_error: 'Please enter an input' })
        .min(1, { message: 'Please enter an input' }),
      out: z
        .string({ required_error: 'Please enter an output' })
        .min(1, { message: 'Please enter an output' }),
    })
    .array()
    .min(1, 'At least 1 testcase is required'),
});

export type CreateAssignmentSchemaValues = z.infer<typeof CreateAssignmentSchema>;

export const CreateAssignmentDefaultValues: Partial<CreateAssignmentSchemaValues> = {};
