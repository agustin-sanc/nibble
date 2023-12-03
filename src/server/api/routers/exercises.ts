import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../../api/trpc";

export const exercisesRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().min(1),
        practiceId: z.number(),
        tags: z.array(z.string().min(1)).optional(),
        tests: z
          .array(
            z.object({
              input: z.string().min(1),
              output: z.string().min(1),
            }),
          )
          .optional(),
      }),
    )
    .mutation(({ ctx, input }) =>
      ctx.db.exercise.create({
        data: {
          ...input,
          tags: {
            connectOrCreate: input.tags?.map((name) => ({
              where: { name },
              create: { name },
            })),
          },
          tests: { create: input.tests },
        },
      }),
    ),

  delete: publicProcedure
    .input(z.number())
    .query(({ ctx, input }) =>
      ctx.db.exercise.delete({ where: { id: input } }),
    ),
});
