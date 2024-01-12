import { Button } from '@/components/common/button';
import { NavigationBar } from '@/components/common/navigation-bar';
import { PageLayout } from '@/components/common/page-layout';
import { RoutePath } from '@/libs/constants';
import { Link } from 'react-router-dom';

export default function SignUpPage() {
  return (
    <PageLayout className="flex h-screen flex-col">
      <NavigationBar />
      <div className="flex h-full flex-col items-center justify-center">
        <div className="container mb-6 flex flex-col space-y-4 text-center">
          <span className="text-2xl font-semibold">Sorry for inconvenience</span>
          <span className="text-sm text-secondary-foreground">
            We're not support this feature yet.
          </span>
        </div>
        <div className="flex space-x-2">
          <Link to={RoutePath.HONE}>
            <Button size="sm">Back to home page</Button>
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
