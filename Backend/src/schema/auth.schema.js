import { z } from "zod";

export const registerSchema = z.object({
  id_reg: z.number().optional().default(0),
  name: z
    .string({ required_error: "Nombre es requerido" })
    .min(1, { message: "Nombre es requerido" }),
  user: z
    .string({ required_error: "Nombre de Usuario Requerido" })
    .min(1, { message: "Nombre de Usuario Requerido" }),
  email: z.string({ required_error: "Email requerido" }).email(),
  password: z.string({ required_error: "Contraseña requerida" }).min(6, {
    message: "La contraseña tiene que tener al menos 6 caracteres",
  }),
});

export const loginSchema = z.object({
  user: z.string({
    required_error: "Usuario es requerido",
  }),
  password: z
    .string({
      required_error: "Contraseña es requerida",
    })
    .min(6, {
      message: "La contraseña tiene que tener al menos 6 caracteres",
    }),
});
