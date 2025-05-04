import ProductDetails from "@/components/ProductDetails";
import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
import Link from "next/link";

export default async function ProductPage({params}: {params: Promise<{id: string}>}){

    const products = await stripe.products.list({
        active: true,
        expand: ["data.default_price"],
    });

    const { id } = await params;
    const product = products.data.find((product) => product.id === id);

    if (!product) {
        return (
            <div className="flex items-center justify-center h-auto flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  rounded-lg p-8 animate-in fade-in-100 duration-700 slide-in-from-bottom-8 ">
        <div className="flex flex-col items-center justify-center ">
            <h1 className="text-4xl font-bold">Produto não encontrado</h1>
            <p className="mt-4 text-lg">Desculpe, o produto que você está procurando não existe.</p>
        </div>
        <Link href={"/products"}><Button variant={"default"} className="mt-4 cursor-pointer">Voltar para as compras</Button></Link>
        </div>
        )
    }

    return (
        <div>
        <ProductDetails product={product} />
        </div>
    )
}