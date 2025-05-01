"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { LoginFormData, loginUserSchema } from "@/lib/zod";
import { credentialsLogin } from "@/lib/actions/auth";
import { useState } from "react";

export default function LoginForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginUserSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
     await credentialsLogin(data.email, data.password)
    }catch (error: any) {
      console.log("Erro ao autenticar usuário:", error);
      setServerError("O e-mail ou a senha estão incorretos.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-full items-center justify-center">

      <div>
        <label htmlFor="email">Email:</label>
        <input placeholder="seuemail@email.com" id="email" {...register("email")} className="rounded-lg bg-neutral-100 p-2 w-full" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password">Senha:</label>
        <input placeholder="Sua senha" id="password" type="password" {...register("password")} className="rounded-lg bg-neutral-100 p-2 w-full" />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      {serverError && <p className="text-red-500 text-sm">{serverError}</p>}
      <Button type="submit" variant="secondary" className="w-full cursor-pointer mt-4">
        Enviar
      </Button>
    </form>
  );
}
