"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { createProductSchema, ProductFormData } from "@/lib/zod";
import { Button } from "../ui/button";


export default function CreateProductForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(createProductSchema),
  });

  const onSubmit = async (data: ProductFormData) => { 

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        setServerError(responseData.error || "Erro ao registrar o produto.");
        return;
      }

      console.log("Produto criado com sucesso:", responseData);
      setServerError(null); 
      setSuccessMessage("Produto criado com sucesso!");
      reset(); 
    } catch (error) {
      console.error("Erro ao registrar o produto:", error);
      setServerError("Erro ao registrar o produto. Tente novamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-sm mx-auto">
      <div>
        <label htmlFor="name">Nome:</label>
        <input
          placeholder="Nome do Produto"
          id="name"
          {...register("name")}
          className="rounded-lg bg-neutral-100 p-2 w-full"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="description">Descrição:</label>
        <input
          placeholder="Descrição do Produto"
          id="description"
          {...register("description")}
          className="rounded-lg bg-neutral-100 p-2 w-full"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      <div>
        <label htmlFor="category">Categoria:</label>
        <input
          placeholder="Categoria do Produto"
          id="category"
          {...register("category")}
          className="rounded-lg bg-neutral-100 p-2 w-full"
        />
        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
      </div>

      <div>
        <label htmlFor="price">Preço:</label>
        <input
          placeholder="R$"
          id="price"
          type="number"
          step="0.01"
          {...register("price", { valueAsNumber: true })} 
          className="rounded-lg bg-neutral-100 p-2 w-full"
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
      </div>

      <div>
        <label htmlFor="image">Imagem (URL):</label>
        <input
          placeholder="URL da Imagem"
          id="image"
          {...register("image")}
          className="rounded-lg bg-neutral-100 p-2 w-full"
        />
        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
      </div>

      {serverError && <p className="text-red-500 text-sm">{serverError}</p>}
      {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

      <Button
        type="submit"
        className="w-full text-white p-2 rounded-lg mt-4"
        disabled={isSubmitting} 
      >
        {isSubmitting ? "Enviando..." : "Enviar"}
      </Button>
    </form>
  );  
}