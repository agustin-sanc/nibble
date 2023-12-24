import { LayoutWithSidePanel } from "@/app/_general/components/layout-with-side-panel";
import { Header1 } from "@/app/_general/components/typography";
import { MotivationalQuotes } from "@/app/_general/components/motivational-quotes";
import { NewestPractices } from "@/app/_general/components/newest-practices";
import { NewestTheories } from "@/app/_general/components/newest-theories";
import { currentUser, SignUp } from "@clerk/nextjs";

const Home = async () => {
  const user = await currentUser();

  if (user)
    return (
      <LayoutWithSidePanel>
        <Header1> Bienvenido a Nibble!</Header1>
        <MotivationalQuotes className="mt-3" />
        <NewestPractices className="mt-7" />
        <NewestTheories className="mt-7" />
      </LayoutWithSidePanel>
    );

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 pt-8">
      <Header1>Nibble</Header1>
      <SignUp unsafeMetadata={{ isProfessor: true }} />
    </div>
  );
};

export default Home;
