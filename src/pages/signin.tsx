import { Button } from '@/components/common/button';
import { NavigationBar } from '@/components/common/navigation-bar';
import { PageLayout } from '@/components/common/page-layout';
import { SignInForm } from '@/components/features/signin/form';
import { useAuth } from '@/hooks/auth-hook';
import { RoutePath } from '@/libs/constants';
import { Navigate } from 'react-router-dom';

export default function SignInPage() {
  const { user } = useAuth();

  if (user.data) return <Navigate to={RoutePath.DASHBOARD} />;

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
}
