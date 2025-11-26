"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../context/cartContext";

export default function TopPick() {
  const [selectedSize, setSelectedSize] = useState({});
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const { addToCart } = useCart();
  const { products, loading } = useProducts();

  // Filter products marked as top picks
  const topPickProducts = products.filter((product) => product.isTopPick);

  if (loading) return (
    <div className="flex justify-center items-center py-20 bg-[#fdf6ed]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7a5c43]"></div>
    </div>
  );

  const handleAddToCart = (product, size) => {
    if (!size) {
      alert("Please select a size before adding to the cart!");
      return;
    }
    const productToAdd = {
      id: product.id,
      title: product.title,
      size: size,
      price: product.sizeOptions.find((option) => option.size === size)?.price,
      quantity: 1,
    };

    addToCart(productToAdd);
  };

  const handleSizeChange = (productId, event) => {
    setSelectedSize((prevSelected) => ({
      ...prevSelected,
      [productId]: event.target.value,
    }));
  };

  const handleScroll = () => {
    if (showSwipeHint) setShowSwipeHint(false);
  };

  return (
    <section className="w-full bg-[#fdf6ed] px-4 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#7a5c43] mb-4">
            Top Picks
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our most loved products, handpicked just for you
          </p>
        </motion.div>

        {showSwipeHint && (
          <div className="text-center text-sm text-[#7a5c43] mb-6 animate-bounce md:hidden font-medium">
            Swipe to explore →
          </div>
        )}

        <div
          className="relative overflow-x-auto scrollbar-hide pb-8 -mx-4 px-4 md:mx-0 md:px-0"
          onScroll={handleScroll}
        >
          <div className="flex gap-6 md:grid md:grid-cols-3">
            {topPickProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-[280px] md:w-auto"
              >
                <Link href={`/products/${product.id}`} className="block h-full">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-[#e0d5c1]/30 group">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#7a5c43] shadow-sm">
                        Top Pick
                      </div>
                    </div>

                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="text-xl font-bold text-[#7a5c43] mb-2 line-clamp-1">
                        {product.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                        {product.description}
                      </p>

                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {product.sizeOptions.map((option, idx) => (
                            <label
                              key={idx}
                              className={`cursor-pointer text-xs px-3 py-1.5 rounded-lg border transition-all ${selectedSize[product.id] === option.size
                                ? "bg-[#7a5c43] text-white border-[#7a5c43]"
                                : "border-gray-200 text-gray-600 hover:border-[#7a5c43]"
                                }`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <input
                                type="radio"
                                name={`size-${product.id}`}
                                value={option.size}
                                checked={selectedSize[product.id] === option.size}
                                onChange={(e) => handleSizeChange(product.id, e)}
                                className="hidden"
                              />
                              {option.size} - ₹{option.price}
                            </label>
                          ))}
                        </div>

                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAddToCart(product, selectedSize[product.id]);
                          }}
                          className="w-full bg-[#7a5c43] hover:bg-[#6a4e3b] text-white font-medium py-3 rounded-xl transition-colors shadow-md hover:shadow-lg active:scale-95 transform duration-200"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
