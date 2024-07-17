"use server";

import { database } from "@/app/_cross/database";

export const addMember = async (args: { userId: string; courseId: string }) => {
  await database.course.update({
    where: { id: args.courseId },
    data: {
      studentIds: {
        push: args.userId,
      },
    },
  });
};
