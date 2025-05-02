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

import { ChevronDown } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"


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
        <Link href="/" className="text-2xl font-bold text-shadow-2xs">
          Sports Nutrition
        </Link>
        <div className="hidden lg:flex space-x-6">
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

              {session && session.user.admin && (
                <Button variant={"link"}>
                <Link href="/admin">
                  Admin
                </Link>
                </Button>
              )}
              </div>
        </div>
        
        
        <div className="flex items-center space-x-4">
          <Link href="/checkout" className="relative lg: mr-10">
            <ShoppingCartIcon className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>

          { 
          // Caso a sessão esteja ativa, exibe o nome do usuario e o botão de logout
          // Caso contrário, exibe o botão de login e registrar-se, dentro do Dialog
          }

          {(session) ? (

        <Collapsible className="relative hidden lg:block">
        <CollapsibleTrigger className="group cursor-pointer"><div className=" flex-row align-center justify-center gap-4 hidden md:flex">
        {session?.user?.image && <Avatar className="h-10 w-10 rounded-full transition-shadow group-hover:shadow-md group-hover:shadow-black/20">
          <AvatarImage src={session?.user.image}></AvatarImage>
        </Avatar>}
        <span className="my-auto font-semibold text-shadow-2xs group-hover:text-[neon-color] group-hover:border-b border-neutral-300">{session?.user.name}</span>
        <ChevronDown
            className="h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180 self-center"
          />
        
        </div></CollapsibleTrigger>
        <CollapsibleContent className="animate-in fade-in slide-in-from-top-2 slide-out-to-bottom-5 absolute top-15 -right-8 bg-white shadow-md p-4 rounded-lg z-50 w-fit flex flex-col gap-2 justify-center">
        <Link href={"/orders"}><Button className="p-1 cursor-pointer" variant={"ghost"}>Histórico de pedidos</Button></Link>
        <Button className="p-1 cursor-pointer" variant={"ghost"} onClick={() => logout()}>Logout</Button>
        </CollapsibleContent>
        </Collapsible>
          
      ):
        (
          <div className="hidden lg:flex flex-row gap-2">
            
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
            className="lg:hidden"
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
        <nav className="lg:hidden bg-white shadow-md flex flex-col items-center transition-transform duration-300 animate-in slide-in-from-top-2 slide-out-to-bottom-5">
          <ul className="flex flex-col p-4">
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
            {session && session.user.admin && (
              <li>
                <Button variant={"link"}>
                <Link href="/admin">
                  Admin
                </Link>
                </Button>
                </li>
              )}
              {session && session.user && (
              <li>
                <Button variant={"link"}>
                <Link href="/orders">
                  Histórico de pedidos
                </Link>
                </Button>
                </li>
              )}
          </ul>
          {(session) ? (<div className=" flex-row align-center justify-center gap-4 flex lg:hidden p-2">
        <Avatar className="w-10 h-10">
          <AvatarImage src={session?.user.image}></AvatarImage>
        </Avatar>
        <span className="my-auto font-semibold text-shadow-2xs">{session?.user.name}</span>
        <Button className="p-1 cursor-pointer" variant={"default"} onClick={() => logout()}>Logout</Button>
        </div>):
        (
          <div className="flex md:hidden flex-row gap-2 p-4">
            
          <Dialog>
            <DialogTrigger asChild>
            <Button variant={"default"} className="block md:hidden cursor-pointer">
            Login 
          </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[400px]">
              <DialogHeader className="">
                <DialogTitle>Login</DialogTitle>
                <DialogDescription>
                </DialogDescription>
              </DialogHeader>
              <AuthCard status={true} />
            </DialogContent>
          </Dialog> 
          
          <Dialog>
            <DialogTrigger asChild>
            <Button variant={"secondary"} className="block md:hidden cursor-pointer">
            Registrar-se
          </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[400px]">
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
        </nav>
      )}
    </nav>
  );
};