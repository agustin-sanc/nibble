import { prisma } from "@/prisma";
import {
  Header2,
  Header3,
  UnorderedList,
} from "@/app/_general/components/typography";
import LayoutWithSidePanel from "@/app/_general/components/layout-with-side-panel";
import { ExercisesGrid } from "@/app/_general/components/exercises/exercises-grid";
import Link from "next/link";

export default async function Practice({
  params: { practiceId },
}: {
  params: { practiceId: string };
}) {
  const practice = await prisma.practice.findUnique({
    where: { id: Number(practiceId) },
    include: { exercises: true, theories: true },
  });

  return (
    <LayoutWithSidePanel>
      <Header2>{practice?.name}</Header2>
      <p>{practice?.description}</p>

      <UnorderedList title="Teoría relacionada">
        {practice?.theories.map((theory) => (
          <li key={theory.id} className="hover:underline">
            <Link href={`/students/theories/${theory.id}`}>{theory.name}</Link>
          </li>
        ))}
      </UnorderedList>

      <Header3>Ejercicios</Header3>
      <ExercisesGrid exercises={practice?.exercises ?? []} />
    </LayoutWithSidePanel>
  );
}
