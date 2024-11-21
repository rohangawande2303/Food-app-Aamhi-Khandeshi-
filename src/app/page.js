// src/app/page.js
import CustomerReviews from "./components/CustomerReviews";
import Hero from "./components/Hero";
import InfoBar from "./components/InfoBar";
import ProductsSection from "./components/ProductsSection"; // Import the new component
import Toppick from "./components/Toppick";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <ProductsSection /> {/* Products section added here */}
      <Toppick />
      <CustomerReviews/>
      <InfoBar />
    </div>
  );
}
