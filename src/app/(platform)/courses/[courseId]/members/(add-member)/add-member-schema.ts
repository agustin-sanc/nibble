import { z } from "zod";

export const addMemberSchema = z.object({
  userId: z.string({
    required_error: "Debe seleccionar un usuario.",
  }),
});
