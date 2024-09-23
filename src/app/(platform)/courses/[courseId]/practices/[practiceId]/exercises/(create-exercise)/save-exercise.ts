"use server";

import { database } from "@/app/_cross/database";
import * as z from "zod";
import { exerciseFormSchema } from "../exercise-form-schema";

const inputSchema = z.object({
  ...exerciseFormSchema.shape,
  practiceId: z.string(),
});

const validateInput = (input: z.infer<typeof inputSchema>) => {
  const validatedFields = inputSchema.safeParse(input);
  if (!validatedFields.success) throw new Error("Invalid input");
};

export const saveExercise = async (input: z.infer<typeof inputSchema>) => {
  validateInput(input);
  return await database.exercise.create({ data: input });
};
