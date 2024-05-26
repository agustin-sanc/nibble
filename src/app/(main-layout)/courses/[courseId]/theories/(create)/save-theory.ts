"use server";

import { prisma } from "@/app/_cross/prisma";
import * as z from "zod";

const inputSchema = z.object({
  name: z.string(),
  description: z.string(),
  content: z.string(),
  courseId: z.number(),
});

const validateInput = (input: z.infer<typeof inputSchema>) => {
  const { success } = inputSchema.safeParse(input);

  if (!success) throw new Error("Invalid input");
};

export const saveTheory = async (input: z.infer<typeof inputSchema>) => {
  validateInput(input);
  return await prisma.theory.create({ data: input });
};
