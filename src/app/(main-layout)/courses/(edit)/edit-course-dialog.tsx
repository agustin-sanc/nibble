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
import { saveCourse } from "@/app/(main-layout)/courses/(create)/save-course";
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
import { courseFormSchema } from "@/app/(main-layout)/courses/course-form-schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TextArea } from "@/app/_cross/components/text-area";
import { Course } from "@prisma/client";

export const EditCourseDialog = ({ course }: { course: Course }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof courseFormSchema>>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      name: course.name,
      description: course.description,
    },
  });

  const onSubmit = async (data: z.infer<typeof courseFormSchema>) => {
    setLoading(true);

    try {
      await saveCourse(data);
      toast.success("Curso actualizado con éxito.");
    } catch (error) {
      toast.error("Ocurrió un error al actualizar el curso.");
    }

    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Editar curso</Button>
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

            <Button type="submit" loading={loading}>
              Guardar cambios
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
