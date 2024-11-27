"use client";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import papadImage from "../../images/papads.svg";
import picklesImage from "../../images/pickles.svg";
import powdersImage from "../../images/powders.svg";

const ProductsSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if window.matchMedia is available
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(max-width: 768px)");

      const handleMediaQueryChange = (e) => {
        setIsMobile(e.matches);
      };

      // Initial check
      setIsMobile(mediaQuery.matches);

      // Add listener
      mediaQuery.addEventListener("change", handleMediaQueryChange);

      // Cleanup listener on unmount
      return () =>
        mediaQuery.removeEventListener("change", handleMediaQueryChange);
    }
  }, []);

  return (
    <section className="py-12 bg-[#f7f0dd]">
      <h2 className="text-5xl font-bold text-center mb-20 mt-4 max-md:hidden">
        Explore Aamhi Khandeshi Food
      </h2>
      <div
        className={`${
          isMobile
            ? "flex justify-around items-center bg-white px-4 py-6 shadow-md rounded-lg"
            : "grid grid-cols-3 gap-x-8 px-4 max-w-[900px] mx-auto"
        }`}
      >
        <ProductCard
          id="1"
          name="Pickles"
          image={picklesImage}
          link="/products/pickles"
          isMobile={isMobile}
        />
        <ProductCard
          id="2"
          name="Powders"
          image={powdersImage}
          link="/products/powders"
          isMobile={isMobile}
        />
        <ProductCard
          id="3"
          name="Papads"
          image={papadImage}
          link="/products/papads"
          isMobile={isMobile}
        />
      </div>
    </section>
  );
};

export default ProductsSection;
