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

  getAll: publicProcedure.query(({ ctx }) =>
    ctx.db.practice.findMany({ orderBy: { createdAt: "desc" } }),
  ),

  getNewest: publicProcedure.query(({ ctx }) =>
    // ctx.db.practice.findMany({
    //   orderBy: { createdAt: "desc" },
    //   take: 2,
    //   include: { exercises: true },
    // }),
    [
      {
        id: 1,
        name: "Arrays",
        description:
          "Los arrays son variables estructuradas, donde cada elemento se almacena de forma consecutiva en memoria. Las cadenas de caracteres son declaradas en C como arrays de caracteres y permiten la utilización de un cierto número de notaciones y de funciones especiales.",
        exercises: [],
      },
      {
        id: 2,
        name: "Funciones",
        description:
          "Las funciones son un conjunto de instrucciones que realizan una tarea específica. Se utilizan para dividir un programa en módulos más pequeños y organizados. Además, las funciones hacen que el código sea más fácil de probar, depurar y mantener.",
        exercises: [],
      },
    ],
  ),

  delete: publicProcedure
    .input(z.number())
    .query(({ ctx, input }) =>
      ctx.db.practice.delete({ where: { id: input } }),
    ),
});
