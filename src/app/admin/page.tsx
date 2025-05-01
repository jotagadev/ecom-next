import { auth } from "@/auth";
import { AuthSession } from "@/types";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import AdminProductList from "@/components/admin/AdminProductList";

export default async function AdminPage() {
  const session = (await auth()) as AuthSession;
  const products = await stripe.products.list({
    active: true,
    expand: ["data.default_price"],
  });

  if (!session) {
    redirect("/")
  }

  if(!session.user.admin) {
    redirect("/")
  }
  
    return (
      <div className="flex flex-col gap-5 ">
        <h1 className="self-center font-bold text-xl text-shadow-2xs">
          Painel de administrador
        </h1>
        <AdminProductList products={products.data} />
      </div>
    );
  } 

