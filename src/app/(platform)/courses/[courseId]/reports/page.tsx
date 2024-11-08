import { Header2, Header3 } from "@/app/_cross/components/typography";
import { database } from "@/app/_cross/database";
import { Component as Chart } from "./chart";

async function CourseReportsPage({ params }: { params: { courseId: string } }) {
  const practices = await database.practice.findMany({
    where: { courseId: params.courseId },
    include: {
      exercises: {
        include: {
          tags: true,
        },
      },
    },
  });

  // const report = await fetch("http://localhost:8082/api/report", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     courseId: params.courseId,
  //     practices: practices.map((practice) => ({
  //       id: practice.id,
  //       excercises: practice.exercises.map((exercise) => ({
  //         id: exercise.id,
  //         tags: exercise.tags.map((tag) => tag.name),
  //         difficulty: exercise.difficulty as number,
  //       })),
  //     })),
  //   }),
  // }).then((res) => res.json()) as {
  //   succeded_practices_ratio: number;
  //   succeded_excercises_ratio: number;
  //   practices: Record<string, {
  //     succeded_attempts: number;
  //     failed_attempts: number;
  //     succeded_ratio: number;
  //   }>;
  //   tags: Record<string, {
  //     succeded_attempts: number;
  //     failed_attempts: number;
  //     succeded_ratio: number;
  //   }>;
  //   difficulties: Record<string, {
  //     succeded_attempts: number;
  //     failed_attempts: number;
  //     succeded_ratio: number;
  //   }>;
  // };

  const report = {
    succeded_practices_ratio: 0.75,
    succeded_excercises_ratio: 0.68,
    practices: {
      "practice1": {
        succeded_attempts: 25,
        failed_attempts: 10,
        succeded_ratio: 0.71
      },
      "practice2": {
        succeded_attempts: 30,
        failed_attempts: 5,
        succeded_ratio: 0.86
      }
    },
    tags: {
      "recursion": {
        succeded_attempts: 45,
        failed_attempts: 15,
        succeded_ratio: 0.75
      },
      "loops": {
        succeded_attempts: 60,
        failed_attempts: 20,
        succeded_ratio: 0.75
      }
    },
    difficulties: {
      "1": {
        succeded_attempts: 40,
        failed_attempts: 10,
        succeded_ratio: 0.80
      },
      "2": {
        succeded_attempts: 30,
        failed_attempts: 15,
        succeded_ratio: 0.67
      }
    }
  };

  const practicesData = Object.entries(report.practices).map(([practiceId, stats]) => ({
    practiceId,
    ...stats
  }));

  return (
    <>
      <Header2>Reportes</Header2>

      <Header3>Reporte general del curso</Header3>
      <p>Porcentaje de trabajos prácticos resueltos: {report.succeded_practices_ratio}</p>
      <p>Porcentaje de ejercicios resueltos: {report.succeded_excercises_ratio}</p>

      <Chart data={practicesData} />

      <Header3>Reporte por etiquetas</Header3>
      {Object.entries(report.tags).map(([tag, stats]) => (
        <div key={tag}>
          <p>Etiqueta {tag}:</p>
          <ul>
            <li>Intentos exitosos: {stats.succeded_attempts}</li>
            <li>Intentos fallidos: {stats.failed_attempts}</li>
            <li>Ratio de éxito: {stats.succeded_ratio}</li>
          </ul>
        </div>
      ))}

      <Header3>Reporte por dificultad</Header3>
      {Object.entries(report.difficulties).map(([difficulty, stats]) => (
        <div key={difficulty}>
          <p>Dificultad {difficulty}:</p>
          <ul>
            <li>Intentos exitosos: {stats.succeded_attempts}</li>
            <li>Intentos fallidos: {stats.failed_attempts}</li>
            <li>Ratio de éxito: {stats.succeded_ratio}</li>
          </ul>
        </div>
      ))}
    </>
  );
}

export default CourseReportsPage;
