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
import { createPracticeFormSchema } from "@/app/(main-layout)/courses/[courseId]/practices/(create)/create-practice-form-schema";
import { savePractice } from "@/app/(main-layout)/courses/[courseId]/practices/(create)/save-practice";

export const CreatePracticeDialog = () => {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof createPracticeFormSchema>>({
    resolver: zodResolver(createPracticeFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof createPracticeFormSchema>) => {
    setLoading(true);

    if (user) {
      try {
        const practice = await savePractice(data);
        toast.success("Trabajo práctico creado con éxito.");
        router.push(`/courses/${practice.courseId}/practices/${practice.id}`);
      } catch (error) {
        setLoading(false);
        toast.error("Ocurrió un error al crear el trabajo práctico.");
      }
    }
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
                    <Input
                      placeholder="Cátedra de algoritmos y estructuras de datos, UTN-FRT"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" loading={loading}>
              Crear curso
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};