import { practicesRouter } from "@/server/api/routers/practices";
import { theoriesRouter } from "@/server/api/routers/theories";
import { createTRPCRouter } from "@/server/api/trpc";
import { exercisesRouter } from "@/server/api/routers/exercises";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  practices: practicesRouter,
  theories: theoriesRouter,
  exercises: exercisesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
