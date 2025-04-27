
import { AuthSession } from "@/types";
import CheckoutClient from "./client";
import { auth } from "@/auth";


export default async function checkoutPage () {
    const session = await auth() as AuthSession

    console.log(session) //APENAS PARA TESTE (RETIRAR)

    return (
        <CheckoutClient  session={session}/>
    )
}