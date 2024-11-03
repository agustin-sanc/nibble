"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_cross/components/dialog";
import { Button } from "@/app/_cross/components/button";
import { toast } from "sonner";
import { deleteExercise } from "./delete-exercise";

export const DeleteExerciseDialog = ({
  exerciseId,
}: {
  exerciseId: string;
}) => {
  const onConfirm = () =>
    toast.promise(deleteExercise(exerciseId), {
      loading: "Eliminando el ejercicio...",
      success: "Ejercicio eliminado exitosamente.",
      error: "No se pudo eliminar el ejercicio.",
    });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Eliminar</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>¿Estás seguro?</DialogTitle>

          <DialogDescription>
            Esta acción no puede ser deshecha. Esto eliminará permanentemente el
            ejercicio.
          </DialogDescription>
        </DialogHeader>

        <DialogClose asChild>
          <Button onClick={onConfirm} variant="destructive">
            Sí, confirmo que deseo eliminar el ejercicio.
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
