"use client";

import MarkdownPreview from "@uiw/react-markdown-preview";

export const MarkdownViewer = ({ source }: { source: string }) => (
  <MarkdownPreview
    wrapperElement={{
      "data-color-mode": "light",
    }}
    source={`
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
  `}
  />
);
