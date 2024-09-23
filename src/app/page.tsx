import { Header1 } from "@/app/_cross/components/typography";
import { Button } from "@/app/_cross/components/button";
import { currentUser, SignInButton } from "@clerk/nextjs";

const PresentationPage = async () => {
  const user = await currentUser();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 pt-8">
      <Header1>Nibble</Header1>

      <div className="flex w-[300px] flex-col gap-3">
        {user && (
          <Button asChild>
            <a href="/dashboard">Ir a la plataforma</a>
          </Button>
        )}

        {!user && (
          <Button asChild>
            <SignInButton
              mode="modal"
              afterSignInUrl="/dashboard"
              afterSignUpUrl="/dashboard"
            >
              Iniciar sesión
            </SignInButton>
          </Button>
        )}
      </div>
    </div>
  );
};

export default PresentationPage;
