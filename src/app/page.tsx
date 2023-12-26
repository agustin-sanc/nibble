import { Header1 } from "@/app/_cross/components/typography";
import { Button } from "@/app/_cross/components/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

const Home = () => (
  <div className="flex w-full flex-col items-center justify-center gap-4 pt-8">
    <Header1>Nibble</Header1>

    <div className="flex w-[300px] flex-col gap-3">
      <Button variant="outline" asChild>
        <SignUpButton
          mode="modal"
          unsafeMetadata={{ isProfessor: true }}
          afterSignUpUrl="/dashboard"
          afterSignInUrl="/dashboard"
        >
          Registrarme como profesor
        </SignUpButton>
      </Button>

      <Button variant="outline" asChild>
        <SignUpButton
          mode="modal"
          afterSignInUrl="/dashboard"
          afterSignUpUrl="/dashboard"
        >
          Registrarme como alumno
        </SignUpButton>
      </Button>

      <Button asChild>
        <SignInButton
          mode="modal"
          afterSignInUrl="/dashboard"
          afterSignUpUrl="/dashboard"
        >
          Iniciar sesión
        </SignInButton>
      </Button>
    </div>
  </div>
);

export default Home;
