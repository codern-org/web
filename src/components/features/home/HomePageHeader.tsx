import { Button } from '@/components/common/Button';
import { NavigationBar } from '@/components/common/NavigationBar';
import { RoutePath } from '@/libs/Constants';
import { useNavigate } from 'react-router-dom';

export const HomePageHeader = () => {
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
