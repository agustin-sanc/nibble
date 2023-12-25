"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_common/components/dialog";
import { Button } from "@/app/_common/components/button";
import { Input } from "@/app/_common/components/input";
import { saveCourse } from "@/app/(authed)/(common-layout)/courses/save-course";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_common/components/form";

const formSchema = z.object({
  name: z
    .string({
      required_error: "Tiene que tener un nombre",
    })
    .min(5, "El nombre tiene que tener un mínimo de 5 caracteres")
    .max(20, "El nombre tiene que tener un máximo de 20 caracteres"),
  description: z
    .string({
      required_error: "Tiene que tener una descripción",
    })
    .min(5, "La descripción tiene que tener un mínimo de 5 caracteres")
    .max(20, "La descripción tiene que tener un máximo de 20 caracteres"),
});

export const CreateCourseDialog = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    saveCourse();
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

            <Button type="submit">Crear curso</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
