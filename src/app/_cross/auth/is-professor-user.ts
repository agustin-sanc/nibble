import { type User } from "@clerk/nextjs/dist/types/server";

export const isProfessorUser = (user: User) => user.publicMetadata.isProfessor;
