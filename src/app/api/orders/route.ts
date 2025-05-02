import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export const GET = auth(async function GET(req) {
    
    if (req.auth) {
        return new NextResponse("Não autorizado", { status: 401 });
    }

    const userId = req.headers.get("userId") as string;
    

    try {
        const orders = await db.order.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                items: true,
            },
            where: {
                userId: userId
            },
        });

        return NextResponse.json(orders);
    } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
        return new NextResponse("Erro interno do servidor", { status: 500 });
    }
})