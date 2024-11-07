"use server";

import { database } from "@/app/_cross/database";
import * as z from "zod";
import { getCurrentUser } from "@/app/_cross/auth/get-current-user";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import { exerciseFormSchema } from "../../exercise-form-schema";

const validateInput = (data: z.infer<typeof exerciseFormSchema>) => {
  const { success } = exerciseFormSchema.safeParse(data);

  if (!success) throw new Error("Invalid data");
};

export const editExercise = async (
  data: { id: string } & z.infer<typeof exerciseFormSchema>,
) => {
  const user = await getCurrentUser();

  if (!user) throw new Error("User not found");

  validateInput(data);

  const exercise = await database.exercise.update({
    where: { id: data.id, practice: { course: { ownerId: user.id } } },
    data: {
      ...data,
      tags: {
        set: data.tags?.map(tag => ({ name: tag })) ?? []
      },
      blackBoxTests: {
        deleteMany: {},
        createMany: {
          data: data.blackBoxTests ?? []
        }
      },
      grayBoxTests: {
        deleteMany: {},
        create: data.grayBoxTests?.map(test => ({
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
            create: test.functionArgs.map(arg => ({
              type: arg.type,
              value: arg.value,
            })),
          },
        })) ?? [],
      },
      whiteBoxTests: {
        deleteMany: {},
        createMany: {
          data: data.whiteBoxTests ?? []
        }
      }
    },
    include: {
      practice: {
        include: {
          course: true,
        },
      },
    },
  });

  if (!exercise) notFound();

  revalidatePath(`/courses/${exercise.practiceId}/practices/${exercise.practiceId}`);

  revalidatePath(
    `/courses/${exercise.practice.course.id}/practices/${exercise.practiceId}/exercises/${exercise.id}`
  );
};
