"use client"

import Link from "next/link";
import { Button } from "./ui/button";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useCartStore } from "@/app/store/store";

export default function Navbar(){
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
    return (
        <nav className="sticky top-0 z-50 bg-neutral-100/30 shadow rounded">
        <div className=" mx-auto flex items-center justify-between px-4 py-4 container">
          
            <Link href="/" className="font-bold text-gray-800">
              Sports Nutrition Store
            </Link>
          <div className="hidden md:flex space-x-6 text-gray-800 font-semibold">
            <Button variant={"link"}><Link href="/">Página inicial</Link></Button>
          
            <Button variant={"link"}><Link href="/products">Produtos</Link></Button>

            <Button variant={"link"}><Link href="/checkout"><ShoppingCartIcon></ShoppingCartIcon>
            {cartCount > 0 && (
              <span className="relative -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {cartCount}
              </span>
            )}</Link>
            
            </Button>
            

            </div>
          
        </div>
      </nav>
    )}