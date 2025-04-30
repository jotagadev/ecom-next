"use client"

import Stripe from "stripe";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { FaTrashAlt } from "react-icons/fa";
import UpdateProductModal from "./UpdateProductModal";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation";

interface Props {
  product: Stripe.Product;
}

export default function AdminProductCard({ product }: Props) {
  const price = product.default_price as Stripe.Price;
  const image = product.images[0];
  const router = useRouter()

  const handleDelete = async () => {
    try{
    const res = await fetch(`/api/products/`, {
      method: "DELETE",
      body: JSON.stringify({
        id: product.id,
      })
    });
    if (res.ok) {
      console.log(res);
    }
    router.refresh()
     }catch (error : unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unknown error occurred");
      }
     }
   
  }

  return (
    <Card className="relative bg-neutral-100 shadow-2xl rounded-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out flex flex-row p-0 sm:max-w-sm border-0 flex-grow max-w-4/5 bg-red-">
      
          <AlertDialog>
      <AlertDialogTrigger 
            
            className="flex items-center cursor-pointer text-sm absolute z-10 right-0 -top-1 hover:bg-red-700 size:min bg-red-600 p-1 rounded-sm text-white">
            
          
            <FaTrashAlt className="text-lg" /></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Inativação de produto</AlertDialogTitle>
          <AlertDialogDescription>
            {`Você tem certeza que quer inativar ${product.name}?`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Sim</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

      
      {product.images && product.images[0] && (
        <div className="relative w-50 h-50 overflow-hidden rounded-lg shadow-lg ">
          <Image src={image} fill alt={product.name}></Image>
        </div>
      )}
      <div className="flex flex-col justify-between p-4 w-50">
        <div>
          <CardHeader>
            <CardTitle className="text-shadow-2xs border-b border-b-gray-700/20 pb-2">
              {product.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {price && (
              <p className=" font-bold text-sm">
                {"R$ "}
                {(price.unit_amount || 0) / 100}
                {",00"}
              </p>
            )}
          </CardContent>
        </div>
        <div className="flex flex-col gap-2 justify-between items-center">
          <UpdateProductModal product={product}></UpdateProductModal>
          
        </div>
      </div>
    </Card>
  );
}
