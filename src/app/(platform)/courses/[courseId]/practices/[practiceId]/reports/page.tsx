"use client";

import { Button } from "@/app/_cross/components/button";
import ReportChart from "@/app/_cross/components/report-chart";

async function getReportData(courseId: string, practiceId: string) {
  // Listado de ejercicios hardcodeado
  const exercises = [
    {
      id: "1",
      title: "Ejercicio 1",
      difficulty: "easy",
      topic: "Variables",
      solutions: [
        <Button variant="outline">Ver código</Button>,
        {
          testResults: [{ passed: true }, { passed: true }, { passed: false }],
        },
        {
          testResults: [{ passed: true }, { passed: true }, { passed: true }],
        },
      ],
    },
    {
      id: "2",
      title: "Ejercicio 2",
      difficulty: "medium",
      topic: "Bucles",
      solutions: [
        {
          testResults: [{ passed: true }, { passed: false }, { passed: false }],
        },
      ],
    },
    // Agrega más ejercicios según sea necesario
  ];

  // Calcular estadísticas
  let totalExercises = exercises.length;
  let solvedExercises = 0;
  let totalFailedAttempts = 0;
  let scenariosByExercise = [];
  let scenariosByDifficulty = {
    easy: { passed: 0, failed: 0 },
    medium: { passed: 0, failed: 0 },
    hard: { passed: 0, failed: 0 },
  };
  let scenariosByTopic = {};

  exercises.forEach((exercise) => {
    let exercisePassed = false;
    let exerciseFailedAttempts = 0;
    let passedScenarios = 0;
    let failedScenarios = 0;

    exercise.solutions.forEach((solution) => {
      let solutionPassed = true;
      solution.testResults?.forEach((result) => {
        if (result.passed) {
          passedScenarios++;
        } else {
          failedScenarios++;
          solutionPassed = false;
        }
      });
      if (solutionPassed) {
        exercisePassed = true;
      } else {
        exerciseFailedAttempts++;
      }
    });

    if (exercisePassed) solvedExercises++;
    totalFailedAttempts += exerciseFailedAttempts;

    scenariosByExercise.push({
      name: exercise.title,
      passed: passedScenarios,
      failed: failedScenarios,
    });

    scenariosByDifficulty[exercise.difficulty].passed += passedScenarios;
    scenariosByDifficulty[exercise.difficulty].failed += failedScenarios;

    if (!scenariosByTopic[exercise.topic]) {
      scenariosByTopic[exercise.topic] = { passed: 0, failed: 0 };
    }

    scenariosByTopic[exercise.topic].passed += passedScenarios;
    scenariosByTopic[exercise.topic].failed += failedScenarios;
  });

  return {
    percentageSolved: (solvedExercises / totalExercises) * 100,
    averageFailedAttempts: totalFailedAttempts / totalExercises,
    scenariosByExercise,
    scenariosByDifficulty,
    scenariosByTopic,
  };
}

export default async function ReportsPage({
  params,
}: {
  params: { courseId: string; practiceId: string };
}) {
  const reportData = await getReportData(params.courseId, params.practiceId);

  const difficultyTranslations = {
    easy: "Fácil",
    medium: "Medio",
    hard: "Difícil",
  };

  // Función auxiliar para transformar los datos
  const transformData = (data: any) => {
    return data.map((item: any) => ({
      ...item,
      Exitoso: item.passed,
      Fallido: item.failed,
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Reporte</h1>

      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Estadísticas generales</h2>
        <p>
          Porcentaje de trabajos prácticos resueltos exitosamente:{" "}
          {reportData.percentageSolved.toFixed(2)}%
        </p>
        <p>
          Promedio de intentos fallidos:{" "}
          {reportData.averageFailedAttempts.toFixed(2)}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <h2 className="mb-2 text-xl font-semibold">
            Comparativa de escenarios por ejercicio
          </h2>
          <ReportChart
            data={transformData(reportData.scenariosByExercise)}
            xAxis="name"
            bars={[
              { dataKey: "Exitoso", fill: "#8884d8", name: "Exitoso" },
              { dataKey: "Fallido", fill: "#82ca9d", name: "Fallido" },
            ]}
          />
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">
            Comparativa de escenarios por dificultad
          </h2>
          <ReportChart
            data={transformData(
              Object.entries(reportData.scenariosByDifficulty).map(
                ([difficulty, data]) => ({
                  name:
                    difficultyTranslations[
                      difficulty as keyof typeof difficultyTranslations
                    ] || difficulty,
                  ...data,
                }),
              ),
            )}
            xAxis="name"
            bars={[
              { dataKey: "Exitoso", fill: "#8884d8", name: "Exitoso" },
              { dataKey: "Fallido", fill: "#82ca9d", name: "Fallido" },
            ]}
          />
        </div>
      </div>

      <div className="mt-6">
        <h2 className="mb-2 text-xl font-semibold">
          Comparativa de escenarios por tema
        </h2>
        <ReportChart
          data={transformData(
            Object.entries(reportData.scenariosByTopic).map(
              ([topic, data]) => ({ name: topic, ...data }),
            ),
          )}
          xAxis="name"
          bars={[
            { dataKey: "Exitoso", fill: "#8884d8", name: "Exitoso" },
            { dataKey: "Fallido", fill: "#82ca9d", name: "Fallido" },
          ]}
        />
      </div>
    </div>
  );
}
