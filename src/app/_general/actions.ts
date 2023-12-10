import { prisma } from "@/prisma";

export const getPractices = async () =>
  await prisma.practice.findMany({ orderBy: { createdAt: "desc" } });

export const getNewestPractices = async () =>
  await prisma.practice.findMany({
    orderBy: { createdAt: "desc" },
    take: 4,
    include: { exercises: true },
  });
