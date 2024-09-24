"use client";

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
import { Header2, Header3 } from "@/app/_cross/components/typography";
import { TextArea } from "@/app/_cross/components/text-area";
import { Checkbox } from "@/app/_cross/components/check-box";
import { X } from "lucide-react";

const Page = ({
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
      tags: [],
      blackBoxTests: [],
      grayBoxTests: [],
      whiteBoxTests: [],
    },
  });

  const onSubmit = (data: z.infer<typeof exerciseFormSchema>) => {
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

  const removeBlackBoxTest = (index: number) => {
    const currentTests = form.getValues("blackBoxTests");
    const updatedTests = currentTests.filter((_, i) => i !== index);
    form.setValue("blackBoxTests", updatedTests);
  };

  return (
    <div className="px-4">
      <Header2>Crear ejercicio</Header2>
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

          {/* <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Etiquetas</FormLabel>
                <FormControl>
                  <MultiSelect
                    placeholder="Selecciona etiquetas"
                    options={[
                      { value: "javascript", label: "JavaScript" },
                      { value: "python", label: "Python" },
                      { value: "react", label: "React" },
                      // Add more options as needed
                    ]}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <div>
            <Header3>Tests de caja negra</Header3>

            {form.watch("blackBoxTests")?.map((_, index) => (
              <div key={index} className="space-y-4 border rounded-md p-4 my-4 relative">
                <div className="font-semibold mb-2">Test {index + 1}</div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => removeBlackBoxTest(index)}
                >
                  <X className="h-4 w-4" />
                </Button>

                <FormField
                  control={form.control}
                  name={`blackBoxTests.${index}.isExample`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Es ejemplo</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`blackBoxTests.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`blackBoxTests.${index}.batchInput`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Entrada</FormLabel>
                      <FormControl>
                        <TextArea {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`blackBoxTests.${index}.batchOutput`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salida esperada</FormLabel>
                      <FormControl>
                        <TextArea {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            ))}

            <Button
              variant="outline"
              className="w-full"
              onClick={() =>
                form.setValue("blackBoxTests", [
                  ...(form.watch("blackBoxTests") ?? []),
                  { isExample: false, batchInput: [], batchOutput: [] },
                ])
              }
            >
                Agregar nuevo test de caja negra
            </Button>
          </div>

          {/* Similar sections for Gray Box and White Box Tests */}

          <Button type="submit" loading={loading} className="w-full">
            Confirmar
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Page;
