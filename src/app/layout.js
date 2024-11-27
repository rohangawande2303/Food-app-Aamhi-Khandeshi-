import dynamic from "next/dynamic";
import "./globals.css";
import { Roboto } from "next/font/google";
import NavbarTop from "./components/NavbarTop";
import NavbarBottom from "./components/NavbarBottom";
import Footer from "./components/Footer";

// Dynamically load CartProvider to avoid SSR issues
const CartProvider = dynamic(() => import("./context/cartContext"), {
  ssr: false,
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Online Food Store for Homemade Pickles, Papad",
  description: "Aamhi Khandeshi - Authentic Maharashtrian Food",
};

export default function Layout({ children }) {
  return (
    <CartProvider>
      <html lang="en">
        <head>
          <meta name="description" content={metadata.description} />
          <meta
            name="keywords"
            content="homemade pickles, papad, authentic Maharashtrian food, Aamhi Khandeshi"
          />
        </head>
        <body className={roboto.className}>
          <NavbarTop />
          <main>{children}</main>
          <Footer />
          <NavbarBottom />
        </body>
      </html>
    </CartProvider>
  );
}
