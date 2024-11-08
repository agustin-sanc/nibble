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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_cross/components/select";

const Page = ({
  params: { courseId, practiceId },
}: {
  params: {
    courseId: string;
    practiceId: string;
  };
}) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [tagsInput, setTagsInput] = useState("");

  const form = useForm<z.infer<typeof exerciseFormSchema>>({
    resolver: zodResolver(exerciseFormSchema),
    defaultValues: {
      name: "",
      description: "",
      tags: [],
      difficulty: 1,
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
          courseId,
          practiceId,
          ...data,
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
    const updatedTests = currentTests?.filter((_, i) => i !== index);
    form.setValue("blackBoxTests", updatedTests);
  };

  const removeGrayBoxTest = (index: number) => {
    const currentTests = form.getValues("grayBoxTests");
    const updatedTests = currentTests?.filter((_, i) => i !== index);
    form.setValue("grayBoxTests", updatedTests);
  };

  const addFunctionArg = (testIndex: number) => {
    const currentTests = form.getValues("grayBoxTests");
    const updatedTests = [...currentTests];
    updatedTests[testIndex].functionArgs.push({ value: "", type: "STRING" });
    form.setValue("grayBoxTests", updatedTests);
  };

  const removeFunctionArg = (testIndex: number, argIndex: number) => {
    const currentTests = form.getValues("grayBoxTests");
    const updatedTests = [...currentTests];
    updatedTests[testIndex].functionArgs.splice(argIndex, 1);
    form.setValue("grayBoxTests", updatedTests);
  };

  const removeWhiteBoxTest = (index: number) => {
    const currentTests = form.getValues("whiteBoxTests");
    const updatedTests = currentTests?.filter((_, i) => i !== index);
    form.setValue("whiteBoxTests", updatedTests);
  };

  const handleTagsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagsInput(event.target.value);
  };

  const handleTagsBlur = () => {
    const tagsArray = tagsInput.split(" ").filter((tag) => tag.trim() !== "");
    form.setValue("tags", tagsArray);
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
                  <TextArea
                    placeholder="Descripción del ejercicio"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Etiquetas (separadas por espacios)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ingrese etiquetas separadas por espacios"
                    value={tagsInput}
                    onChange={handleTagsChange}
                    onBlur={handleTagsBlur}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dificultad (1-10)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    max={10}
                    placeholder="Nivel de dificultad"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value) || 1)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Header3>Tests de caja negra</Header3>

            {form.watch("blackBoxTests")?.map((_, index) => (
              <div
                key={index}
                className="relative my-4 space-y-4 rounded-md border p-4"
              >
                <div className="mb-2 font-semibold">Test {index + 1}</div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => removeBlackBoxTest(index)}
                >
                  <X className="h-4 w-4" />
                </Button>

                <FormField
                  control={form.control}
                  name={`blackBoxTests.${index}.isExample`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <div className="space-y-1 leading-none">
                        <FormLabel>¿Se muestra como ejemplo?</FormLabel>
                      </div>

                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
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
                      <FormLabel>Entrada (una entrada por línea)</FormLabel>
                      <FormControl>
                        <TextArea
                          {...field}
                          value={field.value?.join("\n") || ""}
                          onChange={(e) => {
                            const lines = e.target.value.split("\n");
                            field.onChange(lines);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`blackBoxTests.${index}.batchOutput`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salida (una salida por línea)</FormLabel>
                      <FormControl>
                        <TextArea
                          {...field}
                          value={field.value?.join("\n") || ""}
                          onChange={(e) => {
                            const lines = e.target.value.split("\n");
                            field.onChange(lines);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() =>
                form.setValue("blackBoxTests", [
                  ...(form.watch("blackBoxTests") ?? []),
                  {
                    isExample: false,
                    description: "",
                    batchInput: [],
                    batchOutput: [],
                  },
                ])
              }
            >
              Agregar test de caja negra
            </Button>
          </div>

          {/* Similar sections for Gray Box and White Box Tests */}

          <div>
            <Header3>Tests de caja gris</Header3>

            {form.watch("grayBoxTests")?.map((_, testIndex) => (
              <div
                key={testIndex}
                className="relative my-4 space-y-4 rounded-md border p-4"
              >
                <div className="mb-2 font-semibold">Test {testIndex + 1}</div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => removeGrayBoxTest(testIndex)}
                >
                  <X className="h-4 w-4" />
                </Button>

                <FormField
                  control={form.control}
                  name={`grayBoxTests.${testIndex}.isExample`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <div className="space-y-1 leading-none">
                        <FormLabel>¿Se muestra como ejemplo?</FormLabel>
                      </div>

                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`grayBoxTests.${testIndex}.description`}
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
                  name={`grayBoxTests.${testIndex}.functionName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de la función</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel>Argumentos de la función</FormLabel>
                  {form
                    .watch(`grayBoxTests.${testIndex}.functionArgs`)
                    ?.map((_, argIndex) => (
                      <div
                        key={argIndex}
                        className="mt-2 flex items-center space-x-2"
                      >
                        <FormField
                          control={form.control}
                          name={`grayBoxTests.${testIndex}.functionArgs.${argIndex}.value`}
                          render={({ field }) => (
                            <FormItem className="flex-grow">
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Valor del argumento"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`grayBoxTests.${testIndex}.functionArgs.${argIndex}.type`}
                          render={({ field }) => (
                            <FormItem>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Tipo" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="STRING">String</SelectItem>
                                  <SelectItem value="NUMBER">Number</SelectItem>
                                  <SelectItem value="BOOLEAN">
                                    Boolean
                                  </SelectItem>
                                  <SelectItem value="ARRAY">Array</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFunctionArg(testIndex, argIndex)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-2"
                    onClick={() => addFunctionArg(testIndex)}
                  >
                    Agregar argumento
                  </Button>
                </div>

                <FormField
                  control={form.control}
                  name={`grayBoxTests.${testIndex}.functionResponse.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Respuesta de la función</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Valor de respuesta" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`grayBoxTests.${testIndex}.functionResponse.type`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de respuesta</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="STRING">String</SelectItem>
                          <SelectItem value="NUMBER">Number</SelectItem>
                          <SelectItem value="BOOLEAN">Boolean</SelectItem>
                          <SelectItem value="ARRAY">Array</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() =>
                form.setValue("grayBoxTests", [
                  ...(form.watch("grayBoxTests") ?? []),
                  {
                    isExample: false,
                    functionName: "",
                    functionArgs: [],
                    functionResponse: { value: "", type: "STRING" },
                  },
                ])
              }
            >
              Agregar test de caja gris
            </Button>
          </div>

          {/* Sección de White Box Tests */}
          <div>
            <Header3>Tests de caja blanca</Header3>

            {form.watch("whiteBoxTests")?.map((_, index) => (
              <div
                key={index}
                className="relative my-4 space-y-4 rounded-md border p-4"
              >
                <div className="mb-2 font-semibold">Test {index + 1}</div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => removeWhiteBoxTest(index)}
                >
                  <X className="h-4 w-4" />
                </Button>

                <FormField
                  control={form.control}
                  name={`whiteBoxTests.${index}.isExample`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <div className="space-y-1 leading-none">
                        <FormLabel>¿Se muestra como ejemplo?</FormLabel>
                      </div>

                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`whiteBoxTests.${index}.description`}
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
                  name={`whiteBoxTests.${index}.test`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Código del test</FormLabel>
                      <FormControl>
                        <TextArea
                          {...field}
                          placeholder="Escribe aquí el código del test"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() =>
                form.setValue("whiteBoxTests", [
                  ...(form.watch("whiteBoxTests") ?? []),
                  { isExample: false, description: "", test: "" },
                ])
              }
            >
              Agregar test de caja blanca
            </Button>
          </div>

          <Button type="submit" loading={loading} className="w-full">
            Crear ejercicio
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Page;
