import * as z from "zod";

//auth

export const registerUserSchema = z.object({
    name: z.string().min(1, "Colocar o nome é obrigatório!"),
    email: z.string().email("Você digitou um e-mail inválido"),
    password: z.string().min(6, "A Senha deve ter pelo menos 6 caracteres"),
});

export const loginUserSchema = z.object({
    email: z.string().email("Você digitou um e-mail inválido"),
    password: z.string().min(1, "A senha é obrigatória!"),
});

// products

export const createProductSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
  category: z.string().min(1, "A categoria é obrigatória"),
  price: z
    .number({ invalid_type_error: "O preço deve ser um número" })
    .min(0.01, "O preço deve ser maior que zero"),
  image: z.string().optional(), // opcional apenas para não dar erro de tipo, pois a imagem não é validada pelo zod
})


export const updateProductSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    category: z.string().optional(),
    price: z.string().optional(),
    image: z.string().optional(),
  });

export type UserFormData = z.infer<typeof registerUserSchema>;
export type LoginFormData = z.infer<typeof loginUserSchema>;
export type ProductFormData = z.infer<typeof createProductSchema>;
export type updateProductFormData = z.infer<typeof updateProductSchema>;
