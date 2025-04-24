import Carousel from "@/components/Carousel";
import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const products = await stripe.products.list({
    expand: ['data.default_price'],
    limit:5,
    
  });
  return (
    <div>
      <section className="bg-neutral-100 py-8 sm:py-12 shadow-2xs rounded-lg">
  <div className="container  flex flex-col md:flex-row items-center justify-around gap-8 px-4">
    
    <div className="max-w-md flex flex-col items-center md:items-start">
      <h1 className="text-3xl font-bold text-gray-800 text-center md:text-left">
        Sports Nutrition Store
      </h1>
      <p className="text-gray-600 mt-2 text-left">
      Potencialize seu desempenho com nossos suplementos premium. Explore nossa linha de produtos desenvolvidos para ajudar você a alcançar seus objetivos nos treinos.
      </p>
      <Button variant="default" className="mt-4">
        <Link href="/products">Veja nossos produtos</Link>
      </Button>
    </div>

    <div className="relative rounded-4xl">
      {products.data[0]?.images[0] && (
        <Image
          alt="Imagem de todos os suplementos"
          src={"/suplementos 2.jpg"}
          className=" shadow-lg object-cover -z-10 rounded-4xl"
          width={700}
          height={450}
        />
        
      )}
      <div className="absolute inset-0 bg-black/30 z-10 rounded-4xl"></div>
    </div>

  </div>
</section>
<section>
  <Carousel products={products.data} />
</section>

    </div>
  );
}
