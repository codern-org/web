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
import { useAuth } from '@/hooks/auth-hook';
import { useStrictForm } from '@/hooks/form-hook';
import { SettingsProfileSchema } from '@/types/schema/profile-setting-schema';
import { PencilIcon } from 'lucide-react';
import { ChangeEvent, useRef } from 'react';

export const AccountProfileSettings = () => {
  const { user } = useAuth();

  const form = useStrictForm(SettingsProfileSchema, user.data);
  const profileInputRef = useRef<HTMLInputElement>(null);
  const profileUrl = form.watch('profileUrl');

  const editProfile = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;
    const blobUrl = URL.createObjectURL(event.target.files[0]);
    form.setValue('profileUrl', blobUrl);
  };

  // TODO: update profile with blob to file conversion
  const onSubmit = () => {};

  return (
    <>
      <h3 className="mb-2 text-lg font-medium">Profile</h3>
      <Separator className="mb-6" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex space-x-8"
        >
          <div className="flex w-4/6 flex-col space-y-4">
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Your name may appear around Codern where you join workspaces.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Input
              type="file"
              ref={profileInputRef}
              onChange={editProfile}
              className="hidden"
            />
            <Button
              type="submit"
              size="sm"
              className="w-fit"
            >
              Update profile
            </Button>
          </div>
          <div className="flex w-2/6 flex-col space-y-4">
            <div className="text-sm font-medium">Profile picture</div>
            <div className="relative">
              <Image
                src={profileUrl}
                alt="Profile picture"
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
          </div>
        </form>
      </Form>
    </>
  );
};
