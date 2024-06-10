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
import { deletePractice } from "@/app/(platform)/courses/[courseId]/practices/[practiceId]/(delete)/delete-practice";

export const DeletePracticeDialog = ({
  practiceId,
}: {
  practiceId: string;
}) => {
  const onConfirm = () =>
    toast.promise(deletePractice(practiceId), {
      loading: "Eliminando el trabajo práctico...",
      success: "Trabajo práctico eliminado exitosamente.",
      error: "No se pudo eliminar el trabajo práctico.",
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
            trabajo práctico.
          </DialogDescription>
        </DialogHeader>

        <DialogClose asChild>
          <Button onClick={onConfirm} variant="destructive">
            Sí, confirmo que deseo eliminar el trabajo práctico.
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
