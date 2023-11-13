import { useUser } from '@/hooks/auth-hook';
import { useToast } from '@/hooks/toast-hook';
import { ReactNode } from 'react';
import { Navigate, NavigateProps, To } from 'react-router-dom';

export type PrivateRouteProps = Omit<NavigateProps, 'to'> & {
  element: ReactNode;
  to?: To;
};

export const PrivateRoute = ({ element, to = '/signin' }: PrivateRouteProps) => {
  const { data, isLoading } = useUser();
  const { toast } = useToast();

  if (isLoading) {
    // TODO: authenticating ui
    return <></>;
  }

  if (!isLoading && !data) {
    // TODO: Investigate without `setTimeout` give us an error
    // Cannot update a component (`Toaster`) while rendering a different component (`PrivateRoute`). To locate the bad setState() call inside `PrivateRoute`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render
    setTimeout(() => {
      toast({
        variant: 'danger',
        title: 'Authentication is required',
        description: 'Please sign in to continue',
      });
    }, 0);
    return <Navigate to={to} />;
  }

  return element;
};
