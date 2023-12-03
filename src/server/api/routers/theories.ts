import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../../api/trpc";

export const theoriesRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(({ ctx, input }) =>
      ctx.db.theory.create({
        data: input,
      }),
    ),

  getAll: publicProcedure.query(({ ctx }) =>
    ctx.db.theory.findMany({ orderBy: { createdAt: "desc" } }),
  ),

  delete: publicProcedure
    .input(z.number())
    .query(({ ctx, input }) => ctx.db.theory.delete({ where: { id: input } })),
});
