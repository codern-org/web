import { Badge } from '@/components/common/badge';
import { Button } from '@/components/common/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/common/form';
import { Input } from '@/components/common/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/common/select';
import { Separator } from '@/components/common/separator';
import { Textarea } from '@/components/common/textarea';
import { AssignmentDetailPreview } from '@/components/features/workspace/content/assignment/assignment-detail-preview';
import { useCreateAssignmentForm } from '@/hooks/workspace-hook';
import { CreateAssignmentSchemaValues } from '@/types/schema/assignment-schema';
import { AssignmentLevel } from '@/types/workspace-type';
import {
  AlertTriangleIcon,
  ExternalLinkIcon,
  Loader2Icon,
  PlusIcon,
  TrashIcon,
} from 'lucide-react';
import { DragEvent } from 'react';

export const CreateAssignmentForm = () => {
  const {
    form,
    create,
    isEditing,
    isCreating,
    isLoading,
    testcases,
    appendTestcase,
    removeTestcase,
  } = useCreateAssignmentForm();

  const handleDropFile = <T extends HTMLInputElement | HTMLTextAreaElement>(
    event: DragEvent<T>,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    const { files } = event.dataTransfer;
    const reader = new FileReader();

    reader.onload = (readerEvent) => {
      const fileContent = readerEvent.target?.result;
      if (!fileContent) return;
      const fieldName = (event.target as T).name as keyof CreateAssignmentSchemaValues;
      form.setValue(fieldName, fileContent.toString());
    };
    reader.readAsText(files[0]);
  };

  if (isLoading) {
    // TODO: skeleton
    return <></>;
  }

  return (
    <div className="container py-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((assignment) => create(assignment))}
          className="flex h-full flex-col space-y-8 rounded-md border bg-background p-8 shadow"
        >
          <div className="py-2">
            <h2 className="text-2xl font-semibold">{isEditing ? 'Edit' : 'Create'} assignment</h2>
          </div>

          <Separator />

          <div className="flex w-full flex-row space-x-4">
            <div className="w-1/3">
              <div className="text-sm font-semibold text-muted-foreground">01</div>
              <h3 className="text-lg font-semibold">General</h3>
              <p className="text-xs text-muted-foreground">
                A briefly information of an assignment
              </p>
            </div>
            <div className="w-2/3 space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Assignment name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Description of an assignment"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an assignment level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={AssignmentLevel.EASY}>Easy</SelectItem>
                        <SelectItem value={AssignmentLevel.MEDIUM}>Medium</SelectItem>
                        <SelectItem value={AssignmentLevel.HARD}>Hard</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Separator />

          <div className="flex w-full flex-row space-x-4">
            <div className="w-1/3">
              <div className="text-sm font-semibold text-muted-foreground">02</div>
              <h3 className="text-lg font-semibold">Instruction</h3>
              <p className="text-xs text-muted-foreground">
                An instruction, how to complete an assignment
              </p>
            </div>
            <div className="w-2/3 space-y-4">
              <div className="flex flex-row space-x-4">
                <FormField
                  control={form.control}
                  name="timeLimit"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Time limit (ms)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Time limit in millisecond"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="memoryLimit"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Memory limit (kB)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Memory limit in kilobyte"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="detail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between">
                      Detail
                      <a
                        href="https://www.markdownguide.org/basic-syntax/"
                        target="_blank"
                      >
                        <Badge className="ml-2 space-x-1">
                          <span>Support markdown</span>
                          <ExternalLinkIcon className="h-3 w-3" />
                        </Badge>
                      </a>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-72"
                        placeholder="Detail of an assignment"
                        onDrop={handleDropFile}
                        {...field}
                      />
                    </FormControl>
                    <AssignmentDetailPreview detail={field.value || ''} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Separator />

          <div className="flex w-full flex-row space-x-4">
            <div className="w-1/3">
              <div className="text-sm font-semibold text-muted-foreground">03</div>
              <h3 className="text-lg font-semibold">Test case</h3>
              <p className="mb-6 text-xs text-muted-foreground">
                All possible testcases to test assignment submissions
              </p>
              <div className="rounded-md border p-4 leading-tight shadow-md">
                <div className="mb-1 flex items-center text-sm text-amber-500">
                  <AlertTriangleIcon className="mr-1 h-4 w-4" /> Warning
                </div>
                <span className="text-xs text-muted-foreground">
                  Be mindful of whitespace, as our system is particular about elements like
                  end-of-line characters and spaces between text
                </span>
              </div>
            </div>
            <div className="w-2/3">
              <FormField
                control={form.control}
                name="testcases"
                render={() => (
                  <FormItem className="space-y-4">
                    <div className="space-y-6">
                      {testcases.map((testcase, index) => (
                        <div
                          key={testcase.id}
                          className="space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <FormLabel>Testcase {index + 1}</FormLabel>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="h-6 px-2 text-xs"
                              onClick={() => removeTestcase(index)}
                            >
                              <TrashIcon className="mr-1 h-3 w-3" />
                              Remove
                            </Button>
                          </div>
                          <div className="flex space-x-4">
                            <FormField
                              control={form.control}
                              name={`testcases.${index}.in`}
                              render={({ field }) => (
                                <FormItem className="w-1/2">
                                  <FormLabel>Input</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      wrap="off"
                                      className="h-24"
                                      placeholder={`Input of testcase ${index + 1}`}
                                      onDrop={handleDropFile}
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`testcases.${index}.out`}
                              render={({ field }) => (
                                <FormItem className="w-1/2">
                                  <FormLabel>Output</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      wrap="off"
                                      className="h-24"
                                      placeholder={`Output of testcase ${index + 1}`}
                                      onDrop={handleDropFile}
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="mt-4 w-full"
                      onClick={() => appendTestcase({ in: '', out: '' })}
                    >
                      <PlusIcon className="mr-1 h-4 w-4" />
                      Add testcase
                    </Button>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Separator />

          <Button
            type="submit"
            disabled={isCreating}
          >
            {isCreating && <Loader2Icon className="mr-2 h-3 w-3 animate-spin" />}
            {isEditing ? 'Edit' : 'Create'}
          </Button>
        </form>
      </Form>
    </div>
  );
};
