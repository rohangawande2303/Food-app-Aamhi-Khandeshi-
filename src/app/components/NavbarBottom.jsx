"use client";

import { useState, useEffect } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineReceiptRefund } from "react-icons/hi2";
import { PiCookieThin, PiUsersThreeLight } from "react-icons/pi";
import { MdOutlinePrivacyTip } from "react-icons/md";
import {
  SquareChevronUp,
  Search,
  ShoppingCart,
  User,
  CircleEllipsis,
  X,
} from "lucide-react";
import Cart from "./Cart";
import Link from "next/link";
import Image from "next/image";
import papads from "../../images/papads.svg";
import pickles from "../../images/pickles.svg";
import powders from "../../images/powders.svg";
import { useCart } from "../context/cartContext"; // Import useCart hook

const NavbarBottom = () => {
  const [showExplore, setShowExplore] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  // Use cart context to manage cart items dynamically
  const { cartItems } = useCart();

  const toggleState = (setter) => setter((prev) => !prev);

  useEffect(() => {
    const isPopupOpen = showExplore || showShop || showSearch;
    document.body.style.overflow = isPopupOpen ? "hidden" : "visible";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [showExplore, showShop, showSearch]);

  // Handle opening and closing the cart
  const toggleCart = () => {
    setCartOpen((prev) => !prev);
  };

  return (
    <>
      {/* Bottom Navbar */}
      <div className="fixed bottom-0 w-full bg-[#F7EDE4] h-16 rounded-tl-[10px] rounded-tr-[10px] shadow-md md:hidden z-50">
        <div className="flex justify-around py-2">
          <button
            onClick={() => toggleState(setShowExplore)}
            className="text-center"
          >
            <CircleEllipsis size={23} />
            <p className="text-xs mt-1">Explore</p>
          </button>
          <button
            onClick={() => toggleState(setShowSearch)}
            className="text-center"
          >
            <Search size={23} />
            <p className="text-xs mt-1">Search</p>
          </button>
          <button
            onClick={() => toggleState(setShowShop)}
            className="text-center"
          >
            <SquareChevronUp size={23} />
            <p className="text-xs mt-1">Shop</p>
          </button>
          <button
            onClick={toggleCart} // Trigger toggleCart on click
            className="relative text-center"
          >
            <ShoppingCart size={23} />
            <p className="text-xs mt-1">Cart</p>
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
                {cartItems.length}
              </span>
            )}
          </button>
          <Link href="/login" className="text-center">
            <User size={23} />
            <p className="text-xs mt-1">Profile</p>
          </Link>
        </div>
      </div>

      {/* Search Popup */}
      <div
        className={`fixed inset-x-0 bottom-14 bg-white shadow-lg z-40 transition-all duration-700 ease-in-out ${
          showSearch ? "h-[calc(100vh-112px)]" : "h-0"
        } md:hidden`} // Only visible on mobile
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={() => toggleState(setShowSearch)}
              className="ml-2 p-2"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="text-lg font-semibold mb-4">Search by</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center">
                <Search size={32} className="mb-2" />
                <p className="text-sm font-medium">Words</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  alt="Taste icon"
                  width={32}
                  height={32}
                  className="mb-2"
                />
                <p className="text-sm font-medium">Taste</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Explore Popup */}
      <div
        className={`fixed inset-x-0 bottom-14 bg-white shadow-lg z-40 transition-all duration-700 ease-in-out ${
          showExplore ? "h-64" : "h-0"
        }`}
      >
        <div className="h-full overflow-y-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Explore</h3>
            <button onClick={() => toggleState(setShowExplore)} className="p-2">
              <X size={24} />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { href: "/", icon: <AiOutlineHome size={24} />, label: "Home" },
              {
                href: "/about",
                icon: <PiUsersThreeLight size={24} />,
                label: "About Us",
              },
              {
                href: "/return-policy",
                icon: <HiOutlineReceiptRefund size={24} />,
                label: "Return Policy",
              },
              {
                href: "/cookies",
                icon: <PiCookieThin size={24} />,
                label: "Cookies",
              },
              {
                href: "/privacy-policy",
                icon: <MdOutlinePrivacyTip size={24} />,
                label: "Privacy Policy",
              },
            ].map(({ href, icon, label }) => (
              <Link key={href} href={href}>
                <div className="flex flex-col items-center">
                  <div className="bg-gray-100 p-3 rounded-full mb-2">
                    {icon}
                  </div>
                  <p className="text-xs text-center">{label}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Shop Popup */}
      <div
        className={`fixed inset-x-0 bottom-14 bg-white shadow-lg z-40 transition-all duration-700 ease-in-out ${
          showShop ? "h-64" : "h-0"
        }`}
      >
        <div className="h-full overflow-y-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Shop</h3>
            <button onClick={() => toggleState(setShowShop)} className="p-2">
              <X size={24} />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { href: "/products/papads", image: papads, label: "Papads" },
              { href: "/products/pickles", image: pickles, label: "Pickles" },
              { href: "/products/powders", image: powders, label: "Powders" },
            ].map(({ href, image, label }) => (
              <Link key={href} href={href}>
                <div className="flex flex-col items-center">
                  <div className="bg-gray-100 p-3 rounded-full mb-2">
                    <Image src={image} alt={label} width={24} height={24} />
                  </div>
                  <p className="text-xs text-center">{label}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Cart */}
      <Cart
        cartItems={cartItems}
        isOpen={cartOpen}
        onClose={toggleCart} // Use toggleCart for closing the cart
      />
    </>
  );
};

export default NavbarBottom;
