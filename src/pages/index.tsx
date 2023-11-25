import { Button } from '@/components/common/button';
import { NavigationBar } from '@/components/common/navigation-bar';
import { PageLayout } from '@/components/common/page-layout';
import { RoutePath } from '@/libs/constants';
import { Link } from 'react-router-dom';

export default function IndexPage() {
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
      <div className="container flex flex-col items-center justify-center py-32">
        <h1 className="text-center text-6xl font-bold">
          New Generation <br />
          Coding Platform
        </h1>
        <p className="my-10 text-center text-lg text-muted-foreground">
          Designed for both coding event organizers and enthusiastic end-users, <br />
          Codern offers a world where programming skills flourish through interactive coding
          adventures.
        </p>
        <div className="flex flex-row space-x-4">
          <Button
            size="lg"
            variant="outline"
            className="py-6 text-lg"
          >
            Learn Codern
          </Button>
          <Button
            size="lg"
            className="py-6 text-lg"
          >
            Register Now
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}
