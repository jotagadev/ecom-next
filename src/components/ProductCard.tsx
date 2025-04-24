import Stripe from 'stripe';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';

interface Props{
    product: Stripe.Product;
}

export default function ProductCard({product}: Props) {

    const price = product.default_price as Stripe.Price;
    const image = product.images[0];

    return (
        <Card className='bg-white shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out'>
            {product.images && product.images[0] &&
            <div className='relative w-auto h-50 overflow-hidden rounded-lg shadow-lg mb-4 m-5'>
            <Image src={image} fill alt={product.name}>
                
            </Image>
            </div>
            }
            <CardHeader>
                <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
                {price && 
                <p className=' font-bold'>{"R$ "}{(price.unit_amount || 0) / 100}{",00"}</p>}
                <Button variant={"default"} className='mt-4'><Link href={`/products/${product.id}`}>Comprar</Link></Button>
            </CardContent>
        </Card>
    )}
