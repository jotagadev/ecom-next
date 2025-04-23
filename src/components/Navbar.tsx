import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar(){
    return (
        <nav className="sticky top-0 z-50 bg-neutral-100/30 shadow rounded">
        <div className=" mx-auto flex items-center justify-between px-4 py-4 container">
          
            <Link href="/" className="font-bold text-gray-800">
              Sports Nutrition Store
            </Link>
          <div className="hidden md:flex space-x-6 text-gray-800 font-semibold">
            <Button variant={"link"}><Link href="/">Home</Link></Button>
          
            <Button variant={"link"}><Link href="/products">Products</Link></Button>

            <Button variant={"link"}><Link href="/checkout">Checkout</Link></Button>
            </div>
          
        </div>
      </nav>
    )}