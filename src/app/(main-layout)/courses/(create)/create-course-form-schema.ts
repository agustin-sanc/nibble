import * as z from "zod";

export const createCourseFormSchema = z.object({
  name: z
    .string({
      required_error: "Tiene que tener un nombre",
    })
    .min(4, "El nombre tiene que tener un mínimo de 4 caracteres")
    .max(20, "El nombre tiene que tener un máximo de 20 caracteres"),
  description: z
    .string({
      required_error: "Tiene que tener una descripción",
    })
    .min(4, "La descripción tiene que tener un mínimo de 4 caracteres")
    .max(20, "La descripción tiene que tener un máximo de 20 caracteres"),
});
