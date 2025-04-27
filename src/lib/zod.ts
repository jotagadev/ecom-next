import * as z from "zod";

export const registerUserSchema = z.object({
    name: z.string().min(1, "Colocar o nome é obrigatório!"),
    email: z.string().email("Você digitou um e-mail inválido"),
    password: z.string().min(6, "A Senha deve ter pelo menos 6 caracteres"),
});

export const loginUserSchema = z.object({
    email: z.string().email("Você digitou um e-mail inválido"),
    password: z.string().min(1, "A senha é obrigatória!"),
});

export type UserFormData = z.infer<typeof registerUserSchema>;
export type LoginFormData = z.infer<typeof loginUserSchema>;
