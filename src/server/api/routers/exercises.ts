import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../../api/trpc";

export const exercisesRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().min(1),
        practiceId: z.number(),
      }),
    )
    .mutation(({ ctx, input }) =>
      ctx.db.exercise.create({
        data: input,
      }),
    ),

  delete: publicProcedure
    .input(z.number())
    .query(({ ctx, input }) =>
      ctx.db.exercise.delete({ where: { id: input } }),
    ),
});
