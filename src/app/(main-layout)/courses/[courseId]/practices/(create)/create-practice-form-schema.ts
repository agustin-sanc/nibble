import * as z from "zod";

export const createPracticeFormSchema = z.object({
  name: z
    .string({
      required_error: "Tiene que tener un nombre",
    })
    .min(5, "El nombre tiene que tener un mínimo de 5 caracteres")
    .max(20, "El nombre tiene que tener un máximo de 20 caracteres"),
  description: z
    .string({
      required_error: "Tiene que tener una descripción",
    })
    .min(5, "La descripción tiene que tener un mínimo de 5 caracteres")
    .max(20, "La descripción tiene que tener un máximo de 20 caracteres"),
});
