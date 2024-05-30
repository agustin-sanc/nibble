import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export const getCurrentUser = async () => {
  const user = await currentUser();

  if (!user) redirect("/");

  const isProfessor = user.publicMetadata.isProfessor as boolean;

  return { ...user, isProfessor };
};
