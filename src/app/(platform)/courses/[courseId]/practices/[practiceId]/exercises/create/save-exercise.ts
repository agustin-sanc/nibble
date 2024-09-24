"use server";

import { database } from "@/app/_cross/database";
import * as z from "zod";
import { exerciseFormSchema } from "../exercise-form-schema";
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
  practiceId,
  ...data
}: z.infer<typeof inputSchema>) => {
  validateInput({ ...data, courseId, practiceId });

  await database.exercise.create({
    data: {
      ...data,
      practiceId,
      tags: {
        connectOrCreate:
          data.tags?.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })) || [],
      },
      blackBoxTests: {
        create: data.blackBoxTests || [],
      },
      grayBoxTests: {
        create: data.grayBoxTests || [],
      },
      whiteBoxTests: {
        create: data.whiteBoxTests || [],
      },
    },
  });

  redirect(`/courses/${courseId}/practices/${practiceId}`);
};
