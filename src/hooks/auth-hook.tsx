import { useStrictForm } from '@/hooks/form-hook';
import { toast, useToast } from '@/hooks/toast-hook';
import { useWebSocket } from '@/hooks/websocket-hook';
import { RoutePath } from '@/libs/constants';
import { authService } from '@/services/auth-service';
import {
  AccountProfileSettingsSchema,
  AccountProfileSettingsSchemaValues,
} from '@/types/schema/user-schema';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useRef } from 'react';
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

export const useUpdateAccountProfileSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: AccountProfileSettingsSchemaValues) =>
      authService.updateAccountProfileSettings(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      toast({
        variant: 'danger',
        title: 'Cannot update user',
        description: error.message,
      });
    },
  });
};

export const useAccountProfileSettingsForm = () => {
  const { user } = useAuth();
  const { mutate: update } = useUpdateAccountProfileSettings();

  const form = useStrictForm(AccountProfileSettingsSchema, user.data);
  const profileInputRef = useRef<HTMLInputElement>(null);
  const profileUrl = form.watch('profileUrl');

  const editProfile = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;
    const blobUrl = URL.createObjectURL(event.target.files[0]);
    form.setValue('profileUrl', blobUrl);
  };

  return {
    form,
    profileInputRef,
    profileUrl,
    editProfile,
    update,
  };
};
