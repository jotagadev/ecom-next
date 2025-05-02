"use server";

import { stripe } from "@/lib/stripe";
import { CartItem } from "../store/store";
import { redirect } from "next/navigation";
import { auth } from "@/auth"

export const checkoutAction = async (formData: FormData): Promise<void> => {
  const userSession = await auth()
  const itemsJson = formData.get("items") as string;
  const items = JSON.parse(itemsJson);
  const line_items = items.map((item: CartItem) => ({
    price_data: {
      currency: "brl",
      product_data: { name: item.name },
      unit_amount: item.price,
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
    metadata : {
      userId: userSession?.user?.id || null,
      items: JSON.stringify(items),
    },
  });

  redirect(session.url!);
};