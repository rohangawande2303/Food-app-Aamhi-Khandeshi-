"use client";

import React, { useState } from "react";
import { productDetails } from "./productData"; // Assuming this is where the data for powders will be fetched from
import Image from "next/image";

const PowdersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    Sweet: false,
    Sour: false,
    Tangy: false,
    Spice: false,
  });
  const [cart, setCart] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});

  const filteredProducts = productDetails.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesFilters =
      (!filters.Sweet || product.taste.includes("Sweet")) &&
      (!filters.Sour || product.taste.includes("Sour")) &&
      (!filters.Tangy || product.taste.includes("Tangy")) &&
      (!filters.Spice || product.taste.includes("Spice"));

    return matchesSearch && matchesFilters;
  });

  const handleAddToCart = (product, selectedSize, quantity) => {
    const newCart = [...cart];
    const existingProduct = newCart.find(
      (item) => item.title === product.title && item.size === selectedSize
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      newCart.push({ ...product, quantity, size: selectedSize });
    }
    setCart(newCart);
  };

  const handleSizeChange = (productTitle, size) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [productTitle]: { ...prevOptions[productTitle], size },
    }));
  };

  const handleQuantityChange = (productTitle, change) => {
    setSelectedOptions((prevOptions) => {
      const currentQuantity = prevOptions[productTitle]?.quantity || 1;
      const newQuantity = Math.max(1, currentQuantity + change);
      return {
        ...prevOptions,
        [productTitle]: { ...prevOptions[productTitle], quantity: newQuantity },
      };
    });
  };

  return (
    <div>
      <header className="bg-brown text-white py-4">
        <h1 className="text-3xl font-bold text-center sm:text-4xl md:text-5xl">
          Powders
        </h1>
      </header>
      <div className="bg-cream py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-8">
          {/* Sidebar for search and filters */}
          <div className="w-full sm:w-1/4 p-4 bg-white rounded-lg shadow-lg sm:mr-4">
            <h3 className="text-lg font-medium mb-4">Search within Powders</h3>
            <input
              type="text"
              placeholder="Search by name"
              className="border rounded px-3 py-2 w-full mb-4"
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <h3 className="text-lg font-medium mb-2">Filter by Taste</h3>
            <div className="space-y-2">
              {["Sweet", "Sour", "Tangy", "Spice"].map((taste) => (
                <div key={taste} className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={filters[taste]}
                    onChange={() =>
                      setFilters((prevFilters) => ({
                        ...prevFilters,
                        [taste]: !prevFilters[taste],
                      }))
                    }
                  />
                  <label>{taste}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Products Display Section */}
          <div className="w-full sm:w-3/4 px-4 sm:px-0">
            <h3 className="text-lg font-medium mb-4">
              Showing {filteredProducts.length} products
            </h3>

            <div className="space-y-6">
              {filteredProducts.map((product, index) => {
                const currentSize =
                  selectedOptions[product.title]?.size ||
                  product.sizeOptions[0].size;
                const currentQuantity =
                  selectedOptions[product.title]?.quantity || 1;

                return (
                  <div
                    key={index}
                    className="bg-white border rounded-lg shadow-lg flex flex-col sm:flex-row p-4 items-center sm:items-start hover:shadow-xl transition-all duration-300"
                    style={{ height: "auto" }}
                  >
                    {/* Product Image */}
                    <div className="w-full sm:w-1/3 mb-4 sm:mb-0 overflow-hidden h-48 sm:h-72">
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={400}
                        height={320}
                        className="object-cover rounded-lg h-full w-full"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="w-full sm:w-1/2 pl-0 sm:pl-4">
                      <h3 className="text-lg font-bold mb-2 text-center sm:text-left">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-600 text-center sm:text-left">
                        {product.description}
                      </p>
                    </div>

                    {/* Vertical Divider */}
                    <div className="h-full border-l-2 mx-4 sm:mx-0 sm:border-none"></div>

                    {/* Size, Quantity, and Add to Cart */}
                    <div className="w-full sm:w-[30%] m-4 md:m-0 flex flex-col space-y-4">
                      {/* Size Options */}
                      <div>
                        <div className="hidden sm:block">
                          <label className="text-md text-gray-600">
                            Options
                          </label>
                        </div>
                        <div className="flex justify-center space-x-2 sm:space-x-4 mt-1">
                          {product.sizeOptions.map((option) => (
                            <button
                              key={option.size}
                              className={`px-3 py-1 border rounded mb-2 sm:mb-0 flex items-center space-x-1 ${
                                currentSize === option.size
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                              onClick={() =>
                                handleSizeChange(product.title, option.size)
                              }
                            >
                              <span>{`₹${option.price}`}</span>
                              <span>{`/${option.size}`}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2 justify-center sm:justify-start">
                        <label className="text-sm text-gray-600">
                          Quantity
                        </label>
                        <div className="flex items-center border rounded">
                          <button
                            onClick={() =>
                              handleQuantityChange(product.title, -1)
                            }
                            className="px-2 py-1 bg-gray-200 hover:bg-gray-300"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={currentQuantity}
                            min="1"
                            className="w-10 text-center border-none focus:outline-none"
                            readOnly
                          />
                          <button
                            onClick={() =>
                              handleQuantityChange(product.title, 1)
                            }
                            className="px-2 py-1 bg-gray-200 hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-all duration-300"
                        onClick={() =>
                          handleAddToCart(product, currentSize, currentQuantity)
                        }
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowdersPage;
