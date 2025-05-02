"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { registerUserSchema } from "@/lib/zod";
import { UserFormData } from "@/lib/zod";
import { credentialsLogin } from "@/lib/actions/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UserFormData>({
    resolver: zodResolver(registerUserSchema),
  });
  
  const router = useRouter();

  const onSubmit = async (data: UserFormData) => {
    setServerError(null);
    try{
    const response = await fetch("/api/user", {
      method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (!response.ok) {
            setServerError(responseData.error || "Erro ao registrar usuário.");
            return;
          }

        await credentialsLogin(data.email, data.password);

        setSuccessMessage("Usuário registrado com sucesso!");

        setTimeout(() => {
          router.refresh();
        }, 1000);

        console.log("Resposta do servidor:", responseData);
    } catch (error) {
        console.error("Erro ao registrar usuário:", error);
        }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-sm mx-auto">
      <div>
        <label htmlFor="name">Nome:</label>
        <input placeholder="Seu nome" id="name" {...register("name")} className="rounded-lg bg-neutral-100 p-2 w-full" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input placeholder="seuemail@email.com" id="email" {...register("email")} className="rounded-lg bg-neutral-100 p-2 w-full" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password">Senha:</label>
        <input placeholder="Crie uma senha (mínimo de 6 caracteres)" id="password" type="password" {...register("password")} className="rounded-lg bg-neutral-100 p-2 w-full" />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      {serverError && <p className="text-red-500 text-sm">{serverError}</p>}
      {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
      <Button disabled={isSubmitting} type="submit" variant="secondary" className="w-full cursor-pointer mt-4">
        {isSubmitting ? "Enviando..." : "Enviar"}
      </Button>
    </form>
    
  );
}
