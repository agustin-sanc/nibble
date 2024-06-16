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
import { createCourse } from "@/app/(platform)/courses/(create-course)/create-course";
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

export const CreateCourseDialog = () => {
  const form = useForm<z.infer<typeof courseFormSchema>>({
    resolver: zodResolver(courseFormSchema),
  });

  const [submitButtonEnabled, setSubmitButtonEnabled] = useState(true);

  const onSubmit = (data: z.infer<typeof courseFormSchema>) => {
    setSubmitButtonEnabled(false);

    toast.promise(createCourse(data), {
      loading: "Creando el curso...",
      success: "Curso creado exitosamente",
      error: () => {
        setSubmitButtonEnabled(true);
        return "Ocurrió un error al crear el curso. Por favor, intente de nuevo.";
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Crear curso</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Crear curso</DialogTitle>
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

            <Button type="submit" disabled={!submitButtonEnabled}>
              Confirmar
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
