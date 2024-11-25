"use client";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import papadImage from "../../images/papads.svg";
import picklesImage from "../../images/pickles.svg";
import powdersImage from "../../images/powders.svg";

const ProductsSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="py-12 bg-[#f7f0dd]">
      {!isMobile && (
        <h2 className="text-5xl font-bold text-center mb-20 mt-4">
          Explore Aamhi Khandeshi Food
        </h2>
      )}
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
          link="/products/pickles" // Link to Pickles page
          isMobile={isMobile}
        />
        <ProductCard
          id="2"
          name="Powders"
          image={powdersImage}
          link="/products/powders" // Link to Powders page
          isMobile={isMobile}
        />
        <ProductCard
          id="3"
          name="Papads"
          image={papadImage}
          link="/products/papads" // Link to Papads page
          isMobile={isMobile}
        />
      </div>
    </section>
  );
};

export default ProductsSection;
