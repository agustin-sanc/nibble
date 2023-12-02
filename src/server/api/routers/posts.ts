import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../../api/trpc";

export const postsRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(({ ctx, input }) =>
      ctx.db.post.create({
        data: input,
      }),
    ),

  getAll: publicProcedure.query(({ ctx }) =>
    ctx.db.post.findMany({ orderBy: { createdAt: "desc" } }),
  ),

  delete: publicProcedure
    .input(z.number())
    .query(({ ctx, input }) => ctx.db.post.delete({ where: { id: input } })),
});
