"use client"; // Mark this as a client component

import dynamic from "next/dynamic";
import "./globals.css";
import { Roboto } from "next/font/google";
import NavbarTop from "./components/NavbarTop";
import NavbarBottom from "./components/NavbarBottom";
import Footer from "./components/Footer";

// Dynamically load CartProvider to avoid SSR issues
const CartProvider = dynamic(
  () => import("./context/cartContext").then((mod) => mod.CartProvider),
  { ssr: false }
);

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="keywords"
          content="homemade pickles, papad, authentic Maharashtrian food, Aamhi Khandeshi"
        />
      </head>
      <body className={roboto.className}>
        <CartProvider>
          <NavbarTop />
          <main>{children}</main>
          <Footer />
          <NavbarBottom />
        </CartProvider>
      </body>
    </html>
  );
}
