import { prisma } from "@/app/_general/prisma";
import { z } from "zod";

// z.object({
//   name: z.string().min(1),
//   description: z.string().min(1),
//   practiceId: z.number(),
//   tags: z.array(z.string().min(1)).optional(),
//   tests: z
//     .array(
//       z.object({
//         // TODO: Add validation for data based on type.
//         type: z.enum(["BLACK_BOX", "GRAY_BOX"]),
//         data: z.object({
//           batchInput: z.array(z.any()),
//           batchOutput: z.array(z.any()),
//           functionArgs: z.array(z.any()).optional(),
//           functionResponse: z.any().optional(),
//           functionName: z.string().optional(),
//         }),
//       }),
//     )
//     .optional(),
// }),

// export const createExercise = async (data: Data) =>
//   await prisma.exercise.create({
//     data: { name, description },
//   });

export const deleteExercise = async (id: number) =>
  await prisma.exercise.delete({ where: { id } });
