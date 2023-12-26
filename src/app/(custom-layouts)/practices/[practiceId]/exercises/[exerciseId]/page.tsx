import Link from "next/link";
import { Header2, Header3 } from "@/app/_cross/components/typography";
import { prisma } from "@/app/_cross/prisma";
import { Solution } from "@/app/(custom-layouts)/practices/[practiceId]/exercises/[exerciseId]/solution";
import { TestExamples } from "@/app/(custom-layouts)/practices/[practiceId]/exercises/[exerciseId]/test-examples";
import { RelatedTheories } from "@/app/(custom-layouts)/practices/[practiceId]/exercises/[exerciseId]/related-theories";

type ExercisePageProps = {
  params: { exerciseId: string; practiceId: string };
};

export default async function Exercise({
  params: { exerciseId, practiceId },
}: ExercisePageProps) {
  const exercise = await prisma.exercise.findUnique({
    where: { id: Number(exerciseId) },
    include: {
      practice: { include: { theories: true } },
      blackBoxTests: true,
      whiteBoxTests: true,
      grayBoxTests: true,
    },
  });

  if (!exercise) return <p>El ejercicio no existe.</p>;

  const Header = () => (
    <div>
      <Link
        href={`/practices/${practiceId}`}
        className="text-xs hover:underline"
      >
        &lt; Volver al trabajo práctico
      </Link>

      <div className="mt-5 flex flex-row items-center justify-between">
        <Header2>{exercise.name}</Header2>
      </div>
    </div>
  );

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

      <RelatedTheories theories={exercise.practice?.theories} />
    </div>
  );

  return (
    <div className="flex flex-col gap-2 px-8 pt-8">
      <Header />

      <div className="flex flex-row gap-10">
        <Problem />
        <Solution />
      </div>
    </div>
  );
}
