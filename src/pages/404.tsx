import { Button } from '@/components/common/button';
import { NavigationBar } from '@/components/common/navigation-bar';
import { PageLayout } from '@/components/common/page-layout';
import { RoutePath } from '@/libs/constants';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <PageLayout>
      <NavigationBar>
        <div className="flex flex-row items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            asChild
          >
            <Link to={RoutePath.SIGNIN}>Sign in</Link>
          </Button>
          <Button
            size="sm"
            asChild
          >
            <Link to={RoutePath.SIGNUP}>Sign up</Link>
          </Button>
        </div>
      </NavigationBar>
      <div className="container absolute inset-0 flex flex-col items-center justify-center text-center">
        <h1 className="mb-2 text-2xl font-bold lg:text-4xl">Opsss!, page not found</h1>
        <p className="max-w-md text-xs text-muted-foreground lg:text-sm">
          It looks like you're trying to access a page that has been deleted or never even existed.
          Sorry for the inconvenience.
        </p>

        <Button
          className="mt-8"
          asChild
        >
          <Link to={RoutePath.HONE}>Back to homepage</Link>
        </Button>
      </div>
    </PageLayout>
  );
}
