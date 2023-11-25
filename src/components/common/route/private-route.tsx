import { MojiBun } from '@/components/common/moji-bun';
import { useUser } from '@/hooks/auth-hook';
import { useToast } from '@/hooks/toast-hook';
import { RoutePath } from '@/libs/constants';
import { Loader2Icon } from 'lucide-react';
import { ComponentType, ReactNode, useEffect } from 'react';
import { Navigate, To } from 'react-router-dom';

export type WithAuthProps = {
  children?: ReactNode;
};

export function withAuth<T extends WithAuthProps = WithAuthProps>(
  WrappedComponent: ComponentType<T>,
  to: To = RoutePath.SIGNIN,
) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const ComponentWithAuth = (props: Omit<T, keyof WithAuthProps>) => {
    const { isLoading, isError } = useUser();
    const { toast } = useToast();

    useEffect(() => {
      if (isError) {
        toast({
          variant: 'danger',
          title: 'Authentication is required',
          description: 'Please sign in to continue',
        });
      }
    }, [isError, toast]);

    if (isLoading) {
      return (
        <div className="flex h-screen flex-col items-center justify-center">
          <MojiBun className="mb-6 h-28 w-28 animate-pulse" />
          <div className="flex text-muted-foreground">
            <Loader2Icon className="mr-2 animate-spin" /> Loading...
          </div>
        </div>
      );
    }

    return isError ? <Navigate to={to} /> : <WrappedComponent {...(props as T)} />;
  };
  ComponentWithAuth.displayName = `withAuth(${displayName})`;

  return ComponentWithAuth;
}
