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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { saveTheory } from "@/app/courses/[courseId]/theories/(create)/save-theory";
import { createTheoryFormSchema } from "@/app/courses/[courseId]/theories/(create)/create-theory-form-schema";

export const CreateTheoryDialog = ({ courseId }: { courseId: string }) => {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof createTheoryFormSchema>>({
    resolver: zodResolver(createTheoryFormSchema),
    defaultValues: {
      name: "",
      description: "",
      content: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof createTheoryFormSchema>) => {
    setLoading(true);

    if (user) {
      try {
        const theory = await saveTheory({ ...data, courseId });
        toast.success("Unidad teórica creada con éxito.");
        router.push(`/courses/${courseId}/theories/${theory.id}`);
      } catch (error) {
        setLoading(false);
        toast.error("Ocurrió un error al crear la unidad teórica.");
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Crear unidad teórica</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Crear unidad teórica</DialogTitle>
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
                    <Input
                      placeholder="Las funciones son..."
                      type="textarea"
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
                    <Input
                      placeholder="Las funciones son..."
                      type="textarea"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" loading={loading}>
              Crear unidad teórica
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
