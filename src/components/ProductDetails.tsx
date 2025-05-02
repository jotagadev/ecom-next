"use client"

import Image from 'next/image';
import Stripe from 'stripe'
import { Button } from './ui/button';
import { useCartStore } from '@/app/store/store';
import { FaCartShopping } from "react-icons/fa6";
import Link from 'next/link';

export default function ProductDetails({product} : {product: Stripe.Product}) {

    const { items, addItem, removeItem } = useCartStore();
    const price = product.default_price as Stripe.Price;
    const image = product.images[0];
    
    const cartItem = items.find((item) => item.id === product.id);
    const quantity = cartItem ? cartItem.quantity : 0;

  const onAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      imageUrl: product.images ? product.images[0] : null,
      quantity: 1,
    });
  };

    return (
        
        <div className=" flex-col md:flex-row flex items-center justify-center  h-200 max-w-screen gap-10 "> 
            <div className='flex flex-col max-w-100 animate-in fade-in-100 duration-700 slide-in-from-bottom-8'>
                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                <p className="text-lg mb-4">{product.description}</p>
                {price  && <p className="text-xl font-bold">R${(price.unit_amount || 0) / 100},00</p>}
                <div className='mt-4 flex flex-row gap-4 items-center justify-left'>
                <div>
                <Button variant={"outline"} className='!w-auto cursor-pointer' onClick={() => removeItem(product.id)}>-</Button>
                
                </div>
                    <p>{quantity}</p>
                <div>
                <Button className='!w-auto cursor-pointer' onClick={onAddItem}>+</Button>
                </div>
                </div>
                {
                  quantity > 0 && (
                    <Link href={"/checkout"}><Button className='max-w-fit w-auto mt-5 cursor-pointer animate-in fade-in-50 duration-1000 slide-in-from-bottom-full' variant={"outline"}>Finalizar compra <FaCartShopping /></Button></Link>
                  )
                }
            </div>
            <div>
                <Image src={image} alt={product.name} className=" rounded-2xl shadow-2xl w-2xl h-auto mb-4 object-fill" width={1024} height={768}/>
            </div>
            
            
            
            
        </div>
    )
}