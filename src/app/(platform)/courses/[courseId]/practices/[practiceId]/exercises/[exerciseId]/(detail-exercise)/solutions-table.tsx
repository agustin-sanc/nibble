import { formatInTimeZone } from "date-fns-tz";

type SolutionsTableProps = {
  isProfessor: boolean;
  solutions: {
    id: string;
    createdAt: Date;
    passed: boolean;
    userId: string;
  }[];
};

export async function SolutionsTable({
  isProfessor,
  solutions,
}: SolutionsTableProps) {
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
            <th className="pb-2 text-left">
              {isProfessor ? "Estado" : "Calificación"}
            </th>
          </tr>
        </thead>
        <tbody>
          {solutions.map((solution) => (
            <tr key={solution.id} className="border-b">
              <td className="py-2">
                {formatInTimeZone(
                  solution.createdAt,
                  Intl.DateTimeFormat().resolvedOptions().timeZone,
                  "dd/MM/yyyy HH:mm:ss",
                )}
              </td>
              {isProfessor && <td className="py-2">{solution.userId}</td>}
              <td
                className="py-2"
                style={{
                  color: solution.passed ? "green" : "red",
                }}
              >
                {solution.passed ? "Correcto" : "Incorrecto"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
