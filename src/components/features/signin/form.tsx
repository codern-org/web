import { Button } from '@/components/common/button';
import { DividerWithText } from '@/components/common/divider-with-text';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/common/form';
import { Input } from '@/components/common/input';
import { SignInWithGoogleButton } from '@/components/features/signin/with-google-button';
import { useAuth } from '@/hooks/auth-hook';
import { useStrictForm } from '@/hooks/form-hook';
import {
  SignInFormDefaultValues,
  SignInFormSchema,
  SignInFormValues,
} from '@/types/schema/user-schema';

export const SignInForm = () => {
  const form = useStrictForm(SignInFormSchema, SignInFormDefaultValues);
  const { signIn } = useAuth();

  const onSubmit = (data: SignInFormValues) => {
    signIn(data.email, data.password);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 rounded-lg border px-8 py-12 shadow-md"
      >
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-secondary-foreground">Start coding and improve your skills!</p>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  autoComplete="username"
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder=""
                  autoComplete="current-password"
                  className="h-9"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-5">
          <Button
            type="submit"
            size="sm"
            className="w-full"
          >
            Sign in
          </Button>

          <DividerWithText
            text="Or sign in with"
            uppercase
          />

          <SignInWithGoogleButton
            variant="secondary"
            size="sm"
            className="w-full"
          />
        </div>
      </form>
    </Form>
  );
};
