"use client";

import { useState, useEffect, useRef } from "react";
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
  LogOut,
  UserCircle,
  Shield,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Cart from "./Cart";
import Link from "next/link";
import Image from "next/image";
import papads from "../../images/papads.svg";
import pickles from "../../images/pickles.svg";
import powders from "../../images/powders.svg";
import { useCart } from "../context/cartContext";
import SearchModal from "./SearchModal";
import { useAuth } from "../context/AuthContext";
import { isAdmin } from "../lib/adminUtils";

const NavbarBottom = () => {
  const [showExplore, setShowExplore] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { cartItems } = useCart();
  const { user, userProfile, logout } = useAuth();
  const dropdownRef = useRef(null);

  const displayName = user?.displayName || userProfile?.displayName || user?.email?.split('@')[0] || "User";
  const firstName = displayName.split(' ')[0];
  const photoURL = user?.photoURL || userProfile?.photoURL;
  const userIsAdmin = user ? isAdmin(user.email) : false;

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

  const toggleCart = () => {
    setCartOpen((prev) => !prev);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const isPopupOpen = showExplore || showShop || showSearch;
    document.body.style.overflow = isPopupOpen ? "hidden" : "visible";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [showExplore, showShop, showSearch]);

  return (
    <>
      {/* Bottom Navbar */}
      <div className="fixed bottom-0 w-full bg-white/80 backdrop-blur-md h-16 rounded-tl-[20px] rounded-tr-[20px] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] md:hidden z-50 border-t border-white/20">
        <div className="flex justify-around items-center pb-1 pt-3 h-full">
          <motion.button
            onClick={toggleExplore}
            whileTap={{ scale: 0.9 }}
            className={`text-center justify-items-center transition-all duration-300 ${showExplore ? "text-[#7a5c43]" : "text-gray-600"
              }`}
          >
            <motion.div
              animate={{ rotate: showExplore ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <CircleEllipsis size={22} strokeWidth={2.5} />
            </motion.div>
            <p className="text-xs mt-1 font-medium">Explore</p>
          </motion.button>

          <motion.button
            onClick={toggleSearch}
            whileTap={{ scale: 0.9 }}
            className="text-center relative justify-items-center text-gray-600 hover:text-[#7a5c43] transition-colors duration-300"
          >
            <Search size={22} strokeWidth={2.5} />
            <p className="text-xs mt-1 font-medium">Search</p>
          </motion.button>

          <motion.button
            onClick={toggleShop}
            whileTap={{ scale: 0.9 }}
            className={`text-center justify-items-center transition-all duration-300 ${showShop ? "text-[#7a5c43]" : "text-gray-600"
              }`}
          >
            <motion.div
              animate={{ rotate: showShop ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <SquareChevronUp size={22} strokeWidth={2.5} />
            </motion.div>
            <p className="text-xs mt-1 font-medium">Shop</p>
          </motion.button>

          <motion.button
            onClick={toggleCart}
            whileTap={{ scale: 0.9 }}
            className="relative text-center justify-items-center text-gray-600 hover:text-[#7a5c43] transition-colors duration-300"
          >
            <ShoppingCart size={22} strokeWidth={2.5} />
            <p className="text-xs mt-1 font-medium">Cart</p>
            {totalCartQuantity > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full text-xs px-1.5 py-0.5 font-bold shadow-lg"
              >
                {totalCartQuantity}
              </motion.span>
            )}
          </motion.button>

          {/* Profile or Sign-In Button */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <motion.button
                onClick={toggleDropdown}
                whileTap={{ scale: 0.9 }}
                className="text-center justify-items-center cursor-pointer text-gray-600 hover:text-[#7a5c43] transition-colors duration-300"
              >
                {photoURL ? (
                  <img
                    src={photoURL}
                    alt={displayName}
                    className="w-6 h-6 rounded-full object-cover border-2 border-[#7a5c43] mx-auto"
                  />
                ) : (
                  <User size={22} strokeWidth={2.5} />
                )}
                <p className="text-xs mt-1 font-medium">{firstName}</p>
              </motion.button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-full right-0 mb-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                  >
                    {/* User Info Header */}
                    <div className="bg-gradient-to-br from-[#7a5c43] to-[#6a4e3b] p-4">
                      <div className="flex items-center gap-3">
                        {photoURL ? (
                          <img
                            src={photoURL}
                            alt={displayName}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center border-2 border-white">
                            <User className="w-6 h-6 text-white" />
                          </div>
                        )}
                        <div>
                          <p className="text-white font-semibold text-sm">{displayName}</p>
                          <p className="text-white/80 text-xs truncate max-w-[120px]">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        href="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <UserCircle className="w-5 h-5 text-[#7a5c43]" />
                        <span className="text-sm font-medium text-gray-700">My Profile</span>
                      </Link>

                      {userIsAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-[#7a5c43]/10 hover:to-[#6a4e3b]/10 transition-colors border-t border-gray-100"
                        >
                          <Shield className="w-5 h-5 text-[#7a5c43]" />
                          <span className="text-sm font-semibold text-[#7a5c43]">Admin Dashboard</span>
                        </Link>
                      )}

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-left"
                      >
                        <LogOut className="w-5 h-5 text-red-600" />
                        <span className="text-sm font-medium text-red-600">Logout</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link href="/login" className="text-center justify-items-center text-gray-600 hover:text-[#7a5c43] transition-colors duration-300">
              <User size={22} strokeWidth={2.5} />
              <p className="text-xs mt-1 font-medium">Profile</p>
            </Link>
          )}
        </div>
      </div>

      {/* Explore Popup */}
      <AnimatePresence>
        {showExplore && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleExplore}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Slide-out Menu */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-x-0 bottom-16 bg-gradient-to-b from-white to-[#faf5eb] rounded-t-3xl shadow-2xl z-50 md:hidden max-h-[70vh] overflow-hidden"
            >
              {/* Handle Bar */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
              </div>

              <div className="px-6 pb-6 overflow-y-auto max-h-[calc(70vh-60px)]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-[#7a5c43]">Explore</h3>
                  <motion.button
                    onClick={toggleExplore}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={24} className="text-gray-600" />
                  </motion.button>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { href: "/", icon: <AiOutlineHome size={28} />, label: "Home" },
                    { href: "/about", icon: <PiUsersThreeLight size={28} />, label: "About Us" },
                    { href: "/policies/return-policy", icon: <HiOutlineReceiptRefund size={28} />, label: "Returns" },
                    { href: "/policies/cookies", icon: <PiCookieThin size={28} />, label: "Cookies" },
                    { href: "/policies/privacy", icon: <MdOutlinePrivacyTip size={28} />, label: "Privacy" },
                  ].map((item, index) => (
                    <Link key={index} href={item.href} onClick={toggleExplore}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-[#e0d5c1] flex flex-col items-center gap-2 cursor-pointer group"
                      >
                        <div className="text-[#7a5c43] group-hover:text-[#6a4e3b] transition-colors">
                          {item.icon}
                        </div>
                        <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                          {item.label}
                        </span>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Shop Popup */}
      <AnimatePresence>
        {showShop && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleShop}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Slide-out Menu */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-x-0 bottom-16 bg-gradient-to-b from-white to-[#faf5eb] rounded-t-3xl shadow-2xl z-50 md:hidden max-h-[70vh] overflow-hidden"
            >
              {/* Handle Bar */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
              </div>

              <div className="px-6 pb-6 overflow-y-auto max-h-[calc(70vh-60px)]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-[#7a5c43]">Shop</h3>
                  <motion.button
                    onClick={toggleShop}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={24} className="text-gray-600" />
                  </motion.button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { href: "/products/papads", image: papads, label: "Papads", desc: "Authentic & Crispy" },
                    { href: "/products/pickles", image: pickles, label: "Pickles", desc: "Spicy & Tangy" },
                    { href: "/products/powders", image: powders, label: "Powders", desc: "Flavorful Spices" },
                  ].map((item, index) => (
                    <Link key={index} href={item.href} onClick={toggleShop}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-[#e0d5c1] flex flex-col items-center gap-3 cursor-pointer group h-full"
                      >
                        <div className="bg-[#f7f0dd] p-4 rounded-full group-hover:bg-[#ede5d0] transition-colors">
                          <Image src={item.image} alt={item.label} width={40} height={40} className="w-10 h-10" />
                        </div>
                        <div className="text-center">
                          <h4 className="font-bold text-[#7a5c43] text-lg">{item.label}</h4>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart */}
      <Cart cartItems={cartItems} isOpen={cartOpen} onClose={toggleCart} />

      {/* Search Modal */}
      {showSearch && <SearchModal isOpen={showSearch} onClose={toggleSearch} />}
    </>
  );
};

export default NavbarBottom;
