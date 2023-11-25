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
import { NavigationBar } from '@/components/common/navigation-bar';
import { PageLayout } from '@/components/common/page-layout';
import { useStrictForm } from '@/hooks/form-hook';
import { useToast } from '@/hooks/toast-hook';
import { RoutePath } from '@/libs/constants';
import { authService } from '@/services/auth-service';
import { ChangePassFormSchema, ChangePassFormValues } from '@/types/schema/sign-in-schema';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChangePasswordPage() {
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
    <PageLayout>
      <NavigationBar>
        <Button
          variant="secondary"
          size="sm"
          className="ml-auto"
        >
          Create account
        </Button>
      </NavigationBar>

      <div className="flex h-[calc(100vh-3.5rem)] items-center justify-center bg-accent/30">
        <div className="w-full max-w-md bg-background">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 rounded-lg border px-8 py-12 shadow-md"
            >
              <h1 className="text-3xl font-semibold tracking-tight">Change password</h1>

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
                    <FormLabel>Confirm password</FormLabel>
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
                className="w-full"
              >
                Change password
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </PageLayout>
  );
}
