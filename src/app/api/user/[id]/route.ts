import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(_ : NextRequest, {params} : {params : {id: string}}) {

    const { id } = await params

    const user = await db.user.findUnique({
        where: {
            id: id,
        },
    })

    return NextResponse.json({
        id: user?.id,
        email: user?.email,
        name: user?.name,
        image: user?.image
    })
}