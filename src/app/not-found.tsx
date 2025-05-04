import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound(){
    return (
        <div className="flex items-center justify-center h-auto flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  rounded-lg p-8 animate-in fade-in-100 duration-700 slide-in-from-bottom-8 ">
        <div className="flex flex-col items-center justify-center ">
            <h1 className="text-4xl font-bold">Página não encontrada</h1>
            <p className="mt-4 text-lg">Desculpe, a página que você está procurando não existe.</p>
        </div>
        <Link href={"/"}><Button variant={"default"} className="mt-4 cursor-pointer">Voltar para o início</Button></Link>
        </div>
    );
}