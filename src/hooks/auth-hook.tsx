import { useToast } from '@/hooks/toast-hook';
import { useWebSocket } from '@/hooks/websocket-hook';
import { RoutePath } from '@/libs/constants';
import { authService } from '@/services/auth-service';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { connect, disconnect } = useWebSocket();

  const user = useQuery({
    queryKey: ['user'],
    queryFn: () => authService.me(),
    staleTime: Infinity,
    gcTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const signIn = (email: string, password: string) => {
    authService
      .signIn(email, password)
      .then(() => {
        connect();
        navigate(RoutePath.DASHBOARD);
      })
      .catch((error) => {
        toast({
          variant: 'danger',
          title: 'Cannot sign in to your account',
          description: error.message,
        });
      });
  };

  const signOut = () => {
    authService.signOut().finally(() => {
      disconnect();
      queryClient.removeQueries();
      navigate(RoutePath.SIGNIN);
    });
  };

  return {
    user,
    signIn,
    signOut,
  };
};
