import LayoutWithSidePanel from "@/app/_general/components/layout-with-side-panel";
import { PracticesGrid } from "@/app/_general/components/practices/practices-grid";
import { Header2 } from "@/app/_general/components/typography";
import { prisma } from "@/prisma";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_general/components/dialog";
import { Button } from "@/app/_general/components/button";
import { FileCode2 } from "lucide-react";
import { Label } from "@/app/_general/components/label";
import { Input } from "@/app/_general/components/input";
import { Textarea } from "@/app/_general/components/text-area";

const CreatePracticeDialog = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button className="items-center gap-2">
        <FileCode2 /> Crear trabajo práctico
      </Button>
    </DialogTrigger>

    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Crear trabajo práctico</DialogTitle>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Nombre
          </Label>

          <Input
            id="name"
            placeholder="Programación dinámica"
            className="col-span-3"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Descripción
          </Label>

          <Textarea
            id="description"
            placeholder="La programación dinámica es un método para reducir el tiempo de ejecución de un algoritmo mediante la utilización de subproblemas superpuestos y subestructuras óptimas."
            className="col-span-3 h-[200px]"
          />
        </div>
      </div>

      <DialogFooter>
        <Button type="submit">Confirmar</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default async function Practices() {
  const practices = await prisma.practice.findMany({
    orderBy: { createdAt: "desc" },
    include: { exercises: true },
  });

  return (
    <LayoutWithSidePanel>
      <div className="flex items-center justify-between">
        <Header2>Trabajos prácticos</Header2>
        <CreatePracticeDialog />
      </div>

      <PracticesGrid practices={practices} />
    </LayoutWithSidePanel>
  );
}
