import { prisma } from "@/prisma";

export const createPractice = async ({
  name,
  description,
}: {
  name: string;
  description: string;
}) =>
  await prisma.practice.create({
    data: { name, description },
  });

export const deletePractice = async (id: number) =>
  await prisma.practice.delete({ where: { id } });
