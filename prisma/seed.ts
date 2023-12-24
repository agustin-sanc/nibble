import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const aed = await prisma.course.create({
    data: {
      name: "AED: 1k6 (2024)",
      description: "Cátedra de algoritmos y estructuras de datos, UTN-FRT.",
      ownerId: "user_2Xre7xN7YsgdtkfsWsGyzsP0NIk",
      studentIds: ["user_2XmUmwYgRF2yPH0DvYj7WgIAE8G"],
    },
  });

  const variablesTheory = await prisma.theory.create({
    data: {
      name: "Variables",
      description:
        "Las variables son espacios de memoria que nos permiten almacenar valores.",
      content:
        "Las variables son espacios de memoria que nos permiten almacenar valores. Para declarar una variable, se utiliza la palabra reservada var, seguida del nombre de la variable. Por ejemplo, para declarar una variable llamada nombre, se utiliza la siguiente sintaxis: var nombre. Para asignar un valor a una variable, se utiliza el operador de asignación =. Por ejemplo, para asignar el valor 'Juan' a la variable nombre, se utiliza la siguiente sintaxis: nombre = 'Juan'.",
      courseId: aed.id,
    },
  });

  const variablesPractice = await prisma.practice.create({
    data: {
      name: "Variables",
      description:
        "Las variables son espacios de memoria que nos permiten almacenar valores.",
      theories: {
        connect: {
          id: variablesTheory.id,
        },
      },
      courseId: aed.id,
    },
  });

  await prisma.exercise.create({
    data: {
      name: "Suma",
      description:
        "Dados dos números enteros, devolver la suma de ambos números.",
      practiceId: variablesPractice.id,
      blackBoxTests: {
        create: [
          {
            batchInput: ["2", "3"],
            batchOutput: ["5"],
            isExample: true,
            description: "Al sumar 2 y 3, el resultado es 5.",
          },
          {
            batchInput: ["0", "-2"],
            batchOutput: ["-2"],
            isExample: true,
            description: "Al sumar 0 y -2, el resultado es -2.",
          },
        ],
      },
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
