"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { updateProductFormData, updateProductSchema } from "@/lib/zod";
import { Button } from "../ui/button";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { FaCloudUploadAlt,  FaTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Stripe from "stripe";

interface Props {
  product: Stripe.Product;
}

export default function UpdateProductForm({ product }: Props) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<updateProductFormData>({
    resolver: zodResolver(updateProductSchema),
  });

  const onSubmit = async (data: updateProductFormData) => { 

    setServerError(null);
    setSuccessMessage(null);

    const filteredData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== "" && value !== undefined && value !== null)
      );

      if(imageUrl) {
        filteredData.image = imageUrl;
      }

      const filteredDataKeys = Object.keys(filteredData);
      if (filteredDataKeys.length === 0) {
        setServerError("Nenhum campo foi alterado.");
        return;
      }

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
      setTimeout(() => {
        router.refresh(); 
      }, 1000);

    } catch (error) {
      console.error("Erro ao editar o produto:", error);
      setServerError("Erro ao editar o produto. Tente novamente.");
    }
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      const fileExt = file?.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `products/images/${fileName}`;

      if (!file) {

        setImageUrl(null);

        return null;
      }

      const { error } = await supabase.storage
        .from("products-images")
        .upload(filePath, file);


      if (error) {
        setServerError(error.message)
      }

      console.log("Imagem enviada com sucesso");

      const { data: publicUrlData } = supabase.storage
        .from("products-images")
        .getPublicUrl(filePath);
      const publicUrl = publicUrlData.publicUrl;

      if (publicUrl) {
        setImageUrl(publicUrl);
        console.log("URL da imagem:", publicUrl);
        setServerError(null);
        return publicUrl;
      } else {
        throw new Error("Erro ao obter a URL da imagem.");
      }
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
      setServerError(`Erro ao fazer upload da imagem. Tente novamente.`);
      console.log(error);
      console.log(imageUrl);
    }
  };


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-sm mx-auto"
    >
      <div>
        <label htmlFor="name">Nome:</label>
        <input
          placeholder="Nome do Produto"
          id="name"
          {...register("name")}
          className="rounded-lg bg-neutral-100 p-2 w-full"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description">Descrição:</label>
        <input
          placeholder="Descrição do Produto"
          id="description"
          {...register("description")}
          className="rounded-lg bg-neutral-100 p-2 w-full"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="category">Categoria:</label>
        <input
          placeholder="Categoria do Produto"
          id="category"
          {...register("category")}
          className="rounded-lg bg-neutral-100 p-2 w-full"
        />
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="price">Preço:</label>
        <input
          placeholder="R$"
          id="price"
          {...register("price")}
          className="rounded-lg bg-neutral-100 p-2 w-full"
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
      </div>

       <div className="flex flex-col items-start gap-2">
        <label>Imagem:</label>
        
        <div className="flex flex-col justify-center w-full">
        {!imageUrl && (
      <label htmlFor="file-upload" className="cursor-pointer">
        <div className="flex items-center justify-center bg-neutral-800 text-white p-4 rounded-lg shadow-md  w-[300px] h-[200px] hover:bg-neutral-700">
          <FaCloudUploadAlt className="mr-2" /> 
          <span>Carregar Imagem</span> 
        </div>
      </label>)}
      <input
        id="file-upload"
        type="file"
        onChange={handleChange}
        className="hidden"
        accept="image/*"
      />
      <p className="mt-2 text-sm text-gray-500">{!imageUrl && "Nenhum arquivo selecionado"}</p>
    </div>
        {imageUrl && (
          <div className="relative w-[300px] h-[200px]">
          <Image
            className="self-start rounded-2xl"
            fill
            src={imageUrl}
            alt={"Imagem do upload"}
          ></Image>
          <Button onClick={() => setImageUrl(null)} className="absolute top-2 right-2 bg-neutral-800 text-white p-2 w-8 h-8 rounded shadow-2xl hover:bg-red-800 cursor-pointer">
          <FaTrashAlt ></FaTrashAlt>
          </Button>
          </div>
        )}
      </div>

      {serverError && (
        <p className="text-red-500 text-sm">{serverError}</p>
      )}
      {successMessage && (
        <p className="text-green-500 text-sm">{successMessage}</p>
      )}

      <Button
        type="submit"
        className="w-full text-white p-2 rounded-lg mt-4"
        disabled={isSubmitting}
        onClick={() => {
          console.log(imageUrl)
        }}
      >
        {isSubmitting ? "Enviando..." : "Enviar"}
      </Button>
    </form>
  );
}
