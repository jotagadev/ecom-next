import { stripe } from "@/lib/stripe";
import ProductList from "@/components/ProductList";

export default async function ProductsPage() {


  const products = await stripe.products.list({
    active: true,
    expand: ["data.default_price"],
  });


  return (
    <div className="flex flex-col items-center justify-center py-2">
      <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground text-center mb-8">
        Nossos produtos
      </h1>
      
      <ProductList products={products.data} />
    </div>
  );
}