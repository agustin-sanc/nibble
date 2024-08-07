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
import { toast } from "sonner";
import { TextArea } from "@/app/_cross/components/text-area";
import type { Practice } from "@prisma/client";
import { editPractice } from "@/app/(platform)/courses/[courseId]/practices/[practiceId]/(edit-practice)/edit-practice";
import { practiceFormSchema } from "@/app/(platform)/courses/[courseId]/practices/[practiceId]/practice-form-schema";

export const EditPracticeDialog = ({ practice }: { practice: Practice }) => {
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const form = useForm<z.infer<typeof practiceFormSchema>>({
    resolver: zodResolver(practiceFormSchema),
    defaultValues: {
      name: practice.name,
      description: practice.description,
    },
  });

  const onSubmit = (data: z.infer<typeof practiceFormSchema>) => {
    setSubmitButtonDisabled(true);

    toast.promise(
      // TODO: Review if it is okay that this function is async
      async () => {
        await editPractice({
          id: practice.id,
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
          <DialogTitle>Editar trabajo práctico</DialogTitle>
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
                    <Input placeholder="Funciones" {...field} />
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
                      placeholder="Introducción a las funciones"
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
