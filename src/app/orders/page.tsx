import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { CartItem } from "../store/store";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function OrdersPage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const userId = session?.user?.id;

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      userId: userId as string,
    },
  });

  const data = await response.json();
  console.log("Orders data:", data);

  if(data.length === 0) {
    return (
        <div className="container mx-auto px-4 py-8 text-center h-150 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4 text-shadow-2xs text-neutral-800">Você ainda não fez nenhum pedido!</h1>
        <Link href="/products"><Button variant={"default"} className="cursor-pointer" >Voltar às compras</Button></Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold m-5">Histórico de pedidos</h1>

      {data.map((order: any) => (
        <div
          key={order.id}
          className="border p-4 m-2 rounded-lg shadow-md hover:shadow-2xs sm:w-1/2 w-4/5"
        >
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="flex flex-col items-center justify-between cursor-pointer xl:flex-row">
                <h2 className="text-lg font-semibold">
                  ID do pedido: {order.id}
                </h2>
                <p className="mx-5">
                  {new Date(order.createdAt).toLocaleString("pt-BR")}
                </p>
                <p className="mx-5">
                  Status:{" "}
                  {order.status == "paid" ? "Confirmado" : "Em processamento"}
                </p>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col w-full">
                <h3 className="mt-4 font-semibold">Itens:</h3>
                <ul className=" list-inside">
                  {order.items.map((item: CartItem) => (
                    <li
                      key={item.id}
                      className="flex flex-row items-center justify-start my-2 w-full border-t"
                    >
                      <Image
                        src={item.imageUrl || "/placeholder.png"}
                        width={150}
                        height={50}
                        className="my-5 rounded-2xl shadow-2xs"
                        alt={item.name}
                      ></Image>
                      <div className="flex flex-row justify-between items-center w-full">
                        <div className="flex flex-col justify-start items-start">
                          <p className="m-5">
                            {item.name} -{" "}
                            <span className="font-semibold">
                              R${item.price / 100}
                            </span>
                          </p>
                          <p className="m-5">Quantidade: <span className="font-semibold">{item.quantity}</span></p>
                        </div>
                        <p className="self-end m-5">Total: R${(item.price * item.quantity) / 100},00</p>
                      </div>
                    </li>
                  ))}
                </ul>
                
                <p className="mt-2 border-t pt-1">
                  Total:{" "}
                  <span className="font-semibold">R${order.total},00</span>
                </p>
                
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}
    </div>
  );
}
