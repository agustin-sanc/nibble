import MainLayout from "@/components/main-layout";
import { BookText, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Theories() {
  return (
    <MainLayout>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Unidades teóricas
      </h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded border p-4">
          <div className="mb-4 flex items-center">
            <BookText />
            <h2 className="ml-2 text-xl font-bold">Arrays</h2>
          </div>

          <p className="pb-5 text-sm">
            Los arrays son variables estructuradas, donde cada elemento se
            almacena de forma consecutiva en memoria. Las cadenas de caracteres
            son declaradas en C como arrays de caracteres y permiten la
            utilización de un cierto número de notaciones y de funciones
            especiales.
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
            almacena de forma consecutiva en memoria. Las cadenas de caracteres
            son declaradas en C como arrays de caracteres y permiten la
            utilización de un cierto número de notaciones y de funciones
            especiales.
          </p>

          <Button className="flex items-center gap-2">
            Leer <Eye />
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
