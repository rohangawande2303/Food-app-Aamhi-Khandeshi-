"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useCart } from "../context/cartContext";
import Cart from "./Cart";
import { Search, ShoppingCart, User, LogOut, UserCircle, ChevronDown, Shield } from "lucide-react";
import SearchModal from "./SearchModal";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { isAdmin } from "../lib/adminUtils";

const NavbarTop = () => {
  const { cartItems } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, userProfile, logout } = useAuth();
  const dropdownRef = useRef(null);

  const toggleCart = () => setCartOpen(!cartOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const displayName = user?.displayName || userProfile?.displayName || user?.email?.split('@')[0] || "User";
  const photoURL = user?.photoURL || userProfile?.photoURL;
  const userIsAdmin = user ? isAdmin(user.email) : false;

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

  const navLinks = [
    { name: "Pickles", href: "/products/pickles" },
    { name: "Powders", href: "/products/powders" },
    { name: "Papads", href: "/products/papads" },
  ];

  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
  };

  return (
    <>
      {/* Navbar for Mobile */}
      <nav className="flex md:hidden justify-center items-center bg-white fixed top-0 left-0 right-0 h-12 z-50">
        <div className="text-center">
          <Link href="/">
            <span className="text-xl font-bold" style={{ color: "#d18334" }}>
              Aamhi Khandeshi
            </span>
          </Link>
        </div>
      </nav>

      {/* Navbar for Desktop */}
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

          {/* User Profile with Dropdown */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 hover:bg-gray-50 rounded-lg p-2 transition-colors"
              >
                <div className="flex items-center gap-2">
                  {photoURL ? (
                    <img
                      src={photoURL}
                      alt={displayName}
                      className="w-8 h-8 rounded-full object-cover border-2 border-[#7a5c43]"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7a5c43] to-[#6a4e3b] flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-800">{displayName}</p>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-600 transition-transform ${dropdownOpen ? "rotate-180" : ""
                      }`}
                  />
                </div>
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50"
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
            <Link href="/login" className="flex flex-col items-center">
              <User size={23} />
              <p className="text-xs mt-1 text-center">Join</p>
            </Link>
          )}
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
