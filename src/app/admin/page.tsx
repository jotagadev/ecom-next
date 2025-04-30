import { auth } from "@/auth";
import { AuthSession } from "@/types";
import { stripe } from "@/lib/stripe";
import AdminProductCard from "@/components/admin/AdminProductCard";
import CreateProductModal from "@/components/admin/CreateProductModal";
import { redirect } from "next/navigation";

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
        <CreateProductModal></CreateProductModal>
        <div className="mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-center  items-center p-4">
          {products.data.map((product) => (
            <AdminProductCard
              key={product.id}
              product={product}
            ></AdminProductCard>
          ))}
        </div>
      </div>
    );
  } 

