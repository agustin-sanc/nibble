"use server";

import { database } from "@/app/_cross/database";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "../../../../../../../../_cross/auth/get-current-user";

export async function submitSolution(data: {
  solution: string;
  language: "c++" | "python";
  problemId: string;
  testCases: any[];
  courseId: string;
  practiceId: string;
}) {
  const user = await getCurrentUser();

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
      testResults?: {
        testNumber: number;
        testStatus: string;
        testType: string;
      }[];
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

    revalidatePath(
      `/courses/${data.courseId}/practices/${data.practiceId}/exercises/${data.problemId}`,
    );

    return {
      status: result.status,
      data: resultData,
    };
  } catch (error) {
    throw new Error("Ocurrió un error al evaluar la solución");
  }
}
