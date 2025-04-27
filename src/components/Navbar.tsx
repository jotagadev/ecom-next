"use client";

import Link from "next/link";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useCartStore } from "@/app/store/store";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { AuthSession } from "@/types";
import { Avatar} from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { logout } from "@/lib/actions/auth";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AuthCard from "./auth/AuthCard";

interface Props {
  session: AuthSession| null | undefined;
}

export  default function Navbar ({session} : Props)  {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center-safe space-x-10">
        <Link href="/" className="text-2xl font-bold">
          Sports Nutrition
        </Link>
        <div className="hidden md:flex space-x-6">
        <Button variant={"link"}>
              <Link href="/">
                Página inicial
              </Link>
              </Button>
            
            <Button variant={"link"}>
              <Link href="/products">
                Produtos
              </Link>
              </Button>
           
            <Button variant={"link"}>
              <Link href="/checkout">
                Checkout
              </Link>
              </Button>
              </div>
        </div>
        
        
        <div className="flex items-center space-x-4">
          <Link href="/checkout" className="relative md: mr-10">
            <ShoppingCartIcon className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {session ? (<div className="flex flex-row align-center justify-center gap-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src={session?.user.image}></AvatarImage>
        </Avatar>
        <span className="my-auto font-semibold text-shadow-2xs">{session?.user.name}</span>
        <Button className="p-1 cursor-pointer" variant={"default"} onClick={() => logout()}>Logout</Button>
        </div>):
        (
          <div className="hidden md:flex flex-row gap-2">
            
          <Dialog>
            <DialogTrigger asChild>
            <Button variant={"default"} className="hidden md:block cursor-pointer">
            Login 
          </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Login</DialogTitle>
                <DialogDescription>
                </DialogDescription>
              </DialogHeader>
              <AuthCard status={true} />
            </DialogContent>
          </Dialog> 
          
          <Dialog>
            <DialogTrigger asChild>
            <Button variant={"secondary"} className="hidden md:block cursor-pointer">
            Registrar-se
          </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Login</DialogTitle>
                <DialogDescription>
                </DialogDescription>
              </DialogHeader>
              <AuthCard status={false} />
            </DialogContent>
          </Dialog> 
        </div>
        )}
          
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>
      {mobileOpen && (
        <nav className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col p-4 space-y-2">
            <li>
              <Button variant={"link"}>
              <Link href="/">
                Página inicial
              </Link>
              </Button>
            </li>
            <li>
            <Button variant={"link"}>
              <Link href="/products">
                Produtos
              </Link>
              </Button>
            </li>
            <li>
            <Button variant={"link"}>
              <Link href="/checkout">
                Checkout
              </Link>
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </nav>
  );
};