import Carousel from "@/components/Carousel";
import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const products = await stripe.products.list({
    active: true,
    expand: ['data.default_price'],
    limit:5,
    
  });

  return (
    <div>
      <section className="bg-neutral-100 shadow-2xs rounded-lg max-h-300">
  <div className="container  flex flex-col md:flex-row items-center justify-around gap-8 px-4">
    
    <div className="max-w-120 md:max-w-70 lg:max-w-2/4 flex flex-col items-center md:items-start p-4">
      <h1 className="text-3xl font-bold text-gray-800 text-center md:text-left">
        Sports Nutrition Store
      </h1>
      <p className="text-gray-600 mt-2 text-justify md:text-left">
      Potencialize seu desempenho com nossos suplementos premium. Explore nossa linha de produtos desenvolvidos para ajudar você a alcançar seus objetivos nos treinos.
      </p>
      <Button variant="default" className="mt-4">
        <Link href="/products">Veja nossos produtos</Link>
      </Button>
    </div>

    <div className="bg-neutral-100 h-100 flex flex-row items-center justify-around overflow-hidden shadow-2xs">
            <div className="w-[250px] md:w-[300px] h-full relative animate-in fade-in-100 duration-700 slide-in-from-left-8">
            <Image src={"/This is Sparta.jpg"} fill alt={"Imagem de espartano"} className="object-cover"></Image>
            </div>
            <div className="flex flex-col animate-in fade-in-translate-full duration-700 slide-in-from-right-20">
            <h2 className="font-extrabold text-2xl sm:text-2xl md:text-3xl 2xl:4xl text-shadow-xs"><span className="text-neutral-400">CONHECE-TE</span><br></br><span className="text-neutral-600">ACEITA-TE</span><br></br>SUPERA-TE</h2>
            <small className="font-semibold self-end">Sto. Agostinho de Hipona</small>
            </div>
          </div>

  </div>
</section>
<section>
  <Carousel products={products.data} />
</section>

    </div>
  );
}
