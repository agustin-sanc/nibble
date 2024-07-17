"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_cross/components/dialog";
import { Button } from "@/app/_cross/components/button";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addMember } from "./add-member";
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
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof addStudentSchema>>({
    resolver: zodResolver(addStudentSchema),
  });

  const onSubmit = async (data: z.infer<typeof addStudentSchema>) => {
    setLoading(true);

    if (user) {
      try {
        await addMember({
          userId: data.userId,
          courseId,
        });

        toast.success("Alumno agregado con éxito.");
        router.push(`/courses/${courseId}`);
      } catch (error) {
        setLoading(false);
        toast.error("Ocurrió un error al agregar el alumno.");
      }
    }
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
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar un alumno" />
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
            <Button type="submit" loading={loading}>
              Confirmar
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
