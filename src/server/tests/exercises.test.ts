import { appRouter } from "../api/root";
import { createInnerTRPCContext } from "../api/trpc";
import { db } from "@/server/db";

describe("exercises", () => {
  beforeEach(async () => {
    await db.tag.deleteMany({});
    await db.exercise.deleteMany({});
    await db.practice.deleteMany({});
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

    it("should save empty tests array if no tests are provided", async () => {
      const caller = appRouter.createCaller(createInnerTRPCContext());

      const practice = await db.practice.create({
        data: {
          name: "test",
          description: "test",
        },
      });

      const { id } = await caller.exercises.create({
        name: "test",
        description: "test",
        practiceId: practice.id,
      });

      const exercise = await db.exercise.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          tests: true,
        },
      });

      expect(exercise.tests.length).toBe(0);
    });

    it("should save tests in database", async () => {
      const caller = appRouter.createCaller(createInnerTRPCContext());

      const practice = await db.practice.create({
        data: {
          name: "test",
          description: "test",
        },
      });

      const { id } = await caller.exercises.create({
        name: "test",
        description: "test",
        practiceId: practice.id,
        tests: [
          {
            input: "test",
            output: "test",
          },
          {
            input: "test",
            output: "test",
          },
        ],
      });

      const exercise = await db.exercise.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          tests: true,
        },
      });

      expect(exercise.tests.length).toBe(2);
    });

    it("should save empty tags array if no tags are provided", async () => {
      const caller = appRouter.createCaller(createInnerTRPCContext());

      const practice = await db.practice.create({
        data: {
          name: "test",
          description: "test",
        },
      });

      const { id } = await caller.exercises.create({
        name: "test",
        description: "test",
        practiceId: practice.id,
      });

      const exercise = await db.exercise.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          tags: true,
        },
      });

      expect(exercise.tags.length).toBe(0);
    });

    it("should add tags to exercise", async () => {
      const caller = appRouter.createCaller(createInnerTRPCContext());

      const practice = await db.practice.create({
        data: {
          name: "test",
          description: "test",
        },
      });

      const { id } = await caller.exercises.create({
        name: "test",
        description: "test",
        practiceId: practice.id,
        tags: ["functions"],
      });

      const exercise = await db.exercise.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          tags: true,
        },
      });

      expect(exercise.tags.length).toBe(1);
    });

    it("should create tags if they don't exist", async () => {
      const caller = appRouter.createCaller(createInnerTRPCContext());

      const practice = await db.practice.create({
        data: {
          name: "test",
          description: "test",
        },
      });

      expect(await db.tag.count()).toBe(0);

      await caller.exercises.create({
        name: "test",
        description: "test",
        practiceId: practice.id,
        tags: ["functions"],
      });

      expect(await db.tag.count()).toBe(1);
    });

    it("should not create tags if they exist", async () => {
      const caller = appRouter.createCaller(createInnerTRPCContext());

      const practice = await db.practice.create({
        data: {
          name: "test",
          description: "test",
        },
      });

      await db.tag.create({
        data: {
          name: "functions",
        },
      });

      expect(await db.tag.count()).toBe(1);

      await caller.exercises.create({
        name: "test",
        description: "test",
        practiceId: practice.id,
        tags: ["functions"],
      });

      expect(await db.tag.count()).toBe(1);
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
