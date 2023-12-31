import { type User } from "@clerk/nextjs/dist/types/server";
import { isProfessor } from "@/app/_cross/auth/is-professor";

export const assureUserIsProfessor = (user: User) => {
  if (!isProfessor(user)) throw new Error("User must be a professor");
};
