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
import { PracticeCard } from "@/components/practice-card";

const practices = [
  {
    id: 1,
    name: "Arrays",
    description:
      "Los arrays son variables estructuradas, donde cada elemento se almacena de forma consecutiva en memoria. Las cadenas de caracteres son declaradas en C como arrays de caracteres y permiten la utilización de un cierto número de notaciones y de funciones especiales.",
    exercises: [],
  },
  {
    id: 2,
    name: "Funciones",
    description:
      "Las funciones son un conjunto de instrucciones que realizan una tarea específica. Se utilizan para dividir un programa en módulos más pequeños y organizados. Además, las funciones hacen que el código sea más fácil de probar, depurar y mantener.",
    exercises: [],
  },
];

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
              Últimos trabajos prácticos
            </h2>
          </div>

          <Button className="flex items-center gap-2" variant="outline">
            Ir a todos los trabajos <ArrowRight />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {practices.map((practice) => (
            <PracticeCard practice={practice} />
          ))}
        </div>
      </div>

      <div className="mb-5 mt-7">
        <div className="mb-6 flex justify-between">
          <div className="flex items-center">
            <Library size={30} />
            <h2 className="ml-3 text-3xl font-semibold">
              Últimas unidades teóricas
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
