import { appRouter } from "../api/root";
import { createInnerTRPCContext } from "../api/trpc";
import { db } from "@/server/db";

describe("exercises", () => {
  beforeEach(async () => {
    await db.exercise.deleteMany({});
  });

  describe("exercises.create", () => {
    it("should save exercise in database", async () => {
      const caller = appRouter.createCaller(createInnerTRPCContext());

      expect(await db.exercise.count()).toBe(0);

      await caller.exercises.create({
        name: "test",
        description: "test",
      });

      expect(await db.exercise.count()).toBe(1);
    });
  });

  describe("exercises.delete", () => {
    it("should delete exercise in database", async () => {
      const caller = appRouter.createCaller(createInnerTRPCContext());

      const { id } = await db.exercise.create({
        data: {
          name: "test",
          description: "test",
        },
      });

      expect(await db.exercise.count()).toBe(1);

      await caller.exercises.delete(id);

      expect(await db.exercise.count()).toBe(0);
    });
  });
});
