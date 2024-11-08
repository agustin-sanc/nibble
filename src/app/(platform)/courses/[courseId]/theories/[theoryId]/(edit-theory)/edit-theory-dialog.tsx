"use client";

import { editTheory } from "@/app/(platform)/courses/[courseId]/theories/[theoryId]/(edit-theory)/edit-theory";
import { Button } from "@/app/_cross/components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_cross/components/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_cross/components/form";
import { Input } from "@/app/_cross/components/input";
import { TextArea } from "@/app/_cross/components/text-area";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@monaco-editor/react";
import { type Theory } from "@prisma/client";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type * as z from "zod";
import { createTheoryFormSchema } from "../../(create)/create-theory-form-schema";

export const EditTheoryDialog = ({ theory }: { theory: Theory }) => {
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const { theme } = useTheme();

  const form = useForm<z.infer<typeof createTheoryFormSchema>>({
    resolver: zodResolver(createTheoryFormSchema),
    defaultValues: {
      name: theory.name,
      description: theory.description,
      content: theory.content,
    },
  });

  const onSubmit = (data: z.infer<typeof createTheoryFormSchema>) => {
    setSubmitButtonDisabled(true);

    toast.promise(
      // TODO: Review if it is okay that this function is async
      async () => {
        await editTheory({
          id: theory.id,
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

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contenido</FormLabel>
                  <FormControl>
                    <Editor
                      height="400px"
                      language={"markdown"}
                      theme={theme === "light" ? "vs-light" : "vs-dark"}
                      value={field.value}
                      onChange={(value) => field.onChange(value ?? "")}
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
