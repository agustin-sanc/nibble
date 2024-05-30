"use server";

import { database } from "@/app/_cross/database";
import * as z from "zod";

const inputSchema = z.object({
  name: z.string(),
  description: z.string(),
  content: z.string(),
  courseId: z.string(),
});

const validateInput = (input: z.infer<typeof inputSchema>) => {
  const { success } = inputSchema.safeParse(input);

  if (!success) throw new Error("Invalid input");
};

export const saveTheory = async (input: z.infer<typeof inputSchema>) => {
  validateInput(input);
  return await database.theory.create({ data: input });
};
