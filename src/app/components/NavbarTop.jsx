"use client";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "../context/cartContext"; // Import the useCart hook
import Cart from "./Cart";
import { Search, ShoppingCart, User, X } from "lucide-react";

const NavbarTop = () => {
  const { cartItems } = useCart(); // Get cart items from the context
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleCart = () => setCartOpen(!cartOpen);
  const toggleSearch = () => {
    if (!cartOpen) setSearchOpen(!searchOpen);
  };
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const navLinks = [
    { name: "Pickles", href: "/products/pickles" },
    { name: "Powders", href: "/products/powders" },
    { name: "Papads", href: "/products/papads" },
  ];

  const filteredLinks = navLinks.filter((link) =>
    link.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Navbar */}
      <nav className="flex md:hidden justify-center items-center bg-white fixed top-0 left-0 right-0 h-12 z-50">
        <div className="text-center">
          <Link href="/">
            <span className="text-xl font-bold" style={{ color: "#d18334" }}>
              Jandhyala Foods
            </span>
          </Link>
        </div>
      </nav>

      <nav className="hidden md:flex justify-around items-center px-10 py-3 bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="logo">
          <Link href="/">
            <span className="text-2xl font-bold" style={{ color: "#d18334" }}>
              Jandhyala Foods
            </span>
          </Link>
        </div>

        <div className="nav-links flex space-x-12">
          {filteredLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-lg font-medium text-gray-800 hover:text-orange-600"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-10">
          <button onClick={toggleSearch} className="flex flex-col items-center">
            <Search size={23} />
            <p className="text-xs mt-1 text-center">Search</p>
          </button>
          <button
            onClick={toggleCart}
            className="relative flex flex-col items-center"
          >
            <ShoppingCart size={23} />
            <p className="text-xs mt-1 text-center">Cart</p>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1">
                {cartItems.reduce((acc, item) => acc + item.count, 0)}{" "}
                {/* Display the total count of items */}
              </span>
            )}
          </button>
          <Link href="/login" className="flex flex-col items-center">
            <User size={23} />
            <p className="text-xs mt-1 text-center">Join</p>
          </Link>
        </div>
      </nav>

      {/* Search Slide-In Modal */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out ${
          searchOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSearch}
      >
        <div
          className={`fixed top-[100px] left-1/2 transform -translate-x-1/2 bg-white z-50 w-[90%] max-w-4xl h-[80vh] rounded-lg shadow-2xl p-8 transition-all duration-500 ease-in-out ${
            searchOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={toggleSearch}
            className="absolute top-5 right-5 text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">
            Search Jandhyala Foods
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left side - Search by Words */}
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                Search by Words
              </h3>
              <p className="text-sm mb-6 text-gray-600">
                Begin typing the name of the product, or any word that you think
                is relevant to the product in the search field below.
              </p>
              <input
                type="text"
                placeholder="Type here..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
              />
              <button
                onClick={() => {
                  /* Handle search */
                }}
                className="mt-6 px-8 py-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition-colors duration-300"
              >
                Search
              </button>
            </div>

            {/* Right side - Search by Taste */}
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                Search by Taste
              </h3>
              <p className="text-sm mb-6 text-gray-600">
                Slide the circular notch against each taste-indicator as per
                your choice.
              </p>
              <div className="flex flex-col items-center space-y-6">
                {["Sweet", "Sour", "Tangy", "Spicy"].map((taste) => (
                  <div key={taste} className="w-full flex items-center">
                    <span className="w-20 text-right mr-4 text-gray-700">
                      {taste}
                    </span>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  /* Handle taste search */
                }}
                className="mt-6 px-8 py-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition-colors duration-300"
              >
                Search by Taste
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Modal */}
      <Cart
        cartItems={cartItems}
        onClose={() => setCartOpen(false)}
        isOpen={cartOpen}
      />
    </>
  );
};

export default NavbarTop;
