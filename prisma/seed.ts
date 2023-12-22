import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const variablesTheory = await prisma.theory.create({
    data: {
      name: "Variables",
      description:
        "Las variables son espacios de memoria que nos permiten almacenar valores.",
      content:
        "Las variables son espacios de memoria que nos permiten almacenar valores. Para declarar una variable, se utiliza la palabra reservada var, seguida del nombre de la variable. Por ejemplo, para declarar una variable llamada nombre, se utiliza la siguiente sintaxis: var nombre. Para asignar un valor a una variable, se utiliza el operador de asignación =. Por ejemplo, para asignar el valor 'Juan' a la variable nombre, se utiliza la siguiente sintaxis: nombre = 'Juan'.",
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
    },
  });

  await prisma.exercise.create({
    data: {
      name: "Suma",
      description:
        "Dados dos números enteros, devolver la suma de ambos números.",
      practiceId: variablesPractice.id,
      exampleTests: {
        create: [
          {
            input: "5\n7",
            output: "12",
            description: "Al sumar 5 y 7, el resultado es 12.",
            type: "BLACK_BOX",
          },
          {
            input: "0\n-2",
            output: "-2",
            description: "Al sumar 0 y -2, el resultado es -2.",
            type: "BLACK_BOX",
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
