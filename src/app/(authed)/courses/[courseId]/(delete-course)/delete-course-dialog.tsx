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
import { deleteCourse } from "@/app/(authed)/courses/[courseId]/(delete-course)/delete-course";

export const DeleteCourseDialog = ({ courseId }: { courseId: string }) => {
  const onConfirm = () =>
    toast.promise(deleteCourse(courseId), {
      loading: "Eliminando el curso...",
      success: "Curso eliminado exitosamente.",
      error: "No se pudo eliminar el curso.",
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
            curso.
          </DialogDescription>
        </DialogHeader>

        <DialogClose asChild>
          <Button onClick={onConfirm} variant="destructive">
            Sí, confirmo que deseo eliminar el curso.
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
