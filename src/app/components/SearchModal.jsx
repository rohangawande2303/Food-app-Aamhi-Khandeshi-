"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { productData as data } from "../products/data"; // Adjust the path if needed
import { useCart } from "../context/cartContext"; // Adjust the path if needed

const SearchModal = ({ isOpen, onClose }) => {
  const { addToCart } = useCart(); // Use the Cart context
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState({});

  useEffect(() => {
    const newSelectedSizes = {};
    filteredProducts.forEach((product) => {
      newSelectedSizes[product.id] = product.sizeOptions[0]?.size || "N/A";
    });
    setSelectedSizes(newSelectedSizes);
  }, [filteredProducts]);

  const handleSearchChange = (e) => {
    const term = e.target.value.trim().toLowerCase();
    setSearchTerm(term);

    if (!term) {
      setFilteredProducts([]);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const matchedProducts = data.filter(
        (product) =>
          product.title?.toLowerCase().includes(term) ||
          product.category?.toLowerCase().includes(term) ||
          product.description?.toLowerCase().includes(term)
      );
      setFilteredProducts(matchedProducts);
      setLoading(false);
    }, 500);
  };

  const handleSizeChange = (productId, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }));
  };

  const handleAddToCart = (product) => {
    const selectedSize = selectedSizes[product.id];
    const sizeDetails = product.sizeOptions.find(
      (option) => option.size === selectedSize
    );

    addToCart({
      id: product.id,
      title: product.title,
      size: selectedSize,
      price: sizeDetails?.price || 0,
      image: product.image,
    });
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`fixed top-[100px] left-1/2 transform -translate-x-1/2 bg-white z-50 w-[90%] max-w-4xl h-[80vh] rounded-lg shadow-2xl p-8 overflow-y-auto transition-all duration-700 ease-in-out ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">
          Search Aamhi Khandeshi Food
        </h2>

        <div className="max-w-xl mx-auto mb-8">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center my-8">
            <div className="w-8 h-8 border-4 border-orange-500 border-dotted rounded-full animate-spin"></div>
          </div>
        ) : (
          <ProductGrid
            filteredProducts={filteredProducts}
            searchTerm={searchTerm}
            selectedSizes={selectedSizes}
            handleSizeChange={handleSizeChange}
            handleAddToCart={handleAddToCart} // Pass the add to cart handler
          />
        )}
      </div>
    </div>
  );
};

const ProductGrid = ({
  filteredProducts,
  searchTerm,
  selectedSizes,
  handleSizeChange,
  handleAddToCart,
}) => (
  <div>
    {filteredProducts.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-y-auto max-h-[60vh] custom-scrollbar">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-300 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 max-w-[350px] mx-auto"
          >
            <div className="relative w-full h-40 mb-4">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              {product.title}
            </h3>
            <select
              value={selectedSizes[product.id]}
              onChange={(e) => handleSizeChange(product.id, e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4"
            >
              {product.sizeOptions.map((option) => (
                <option key={option.size} value={option.size}>
                  {option.size} - ₹{option.price}
                </option>
              ))}
            </select>
            <button
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-all duration-300"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-center text-gray-600 mt-8">
        No products found matching &quot;{searchTerm}&quot;
      </p>
    )}
  </div>
);

export default SearchModal;
