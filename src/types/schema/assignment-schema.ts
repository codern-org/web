import { Assignment, AssignmentLevel } from '@/types/workspace-type';
import * as z from 'zod';

export const CreateAssignmentSchema = z.object({
  name: z
    .string({ required_error: 'Please enter a name' })
    .min(1, { message: 'Please enter a name' }),
  description: z
    .string({ required_error: 'Please enter a description' })
    .min(1, { message: 'Please enter a description' }),
  memoryLimit: z.coerce
    .number({ required_error: 'Please enter a memory limit' })
    .min(1, { message: 'Please enter a memory limit' }),
  timeLimit: z.coerce
    .number({ required_error: 'Please enter a time limit' })
    .min(1, { message: 'Please enter a time limit' }),
  level: z.nativeEnum(AssignmentLevel, { required_error: 'Please select a level' }),
  publishDate: z.date({ required_error: 'Please select a publish date' }),
  dueDate: z.date().optional().nullable(),
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

export const parseToCreateAssignmentSchema = (
  assignment: Assignment,
  detail: string,
  testcases: CreateAssignmentSchemaValues['testcases'],
): CreateAssignmentSchemaValues => {
  const { name, description, memoryLimit, timeLimit, level, dueDate } = assignment;
  return {
    name,
    description,
    memoryLimit,
    timeLimit,
    level,
    dueDate,
    detail,
    testcases,
  } as CreateAssignmentSchemaValues;
};
