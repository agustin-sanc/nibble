import { Header2, Header3 } from "@/app/_cross/components/typography";
import { database } from "@/app/_cross/database";
import { Component as Chart } from "./chart";
import { PracticesSuccessRatioChart } from "./practices-success-ratio-chart";
import { TagsSuccessRatioChart } from "./tags-success-ratio-chart";
import { DifficultiesSuccessRatioChart } from "./difficulties-success-ratio-chart";
import { RatioChart } from "./ratio-chart";

async function CourseReportsPage({ params }: { params: { courseId: string } }) {
  const course = await database.course.findUniqueOrThrow({
    where: { id: params.courseId },
  });

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

  const report = await fetch("http://localhost:8082/api/report", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      practices: practices.map((practice) => ({
        id: practice.id,
        excercises: practice.exercises.map((exercise) => ({
          id: exercise.id,
          tags: exercise.tags.map((tag) => tag.name),
          difficulty: exercise.difficulty as number,
        })),
      })),
    }),
  }).catch((err) => {
    console.error(err);
    return null;
  }).then((res) => res?.json()) as {
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


  const studentsEvaluation = await fetch("http://localhost:8082/api/evaluation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      studentIds: course.studentIds,
      practices: practices.map((practice) => ({
        id: practice.id,
        excercises: practice.exercises.map((exercise) => ({
          id: exercise.id,
          tags: exercise.tags.map((tag) => tag.name),
          difficulty: exercise.difficulty as number,
        })),
      })),
    }),
  }).catch((err) => {
    console.error(err);
    return null;
  }).then((res) => res?.json()) as {
    general_excercise_difficulty: number;
    course_resolve_capacity: number;
    student_evaluations: Record<string, {
      resolution_score: number;
      resolution_capacity: number;
    }>;
  };

  // const studentsEvaluation = {
  //   general_excercise_difficulty: 1.5,
  //   course_resolve_capacity: 0.75,
  //   student_evaluations: {
  //     "1": { resolution_score: 0.8, resolution_capacity: 0.9 },
  //     "2": { resolution_score: 0.6, resolution_capacity: 0.7 },
  //   },
  // };

  // const report = {
  //   succeded_practices_ratio: 0.75,
  //   succeded_excercises_ratio: 0.68,
  //   practices: {
  //     "TP1": {
  //       succeded_attempts: 25,
  //       failed_attempts: 10,
  //       succeded_ratio: 0.71
  //     },
  //     "TP2": {
  //       succeded_attempts: 30,
  //       failed_attempts: 5,
  //       succeded_ratio: 0.86
  //     },
  //     "TP3": {
  //       succeded_attempts: 30,
  //       failed_attempts: 5,
  //       succeded_ratio: 0.86
  //     }
  //   },
  //   tags: {
  //     "recursion": {
  //       succeded_attempts: 45,
  //       failed_attempts: 15,
  //       succeded_ratio: 0.75
  //     },
  //     "loops": {
  //       succeded_attempts: 60,
  //       failed_attempts: 20,
  //       succeded_ratio: 0.75
  //     }
  //   },
  //   difficulties: {
  //     "1": {
  //       succeded_attempts: 40,
  //       failed_attempts: 10,
  //       succeded_ratio: 0.80
  //     },
  //     "2": {
  //       succeded_attempts: 30,
  //       failed_attempts: 15,
  //       succeded_ratio: 0.67
  //     }
  //   }
  // };

  console.dir({ report, studentsEvaluation }, { depth: null });

  const practicesData = Object.entries(report.practices).map(([practiceId, stats]) => ({
    practiceId,
    ...stats
  }));

  return (
    <>
      <Header2>Reporte del curso</Header2>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <RatioChart 
          value={report.succeded_practices_ratio}
          title="Trabajos Prácticos"
          description="Porcentaje de trabajos prácticos resueltos"
        />

        <RatioChart 
          value={report.succeded_excercises_ratio}
          title="Ejercicios"
          description="Porcentaje de ejercicios resueltos"
        />
      </div>

      <div className="flex flex-row gap-4 mt-4">
        <Chart data={practicesData} />
        <PracticesSuccessRatioChart data={practicesData} />
      </div>

      <div className="flex flex-row gap-4 mt-4">
        <TagsSuccessRatioChart data={Object.entries(report.tags).map(([tag, stats]) => ({
          tag,
          ...stats
        }))} />

        <DifficultiesSuccessRatioChart data={Object.entries(report.difficulties).map(([difficulty, stats]) => ({
          difficulty,
          ...stats
        }))} />
      </div>

      <div className="mt-8">
        <Header3>Evaluación general</Header3>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="p-4 bg-white rounded-lg shadow">
            <p className="text-gray-600">Dificultad general de ejercicios</p>
            <p className="text-2xl font-bold">{studentsEvaluation.general_excercise_difficulty?.toFixed(2)}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <p className="text-gray-600">Capacidad de resolución del curso</p>
            <p className="text-2xl font-bold">{studentsEvaluation.course_resolve_capacity?.toFixed(2)}</p>
          </div>
        </div>

        <div className="mt-6">
          <Header3>Evaluación por estudiante</Header3>
          <div className="mt-4 grid gap-4">
            {Object.entries(studentsEvaluation.student_evaluations).map(([studentId, evaluation]) => (
              <div key={studentId} className="p-4 bg-white rounded-lg shadow">
                <p className="font-semibold">Estudiante ID: {studentId}</p>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-gray-600">Puntaje de resolución</p>
                    <p className="text-xl">{evaluation.resolution_score?.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Capacidad de resolución</p>
                    <p className="text-xl">{evaluation.resolution_capacity?.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </>
  );
}

export default CourseReportsPage;
