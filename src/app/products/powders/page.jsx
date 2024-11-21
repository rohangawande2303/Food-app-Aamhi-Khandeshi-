"use client";

import React, { useState } from "react";
import { productData } from "../data"; // Assuming this is where the data for powders will be fetched from
import ItemCard from "../../components/ItemCard"; // Import the ItemCard component

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

  // Filter the product data by category 'Powders' and apply the search and taste filters
  const filteredProducts = productData
    .filter((product) => product.category === "Powders") // Filter by category first
    .filter((product) => {
      // Check for search term
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Check for taste filters
      const matchesFilters =
        (!filters.Sweet || product.taste.includes("Sweet")) &&
        (!filters.Sour || product.taste.includes("Sour")) &&
        (!filters.Tangy || product.taste.includes("Tangy")) &&
        (!filters.Spice || product.taste.includes("Spice"));

      return matchesSearch && matchesFilters;
    });

  return (
    <div className="bg-[#faf3ed] min-h-screen">
      <header className="bg-brown-dark text-black py-4 mt-20">
        <h1 className="text-3xl font-bold text-center sm:text-4xl md:text-5xl bg-brown-400">
          Powders
        </h1>
      </header>
      <div className="bg-cream py-8">
        <div className="max-w-8xl mx-auto flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-8 px-4">
          {/* Sidebar for search and filters */}
          <div className="w-full sm:w-1/4 p-4 bg-white rounded-lg shadow-lg">
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
          <div className="w-full sm:w-3/4">
            <h3 className="text-lg font-medium mb-4">
              Showing {filteredProducts.length} products
            </h3>
            <div className="space-y-6">
              {filteredProducts.map((product) => {
                return (
                  <div key={product.id}>
                    {/* Pass product.id to ItemCard */}
                    <ItemCard productId={product.id} />
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
