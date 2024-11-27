import { CartProvider } from "./context/cartContext";
import "./globals.css";
import { Roboto } from "next/font/google";
import NavbarTop from "./components/NavbarTop";
import NavbarBottom from "./components/NavbarBottom";
import Footer from "./components/Footer";

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
