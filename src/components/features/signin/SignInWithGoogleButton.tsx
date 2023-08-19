import GoogleIcon from '@/assets/svg/google-icon.svg';
import { Button, ButtonProps } from '@/components/common/Button';
import { ToastAction } from '@/components/common/Toast';
import { useToast } from '@/hooks/ToastHook';
import { authService } from '@/services/AuthService';

type SignInWithGoogleButtonProps = Omit<ButtonProps, 'onClick'>;

export const SignInWithGoogleButton = (props: SignInWithGoogleButtonProps) => {
  const { toast } = useToast();

  const handleClick = () => {
    authService
      .getGoogleAuthUrl()
      .then((data) => {
        window.location.href = data;
      })
      .catch((error) => {
        toast({
          variant: 'danger',
          title: 'Cannot authenticate with Google',
          description: error.message,
          action: (
            <ToastAction
              altText="Try again"
              onClick={handleClick}
            >
              Try again
            </ToastAction>
          ),
        });
      });
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      {...props}
    >
      <img
        src={GoogleIcon}
        alt=""
        className="mr-2 h-4 w-4"
      />
      Sign in with Google
    </Button>
  );
};
