import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const practice = await prisma.practice.create({
    data: {
      name: "Programación dinámica",
      description:
        "La programación dinámica es un método para reducir el tiempo de ejecución de un algoritmo mediante el almacenamiento de resultados de subproblemas calculados previamente.",
    },
  });

  await prisma.exercise.createMany({
    data: [
      {
        name: "Exercise 1",
        description: "Exercise 1 description",
        practiceId: practice.id,
      },
      {
        name: "Exercise 2",
        description: "Exercise 2 description",
        practiceId: practice.id,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
