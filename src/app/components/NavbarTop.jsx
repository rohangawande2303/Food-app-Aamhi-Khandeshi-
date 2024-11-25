"use client";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "../context/cartContext";
import Cart from "./Cart";
import { Search, ShoppingCart, User } from "lucide-react";
import SearchModal from "./SearchModal";

const NavbarTop = () => {
  const { cartItems } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleCart = () => setCartOpen(!cartOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  const navLinks = [
    { name: "Pickles", href: "/products/pickles" },
    { name: "Powders", href: "/products/powders" },
    { name: "Papads", href: "/products/papads" },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="flex md:hidden justify-center items-center bg-white fixed top-0 left-0 right-0 h-12 z-50">
        <div className="text-center">
          <Link href="/">
            <span className="text-xl font-bold" style={{ color: "#d18334" }}>
              Aamhi Khandeshi
            </span>
          </Link>
        </div>
      </nav>
      <nav className="hidden md:flex justify-around items-center px-10 py-3 bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="logo">
          <Link href="/">
            <span className="text-2xl font-bold" style={{ color: "#d18334" }}>
              Aamhi Khandeshi
            </span>
          </Link>
        </div>

        <div className="nav-links flex space-x-12">
          {navLinks.map((link) => (
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
                {cartItems.reduce((acc, item) => acc + item.count, 0)}
              </span>
            )}
          </button>
          <Link href="/login" className="flex flex-col items-center">
            <User size={23} />
            <p className="text-xs mt-1 text-center">Join</p>
          </Link>
        </div>
      </nav>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={toggleSearch} />

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
