import { Header2, Header3 } from "@/app/_cross/components/typography";
import { database } from "@/app/_cross/database";

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

  const reportData = await fetch("http://localhost:8082/api/report", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      courseId: params.courseId,
      practices: practices.map((practice) => ({
        id: practice.id,
        excercises: practice.exercises.map((exercise) => ({
          id: exercise.id,
          tags: exercise.tags.map((tag) => tag.name),
          difficulty: exercise.difficulty,
        })),
      })),
    }),
  }).then((res) => res.json()) as {
    succeded_practices_ratio: number;
    succeded_excercises_ratio: number;
    practices: Record<string, {
      succeded_attempts: number;
      failed_attempts: number;
      succeded_ratio: number;
    }>;
    tags: Record<string, {
      succeded_attempts: number;
      failed_attempts: number;
      succeded_ratio: number;
    }>;
    difficulties: Record<string, {
      succeded_attempts: number;
      failed_attempts: number;
      succeded_ratio: number;
    }>;
  };

  return (
    <>
      <Header2>Reportes</Header2>

      <Header3>Reporte general del curso</Header3>
      <p>Porcentaje de trabajos prácticos resueltos: {reportData.succeded_practices_ratio}</p>
      <p>Porcentaje de ejercicios resueltos: {reportData.succeded_excercises_ratio}</p>

      <Header3>Reporte por trabajo práctico</Header3>
      {Object.entries(reportData.practices).map(([practiceId, stats]) => (
        <div key={practiceId}>
          <p>Trabajo práctico {practiceId}:</p>
          <ul>
            <li>Intentos exitosos: {stats.succeded_attempts}</li>
            <li>Intentos fallidos: {stats.failed_attempts}</li>
            <li>Ratio de éxito: {stats.succeded_ratio}</li>
          </ul>
        </div>
      ))}

      <Header3>Reporte por etiquetas</Header3>
      {Object.entries(reportData.tags).map(([tag, stats]) => (
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
      {Object.entries(reportData.difficulties).map(([difficulty, stats]) => (
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
