import { appRouter } from "../api/root";
import { createInnerTRPCContext } from "../api/trpc";
import { db } from "@/server/db";

describe("posts", () => {
  beforeEach(async () => {
    await db.post.deleteMany({});
  });

  describe("posts.create", () => {
    it("should save post in database", async () => {
      const caller = appRouter.createCaller(createInnerTRPCContext());

      expect(await db.post.count()).toBe(0);

      await caller.posts.create({
        name: "test",
      });

      expect(await db.post.count()).toBe(1);
    });
  });

  describe("posts.getAll", () => {
    it("should return all posts", async () => {
      const caller = appRouter.createCaller(createInnerTRPCContext());
      const posts = await caller.posts.getAll();
      expect(posts).toBeDefined();
    });
  });

  describe("posts.delete", () => {
    it("should delete post in database", async () => {
      const caller = appRouter.createCaller(createInnerTRPCContext());

      const { id } = await db.post.create({
        data: {
          name: "test",
        },
      });

      expect(await db.post.count()).toBe(1);

      await caller.posts.delete(id);

      expect(await db.post.count()).toBe(0);
    });
  });
});
