import { type User } from "@clerk/nextjs/dist/types/server";
import { isProfessorUser } from "@/app/_cross/auth/is-professor-user";

export const assureUserIsProfessor = (user: User) => {
  if (isProfessorUser(user)) throw new Error("User must be a professor");
};
