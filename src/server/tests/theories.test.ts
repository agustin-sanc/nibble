import { appRouter } from "../api/root";
import { createInnerTRPCContext } from "../api/trpc";
import { db } from "@/server/db";

describe("theories", () => {
  beforeEach(async () => {
    await db.theory.deleteMany({});
  });

  describe("theories.create", () => {
    it("should save theory in database", async () => {
      const caller = appRouter.createCaller(createInnerTRPCContext());

      expect(await db.theory.count()).toBe(0);

      await caller.theories.create({
        name: "test",
      });

      expect(await db.theory.count()).toBe(1);
    });
  });

  describe("theories.getAll", () => {
    it("should return all theories", async () => {
      const caller = appRouter.createCaller(createInnerTRPCContext());
      const theories = await caller.theories.getAll();
      expect(theories).toBeDefined();
    });
  });

  describe("theories.delete", () => {
    it("should delete theory in database", async () => {
      const caller = appRouter.createCaller(createInnerTRPCContext());

      const { id } = await db.theory.create({
        data: {
          name: "test",
        },
      });

      expect(await db.theory.count()).toBe(1);

      await caller.theories.delete(id);

      expect(await db.theory.count()).toBe(0);
    });
  });
});
