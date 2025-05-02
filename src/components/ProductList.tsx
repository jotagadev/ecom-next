"use client";

import ProductCard from "./ProductCard";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";


export default function ProductList({ products }: any) {
  const [filteredProducts, setFilteredProducts] = useState(products.data);

  console.log(products);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const filteredProducts = products.filter((product: { name: string , metadata : {category : string}}) =>
      product.name.toLowerCase().includes(value) ||

        product.metadata.category && product.metadata.category.toLowerCase().includes(value)

    );
    setFilteredProducts(filteredProducts);
  };

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div className="flex flex-row items-center justify-center w-fit mb-8 bg-neutral-100 rounded p-2">
        <input
          onChange={handleChange}
          type="text"
          className="focus:outline-none"
          placeholder="Pesquisar produto"
        ></input>
        <FaSearch className="text-neutral-500 text-2xl ml-2" />
      </div>
      <div className="p-2 grid grid-cols-1 px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 sm:px-4 container w-max mx-auto gap-4 justify-center animate-in fade-in-100 duration-700 slide-in-from-bottom-2">
        {!filteredProducts
          ? products.map((product: any) => (
              <ProductCard key={product.id} product={product}></ProductCard>
            ))
          : filteredProducts.map((product: any) => (
              <ProductCard key={product.id} product={product}></ProductCard>
            ))}
      </div>
    </div>
  );
}
