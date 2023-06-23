import { SignInWithGoogleButton } from '@/features/signin/SignInWithGoogleButton';

export const HomePage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <SignInWithGoogleButton />
    </div>
  );
};
