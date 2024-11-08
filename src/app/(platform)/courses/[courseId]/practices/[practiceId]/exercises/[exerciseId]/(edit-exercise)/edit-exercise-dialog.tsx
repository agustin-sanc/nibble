"use client";

import { Button } from "@/app/_cross/components/button";
import { Checkbox } from "@/app/_cross/components/check-box";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_cross/components/select";
import { TextArea } from "@/app/_cross/components/text-area";
import { Header3 } from "@/app/_cross/components/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import type {
  BlackBoxTest,
  Exercise,
  GrayBoxTest,
  WhiteBoxTest,
} from "@prisma/client";
import { X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type * as z from "zod";
import { exerciseFormSchema } from "../../exercise-form-schema";
import { editExercise } from "./edit-exercise";

type ExerciseWithTests = Exercise & {
  blackBoxTests: BlackBoxTest[];
  grayBoxTests: (GrayBoxTest & {
    functionArgs: {
      type: "STRING" | "NUMBER" | "BOOLEAN" | "ARRAY";
      value: string;
    }[];
    functionResponse: {
      type: "STRING" | "NUMBER" | "BOOLEAN" | "ARRAY";
      value: string;
    };
  })[];
  whiteBoxTests: WhiteBoxTest[];
  tags: string[] | undefined;
};

export const EditExerciseDialog = ({
  exercise,
}: {
  exercise: ExerciseWithTests;
}) => {
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [tagsInput, setTagsInput] = useState(exercise.tags?.join(" "));

  const form = useForm<z.infer<typeof exerciseFormSchema>>({
    resolver: zodResolver(exerciseFormSchema),
    defaultValues: {
      name: exercise.name,
      description: exercise.description ?? undefined,
      difficulty: exercise.difficulty,
      tags: exercise.tags,
      blackBoxTests: exercise.blackBoxTests.map((test) => ({
        isExample: test.isExample,
        description: test.description ?? undefined,
        batchInput: test.batchInput,
        batchOutput: test.batchOutput,
      })),
      grayBoxTests: exercise.grayBoxTests.map((test) => ({
        isExample: test.isExample,
        description: test.description ?? undefined,
        functionName: test.functionName,
        functionArgs: test.functionArgs,
        functionResponse: test.functionResponse,
      })),
      whiteBoxTests: exercise.whiteBoxTests.map((test) => ({
        isExample: test.isExample,
        description: test.description ?? undefined,
        test: test.test,
      })),
    },
  });

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
    const currentTests = form.getValues("grayBoxTests") ?? [];
    const updatedTests = [...currentTests];
    if (updatedTests[testIndex]) {
      updatedTests[testIndex].functionArgs.push({ value: "", type: "STRING" });
      form.setValue("grayBoxTests", updatedTests);
    }
  };

  const removeFunctionArg = (testIndex: number, argIndex: number) => {
    const currentTests = form.getValues("grayBoxTests") ?? [];
    const updatedTests = [...currentTests];
    if (updatedTests[testIndex]?.functionArgs) {
      updatedTests[testIndex].functionArgs.splice(argIndex, 1);
      form.setValue("grayBoxTests", updatedTests);
    }
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
    const tagsArray = tagsInput
      ?.split(" ")
      .filter((tag: string) => tag.trim() !== "");
    form.setValue("tags", tagsArray);
  };

  const onSubmit = (data: z.infer<typeof exerciseFormSchema>) => {
    setSubmitButtonDisabled(true);
    toast.promise(
      editExercise({
        id: exercise.id,
        ...data,
      }).finally(() => setSubmitButtonDisabled(false)),
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

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Editar ejercicio</DialogTitle>
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
                                    <SelectItem value="STRING">
                                      String
                                    </SelectItem>
                                    <SelectItem value="NUMBER">
                                      Number
                                    </SelectItem>
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
                            onClick={() =>
                              removeFunctionArg(testIndex, argIndex)
                            }
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

            <Button
              type="submit"
              loading={submitButtonDisabled}
              className="w-full"
            >
              Guardar cambios
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
