import { getServerSession } from "next-auth";
import CheckoutClient from "./client";
import { authconfig } from "@/auth";


export default async function checkoutPage () {
    const session = await getServerSession(authconfig)

    return (
        <CheckoutClient session = {session}/>
    )
}