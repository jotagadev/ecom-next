import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { DialogHeader } from "../ui/dialog";
import CreateProductForm from "./CreateProductForm";



export default function CreateProductModal () {
    return (
        <Dialog>
        <DialogTrigger asChild>
        <Button variant={"outline"} className="max-w-fit w-auto self-center cursor-pointer font-semibold">
          Adicionar Produto 
        </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] w-[350px] overflow-y-auto max-h-[90vh] overflow-x-hidden scroll-custom">
            <DialogHeader>
            <DialogTitle>Criar Produto</DialogTitle>
            <DialogDescription>Crie um novo produto.</DialogDescription>
            </DialogHeader>
            
            <CreateProductForm />
            
            
        </DialogContent>
        </Dialog>
    );
}