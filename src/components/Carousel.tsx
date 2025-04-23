"use client"

import Stripe from "stripe";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";

interface Props {
  products: Stripe.Product[];
}

export default function Carousel({ products }: Props) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
        }, 5000);

        return () => clearInterval(interval); 
    }

    , [products.length]);

    const currentProduct = products[currentIndex];
    const currentImage = currentProduct.images[0];
    const currentPrice = currentProduct.default_price as Stripe.Price;


  return (
    <div>
        <div className="relative w-full h-80 overflow-hidden rounded-lg shadow-lg my-4">
        <Image src={currentImage} alt={"Imagem do produto"} fill className="-z-10 object-cover"></Image>
        <div className="container items-left justify-start flex flex-col absolute top-0 left-0  h-full bg-black/50 text-white p-4">
          <h2 className="text-3xl font-bold text-white-900 text-center md:text-left text-shadow">{currentProduct.name}</h2>
          <p>{currentProduct.description}</p>
          <p>{"R$ "}{(currentPrice.unit_amount || 0) / 100}{",00"}</p>
          <Button variant={"secondary"} className="absolute top-65">Comprar</Button>
        </div>
        
        </div>
        
    </div>
  );
}