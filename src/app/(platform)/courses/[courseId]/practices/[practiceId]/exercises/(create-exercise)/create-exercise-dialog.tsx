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
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { exerciseFormSchema } from "../exercise-form-schema";
import { saveExercise } from "./save-exercise";

export const CreateExerciseDialog = ({
  courseId,
  practiceId,
}: {
  courseId: string;
  practiceId: string;
}) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof exerciseFormSchema>>({
    resolver: zodResolver(exerciseFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof exerciseFormSchema>) => {
    setLoading(true);

    if (user) {
      toast.promise(
        saveExercise({
          ...data,
          courseId,
          practiceId,
        }),
        {
          loading: "Creando ejercicio...",
          success: "Ejercicio creado con éxito.",
          error: () => {
            setLoading(false);
            return "Ocurrió un error al crear el ejercicio.";
          },
        },
      );
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Crear ejercicio</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nuevo ejercicio</DialogTitle>
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
                    <Input placeholder="Nombre del ejercicio" {...field} />
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
                    <Input placeholder="Descripción del ejercicio" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" loading={loading}>
              Confirmar
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
