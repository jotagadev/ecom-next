
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { db } from "@/lib/db"; 
import { NextRequest, NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  console.log("Requisição recebida:", req.method, req.headers);
  const buf = await req.arrayBuffer();
  const rawBody = Buffer.from(buf);
  const sig = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig as string, webhookSecret);
  } catch (err) {
    console.error("Erro ao verificar webhook:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return new NextResponse(`Erro do webhook: ${errorMessage}`, { status: 400 });
  }

  console.log("Evento recebido:", event);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const metadata = session.metadata;
    if (!metadata) return new NextResponse("Metadata ausente", { status: 200 });

    const userId = metadata.userId || null;
    const items = JSON.parse(metadata.items || "[]");

    try {
      const total = (session.amount_total || 0) / 100;

      const order = await db.order.create({
        data: {
          userId,
          stripeSessionId: session.id,
          total,
          status: session.payment_status || "Em processamento",
          items: {
            create: items.map((item: any) => ({
              productId: item.id,
              name: item.name,
              price: item.price,
              imageUrl: item.imageUrl,
              quantity: item.quantity,
            })),
          },
        },
      });

      console.log("Pedido salvo:", order.id);
    } catch (error) {
      console.error("Erro ao salvar pedido no banco:", error);
      return new NextResponse("Erro ao salvar pedido", { status: 500 });
    }
  }

  return new NextResponse("Evento recebido.", { status: 200 });
}
