"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_cross/components/dialog";
import { Button } from "@/app/_cross/components/button";
import { toast } from "sonner";
import { addStudent } from "./add-student";
import { type getUserList } from "@/app/_cross/auth/get-user-list";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/app/_cross/components/select";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Form,
} from "@/app/_cross/components/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { useState } from "react";
import { addStudentSchema } from "./add-student-schema";

export const AddStudentDialog = ({
  courseId,
  availableStudents,
}: {
  courseId: string;
  availableStudents: Awaited<ReturnType<typeof getUserList>>;
}) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof addStudentSchema>>({
    resolver: zodResolver(addStudentSchema),
  });

  const areStudentsAvailable = availableStudents.length > 0;

  const onSubmit = (data: z.infer<typeof addStudentSchema>) => {
    setLoading(true);

    toast.promise(
      addStudent({
        userId: data.userId,
        courseId,
      }),
      {
        loading: "Agregando alumno...",
        success: () => {
          setLoading(false);
          return "Alumno agregado con éxito.";
        },
        error: () => {
          setLoading(false);
          return "Ocurrió un error al agregar el alumno.";
        },
      },
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Agregar alumno</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar alumno</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-auto space-y-6"
          >
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!areStudentsAvailable}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            areStudentsAvailable
                              ? "Seleccionar un alumno"
                              : "No hay alumnos disponibles"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {availableStudents.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.firstName} {student.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              loading={loading}
              disabled={!areStudentsAvailable}
            >
              Confirmar
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
