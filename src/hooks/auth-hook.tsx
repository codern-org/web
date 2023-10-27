import { authService } from '@/services/auth-service';
import { useQuery } from '@tanstack/react-query';

export const useGetUserQuery = () =>
  useQuery({
    queryKey: ['user'],
    queryFn: () => authService.me(),
    staleTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
  });
