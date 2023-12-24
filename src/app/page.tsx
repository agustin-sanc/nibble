import { Header1 } from "@/app/_general/components/typography";
import { Button } from "@/app/_general/components/button";
import Link from "next/link";

const Home = () => (
  <div className="flex w-full flex-col items-center justify-center gap-4 pt-8">
    <Header1>Nibble</Header1>

    <div className="flex w-[300px] flex-col gap-3">
      <Button variant="outline" asChild>
        <Link href="/sign-up?userType=professor">
          Registrarme como profesor
        </Link>
      </Button>

      <Button variant="outline" asChild>
        <Link href="/sign-up?userType=student">Registrarme como alumno</Link>
      </Button>

      <Button>Iniciar sesión</Button>
    </div>
  </div>
);

export default Home;
