import * as z from "zod";

const blackBoxTestSchema = z.object({
  isExample: z.boolean().default(false),
  description: z.string().optional(),
  batchInput: z.array(z.string()),
  batchOutput: z.array(z.string()),
});

const functionArgTypeSchema = z.enum(["STRING", "NUMBER", "BOOLEAN", "ARRAY"]);

const functionArgumentSchema = z.object({
  value: z.string(),
  type: functionArgTypeSchema,
});

const functionResponseSchema = z.object({
  value: z.string(),
  type: functionArgTypeSchema,
});

const grayBoxTestSchema = z.object({
  isExample: z.boolean().default(false),
  description: z.string().optional(),
  functionName: z.string(),
  functionArgs: z.array(functionArgumentSchema),
  functionResponse: functionResponseSchema,
});

const whiteBoxTestSchema = z.object({
  isExample: z.boolean().default(false),
  description: z.string().optional(),
  test: z.string(),
});

export const exerciseFormSchema = z.object({
  name: z
    .string({
      required_error: "Tiene que tener un nombre",
    })
    .min(4, "El nombre tiene que tener un mínimo de 4 caracteres")
    .max(50, "El nombre tiene que tener un máximo de 50 caracteres"),
  description: z
    .string({
      required_error: "Tiene que tener una descripción",
    })
    .min(4, "La descripción tiene que tener un mínimo de 4 caracteres")
    .max(200, "La descripción tiene que tener un máximo de 200 caracteres"),
  tags: z.array(z.string()).optional(),
  blackBoxTests: z.array(blackBoxTestSchema).optional(),
  grayBoxTests: z.array(grayBoxTestSchema).optional(),
  whiteBoxTests: z.array(whiteBoxTestSchema).optional(),
});

export type ExerciseFormSchema = z.infer<typeof exerciseFormSchema>;
export type FunctionArgument = z.infer<typeof functionArgumentSchema>;
export type FunctionResponse = z.infer<typeof functionResponseSchema>;
