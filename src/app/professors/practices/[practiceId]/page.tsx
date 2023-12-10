import { prisma } from "@/prisma";
import { Header2, Header3 } from "@/app/_general/components/typography";
import InnerLayout from "@/app/_general/components/inner-layout";

export default async function Practice({
  params: { practiceId },
}: {
  params: { practiceId: string };
}) {
  const practice = await prisma.practice.findUnique({
    where: { id: Number(practiceId) },
  });

  return (
    <InnerLayout>
      <Header2>{practice?.name}</Header2>
      <p>{practice?.description}</p>
      <Header3>Ejercicios</Header3>
    </InnerLayout>
  );
}
