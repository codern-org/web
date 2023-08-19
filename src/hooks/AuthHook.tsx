import { authService } from '@/services/AuthService';
import { useQuery } from '@tanstack/react-query';

export const useGetUserQuery = () =>
  useQuery(['user'], () => authService.me(), { staleTime: Infinity, retry: false });
