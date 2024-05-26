"use server";

import { prisma } from "@/app/_cross/prisma";
import * as z from "zod";
import { createPracticeFormSchema } from "@/app/(main-layout)/courses/[courseId]/practices/(create)/create-practice-form-schema";

const inputSchema = z.object({
  ...createPracticeFormSchema.shape,
  courseId: z.number(),
});

const validateInput = (input: z.infer<typeof inputSchema>) => {
  const validatedFields = inputSchema.safeParse(input);
  if (!validatedFields.success) throw new Error("Invalid input");
};

export const savePractice = async (input: z.infer<typeof inputSchema>) => {
  validateInput(input);
  return await prisma.practice.create({ data: input });
};
