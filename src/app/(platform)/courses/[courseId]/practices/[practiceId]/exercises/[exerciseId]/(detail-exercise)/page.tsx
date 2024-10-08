import { Solution } from "@/app/(platform)/courses/[courseId]/practices/[practiceId]/exercises/[exerciseId]/(detail-exercise)/solution";
import { TestExamples } from "@/app/(platform)/courses/[courseId]/practices/[practiceId]/exercises/[exerciseId]/(detail-exercise)/test-examples";
import {
  Header2,
  Header3,
  UnorderedList,
} from "@/app/_cross/components/typography";
import { database } from "@/app/_cross/database";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type ExercisePageProps = {
  params: { exerciseId: string; practiceId: string; courseId: string };
};

export default async function ExerciseDetailPage({
  params: { exerciseId, practiceId, courseId },
}: ExercisePageProps) {
  const exercise = await database.exercise.findUnique({
    where: { id: exerciseId },
    include: {
      practice: { include: { theories: true } },
      blackBoxTests: true,
      whiteBoxTests: true,
      grayBoxTests: true,
    },
  });

  if (!exercise) notFound();

  const Header = () => (
    <div>
      <Link
        href={`/courses/${courseId}/practices/${practiceId}`}
        className="text-xs hover:underline"
      >
        &lt; Volver al trabajo práctico
      </Link>

      <div className="mt-5 flex flex-row items-center justify-between">
        <Header2>{exercise.name}</Header2>
      </div>
    </div>
  );

  const RelatedTheories = () => {
    const theories = exercise.practice?.theories ?? [];

    return (
      theories.length > 0 && (
        <>
          <Header3>Teoría recomendada</Header3>

          <UnorderedList>
            {theories.map((theory) => (
              <li key={theory.id}>
                <Link
                  href={`/courses/${courseId}/theories/${theory.id}`}
                  className="flex flex-row items-center hover:underline"
                  target="_blank"
                >
                  {theory.name}
                  <ArrowUpRight size={20} />
                </Link>
              </li>
            ))}
          </UnorderedList>
        </>
      )
    );
  };

  const Problem = () => (
    <div className="w-[50%]">
      <Header3>Descripción</Header3>
      <p className="mt-4">{exercise.description}</p>

      <TestExamples
        examples={[
          ...exercise.blackBoxTests.filter((t) => t.isExample),
          ...exercise.whiteBoxTests.filter((t) => t.isExample),
          ...exercise.grayBoxTests.filter((t) => t.isExample),
        ]}
      />

      <RelatedTheories />
    </div>
  );

  return (
    <div className="flex flex-col gap-2 px-8 pt-8">
      <Header />

      <div className="flex flex-row gap-10">
        <Problem />
        <Solution
          problemId={exercise.id}
          testCases={[
            ...exercise.blackBoxTests,
            ...exercise.whiteBoxTests,
            ...exercise.grayBoxTests,
          ]}
        />
      </div>
    </div>
  );
}
