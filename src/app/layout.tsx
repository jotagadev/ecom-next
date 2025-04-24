import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
