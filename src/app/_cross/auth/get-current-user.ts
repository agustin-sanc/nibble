import { currentUser } from "@clerk/nextjs";

export const getCurrentUser = async () => {
  const user = await currentUser();

  if (!user) throw new Error("No current user.");

  return { ...user, ...user.publicMetadata };
};
