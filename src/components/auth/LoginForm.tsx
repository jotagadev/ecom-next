"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { LoginFormData, loginUserSchema } from "@/lib/zod";
import { credentialsLogin } from "@/lib/actions/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginUserSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);

    try {
     await credentialsLogin(data.email, data.password)
     setSuccessMessage("Login realizado com sucesso!");
      setTimeout(() => {
          router.refresh();
        }, 1000);
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
      {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
      <Button disabled={isSubmitting} type="submit" variant="secondary" className="w-full cursor-pointer mt-4">
        {isSubmitting ? "Enviando..." : "Enviar"}
      </Button>
    </form>
  );
}
