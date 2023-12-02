import { appRouter } from "../../api/root";
import { createInnerTRPCContext } from "../../api/trpc";

const authorizedContext = createInnerTRPCContext();
const unauthorizedContext = createInnerTRPCContext();

export const callerWithAuth = appRouter.createCaller(authorizedContext);
export const callerWithoutAuth = appRouter.createCaller(unauthorizedContext);
