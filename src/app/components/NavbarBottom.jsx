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
import { useCart } from "../context/cartContext";
import SearchModal from "./SearchModal";

const NavbarBottom = () => {
  const [showExplore, setShowExplore] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const { cartItems } = useCart();

  // Calculate total quantity of items in the cart
  const totalCartQuantity = cartItems.reduce(
    (total, item) => total + item.count,
    0
  );

  const toggleExplore = () => {
    setShowExplore((prev) => !prev);
    setShowShop(false);
    setShowSearch(false);
  };

  const toggleShop = () => {
    setShowShop((prev) => !prev);
    setShowExplore(false);
    setShowSearch(false);
  };

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
    setShowExplore(false);
    setShowShop(false);
  };

  useEffect(() => {
    const isPopupOpen = showExplore || showShop || showSearch;
    document.body.style.overflow = isPopupOpen ? "hidden" : "visible";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [showExplore, showShop, showSearch]);

  const toggleCart = () => {
    setCartOpen((prev) => !prev);
  };

  return (
    <>
      {/* Bottom Navbar */}
      <div className="fixed bottom-0 w-full bg-[#F7EDE4] h-16 rounded-tl-[10px] rounded-tr-[10px] shadow-md md:hidden z-50">
        <div className="flex justify-around py-2">
          <button onClick={toggleExplore} className="text-center">
            <CircleEllipsis size={23} />
            <p className="text-xs mt-1">Explore</p>
          </button>
          <button onClick={toggleSearch} className="text-center relative">
            <Search size={23} />
            <p className="text-xs mt-1">Search</p>
          </button>
          <button onClick={toggleShop} className="text-center">
            <SquareChevronUp size={23} />
            <p className="text-xs mt-1">Shop</p>
          </button>
          <button onClick={toggleCart} className="relative text-center">
            <ShoppingCart size={23} />
            <p className="text-xs mt-1">Cart</p>
            {totalCartQuantity > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
                {totalCartQuantity}
              </span>
            )}
          </button>
          <Link href="/login" className="text-center">
            <User size={23} />
            <p className="text-xs mt-1">My Profile</p>
          </Link>
        </div>
      </div>

      {/* Explore Popup */}
      <div
        className={`fixed inset-x-0 bottom-14 bg-white shadow-lg z-40 transition-all duration-700 ease-in-out ${
          showExplore ? "h-64" : "h-0"
        }`}
      >
        <div className="block md:hidden h-full overflow-y-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Explore</h3>
            <button onClick={toggleExplore} className="p-2">
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
                href: "/policies/return-policy",
                icon: <HiOutlineReceiptRefund size={24} />,
                label: "Return Policy",
              },
              {
                href: "/policies/cookies",
                icon: <PiCookieThin size={24} />,
                label: "Cookies",
              },
              {
                href: "/policies/privacy-policy",
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
        <div className="block md:hidden h-full overflow-y-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Shop</h3>
            <button onClick={toggleShop} className="p-2">
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
      <Cart cartItems={cartItems} isOpen={cartOpen} onClose={toggleCart} />

      {/* Search Modal */}
      {showSearch && <SearchModal isOpen={showSearch} onClose={toggleSearch} />}
    </>
  );
};

export default NavbarBottom;
