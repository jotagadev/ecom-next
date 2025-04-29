"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { updateProductFormData, updateProductSchema } from "@/lib/zod";
import { Button } from "../ui/button";
import Stripe from "stripe";

interface Props {
    product: Stripe.Product;
  }


export default function UpdateProductForm({ product }: Props) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<updateProductFormData>({
    resolver: zodResolver(updateProductSchema),
  });

  const onSubmit = async (data: updateProductFormData) => { 
    const filteredData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== "" && value !== undefined && value !== null)
      );
    try {
      const response = await fetch("/api/products", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id : product.id, ...filteredData}),
      });

      const responseData = await response.json();

      if (!response.ok) {
        setServerError(responseData.error || "Erro ao registrar o produto.");
        return;
      }

      console.log("Produto editado com sucesso:", responseData);
      setServerError(null); 
      setSuccessMessage("Produto editado com sucesso!");
      reset(); 
    } catch (error) {
      console.error("Erro ao editar o produto:", error);
      setServerError("Erro ao editar o produto. Tente novamente.");
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
          step="0.01"
          {...register("price")} 
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