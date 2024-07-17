import { z } from "zod";

export const addStudentSchema = z.object({
  userId: z.string({
    required_error: "Debe seleccionar un usuario.",
  }),
});
