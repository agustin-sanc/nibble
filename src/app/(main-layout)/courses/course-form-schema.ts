import * as z from "zod";

export const courseFormSchema = z.object({
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
});
