import { authService } from '@/services/auth-service';
import { useQuery } from '@tanstack/react-query';

export const useUser = () =>
  useQuery({
    queryKey: ['user'],
    queryFn: () => authService.me(),
    staleTime: Infinity,
    gcTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
  });
