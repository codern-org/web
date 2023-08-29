import { Button } from '@/components/common/Button';
import { DividerWithText } from '@/components/common/DividerWithText';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/common/Form';
import { Input } from '@/components/common/Input';
import { SignInWithGoogleButton } from '@/components/features/signin/SignInWithGoogleButton';
import { useStrictForm } from '@/hooks/FormHook';
import { useToast } from '@/hooks/ToastHook';
import { RoutePath } from '@/libs/Constants';
import { authService } from '@/services/AuthService';
import {
  SignInFormDefaultValues,
  SignInFormSchema,
  SignInFormValues,
} from '@/types/schema/SignInSchema';
import { useNavigate } from 'react-router-dom';

export const SignInForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useStrictForm(SignInFormSchema, SignInFormDefaultValues);

  const onSubmit = (data: SignInFormValues) => {
    authService
      .signIn(data.email, data.password)
      .then(() => navigate(RoutePath.DASHBOARD))
      .catch((error) => {
        toast({
          variant: 'danger',
          title: 'Cannot sign in to your account',
          description: error.message,
        });
      });
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
