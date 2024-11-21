"use client";
import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { productData } from "../products/data";

export default function TopPick() {
  const [selectedSize, setSelectedSize] = useState({});
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  const getTopProducts = (category) => {
    return productData
      .filter((product) => product.category === category)
      .slice(0, 2);
  };

  const papads = getTopProducts("Papads");
  const pickles = getTopProducts("Pickles");
  const powders = getTopProducts("Powders");

  const allProducts = useMemo(
    () => [...papads, ...pickles, ...powders],
    [papads, pickles, powders]
  );

  const handleAddToCart = (productTitle, size) => {
    console.log(`${productTitle} with size ${size} added to cart`);
  };

  const handleSizeChange = (productId, event) => {
    setSelectedSize((prevSelected) => ({
      ...prevSelected,
      [productId]: event.target.value,
    }));
  };

  const handleScroll = () => {
    if (showSwipeHint) setShowSwipeHint(false); // Hide swipe hint after interaction
  };

  return (
    <section className="w-full bg-[#fdf6ed] px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
          Top Picks
        </h2>

        {/* Swipe hint */}
        {showSwipeHint && (
          <div className="text-center text-sm text-gray-600 mb-4 animate-bounce">
            Swipe to explore →
          </div>
        )}

        {/* Horizontal scroll container */}
        <div
          className="relative overflow-x-auto scrollbar-hide"
          onScroll={handleScroll}
        >
          {/* Fading edges */}
          <div className="absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-[#fdf6ed] to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-[#fdf6ed] to-transparent pointer-events-none"></div>

          <div className="flex gap-6">
            {allProducts.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-full sm:w-[calc(33.333%-1rem)]"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md h-full flex flex-col">
                  <div className="relative h-48 sm:h-64">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 sm:p-6 flex-grow flex flex-col">
                    <h3 className="text-lg sm:text-xl font-semibold text-center text-gray-900 mb-2">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 text-center text-xs sm:text-sm mb-4 flex-grow">
                      {product.description}
                    </p>

                    <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                      {product.sizeOptions.map((option, index) => (
                        <div
                          key={index}
                          className="border border-dashed border-gray-300 rounded px-2 py-1 text-xs sm:text-sm"
                        >
                          <label
                            htmlFor={`size-${product.id}-${index}`}
                            className="cursor-pointer"
                          >
                            <input
                              type="radio"
                              id={`size-${product.id}-${index}`}
                              name={`size-${product.id}`}
                              value={option.size}
                              checked={selectedSize[product.id] === option.size}
                              onChange={(e) => handleSizeChange(product.id, e)}
                              className="mr-1 sm:mr-2"
                            />
                            ₹{option.price}/{option.size}
                          </label>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() =>
                        handleAddToCart(product.title, selectedSize[product.id])
                      }
                      className="w-full bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base py-2 rounded"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}