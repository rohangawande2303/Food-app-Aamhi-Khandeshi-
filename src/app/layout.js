import "./globals.css";
import { Roboto } from "next/font/google";
import NavbarTop from "./components/NavbarTop";
import NavbarBottom from "./components/NavbarBottom";
import Footer from "./components/Footer";
import { Providers } from "./providers";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Aamhi Khandeshi",
  description: "Authentic Maharashtrian homemade pickles and papads",
  keywords: "homemade pickles, papad, authentic Maharashtrian food, Aamhi Khandeshi",
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Providers>
          <NavbarTop />
          <main>{children}</main>
          <Footer />
          <NavbarBottom />
        </Providers>
      </body>
    </html>
  );
}
