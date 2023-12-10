import { prisma } from "@/prisma";

export const createTheory = async ({
  name,
  description,
}: {
  name: string;
  description: string;
}) =>
  await prisma.theory.create({
    data: { name, description },
  });

export const deleteTheory = async (id: number) => {
  await prisma.theory.delete({ where: { id } });
};
