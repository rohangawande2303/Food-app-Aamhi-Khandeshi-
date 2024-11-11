// src/app/page.js
import Hero from "./components/Hero";
import ProductsSection from "./components/ProductsSection"; // Import the new component

export default function HomePage() {
  return (
    <div>
      <Hero />
      <ProductsSection /> {/* Products section added here */}
    </div>
  );
}
