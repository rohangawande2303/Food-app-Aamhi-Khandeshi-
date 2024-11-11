"use client";
import Link from "next/link";
import { useState } from "react";
import Cart from "./Cart";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { BsHandbag } from "react-icons/bs";
import { CiUser } from "react-icons/ci";

const NavbarTop = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems] = useState([
    { id: 1, name: "Pickles", image: "/images/pickles.svg", count: 2 },
    { id: 2, name: "Powders", image: "/images/powders.svg", count: 1 },
    { id: 3, name: "Papads", image: "/images/papads.svg", count: 3 },
  ]);

  const toggleCart = () => setCartOpen(!cartOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const navLinks = [
    { name: "Pickles", href: "/pickles" },
    { name: "Powders", href: "/powders" },
    { name: "Papads", href: "/papads" },
  ];

  const filteredLinks = navLinks.filter((link) =>
    link.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
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
            <AiOutlineSearch size={30} />
            <p className="text-xs mt-1 text-center">Search</p>
          </button>
          <button
            onClick={toggleCart}
            className="relative flex flex-col items-center"
          >
            <BsHandbag size={30} />
            <p className="text-xs mt-1 text-center">Cart</p>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1">
                {cartItems.length}
              </span>
            )}
          </button>
          <Link href="/login" className="flex flex-col items-center">
            <CiUser size={23} />
            <p className="text-xs mt-1 text-center">Join</p>
          </Link>
        </div>
      </nav>

      <div
        className={`fixed top-16 w-[50%] left-1/2 transform -translate-x-1/2 bg-white z-40 px-4 py-2 shadow-md transition-transform duration-500 ease-in-out ${
          searchOpen ? "translate-y-0" : "-translate-y-full"
        } hidden md:block`}
        style={{ display: searchOpen ? "block" : "none" }}
      >
        <div className="relative w-3/4 md:w-[100%]">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            onClick={toggleSearch}
            className="absolute right-3 top-3 text-xl text-gray-600"
          >
            <AiOutlineClose />
          </button>
        </div>
      </div>

      <Cart
        cartItems={cartItems}
        onClose={() => setCartOpen(false)}
        isOpen={cartOpen}
      />
    </>
  );
};

export default NavbarTop;
