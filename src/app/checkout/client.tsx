"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "../store/store";
import { checkoutAction } from "./checkout-action";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { githubLogin, googleLogin } from "@/lib/actions/auth";

export default function CheckoutClient({session} : any) {
  const { items, removeItem, addItem } = useCartStore();
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Seu carrinho está vazio!</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <Card className="max-w-md mx-auto mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Resumo do pedido</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.id} className="flex flex-col gap-2 border-b pb-2">
                <div className="flex justify-between">
                  <span className="font-medium">{item.name}</span>
                  <span className="font-semibold">
                    R${((item.price * item.quantity) / 100).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                  >
                    –
                  </Button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addItem({ ...item, quantity: 1 })}
                  >
                    +
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t pt-2 text-lg font-semibold">
            Total: R${(total / 100).toFixed(2)}
          </div>
        </CardContent>
      </Card>
      {session &&<form action={checkoutAction} className="max-w-md mx-auto">
        <input type="hidden" name="items" value={JSON.stringify(items)} />
        <Button type="submit" variant="default" className="w-full cursor-pointer">
          Ir para o pagamento
        </Button>
      </form>}
      {!session &&(
        <div className="text-center mt-4 flex flex-col items-center">
          <p className="text-lg font-semibold">Faça login para continuar a compra</p>
          <div className="flex gap-4 mt-4">
          <Button variant="default" className="mt-2 bg-red-800 cursor-pointer hover:bg-red-700" onClick={() => googleLogin()}>
            Login com o Google <FaGoogle className="inline ml-2" />
          </Button>
          <Button variant="default" className="mt-2 cursor-pointer" onClick={() => githubLogin()}>
            Login com o Github <FaGithub className="inline ml-2" />
          </Button>
          </div>
        </div>
      )}
    </div>
  );
}