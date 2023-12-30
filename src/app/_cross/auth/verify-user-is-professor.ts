import { type User } from "@clerk/nextjs/dist/types/server";

export const verifyUserIsProfessor = (user: User) => {
  if (!user.publicMetadata.isProfessor)
    throw new Error("User is not a professor");
};
