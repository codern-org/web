import { Button } from '@/components/common/button';
import { Footer } from '@/components/common/footer';
import { NavigationBar } from '@/components/common/navigation-bar';
import { RoutePath } from '@/libs/constants';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <main className="relative min-h-screen">
        <NavigationBar>
          <div className="flex flex-row items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(RoutePath.SIGNIN)}
            >
              Sign in
            </Button>
            <Button
              size="sm"
              onClick={() => navigate(RoutePath.SIGNUP)}
            >
              Sign up
            </Button>
          </div>
        </NavigationBar>

        <div className="container absolute inset-0 flex flex-col items-center justify-center text-center">
          <h1 className="mb-2 text-2xl font-bold lg:text-4xl">Opsss!, page not found</h1>
          <p className="max-w-md text-xs text-muted-foreground lg:text-sm">
            It looks like you're trying to access a page that has been deleted or never even
            existed. Sorry for the inconvenience.
          </p>

          <Button
            className="mt-8"
            onClick={() => navigate(RoutePath.HONE)}
          >
            Back to homepage
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
};
