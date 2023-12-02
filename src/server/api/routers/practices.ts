import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../../api/trpc";

export const practicesRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({ name: z.string().min(1), description: z.string().min(1) }),
    )
    .mutation(({ ctx, input }) =>
      ctx.db.practice.create({
        data: input,
      }),
    ),

  getAll: publicProcedure
    .input(z.object({}))
    .query(({ ctx }) =>
      ctx.db.practice.findMany({ orderBy: { createdAt: "desc" } }),
    ),
});
