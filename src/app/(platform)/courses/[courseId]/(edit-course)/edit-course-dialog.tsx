"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_cross/components/dialog";
import { Button } from "@/app/_cross/components/button";
import { Input } from "@/app/_cross/components/input";
import type * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_cross/components/form";
import { useState } from "react";
import { courseFormSchema } from "@/app/(platform)/courses/course-form-schema";
import { toast } from "sonner";
import { TextArea } from "@/app/_cross/components/text-area";
import { Course } from "@prisma/client";
import { editCourse } from "@/app/(platform)/courses/[courseId]/(edit-course)/edit-course";

export const EditCourseDialog = ({ course }: { course: Course }) => {
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const form = useForm<z.infer<typeof courseFormSchema>>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      name: course.name,
      description: course.description,
    },
  });

  const onSubmit = (data: z.infer<typeof courseFormSchema>) => {
    setSubmitButtonDisabled(true);

    toast.promise(
      // TODO: Review if it is okay that this function is async
      async () => {
        await editCourse({
          id: course.id,
          ...data,
        });

        // TODO: Review if this location is correct for this state update
        setSubmitButtonDisabled(false);
      },
      {
        loading: "Guardando los cambios...",
        success: "Cambios guardados exitosamente.",
        error: "No pudimos guardar los cambios, intenta nuevamente.",
      },
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Editar</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar curso</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>

                  <FormControl>
                    <Input placeholder="AED 1k6 (2024)" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>

                  <FormControl>
                    <TextArea
                      placeholder="Cátedra de algoritmos y estructuras de datos, UTN-FRT"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" loading={submitButtonDisabled}>
              Guardar cambios
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
