"use client";

import { useRouter } from "next/navigation";
import { useCart } from "../context/cartContext";
import Image from "next/image";
import { Trash2, X, ShoppingBag, Plus, Minus, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Cart = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity, removeItem } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    onClose(); // Close the cart first
    router.push("/checkout");
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
          />

          {/* Cart Slide-out */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white/95 backdrop-blur-xl shadow-2xl z-[70] border-l border-white/20 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white/50">
              <div className="flex items-center gap-3">
                <div className="bg-[#7a5c43]/10 p-2 rounded-full">
                  <ShoppingBag className="w-5 h-5 text-[#7a5c43]" />
                </div>
                <h2 className="text-xl font-bold text-[#7a5c43]">Your Cart</h2>
                <span className="bg-[#7a5c43] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartItems.length} items
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
              >
                <X className="w-6 h-6 text-gray-500 group-hover:text-red-500 transition-colors" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-60">
                  <ShoppingBag className="w-16 h-16 text-gray-300" />
                  <p className="text-lg font-medium text-gray-500">Your cart is empty</p>
                  <button
                    onClick={onClose}
                    className="text-[#7a5c43] font-semibold hover:underline"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      key={item.id}
                      className="flex gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      {/* Product Image */}
                      <div className="relative w-20 h-20 flex-shrink-0 bg-[#f7f0dd]/30 rounded-xl overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title || item.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-gray-800 line-clamp-1">
                            {item.title || item.name}
                          </h3>
                          <p className="text-sm text-gray-500 font-medium">
                            ₹{item.price}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(1, item.count - 1))}
                              className="p-1 hover:bg-white rounded-md shadow-sm transition-all disabled:opacity-50"
                              disabled={item.count <= 1}
                            >
                              <Minus className="w-3 h-3 text-gray-600" />
                            </button>
                            <span className="text-sm font-bold text-gray-700 w-4 text-center">
                              {item.count}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.count + 1)}
                              className="p-1 hover:bg-white rounded-md shadow-sm transition-all"
                            >
                              <Plus className="w-3 h-3 text-gray-600" />
                            </button>
                          </div>

                          {/* Item Total & Delete */}
                          <div className="flex items-center gap-4">
                            <span className="font-bold text-[#7a5c43]">
                              ₹{item.price * item.count}
                            </span>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600 font-medium">Subtotal</span>
                  <span className="text-2xl font-bold text-[#7a5c43]">
                    ₹{totalAmount}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#7a5c43] hover:bg-[#6a4e3b] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  Checkout
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
