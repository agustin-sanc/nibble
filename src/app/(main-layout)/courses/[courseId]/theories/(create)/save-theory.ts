"use server";

import { prisma } from "@/app/_cross/prisma";
import * as z from "zod";

// TODO: What about security on server actions?

const inputSchema = z.object({
  name: z.string(),
  description: z.string(),
  courseId: z.number(),
});

const validateInput = (input: z.infer<typeof inputSchema>) => {
  const validatedFields = inputSchema.safeParse(input);
  if (!validatedFields.success) throw new Error("Invalid input");
};

export const saveTheory = async (input: z.infer<typeof inputSchema>) => {
  validateInput(input);
  return await prisma.theory.create({ data: input });
};
