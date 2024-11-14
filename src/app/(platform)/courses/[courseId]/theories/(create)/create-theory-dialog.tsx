"use client";

import { createTheoryFormSchema } from "@/app/(platform)/courses/[courseId]/theories/(create)/create-theory-form-schema";
import { saveTheory } from "@/app/(platform)/courses/[courseId]/theories/(create)/save-theory";
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
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type * as z from "zod";

export const CreateTheoryDialog = ({ courseId }: { courseId: string }) => {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

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

      <DialogContent className="min-w-[75%]">
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
                    <div
                      className="relative flex h-full w-full"
                      data-color-mode={theme === "light" ? "light" : "dark"}
                    >
                      <MDEditor
                        className="w-full"
                        value={field.value}
                        onChange={(value) => field.onChange(value ?? "")}
                      />
                    </div>
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
