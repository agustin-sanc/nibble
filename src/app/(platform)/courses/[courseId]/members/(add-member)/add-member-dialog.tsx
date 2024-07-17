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
import { addMemberSchema } from "./add-member-schema";

export const AddMemberDialog = ({
  courseId,
  possibleMembers,
}: {
  courseId: string;
  possibleMembers: Awaited<ReturnType<typeof getUserList>>;
}) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof addMemberSchema>>({
    resolver: zodResolver(addMemberSchema),
  });

  const onSubmit = async (data: z.infer<typeof addMemberSchema>) => {
    setLoading(true);

    if (user) {
      try {
        await addMember({
          userId: data.userId,
          courseId,
        });

        toast.success("Miembro agregado con éxito.");
        router.push(`/courses/${courseId}`);
      } catch (error) {
        setLoading(false);
        toast.error("Ocurrió un error al agregar el miembro seleccionado.");
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Agregar miembro</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar miembro</DialogTitle>
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
                        <SelectValue placeholder="Seleccionar un usuario" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {possibleMembers.map((student) => (
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
              Agregar
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
