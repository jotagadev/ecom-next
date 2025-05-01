"use client";

import AdminProductCard from "./AdminProductCard";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import CreateProductModal from "./CreateProductModal";


export default function AdminProductList({ products }: any) {
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
        <CreateProductModal></CreateProductModal>
      <div className="flex flex-row items-center justify-center w-fit m-8 bg-neutral-100 rounded p-2">
        <input
          onChange={handleChange}
          type="text"
          className="focus:outline-none"
          placeholder="Pesquisar produto"
        ></input>
        <FaSearch className="text-neutral-500 text-2xl ml-2" />
      </div>
      <div className="p-2 grid grid-cols-1 px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 sm:px-4 container w-max mx-auto gap-4 justify-center">
        {!filteredProducts
          ? products.map((product: any) => (
              <AdminProductCard key={product.id} product={product}></AdminProductCard>
            ))
          : filteredProducts.map((product: any) => (
              <AdminProductCard key={product.id} product={product}></AdminProductCard>
            ))}
      </div>
    </div>
  );
}
