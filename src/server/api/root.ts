import { practicesRouter } from "@/server/api/routers/practices";
import { postsRouter } from "@/server/api/routers/posts";
import { createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  practices: practicesRouter,
  posts: postsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
