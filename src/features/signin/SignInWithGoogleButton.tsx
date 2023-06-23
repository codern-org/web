import GoogleIcon from '@/assets/svg/google-icon.svg';
import { Button, ButtonProps } from '@/common/components/Button';

export const SignInWithGoogleButton = (props: ButtonProps) => {
  return (
    <Button {...props}>
      <img
        src={GoogleIcon}
        alt=""
        className="mr-2 h-4 w-4"
      />
      Sign in with Google
    </Button>
  );
};
SignInWithGoogleButton.displayName = 'SignInWithGoogleButton';
