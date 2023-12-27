"use server";

import { prisma } from "@/app/_cross/prisma";
import * as z from "zod";

// TODO: What about security on server actions?

const inputSchema = z.object({
  name: z.string(),
  description: z.string(),
  ownerId: z.string(),
});

export const saveCourse = async (input: z.infer<typeof inputSchema>) => {
  const validatedFields = inputSchema.safeParse(input);

  if (!validatedFields.success)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };

  const { data } = validatedFields;

  return await prisma.course.create({ data });
};
