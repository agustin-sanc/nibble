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

      const practice = await db.practice.create({
        data: {
          name: "test",
          description: "test",
        },
      });

      await caller.exercises.create({
        name: "test",
        description: "test",
        practiceId: practice.id,
      });

      expect(await db.exercise.count()).toBe(1);
    });

    it("should add exercise in practice.exercises array", async () => {
      const caller = appRouter.createCaller(createInnerTRPCContext());

      const practice = await db.practice.create({
        data: {
          name: "test",
          description: "test",
        },
      });

      await caller.exercises.create({
        name: "test",
        description: "test",
        practiceId: practice.id,
      });

      const updatedPractice = await db.practice.findUniqueOrThrow({
        where: {
          id: practice.id,
        },
        include: {
          exercises: true,
        },
      });

      expect(updatedPractice.exercises.length).toBe(1);
    });

    it("should throw an error if practice does not exist", async () => {
      const caller = appRouter.createCaller(createInnerTRPCContext());

      await expect(
        caller.exercises.create({
          name: "test",
          description: "test",
          practiceId: 123,
        }),
      ).rejects.toThrow();
    });
  });

  describe("exercises.delete", () => {
    it("should delete exercise in database", async () => {
      const caller = appRouter.createCaller(createInnerTRPCContext());

      const practice = await db.practice.create({
        data: {
          name: "test",
          description: "test",
        },
      });

      const { id } = await db.exercise.create({
        data: {
          name: "test",
          description: "test",
          practiceId: practice.id,
        },
      });

      expect(await db.exercise.count()).toBe(1);

      await caller.exercises.delete(id);

      expect(await db.exercise.count()).toBe(0);
    });

    it("should remove exercise in practice", async () => {
      const caller = appRouter.createCaller(createInnerTRPCContext());

      const practice = await db.practice.create({
        data: {
          name: "test",
          description: "test",
        },
      });

      const { id } = await db.exercise.create({
        data: {
          name: "test",
          description: "test",
          practiceId: practice.id,
        },
      });

      await caller.exercises.delete(id);

      const updatedPractice = await db.practice.findUniqueOrThrow({
        where: {
          id: practice.id,
        },
        include: {
          exercises: true,
        },
      });

      expect(updatedPractice.exercises.length).toBe(0);
    });
  });
});
