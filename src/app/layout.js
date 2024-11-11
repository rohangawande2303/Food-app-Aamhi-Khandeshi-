import "./globals.css";
import NavbarTop from "./components/NavbarTop";
import NavbarBottom from "./components/NavbarBottom";
import { Roboto } from "next/font/google";
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
    <html lang="en">
      <body className={roboto.className}>
        <div>
          <NavbarTop />
          <main>{children}</main>
          <Footer />
          <NavbarBottom />
        </div>
      </body>
    </html>
  );
}
