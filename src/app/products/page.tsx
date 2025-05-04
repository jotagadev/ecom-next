import { stripe } from "@/lib/stripe";
import ProductList from "@/components/ProductList";
import Image from "next/image";

export default async function ProductsPage() {


  const products = await stripe.products.list({
    active: true,
    expand: ["data.default_price"],
  });


  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-neutral-100 w-screen h-70 flex flex-row items-center justify-around overflow-hidden shadow-2xs">
        <div className="w-[200px] md:w-[300px] h-full relative animate-in fade-in-translate-full duration-700 slide-in-from-right-75">
        <Image src={"/This is Sparta.jpg"} fill alt={"Imagem de espartano"} className="object-cover"></Image>
        </div>
        <div className="flex flex-col animate-in fade-in-translate-full duration-700 slide-in-from-bottom-25">
        <h2 className="font-extrabold text-2xl sm:text-4xl md:text-5xl text-shadow-xs"><span className="text-neutral-400">CONHECE-TE</span><br></br><span className="text-neutral-600">ACEITA-TE</span><br></br>SUPERA-TE</h2>
        <small className="font-semibold self-end">Sto. Agostinho de Hipona</small>
        </div>
      </div>
      <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground text-center mb-8 mt-8">
        Nossos produtos
      </h1>
      
      <ProductList products={products.data} />
    </div>
  );
}