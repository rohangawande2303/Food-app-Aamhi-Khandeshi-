"use client";
import { useState } from "react";
import { BsHandbag } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { PiCirclesFourThin } from "react-icons/pi";
import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineReceiptRefund } from "react-icons/hi2";
import { PiCookieThin } from "react-icons/pi";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { PiScrollThin } from "react-icons/pi";
import { PiUsersThreeLight } from "react-icons/pi";
import { CiUser } from "react-icons/ci";

import Cart from "./Cart"; // Assuming Cart component is imported
import Link from "next/link";

const NavbarBottom = () => {
  const [showExplore, setShowExplore] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const toggleExplore = () => setShowExplore(!showExplore);
  const toggleSearch = () => setShowSearch(!showSearch);
  const toggleCart = () => setCartOpen(!cartOpen);

  return (
    <div className="fixed bottom-0 w-full bg-[#F7EDE4] shadow-md md:hidden z-40">
      <div className="flex justify-around pt-2 pb-2">
        <button className="text-xl" onClick={toggleExplore}>
          <PiCirclesFourThin size={27} />
          <p className="text-xs mt-1">Explore</p>
        </button>

        <button className="text-xl" onClick={toggleSearch}>
          <IoSearchOutline size={22} />
          <p className="text-xs mt-1">Search</p>
        </button>

        <button className="text-xl" onClick={toggleCart}>
          <BsHandbag size={22} />
          <p className="text-xs mt-1">Cart</p>
        </button>

        <button className="text-xl">
          <Link href="/login">
            <CiUser size={23} />
            <p className="text-xs mt-1">Account</p>
          </Link>
        </button>
      </div>

      {/* Explore Popup */}
      {showExplore && (
        <div className="absolute bottom-14 left-0 right-0 bg-white py-4 shadow-lg">
          <div className="grid grid-cols-3 gap-4 px-6">
            <button className="flex flex-col items-center">
              <AiOutlineHome size={30} />
              <p className="text-xs mt-1 text-center">Home</p>
            </button>
            <button className="flex flex-col items-center">
              <PiUsersThreeLight size={30} />
              <p className="text-xs mt-1 text-center">About Us</p>
            </button>
            {/* <button className="flex flex-col items-center">
              <PiScrollThin size={30} />
              <p className="text-xs mt-1 text-center">Stories</p> 
            </button> */}
            <button className="flex flex-col items-center">
              <HiOutlineReceiptRefund size={30} />
              <p className="text-xs mt-1 text-center">Return Policy</p>
            </button>
            <button className="flex flex-col items-center">
              <MdOutlinePrivacyTip size={30} />
              <p className="text-xs mt-1 text-center">Privacy Policy</p>
            </button>
            <button className="flex flex-col items-center">
              <PiCookieThin size={30} />
              <p className="text-xs mt-1 text-center">Cookie Policy</p>
            </button>
          </div>
        </div>
      )}

      {/* Search Bar Popup */}
      {showSearch && (
        <div className="absolute bottom-14 left-0 right-0 bg-white py-4 shadow-lg px-6">
          <div className="relative">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md py-2 px-4"
              placeholder="Search..."
            />
            <button
              onClick={toggleSearch}
              className="absolute right-2 top-2 text-xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Cart Slide (Mobile Version) */}
      <Cart
        cartItems={[]} // Pass your cart items here
        onClose={() => setCartOpen(false)}
        isOpen={cartOpen}
      />
    </div>
  );
};

export default NavbarBottom;
