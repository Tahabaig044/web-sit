import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";
import Navbar from "@/components/Navbar";
import ToasterProvider from "@/lib/providers/ToasterProvider";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Taha Store",
  description: "Taha Ecommerce Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <ToasterProvider />
          <div className="bg-black w-full text-white flex justify-center items-center h-10  text-[13px]">Festive Luxe is Live. Shop your favourites now!</div>
          <Navbar />
          {children}
          <Footer/>
        </ClerkProvider>
      </body>
    </html>
  );
}
