import { Button } from '@/components/common/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/common/form';
import { Image } from '@/components/common/image';
import { Input } from '@/components/common/input';
import { useUpdateWorkspaceForm } from '@/hooks/workspace-hook';
import { UpdateWorkspaceFormSchemaValues } from '@/types/schema/workspace-schema';
import { Loader2Icon, PencilIcon, PlusIcon } from 'lucide-react';

export const UpdateWorkspaceForm = () => {
  const { form, workspace, profileInputRef, profileUrl, editProfile, update, isUpdating } =
    useUpdateWorkspaceForm();

  const handleSubmit = (workspace: UpdateWorkspaceFormSchemaValues) => {
    update(workspace);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4"
      >
        <div className="flex space-x-5">
          <div className="flex w-4/6 flex-col space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workspace name</FormLabel>
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
          <div className="flex flex-col space-y-2">
            <div className="text-sm font-medium">Workspace profile</div>
            {!profileUrl ? (
              <>
                <div className="text-sm text-muted-foreground">
                  Your workspace is using the default profile picture. You can change it by adding a
                  new image.
                </div>
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
            ) : (
              <>
                <div className="text-sm text-muted-foreground">
                  This is the profile picture of your workspace. You can change it by clicking the
                  edit button.
                </div>
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
                    className="h-48 w-48 rounded-full border"
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
              </>
            )}
          </div>
          <Button
            type="submit"
            className="w-fit"
            disabled={
              workspace?.name === form.getValues('name') &&
              (workspace?.profileUrl === form.getValues('profileUrl') || !profileUrl) &&
              !isUpdating
            }
          >
            {isUpdating && <Loader2Icon className="mr-2 animate-spin" />}
            {isUpdating ? 'Saving...' : 'Save changes'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
