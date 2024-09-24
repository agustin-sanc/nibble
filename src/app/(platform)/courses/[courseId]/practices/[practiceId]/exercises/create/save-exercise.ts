"use server";

import { database } from "@/app/_cross/database";
import * as z from "zod";
import { exerciseFormSchema } from "../exercise-form-schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const inputSchema = z.object({
  ...exerciseFormSchema.shape,
  courseId: z.string(),
  practiceId: z.string(),
});

const validateInput = (input: z.infer<typeof inputSchema>) => {
  const validatedFields = inputSchema.safeParse(input);
  if (!validatedFields.success) throw new Error("Invalid input");
};

export const saveExercise = async ({
  courseId,
  ...data
}: z.infer<typeof inputSchema>) => {
  validateInput({ ...data, courseId });
  const exercise = await database.exercise.create({ data });
  redirect(`/courses/${courseId}/practices/${data.practiceId}`);
};
