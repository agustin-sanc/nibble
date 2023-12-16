import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const functionsPractice = await prisma.practice.create({
    data: {
      name: "Funciones",
      description:
        "Las funciones son un conjunto de instrucciones que realizan una tarea específica. Las funciones se utilizan para reutilizar código, evitar la repetición de código y hacer que el código sea más fácil de leer.",
    },
  });

  await prisma.exercise.createMany({
    data: [
      {
        name: "Sumar dos números",
        description:
          "Dados dos números, escribir una función que devuelva la suma de ambos.",
        practiceId: functionsPractice.id,
      },
      {
        name: "Revertir una cadena",
        description:
          "Dada una cadena, escribir una función que devuelva la cadena invertida.",
        practiceId: functionsPractice.id,
      },
    ],
  });

  const arraysPractice = await prisma.practice.create({
    data: {
      name: "Arreglos",
      description:
        "Los arrays son estructuras de datos que nos permiten almacenar varios valores en una misma variable. Los arrays son muy útiles para almacenar listas de elementos.",
    },
  });

  await prisma.exercise.create({
    data: {
      name: "Calcular promedio de notas",
      description: "Dado un array de N notas, calcular el promedio.",
      practiceId: arraysPractice.id,
      exampleTests: {
        create: [
          {
            input: "[10, 20, 30]",
            output: "20",
            description: "Si las 3 notas son 10, 20 y 30; el promedio es 20.",
            type: "BLACK_BOX",
          },
          {
            input: "[10, 20, 30]",
            output: "20",
            description: "Si las 3 notas son 10, 20 y 30; el promedio es 20.",
            type: "BLACK_BOX",
          },
        ],
      },
    },
  });

  await prisma.exercise.create({
    data: {
      name: "Total de carrito de compra",
      description:
        "Dado un array de N precios, calcular el total de un carrito de compra.",
      practiceId: arraysPractice.id,
    },
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
