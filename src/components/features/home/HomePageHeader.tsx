import { Button } from '@/components/common/Button';
import { Header } from '@/components/common/Header';
import { RoutePath } from '@/libs/Constants';
import { useNavigate } from 'react-router-dom';

export const HomePageHeader = () => {
  const navigate = useNavigate();

  return (
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
  );
};
