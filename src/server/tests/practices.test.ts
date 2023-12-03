import { appRouter } from "../api/root";
import { createInnerTRPCContext } from "../api/trpc";
import { db } from "@/server/db";

describe("practices", () => {
  beforeEach(async () => {
    await db.exercise.deleteMany({});
    await db.practice.deleteMany({});
  });

  describe("practices.create", () => {
    it("should save practice in database", async () => {
      const caller = appRouter.createCaller(createInnerTRPCContext());

      expect(await db.practice.count()).toBe(0);

      await caller.practices.create({
        name: "test",
        description: "test",
      });

      expect(await db.practice.count()).toBe(1);
    });
  });

  describe("practices.getAll", () => {
    it("should return all practices", async () => {
      const caller = appRouter.createCaller(createInnerTRPCContext());
      const practices = await caller.practices.getAll();
      expect(practices).toBeDefined();
    });
  });

  describe("practices.delete", () => {
    it("should delete practice in database", async () => {
      const caller = appRouter.createCaller(createInnerTRPCContext());

      const { id } = await db.practice.create({
        data: {
          name: "test",
          description: "test",
        },
      });

      expect(await db.practice.count()).toBe(1);

      await caller.practices.delete(id);

      expect(await db.practice.count()).toBe(0);
    });
  });
});
