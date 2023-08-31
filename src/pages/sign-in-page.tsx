import { Button } from '@/components/common/button';
import { Footer } from '@/components/common/footer';
import { NavigationBar } from '@/components/common/navigation-bar';
import { SignInForm } from '@/components/features/signin/form';
import { useGetUserQuery } from '@/hooks/auth-hook';
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
