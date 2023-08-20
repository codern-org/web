import { useGetUserQuery } from '@/hooks/AuthHook';
import { useToast } from '@/hooks/ToastHook';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  element: ReactNode;
  redirectTo?: string;
};

export const PrivateRoute = ({ element, redirectTo = '/signin' }: PrivateRouteProps) => {
  const { data, isLoading } = useGetUserQuery();
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
    return <Navigate to={redirectTo} />;
  }

  return element;
};
