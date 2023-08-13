import { Button } from '@/common/components/Button';
import { DividerWithText } from '@/common/components/DividerWithText';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/common/components/Form';
import { Input } from '@/common/components/Input';
import { SignInWithGoogleButton } from '@/features/signin/SignInWithGoogleButton';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// prettier-ignore
export const SignInFormSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: 'Please use a valid email address' }),
  password: z
    .string()
    .trim()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(24, { message: 'Password cannot be more than 24 characters' })
});

export type SignInFormValues = z.infer<typeof SignInFormSchema>;

export const SignInFormDefaultValues: Partial<SignInFormValues> = {
  email: '',
  password: '',
};

export const SignInForm = () => {
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: SignInFormDefaultValues,
    mode: 'onSubmit',
  });

  const onSubmit = (data: SignInFormValues) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 rounded-lg border border-secondary px-8 py-12 shadow-md"
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
            className="w-full"
          />
        </div>
      </form>
    </Form>
  );
};
SignInForm.displayName = 'SigninForm';
