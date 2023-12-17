"use client";

import Editor from "@monaco-editor/react";

export const CodeEditor = () => {
  const code =
    "#include <iostream>\n" +
    "using namespace std;\n" +
    "\n" +
    "int main() {\n" +
    "    int N;\n" +
    '    cout << "Ingrese el número de notas: ";\n' +
    "    cin >> N;\n" +
    "\n" +
    "    float notas[N], suma = 0, promedio;\n" +
    "\n" +
    "    // Leer las notas\n" +
    "    for(int i = 0; i < N; i++) {\n" +
    '        cout << "Ingrese la nota " << (i + 1) << ": ";\n' +
    "        cin >> notas[i];\n" +
    "        suma += notas[i]; // Sumar todas las notas\n" +
    "    }\n" +
    "\n" +
    "    // Calcular el promedio\n" +
    "    promedio = suma / N;\n" +
    "\n" +
    "    // Imprimir el promedio\n" +
    '    cout << "El promedio es: " << promedio << endl;\n' +
    "\n" +
    "    return 0;\n" +
    "}\n";

  return (
    <div className="mb-4 mt-4">
      <Editor height="400px" language="cpp" theme="vs-light" value={code} />
    </div>
  );
};
