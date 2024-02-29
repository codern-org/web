import { Button } from '@/components/common/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/common/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/common/form';
import { Input } from '@/components/common/input';
import { Separator } from '@/components/common/separator';
import { useStrictForm } from '@/hooks/form-hook';
import { useWorkspaceParams } from '@/hooks/router-hook';
import { useDeleteWorkspace, useGetWorkspaceQuery } from '@/hooks/workspace-hook';
import {
  DeleteWorkspaceFormDefaultValues,
  DeleteWorkspaceFormSchema,
  DeleteWorkspaceFormSchemaValues,
} from '@/types/schema/workspace-schema';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { AlertTriangle, Loader2Icon, Trash } from 'lucide-react';
import { useState } from 'react';

export const DeleteWorkspaceDialog = () => {
  const { workspaceId } = useWorkspaceParams();
  const { data: workspace } = useGetWorkspaceQuery(workspaceId);
  const { mutate: remove, isPending: isDeleting } = useDeleteWorkspace(workspaceId);

  const form = useStrictForm(DeleteWorkspaceFormSchema, DeleteWorkspaceFormDefaultValues);
  const confirmation = form.watch('confirmation');

  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (data: DeleteWorkspaceFormSchemaValues) => {
    if (data.confirmation === workspace?.name) {
      setIsOpen(false);
      remove();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => {
        setIsOpen(isOpen);
        form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="danger"
        >
          <Trash className="mr-1 h-4 w-4" />
          Delete this workspace
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex space-x-4">
            <AlertTriangle className="h-4 w-4" />
            <DialogTitle>Delete workspace</DialogTitle>
          </div>
        </DialogHeader>
        <Separator />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="confirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">Confirmation</FormLabel>
                  <FormDescription className="pb-4">
                    If you are sure you want to delete this workspace, please type the workspace
                    name as a confirmation. This action cannot be undone!
                  </FormDescription>
                  <FormControl>
                    <div className="flex flex-col space-y-4">
                      <Input
                        className="h-9"
                        {...field}
                      />
                      <FormMessage />
                      <div className="flex flex-col space-y-2">
                        <Button
                          disabled={confirmation !== workspace?.name}
                          type="submit"
                          size="sm"
                          variant="danger"
                        >
                          {isDeleting && <Loader2Icon className="mr-2 h-3 w-3 animate-spin" />}
                          Confirm delete
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="secondary"
                          onClick={() => setIsOpen(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
