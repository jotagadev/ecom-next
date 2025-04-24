import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";


export const metadata: Metadata = {
  title: "Ecom",
  description: "Projeto de E-commerce - Jotagadev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="pt-BR">
      <body
        className={`flex min-h-full flex-col bg-white`}
      >
        <Navbar />
        <main className="flex-grow container mx-auto py-4">
        {children}
        </main>
      </body>
    </html>
  );
}
