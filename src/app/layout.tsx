import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { auth } from "@/auth";
import { AuthSession } from "@/types";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecom",
  description: "Projeto de E-commerce - Jotagadev",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth() as AuthSession


  return (
    
    <html lang="pt-BR" className={inter.className}>
      <body
        className={`h-screen bg-white w-screen max-h-screen flex flex-col overflow-x-hidden scroll-custom`}
      >
        <Navbar session={session}/>
        <main className="container mx-auto py-4">
        {children}
        </main>
      </body>
    </html>
  );
}
