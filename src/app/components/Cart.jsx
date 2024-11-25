"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useCart } from "../context/cartContext";
import Image from "next/image";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

const Cart = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity } = useCart();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div
      className={`fixed right-0 bg-[#FBF3E4] border border-gray-300 transition-transform duration-700 ease-in-out transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      style={{
        width: "100%",
        maxWidth: "28rem",
        zIndex: 60,
        top: isMobile ? "49px" : "4rem",
        bottom: isMobile ? "56px" : "auto",
        height: isMobile ? "calc(100vh - 56px - 50px)" : "75vh",
        overflowY: "auto",
      }}
      aria-labelledby="cart-heading"
      aria-hidden={!isOpen}
    >
      {/* Header */}
      <div
        className="text-white p-4 flex justify-between items-center"
        style={{ background: "#723C1B" }}
      >
        <h2 id="cart-heading" className="text-lg">
          Your Cart
        </h2>
        <button
          onClick={onClose}
          className="text-white text-3xl"
          aria-label="Close cart"
        >
          &times;
        </button>
      </div>

      {/* Cart Items */}
      <div className="p-4">
        {cartItems.length === 0 ? (
          <div className="text-center">
            <p>Your cart is currently empty!</p>
          </div>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-start mb-6 p-4 rounded-md bg-[#FDF6E3]"
              >
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title || item.name} // Fallback to item.name if title doesn't exist
                    width={80}
                    height={80}
                    className="rounded-md"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 ml-4">
                  {/* Product Name */}
                  <h2 className="text-lg font-semibold text-black">
                    {item.title || item.name} {/* Fallback to item.name if title doesn't exist */}
                  </h2>
                </div>

                {/* Pricing & Quantity Controls */}
                <div className="text-right">
                  {/* Unit Price */}
                  <p className="text-sm text-gray-600">Unit Price</p>
                  <p className="font-semibold text-lg">₹{item.price}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.count - 1)}
                      className="px-2 py-1 border border-green-500 text-green-500 rounded-md"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.count}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.count + 1)}
                      className="px-2 py-1 border border-green-500 text-green-500 rounded-md"
                    >
                      +
                    </button>
                  </div>

                  {/* Item Total */}
                  <p className="font-semibold text-lg text-green-600 mt-2">
                    ₹{item.price * item.count}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Total Price & Checkout */}
      <div className="p-4 flex justify-between items-center">
        <span className="font-semibold text-orange-600">
          Total: ₹
          {cartItems.reduce((acc, item) => acc + item.price * item.count, 0)}
        </span>
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded-full"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;