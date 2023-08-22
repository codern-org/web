import { Button } from '@/components/common/Button';
import { Header } from '@/components/common/Header';
import { RoutePath } from '@/libs/Constants';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header>
        <div className="ml-auto flex flex-row">
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
        </div>
      </Header>

      <main className="container absolute inset-0 flex flex-col items-center justify-center text-center">
        <h1 className="mb-2 text-2xl font-bold lg:text-4xl">Opsss!, page not found</h1>
        <p className="max-w-md text-xs text-muted-foreground lg:text-sm">
          It looks like you're trying to access a page that has been deleted or never even existed.
          Sorry for the inconvenience.
        </p>

        <Button
          className="mt-8"
          onClick={() => navigate(RoutePath.HONE)}
        >
          Back to homepage
        </Button>
      </main>
    </>
  );
};
