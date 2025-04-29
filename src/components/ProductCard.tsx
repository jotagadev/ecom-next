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
        <Card className="bg-white shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out border-0 p-0 w-60 flex flex-col justify-between">
  {product.images && product.images[0] && (
    <div className="relative w-60 h-50 overflow-hidden rounded-lg mb-4">
      <Image src={image} fill alt={product.name} className="object-cover" />
    </div>
  )}
  <div className="flex flex-col justify-between flex-grow">
    <CardHeader className='m-0'>
      <CardTitle className='w-full'>
        <h2 className='font-bold'>{product.name}</h2>
        <small>{product.metadata.category}</small>
        </CardTitle>
    </CardHeader>
    <CardContent className="p-5 flex flex-col mt-auto ">
      {price && (
        <p className="font-semibold text-sm">
          {"R$ "}{(price.unit_amount || 0) / 100}{",00"}
        </p>
      )}
      <Button variant="default" className="mt-4">
        <Link href={`/products/${product.id}`}>Comprar</Link>
      </Button>
    </CardContent>
  </div>
</Card>

    )}
