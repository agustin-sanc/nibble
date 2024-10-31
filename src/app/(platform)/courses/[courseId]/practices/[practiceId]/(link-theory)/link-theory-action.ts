'use server';

import { database } from "@/app/_cross/database";
import { revalidatePath } from "next/cache";

export const linkTheoryToPractice = async (practiceId: string, theoryId: string) => {
  await database.practice.update({
    where: { id: practiceId },
    data: {
      theories: {
        connect: { id: theoryId }
      }
    }
  });

  revalidatePath(`/courses/[courseId]/practices/${practiceId}`);
}