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
  console.log({ data, practiceId, courseId });
  // validateInput({ ...data, courseId, practiceId });
  console.log("validated");

  await database.exercise.create({
    data: {
      ...data,
      practiceId,
      tags: {
        connectOrCreate:
          data.tags?.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })) ?? [],
      },
      blackBoxTests: {
        create: data.blackBoxTests ?? [],
      },
      grayBoxTests: {
        create:
          data.grayBoxTests?.map((test) => ({
            isExample: test.isExample,
            functionName: test.functionName,
            functionResponse: {
              create: {
                type: test.functionResponse.type,
                value: test.functionResponse.value,
              },
            },
            description: test.description,
            functionArgs: {
              create: test.functionArgs.map((arg) => ({
                type: arg.type,
                value: arg.value,
              })),
            },
          })) ?? [],
      },
      whiteBoxTests: {
        create: data.whiteBoxTests ?? [],
      },
    },
  });

  // const processedData = {
  //   ...data,
  //   grayBoxTests: data.grayBoxTests.map(test => ({
  //     ...test,
  //     functionArgs: test.functionArgs.split(' ').map(arg => ({ value: arg, type: 'STRING' }))
  //   }))
  // };

  redirect(`/courses/${courseId}/practices/${practiceId}`);
};
