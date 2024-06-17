"use server";

import { database } from "@/app/_cross/database";
import * as z from "zod";
import { practiceFormSchema } from "@/app/(platform)/courses/[courseId]/practices/[practiceId]/practice-form-schema";

const inputSchema = z.object({
  ...practiceFormSchema.shape,
  courseId: z.string(),
});

const validateInput = (input: z.infer<typeof inputSchema>) => {
  const validatedFields = inputSchema.safeParse(input);
  if (!validatedFields.success) throw new Error("Invalid input");
};

export const savePractice = async (input: z.infer<typeof inputSchema>) => {
  validateInput(input);
  return await database.practice.create({ data: input });
};
