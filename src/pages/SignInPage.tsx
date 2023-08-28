import { Button } from '@/components/common/Button';
import { NavigationBar } from '@/components/common/NavigationBar';
import { SignInForm } from '@/components/features/signin/SignInForm';
import { useGetUserQuery } from '@/hooks/AuthHook';
import { Navigate } from 'react-router-dom';

export const SignInPage = () => {
  const { data: user } = useGetUserQuery();

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <NavigationBar>
        <Button
          variant="secondary"
          size="sm"
          className="ml-auto"
        >
          Create account
        </Button>
      </NavigationBar>

      <main className="absolute inset-0 flex h-screen w-full items-center justify-center">
        <div className="mx-8 w-full max-w-lg">
          <SignInForm />
        </div>
      </main>
    </>
  );
};
