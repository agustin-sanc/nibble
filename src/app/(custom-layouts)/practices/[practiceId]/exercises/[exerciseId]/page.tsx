import Link from "next/link";
import {
  Header2,
  Header3,
  UnorderedList,
} from "@/app/_cross/components/typography";
import { prisma } from "@/app/_cross/prisma";
import { Solution } from "@/app/(custom-layouts)/practices/[practiceId]/exercises/[exerciseId]/_components/solution";
import { TestExamples } from "@/app/(custom-layouts)/practices/[practiceId]/exercises/[exerciseId]/_components/test-examples";
import { ArrowUpRight } from "lucide-react";

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

  const RelatedTheories = () => {
    const theories = exercise.practice?.theories ?? [];

    return (
      theories.length > 0 && (
        <div>
          <Header3>Teoría recomendada</Header3>

          <UnorderedList>
            {theories.map((theory) => (
              <li key={theory.id}>
                <Link
                  href={`/theories/${theory.id}`}
                  className="flex flex-row items-center hover:underline"
                  target="_blank"
                >
                  {theory.name}
                  <ArrowUpRight size={20} />
                </Link>
              </li>
            ))}
          </UnorderedList>
        </div>
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
        <Solution />
      </div>
    </div>
  );
}
