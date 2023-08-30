import { Button } from '@/components/common/Button';
import { Footer } from '@/components/common/Footer';
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
      <main className="relative min-h-screen">
        <NavigationBar>
          <Button
            variant="secondary"
            size="sm"
            className="ml-auto"
          >
            Create account
          </Button>
        </NavigationBar>

        <div className="mx-6 flex h-[calc(100vh-3.5rem)] items-center justify-center">
          <div className="h- w-full max-w-md">
            <SignInForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
