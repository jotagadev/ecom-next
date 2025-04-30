import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { DialogHeader } from "../ui/dialog";
import { FaEdit } from "react-icons/fa";
import UpdateProductForm from "./UpdateProductForm";
import Stripe from "stripe";

type Props = {
    product: Stripe.Product;
};




export default function UpdateProductModal ({ product } : Props) {
    return (
        <Dialog>
        <DialogTrigger asChild>
        <Button
                    variant={"default"}
                    className="flex items-center gap-2 cursor-pointer size-min"
                  >
                    <FaEdit className="text-lg" /> Editar
                  </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>Editar Produto</DialogTitle>
            <DialogDescription>Edite um produto existente.</DialogDescription>
            </DialogHeader>
            <UpdateProductForm product={product} />
        </DialogContent>
        </Dialog>
    )};