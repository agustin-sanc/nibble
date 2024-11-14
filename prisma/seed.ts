import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const aed = await prisma.course.create({
    data: {
      name: "AED: 1k6 (2024)",
      description: "Cátedra de algoritmos y estructuras de datos, UTN-FRT.",
      ownerId: "user_2mXJb8pobXWIwlQWLJQm2n5GWue",
      studentIds: ["user_2XmUmwYgRF2yPH0DvYj7WgIAE8G"],
    },
  });

  const variablesTheory = await prisma.theory.create({
    data: {
      name: "Variables",
      description:
        "Las variables son espacios de memoria que nos permiten almacenar valores.",
      content: `
# Variables

Las variables son una parte fundamental en la programación en C. Una variable es un nombre simbólico para una porción de memoria, que se puede utilizar para almacenar datos, y cuyo valor puede cambiar durante la ejecución de un programa.

## Declaración de variables

En C, una variable se declara especificando su tipo seguido del nombre de la variable. Por ejemplo:

\`\`\`c
int edad;
float salario;
char inicial;
\`\`\`

## Inicialización de variables

Una variable puede ser inicializada al momento de su declaración:

\`\`\`c
int edad = 30;
float salario = 2500.50;
char inicial = 'J';
\`\`\`

## Ejemplo de uso de variables
A continuación, se muestra un ejemplo de cómo se utilizan las variables en un programa en C:

\`\`\`c
#include <stdio.h>

int main() {
    // Declaración e inicialización de variables
    int edad = 25;
    float salario = 3200.75;
    char grado = 'A';

    // Uso de variables en cálculos
    edad = edad + 1;
    salario = salario * 1.10;

    // Mostrar los valores de las variables
    printf("Edad: %d\\n", edad);
    printf("Salario: %.2f\\n", salario);
    printf("Grado: %c\\n", grado);

    return 0;
}
\`\`\`

En este ejemplo, las variables edad, salario y grado son inicializadas y luego utilizadas en cálculos. Finalmente, se muestran los valores actualizados de estas variables.

## Conclusión
Las variables son esenciales para almacenar y manipular datos en los programas. En C, es importante declarar el tipo de la variable y comprender cómo se pueden utilizar en diferentes situaciones.
      `,
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
      difficulty: 8,
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
