import { database } from "@/app/_cross/database";

type SolutionsTableProps = {
  exerciseId: string;
  userId?: string;
  isProfessor: boolean;
};

export async function SolutionsTable({
  exerciseId,
  userId,
  isProfessor,
}: SolutionsTableProps) {
  const solutions = await database.solution.findMany({
    where: {
      exerciseId,
      ...(isProfessor ? {} : { userId }),
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (solutions.length === 0) {
    return (
      <p className="text-sm text-gray-500">No hay soluciones enviadas aún.</p>
    );
  }

  return (
    <div className="mt-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="pb-2 text-left">Fecha</th>
            {isProfessor && <th className="pb-2 text-left">Usuario</th>}
            <th className="pb-2 text-left">Puntaje</th>
          </tr>
        </thead>
        <tbody>
          {solutions.map((solution) => (
            <tr key={solution.id} className="border-b">
              <td className="py-2">{solution.createdAt}</td>
              {isProfessor && <td className="py-2">{solution.userId}</td>}
              <td className="py-2">{solution.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
