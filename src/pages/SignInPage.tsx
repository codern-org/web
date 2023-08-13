import { Button } from '@/components/common/Button';
import { Header } from '@/components/common/Header';
import { SignInForm } from '@/components/features/signin/SignInForm';

export const SignInPage = () => {
  return (
    <>
      <Header>
        <Button
          variant="secondary"
          size="sm"
          className="ml-auto"
        >
          Create account
        </Button>
      </Header>

      <main className="absolute inset-0 flex h-screen w-full items-center justify-center">
        <div className="mx-8 w-full max-w-lg">
          <SignInForm />
        </div>
      </main>
    </>
  );
};
