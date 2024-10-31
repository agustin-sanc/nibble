"use server";

import { getCurrentUser } from "../../../../../../../../_cross/auth/get-current-user";

export async function submitSolution(data: {
  solution: string;
  language: "cpp" | "python";
  problemId: string;
  testCases: any[];
}) {
  const user = await getCurrentUser();

  try {
    const result = await fetch(
      process.env.NEXT_PUBLIC_EVALUATOR_API_URL || "",
      {
        method: "POST",
        body: JSON.stringify({ ...data, studentId: user.id }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return {
      status: result.status,
      data: (await result.json()) as {
        passed: boolean;
      },
    };
  } catch (error) {
    throw new Error("Ocurrió un error al evaluar la solución");
  }
}
