import { Button } from '@/components/common/button';
import { NavigationBar } from '@/components/common/navigation-bar';
import { PageLayout } from '@/components/common/page-layout';
import { Separator } from '@/components/common/separator';
import { UserProfileDropdown } from '@/components/common/user-profile-dropdown';
import { useAuth } from '@/hooks/auth-hook';
import { RoutePath } from '@/libs/constants';
import { ChevronRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function IndexPage() {
  const { user } = useAuth();

  return (
    <PageLayout>
      <NavigationBar>
        <div className="flex flex-row items-center space-x-2">
          {user.data ? (
            <>
              <Button
                variant="outline"
                size="sm"
                asChild
              >
                <Link to={RoutePath.DASHBOARD}>Dashboard</Link>
              </Button>
              <UserProfileDropdown
                displayName={user.data.displayName}
                email={user.data.email}
                accountType={user.data.accountType}
              />
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </NavigationBar>
      <div className="container flex flex-col items-center justify-center py-32">
        <Link
          to="https://github.com/orgs/codern-org"
          target="_blank"
          className="mb-10 inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm font-medium"
        >
          <span>🎉 We are open source</span>
          <Separator
            orientation="vertical"
            className="mx-2 h-4"
          />
          <span>Star us on GitHub</span>
          <ChevronRightIcon className="h-4 w-4" />
        </Link>
        <h1 className="bg-gradient-to-tl from-black from-40% bg-clip-text pb-2 text-center text-6xl font-bold text-transparent dark:from-white dark:from-50%">
          Next Generation <br />
          Coding Platform
        </h1>
        <p className="my-8 text-center text-lg text-muted-foreground">
          Code, submit, and get a result faster, <br />
          automate instructor workflow
        </p>
        <div className="flex flex-row space-x-4">
          <Link to={RoutePath.SIGNIN}>
            <Button
              size="lg"
              variant="outline"
              className="py-6 text-lg"
            >
              Getting Started
            </Button>
          </Link>
          <Link to={RoutePath.SIGNUP}>
            <Button
              size="lg"
              className="py-6 text-lg"
            >
              Register Now
            </Button>
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
