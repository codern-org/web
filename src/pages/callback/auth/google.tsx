import { useToast } from '@/hooks/toast-hook';
import { RoutePath } from '@/libs/constants';
import { authService } from '@/services/auth-service';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function GoogleAuthCallbackPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const code = searchParams.get('code');

  useEffect(() => {
    if (!code) {
      navigate(RoutePath.SIGNIN);
      return;
    }

    authService
      .signInWithGoogle(code)
      .then(() => navigate(RoutePath.DASHBOARD))
      .catch((error) => {
        navigate(RoutePath.SIGNIN);
        toast({
          variant: 'danger',
          title: 'Cannot sign in to your account',
          description: error.message,
        });
      });
  }, [code, toast, navigate]);

  // TODO: better blank page
  return <></>;
}
