"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { registerUserSchema } from "@/lib/zod";
import { UserFormData } from "@/lib/zod";
import { credentialsLogin } from "@/lib/actions/auth";
import { useState } from "react";

export default function RegisterForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<UserFormData>({
    resolver: zodResolver(registerUserSchema),
  });

  const onSubmit = async (data: UserFormData) => {
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

        console.log("Resposta do servidor:", responseData);
    } catch (error) {
        console.error("Erro ao registrar usuário:", error);
        }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-sm mx-auto">
      <div>
        <label htmlFor="name">Nome:</label>
        <input id="name" {...register("name")} className="border p-2 w-full" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" {...register("email")} className="border p-2 w-full" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password">Senha:</label>
        <input id="password" type="password" {...register("password")} className="border p-2 w-full" />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      {serverError && <p className="text-red-500 text-sm">{serverError}</p>}
      <Button type="submit" variant="secondary" className="w-full cursor-pointer mt-4">
        Enviar
      </Button>
    </form>
  );
}
