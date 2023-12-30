import { type User } from "@clerk/nextjs/dist/types/server";

export const isProfessor = (user: User) =>
  user.publicMetadata.isProfessor as boolean;
