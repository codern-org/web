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
import { useStrictForm } from '@/hooks/form-hook';
import { useJoinWorkspace } from '@/hooks/workspace-hook';
import {
  JoinWorkspaceFormDefaultValues,
  JoinWorkspaceFormSchema,
  JoinWorkspaceFormSchemaValues,
} from '@/types/schema/workspace-schema';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

export const AddWorkspaceDialog = () => {
  const form = useStrictForm(JoinWorkspaceFormSchema, JoinWorkspaceFormDefaultValues);
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: join } = useJoinWorkspace();

  const onSubmit = (data: JoinWorkspaceFormSchemaValues) => {
    setIsOpen(false);
    join(data.invitationId);
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
        <Button size="sm">
          <PlusIcon className="mr-0.5 h-4 w-4" />
          Join
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join workspace</DialogTitle>
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
