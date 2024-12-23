import { Header2, Header3 } from "@/app/_cross/components/typography";
import { database } from "@/app/_cross/database";
import { clerkClient } from "@clerk/nextjs";
import { cn } from "../../../../_cross/utils/cn";
import { Component as Chart } from "./chart";
import { DifficultiesSuccessRatioChart } from "./difficulties-success-ratio-chart";
import DownloadButton from "./download-button";
import { PracticesSuccessRatioChart } from "./practices-success-ratio-chart";
import { RatioChart } from "./ratio-chart";
import { TagsSuccessRatioChart } from "./tags-success-ratio-chart";

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

  const report = (await fetch("http://localhost:8082/api/report", {
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
  })
    .catch((err) => {
      console.error(err);
      return null;
    })
    .then((res) => res?.json())) as {
    succeded_practices_ratio: number;
    succeded_excercises_ratio: number;
    practices: Record<
      string,
      {
        succeded_attempts: number;
        failed_attempts: number;
        succeded_ratio: number;
      }
    >;
    tags: Record<
      string,
      {
        succeded_attempts: number;
        failed_attempts: number;
        succeded_ratio: number;
      }
    >;
    difficulties: Record<
      string,
      {
        succeded_attempts: number;
        failed_attempts: number;
        succeded_ratio: number;
      }
    >;
  };

  const studentsEvaluation = (await fetch(
    "http://localhost:8082/api/evaluation",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        student_ids: course.studentIds,
        practices: practices.map((practice) => ({
          id: practice.id,
          excercises: practice.exercises.map((exercise) => ({
            id: exercise.id,
            tags: exercise.tags.map((tag) => tag.name),
            difficulty: exercise.difficulty as number,
          })),
        })),
      }),
    },
  )
    .catch((err) => {
      console.error(err);
      return null;
    })
    .then((res) => res?.json())) as {
    general_excercise_difficulty: number;
    course_resolve_capacity: number;
    students_evaluations: Record<
      string,
      {
        resolution_score: number;
        resolution_capacity: number;
      }
    >;
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

  const practicesData = Object.entries(report.practices).map(
    ([practiceId, stats]) => ({
      practiceId,
      ...stats,
    }),
  );

  const users = await clerkClient.users.getUserList({
    userId: course.studentIds,
  });

  const simpleStudentsEvaluation = JSON.parse(
    JSON.stringify(studentsEvaluation),
  );
  const simpleUsers = JSON.parse(JSON.stringify(users));

  return (
    <>
      <Header2>Reporte del curso</Header2>

      <div className="mt-4 grid grid-cols-2 gap-4">
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

      <div className="mt-4 flex flex-row gap-4">
        <Chart data={practicesData} />
        <PracticesSuccessRatioChart data={practicesData} />
      </div>

      <div className="mt-4 flex flex-row gap-4">
        <TagsSuccessRatioChart
          data={Object.entries(report.tags).map(([tag, stats]) => ({
            tag,
            ...stats,
          }))}
        />

        <DifficultiesSuccessRatioChart
          data={Object.entries(report.difficulties).map(
            ([difficulty, stats]) => ({
              difficulty,
              ...stats,
            }),
          )}
        />
      </div>

      <div className="mt-8">
        <Header3>Evaluación general</Header3>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-white p-4 shadow">
            <p className="text-gray-600">Dificultad general de ejercicios</p>
            <p className="text-2xl font-bold">
              {studentsEvaluation.general_excercise_difficulty?.toFixed(2)}
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow">
            <p className="text-gray-600">Capacidad de resolución del curso</p>
            <p
              className={cn([
                "text-2xl font-bold",
                studentsEvaluation.course_resolve_capacity >= 70
                  ? "text-green-500"
                  : studentsEvaluation.course_resolve_capacity >= 50
                  ? "text-black"
                  : "text-red-500",
              ])}
            >
              {studentsEvaluation.course_resolve_capacity?.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between">
            <Header3>Evaluación por estudiante</Header3>
            <DownloadButton
              studentsEvaluation={simpleStudentsEvaluation}
              users={simpleUsers}
            />
          </div>
          <div className="mt-4 grid gap-4">
            {Object.entries(studentsEvaluation.students_evaluations).map(
              ([studentId, evaluation]) => (
                <div
                  key={studentId}
                  className={cn([
                    "rounded-lg p-4 shadow",
                    evaluation.resolution_capacity > 50
                      ? "bg-transparent"
                      : "bg-red-50",
                  ])}
                >
                  <p className="font-semibold">
                    Estudiante:{" "}
                    {users.find((user) => user.id === studentId)?.id
                      ? users.find((user) => user.id === studentId)?.firstName +
                        " " +
                        users.find((user) => user.id === studentId)?.lastName
                      : "Sin nombre"}
                    <p className="text-sm font-extralight text-gray-600">
                      {
                        users.find((user) => user.id === studentId)
                          ?.emailAddresses[0]?.emailAddress
                      }
                    </p>
                  </p>

                  <div className={cn(["mt-2 grid grid-cols-2 gap-4"])}>
                    <div>
                      <p className="text-gray-600">Puntaje de resolución</p>
                      <p className={cn(["text-xl text-gray-500"])}>
                        {evaluation.resolution_score?.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Capacidad de resolución</p>
                      <p
                        className={cn([
                          "text-xl",
                          evaluation.resolution_capacity >= 70
                            ? "text-green-500"
                            : evaluation.resolution_capacity >= 50
                            ? "text-gray-600"
                            : "text-red-500",
                        ])}
                      >
                        {evaluation.resolution_capacity?.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseReportsPage;
