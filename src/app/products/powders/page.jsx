"use client";

import React, { useState } from "react";
import { productData } from "../data"; // Ensure correct import path
import ItemCard from "../../components/ItemCard"; // Import ItemCard component

const PowdersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    Sweet: false,
    Sour: false,
    Tangy: false,
    Spice: false,
  });

  // Filter the product data by category 'Powders' and apply the search and taste filters
  const filteredProducts = productData
    .filter((product) => product.category === "Powders") // Filter by category
    .filter((product) => {
      // Check for search term
      const matchesSearch = product.title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Check for taste filters
      const matchesFilters = Object.keys(filters).every(
        (filterKey) =>
          !filters[filterKey] ||
          product.taste.some((taste) =>
            taste.toLowerCase().includes(filterKey.toLowerCase())
          )
      );

      return matchesSearch && matchesFilters;
    });

  return (
    <div className="bg-[#faf3ed] min-h-screen">
      {/* Header Section */}
      <header className="relative mt-0 md:mt-4">
        <div
          className="absolute inset-0 bg-cover bg-center h-16 md:h-36"
          style={{
            backgroundImage: "url('/images/powders_header.jpg')", // Path to the image in the public folder
          }}
        ></div>
        <h1 className="relative text-3xl font-bold text-left sm:text-3xl md:text-6xl py-4 md:py-12 text-white pl-2 md:pl-12">
          Powders
        </h1>
      </header>

      {/* Main Content */}
      <div className="bg-cream py-8">
        <div className="max-w-8xl mx-auto flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-8 px-4">
          {/* Sidebar for search and filters - reduced width */}
          <div className="w-full sm:w-1/4 lg:w-1/5 p-4 bg-white rounded-lg shadow-lg">
            <h3 className="text-lg font-medium mb-4">Search within Powders</h3>
            <input
              type="text"
              placeholder="Search by name"
              className="border rounded px-3 py-2 w-full mb-4 focus:outline-blue-500"
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
          <div className="w-full sm:w-3/4 lg:w-4/5">
            <h3 className="text-lg font-medium mb-4">
              Showing {filteredProducts.length} products
            </h3>
            <div className="space-y-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div key={product.id}>
                    <ItemCard productId={product.id} />
                  </div>
                ))
              ) : (
                <p>No products found for the selected criteria.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowdersPage;
