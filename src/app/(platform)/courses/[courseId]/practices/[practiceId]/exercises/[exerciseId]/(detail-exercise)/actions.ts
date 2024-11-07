"use server";

import { database } from "@/app/_cross/database";
import { getCurrentUser } from "../../../../../../../../_cross/auth/get-current-user";

export async function submitSolution(data: {
  solution: string;
  language: "c++" | "python";
  problemId: string;
  testCases: any[];
}) {
  const user = await getCurrentUser();

  console.log({ data });

  try {
    const result = await fetch(
      process.env.NEXT_PUBLIC_EVALUATOR_API_URL ?? "",
      {
        method: "POST",
        body: JSON.stringify({ ...data, studentId: user.id }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const resultData = (await result.json()) as {
      passed: boolean;
    };

    console.dir(resultData, { depth: null });

    await database.solution.create({
      data: {
        code: data.solution,
        userId: user.id,
        exerciseId: data.problemId,
        passed: resultData.passed,
      },
    });

    return {
      status: result.status,
      data: resultData,
    };
  } catch (error) {
    throw new Error("Ocurrió un error al evaluar la solución");
  }
}
