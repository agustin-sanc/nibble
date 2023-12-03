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
              // TODO: Add validation for data based on type.
              type: z.enum(["BLACK_BOX", "GRAY_BOX"]),
              data: z.object({
                batchInput: z.array(z.any()),
                batchOutput: z.array(z.any()),
                functionArgs: z.array(z.any()).optional(),
                functionResponse: z.any().optional(),
                functionName: z.string().optional(),
              }),
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
