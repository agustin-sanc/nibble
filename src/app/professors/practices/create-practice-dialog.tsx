import { Button } from "@/app/_general/components/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_general/components/dialog";
import { Input } from "@/app/_general/components/input";
import { Label } from "@/app/_general/components/label";
import { Textarea } from "@/app/_general/components/text-area";

export const CreatePracticeDialog = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button>Crear</Button>
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
            className="col-span-3"
          />
        </div>
      </div>

      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
