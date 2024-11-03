"use client";
import React from "react";
import { Header2 } from "@/app/_cross/components/typography";
import { Button } from "@/app/_cross/components/button";

type Solution = {
  student: string;
  programmingLanguage: "C++" | "Python";
  result: "Exitoso" | "Fallido";
  score: number;
};

const solutions: Solution[] = [
  {
    student: "Juan Pérez",
    programmingLanguage: "C++",
    result: "Exitoso",
    score: 95,
  },
  {
    student: "María García",
    programmingLanguage: "Python",
    result: "Fallido",
    score: 45,
  },
  {
    student: "Carlos Rodríguez",
    programmingLanguage: "C++",
    result: "Exitoso",
    score: 88,
  },
  {
    student: "Ana Martínez",
    programmingLanguage: "Python",
    result: "Exitoso",
    score: 92,
  },
  {
    student: "Luis Sánchez",
    programmingLanguage: "C++",
    result: "Fallido",
    score: 30,
  },
];

const SolutionsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Header2>Soluciones</Header2>
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="border-b px-4 py-2 text-left">Alumno</th>
              <th className="border-b px-4 py-2 text-left">
                Lenguaje de programación
              </th>
              <th className="border-b px-4 py-2 text-left">Resultado</th>
              <th className="border-b px-4 py-2 text-left">Acción</th>
            </tr>
          </thead>
          <tbody>
            {solutions.map((solution, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="border-b px-4 py-2">{solution.student}</td>
                <td className="border-b px-4 py-2">
                  {solution.programmingLanguage}
                </td>
                <td className="border-b px-4 py-2">
                  <span
                    className={
                      solution.result === "Exitoso"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {solution.result}
                  </span>
                  {/* <span className="ml-2 text-gray-600">
                    ({solution.score})
                  </span> */}
                </td>
                <td className="border-b px-4 py-2">
                  <Button variant="outline">Ver código</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SolutionsPage;
