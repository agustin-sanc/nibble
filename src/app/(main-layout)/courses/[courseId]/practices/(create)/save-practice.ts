"use server";

import { prisma } from "@/app/_cross/prisma";
import * as z from "zod";

// TODO: What about security on server actions?

const inputSchema = z.object({
  name: z.string(),
  description: z.string(),
});

const validateInput = (input: z.infer<typeof inputSchema>) => {
  const validatedFields = inputSchema.safeParse(input);
  if (!validatedFields.success) throw new Error("Invalid input");
};

export const savePractice = async (input: z.infer<typeof inputSchema>) => {
  validateInput(input);
  return await prisma.practice.create({ data: input });
};
