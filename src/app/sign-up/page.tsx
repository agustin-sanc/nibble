import { SignUp as ClerkSignUp } from "@clerk/nextjs";

const SignUp = ({
  params: { userType },
}: {
  params: { userType: "professor" | "student" };
}) => {
  const isProfessor = userType === "professor";

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 pt-8">
      <ClerkSignUp
        unsafeMetadata={{ isProfessor }}
        afterSignInUrl="/dashboard"
        afterSignUpUrl="/dashboard"
      />
    </div>
  );
};

export default SignUp;
