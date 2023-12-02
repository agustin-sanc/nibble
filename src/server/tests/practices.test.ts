import { appRouter } from "../api/root";
import { createInnerTRPCContext } from "../api/trpc";

describe("practices", () => {
  test("should pass", () => {
    const caller = appRouter.createCaller(createInnerTRPCContext());

    const practice = caller.practices.create({
      name: "test",
      description: "test",
    });

    expect(practice).toBeDefined();
  });
});
