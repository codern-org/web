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
import { useAccountProfileSettingsForm } from '@/hooks/auth-hook';
import { AccountProfileSettingsSchemaValues } from '@/types/schema/user-schema';
import { PencilIcon } from 'lucide-react';

export const AccountProfileSettings = () => {
  const { form, profileInputRef, profileUrl, editProfile, update } =
    useAccountProfileSettingsForm();

  const onSubmit = (data: AccountProfileSettingsSchemaValues) => {
    update(data);
  };

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
              accept="image/*"
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
