import { Button } from '@/components/common/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/common/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/common/form';
import { Input } from '@/components/common/input';
import { ToastAction } from '@/components/common/toast';
import { useStrictForm } from '@/hooks/form-hook';
import { useToast } from '@/hooks/toast-hook';
import { workspaceService } from '@/services/workspace-service';
import {
  JoinWorkspaceFormDefaultValues,
  JoinWorkspaceFormSchema,
  JoinWorkspaceFormSchemaValues,
} from '@/types/schema/workspace-schema';
import { PlusIcon } from 'lucide-react';

export const AddWorkspaceDialog = () => {
  const form = useStrictForm(JoinWorkspaceFormSchema, JoinWorkspaceFormDefaultValues);
  const { toast } = useToast();

  const onSubmit = (data: JoinWorkspaceFormSchemaValues) => {
    workspaceService
      .joinWorkspace(data.invitationId)
      .then(() => {
        toast({
          title: 'Join workspace successfully',
          description: '',
          action: <ToastAction altText="View joined workspace">View</ToastAction>, // TODO: view
        });
      })
      .catch((error) => {
        let description = 'Please try again later';
        if (error.code === 31003) description = 'Invitation code is incorrect';
        toast({
          variant: 'danger',
          title: 'Cannot join workspace',
          description,
        });
      });
  };

  return (
    <Dialog onOpenChange={() => form.reset()}>
      <DialogTrigger asChild>
        <Button size="sm">
          <PlusIcon className="mr-0.5 h-4 w-4" />
          Workspace
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new workspace</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="invitationId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Invitation code</FormLabel>
                  <FormControl>
                    <div className="flex space-x-2">
                      <Input
                        className="h-9"
                        {...field}
                      />
                      <Button
                        type="submit"
                        size="sm"
                      >
                        <PlusIcon className="mr-0.5 h-4 w-4" />
                        Join
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
