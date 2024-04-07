import { currentUser } from "@clerk/nextjs";

export const getCurrentUser = async () => {
  const user = await currentUser();

  if (!user) return undefined;

  const isProfessor = user.publicMetadata.isProfessor as boolean;

  return { ...user, isProfessor };
};
