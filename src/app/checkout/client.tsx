"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "../store/store";
import { checkoutAction } from "./checkout-action";
import { AuthSession } from "@/types";
import AuthCard from "@/components/auth/AuthCard";
import Image from "next/image";
import Link from "next/link";

interface CheckoutClientProps {
  session: AuthSession | null | undefined;
}

export default function CheckoutClient({ session } : CheckoutClientProps) {
  const { items, removeItem, addItem } = useCartStore();
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center h-150 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4 text-shadow-2xs text-neutral-800">Seu carrinho está vazio!</h1>
        <Link href="/products"><Button variant={"default"} className="cursor-pointer" >Voltar às compras</Button></Link>
      </div>
    );
  }

  const nomeAbv = session?.user.name.split(" ")[0];

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row items-center justify-center h-full lg:gap-30">
      <div>
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <Card className=" mx-auto mb-8 lg:w-150">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Resumo do pedido</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {items.map((item) => (    
              <div className="flex flex-row justify-between border-b pb-2" key={item.id}>       
              <Image src={item.imageUrl!} alt={`Imagem de ${item.name}`} width={150} height={50} className="p-1 rounded-2xl"></Image>            
              <li  className="flex flex-col gap-2  pb-2 w-full pl-2">
                
                <div className="flex justify-between">
                  
                  <span className="font-medium">{item.name}</span>
                  <span className="font-semibold">
                    R${((item.price * item.quantity) / 100).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    className="cursor-pointer"
                    variant="outline"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                  >
                    –
                  </Button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <Button
                    variant="default"
                    className="cursor-pointer"
                    size="sm"
                    onClick={() => addItem({ ...item, quantity: 1 })}
                  >
                    +
                  </Button>
                </div>
              </li>
              </div> 
            ))}
          </ul>
          <div className="mt-4 pt-2 text-lg font-semibold">
            Total: R${(total / 100).toFixed(2)}
          </div>
        </CardContent>
      </Card>
      {session &&<form action={checkoutAction} className="max-w-md mx-auto">
        <input type="hidden" name="items" value={JSON.stringify(items)} />
        <p className="text-lg font-semibold mx-auto text-center">{`Você está quase lá, ${nomeAbv}!
          Pronto para acelerar seus resultados?`} </p>
        <Button type="submit" variant="default" className="w-full cursor-pointer mt-10">
          Ir para o pagamento
        </Button>
      </form>}
      </div>
      {!session &&(
        <div className="text-center mt-4 flex flex-col items-center">
          <p className="text-lg font-semibold">Faça login para continuar a compra</p>
          <div className="flex flex-col gap-4 mt-4">
          
          <AuthCard status={false}></AuthCard>
          
          </div>
        </div>
      )}
    </div>
  );
}