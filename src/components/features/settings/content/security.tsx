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
import { Separator } from '@/components/common/separator';
import { useStrictForm } from '@/hooks/form-hook';
import { useToast } from '@/hooks/toast-hook';
import { RoutePath } from '@/libs/constants';
import { authService } from '@/services/auth-service';
import { ChangePassFormSchema, ChangePassFormValues } from '@/types/schema/user-schema';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SecuritySettings = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [error, setError] = useState<string>('');
  const form = useStrictForm(ChangePassFormSchema);

  const onSubmit = (data: ChangePassFormValues) => {
    authService
      .changePassword(data.oldPassword, data.newPassword)
      .then(() => {
        setError('');
        toast({ title: 'Password has been changed' });
        queryClient.removeQueries();
        setTimeout(() => navigate(RoutePath.SIGNIN), 2000);
      })
      .catch((error) => setError(error.message));
  };

  return (
    <>
      <h3 className="mb-2 text-lg font-medium">Security</h3>
      <Separator className="mb-6" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-1/2 space-y-4"
        >
          {error && <div className="text-danger">{error}</div>}
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Old password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder=""
                    className="h-9"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder=""
                    className="h-9"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm new password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder=""
                    className="h-9"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            size="sm"
            className="w-fit"
          >
            Change password
          </Button>
        </form>
      </Form>
    </>
  );
};
