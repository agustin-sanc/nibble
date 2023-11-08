import MainLayout from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Binary,
  BookText,
  Eye,
  Laptop,
  Layers2,
  Library,
} from "lucide-react";
import { MotivationalQuotes } from "@/components/motivational-quotes";

export default function Home() {
  return (
    <MainLayout>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Bienvenido a Nibble!
      </h1>

      <MotivationalQuotes className="mt-3" />

      <div className="mt-7">
        <div className="mb-6 flex justify-between">
          <div className="flex items-center">
            <Layers2 size={30} />
            <h2 className="ml-3 text-3xl font-semibold">
              Nuevos trabajos prácticos
            </h2>
          </div>

          <Button className="flex items-center gap-2" variant="outline">
            Ir a todos los trabajos <ArrowRight />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded border p-4">
            <div className="mb-4 flex items-center">
              <Binary />
              <h2 className="ml-2 text-xl font-bold">Arrays</h2>
            </div>

            <p className="pb-5 text-sm">
              Los arrays son variables estructuradas, donde cada elemento se
              almacena de forma consecutiva en memoria. Las cadenas de
              caracteres son declaradas en C como arrays de caracteres y
              permiten la utilización de un cierto número de notaciones y de
              funciones especiales.
            </p>

            <Button className="flex items-center gap-2">
              Resolver <Laptop />
            </Button>
          </div>

          <div className="rounded border p-4">
            <div className="mb-4 flex items-center">
              <Binary />
              <h2 className="ml-2 text-xl font-bold">Funciones</h2>
            </div>

            <p className="pb-5 text-sm">
              Los arrays son variables estructuradas, donde cada elemento se
              almacena de forma consecutiva en memoria. Las cadenas de
              caracteres son declaradas en C como arrays de caracteres y
              permiten la utilización de un cierto número de notaciones y de
              funciones especiales.
            </p>

            <Button className="flex items-center gap-2">
              Resolver <Laptop />
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-5 mt-7">
        <div className="mb-6 flex justify-between">
          <div className="flex items-center">
            <Library size={30} />
            <h2 className="ml-3 text-3xl font-semibold">
              Nuevas unidades teóricas
            </h2>
          </div>

          <Button className="flex items-center gap-2" variant="outline">
            Ir a todas las unidades <ArrowRight />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded border p-4">
            <div className="mb-4 flex items-center">
              <BookText />
              <h2 className="ml-2 text-xl font-bold">Arrays</h2>
            </div>

            <p className="pb-5 text-sm">
              Los arrays son variables estructuradas, donde cada elemento se
              almacena de forma consecutiva en memoria. Las cadenas de
              caracteres son declaradas en C como arrays de caracteres y
              permiten la utilización de un cierto número de notaciones y de
              funciones especiales.
            </p>

            <Button className="flex items-center gap-2">
              Leer <Eye />
            </Button>
          </div>

          <div className="rounded border p-4">
            <div className="mb-4 flex items-center">
              <BookText />
              <h2 className="ml-2 text-xl font-bold">Funciones</h2>
            </div>

            <p className="pb-5 text-sm">
              Los arrays son variables estructuradas, donde cada elemento se
              almacena de forma consecutiva en memoria. Las cadenas de
              caracteres son declaradas en C como arrays de caracteres y
              permiten la utilización de un cierto número de notaciones y de
              funciones especiales.
            </p>

            <Button className="flex items-center gap-2">
              Leer <Eye />
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
