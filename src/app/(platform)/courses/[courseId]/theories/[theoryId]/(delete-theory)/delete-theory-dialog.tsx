"use client";

import { Button } from "@/app/_cross/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_cross/components/dialog";
import { toast } from "sonner";
import { deleteTheory } from "./delete-theory";

// TODO: Check if we can have this component once and pass the action via props.
export const DeleteTheoryDialog = ({ theoryId }: { theoryId: string }) => {
  const onConfirm = () =>
    toast.promise(deleteTheory(theoryId), {
      loading: "Eliminando la unidad teórica...",
      success: "Unidad teórica eliminada exitosamente.",
      error: "No se pudo eliminar la unidad teórica.",
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
            Esta acción no puede ser deshecha. Esto eliminará permanentemente la
            unidad teórica.
          </DialogDescription>
        </DialogHeader>

        <DialogClose asChild>
          <Button onClick={onConfirm} variant="destructive">
            Sí, confirmo que deseo eliminar la unidad teórica.
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
