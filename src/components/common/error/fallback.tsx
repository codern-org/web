import { Button } from '@/components/common/button';
import { FallbackComponentProps } from '@/components/common/error/error-boundary';
import { NavigationBar } from '@/components/common/navigation-bar';
import { PageLayout } from '@/components/common/page-layout';
import { RoutePath } from '@/libs/constants';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export function FallbackError({ reset }: FallbackComponentProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHistoryExists = location.key !== 'default';

  const redirectBack = () => {
    if (isHistoryExists) {
      navigate(-1);
    } else {
      navigate(RoutePath.HONE);
    }
    reset();
  };

  return (
    <PageLayout className="flex h-screen flex-col">
      <NavigationBar>
        <Link to={RoutePath.SIGNUP}>
          <Button
            variant="secondary"
            size="sm"
            className="ml-auto"
          >
            Create account
          </Button>
        </Link>
      </NavigationBar>
      <div className="flex h-full flex-col items-center justify-center">
        <div className="container mb-6 flex flex-col space-y-4 text-center">
          <span className="text-2xl font-semibold">Oopsss!! Something went wrong</span>
          <span className="text-sm text-secondary-foreground">
            We're not exactly sure what happened, but something went wrong.
            <br />
            You may also refresh the page or try again later.
          </span>
        </div>
        <div className="flex space-x-2">
          <Button
            size="sm"
            onClick={redirectBack}
          >
            Back to {isHistoryExists ? 'previous page' : 'home page'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
          >
            <a href="https://github.com/codern-org/web/issues">Report the issue</a>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}
