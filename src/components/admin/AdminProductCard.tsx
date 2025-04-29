import Stripe from "stripe";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import UpdateProductModal from "./UpdateProductModal";

interface Props {
  product: Stripe.Product;
}

export default function AdminProductCard({ product }: Props) {
  const price = product.default_price as Stripe.Price;
  const image = product.images[0];

  return (
    <Card className="bg-neutral-100 shadow-2xl rounded-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out flex flex-row p-0 max-w-sm border-0">
      {product.images && product.images[0] && (
        <div className="relative w-50 h-50 overflow-hidden rounded-lg shadow-lg ">
          <Image src={image} fill alt={product.name}></Image>
        </div>
      )}
      <div className="flex flex-col justify-between p-4 w-50">
        <div>
          <CardHeader>
            <CardTitle className="text-shadow-2xs border-b border-b-gray-700/20 pb-2">
              {product.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {price && (
              <p className=" font-bold text-sm">
                {"R$ "}
                {(price.unit_amount || 0) / 100}
                {",00"}
              </p>
            )}
          </CardContent>
        </div>
        <div className="flex flex-col gap-2 justify-between">
          <UpdateProductModal product={product}></UpdateProductModal>
          <Button
            variant={"destructive"}
            className="flex items-center gap-2 cursor-pointer bg-red-800"
          >
            <FaTrashAlt className="text-lg" /> Deletar
          </Button>
        </div>
      </div>
    </Card>
  );
}
