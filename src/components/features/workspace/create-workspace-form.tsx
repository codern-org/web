import { Button } from '@/components/common/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/common/form';
import { Image } from '@/components/common/image';
import { Input } from '@/components/common/input';
import { Separator } from '@/components/common/separator';
import { useCreateWorkspaceForm } from '@/hooks/workspace-hook';
import { CreateWorkspaceFormSchemaValues } from '@/types/schema/workspace-schema';
import { Loader2Icon, PencilIcon, PlusIcon } from 'lucide-react';

export const CreateWorkspaceForm = () => {
  const { form, profileInputRef, profileUrl, editProfile, create, isCreating } =
    useCreateWorkspaceForm();

  const handleSubmit = (workspace: CreateWorkspaceFormSchemaValues) => {
    create(workspace);
  };

  return (
    <div className="container py-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex h-full flex-col space-y-8 rounded-md border bg-background p-8 shadow"
        >
          <div className="py-2">
            <h2 className="text-2xl font-semibold">Create workspace</h2>
          </div>

          <Separator />

          <div className="mt-2 flex flex-col space-y-4">
            <div className="flex space-x-5">
              <div className="flex w-4/6 flex-col space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Workspace name</FormLabel>
                      <FormDescription>The name of your workspace (required)</FormDescription>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4">
                <div className="text-sm font-medium">Workspace profile</div>
                {!profileUrl && (
                  <>
                    <Input
                      type="file"
                      ref={profileInputRef}
                      onChange={editProfile}
                      className="hidden"
                    />
                    <Button
                      size="sm"
                      variant="secondary"
                      className="w-fit"
                      type="button"
                      onClick={() => profileInputRef.current?.click()}
                    >
                      <PlusIcon className="mr-1 h-3 w-3" />
                      Add image
                    </Button>
                  </>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                The profile picture of your workspace (optional)
              </div>
              {profileUrl && (
                <div className="flex justify-center">
                  <div className="relative">
                    <Input
                      type="file"
                      ref={profileInputRef}
                      onChange={editProfile}
                      className="hidden"
                    />
                    <Image
                      src={profileUrl}
                      alt="Workspace profile picture"
                      className="h-32 w-32 rounded-full border"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute bottom-3 left-0 h-8"
                      type="button"
                      onClick={() => profileInputRef.current?.click()}
                    >
                      <PencilIcon className="mr-1 h-3 w-3" />
                      Edit
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          <Button
            type="submit"
            disabled={isCreating}
          >
            {isCreating && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
            Create
          </Button>
        </form>
      </Form>
    </div>
  );
};
