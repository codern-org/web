import { Button } from '@/components/common/button';
import { NavigationBar } from '@/components/common/navigation-bar';
import { PageLayout } from '@/components/common/page-layout';
import { SignInForm } from '@/components/features/signin/form';
import { useUser } from '@/hooks/auth-hook';
import { Navigate } from 'react-router-dom';

export const SignInPage = () => {
  const { data: user } = useUser();

  if (user) {
    return <Navigate to="/dashboard" />;
  }

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
          <SignInForm />
        </div>
      </div>
    </PageLayout>
  );
};
