import ProductDetails from "@/components/ProductDetails";
import { stripe } from "@/lib/stripe";

export default async function ProductPage({params}: {params: Promise<{id: string}>}){

    const products = await stripe.products.list({
        expand: ["data.default_price"],
    });

    const { id } = await params;
    const product = products.data.find((product) => product.id === id);

    if (!product) {
        return <div className="mx-auto">Produto não encontrado</div>;
    }

    return (
        <div>
        <ProductDetails product={product} />
        </div>
    )
}