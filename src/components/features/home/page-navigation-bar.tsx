import { Button } from '@/components/common/button';
import { NavigationBar } from '@/components/common/navigation-bar';
import { RoutePath } from '@/libs/constants';
import { useNavigate } from 'react-router-dom';

export const HomePageNavigationBar = () => {
  const navigate = useNavigate();

  return (
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
  );
};
