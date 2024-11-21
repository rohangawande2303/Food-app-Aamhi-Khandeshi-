// layout.jsx
import { CartProvider } from "./context/cartContext"; // Import CartProvider
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
  title: "Online Food store for Homemade Pickles, Papad",
  description: "Aamhi Khandeshi - Authentic Maharashtrian Food",
};

export default function Layout({ children }) {
  return (
    <CartProvider>
      <html lang="en">
        <body className={roboto.className}>
          <div>
            {/* The cart context will be available here */}
            <NavbarTop />
            <main>{children}</main>
            <Footer />
            <NavbarBottom />
          </div>
        </body>
      </html>
    </CartProvider>
  );
}
