import { useCart } from "../context/cartContext";
import Image from "next/image";
import { useState, useEffect } from "react";

// Custom hook for media query
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

const Cart = ({ cartItems, isOpen, onClose }) => {
  const { updateQuantity } = useCart();
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div
      className={`fixed right-0 bg-yellow-50 border border-gray-300 transition-transform duration-700 ease-in-out transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      style={{
        width: "100%",
        maxWidth: "28rem",
        zIndex: 60, // Increased z-index to ensure it displays above other elements
        top: isMobile ? "49px" : "4rem", // Top bar height for mobile (adjust as needed)
        bottom: isMobile ? "56px" : "auto", // Bottom navbar height for mobile (adjust as needed)
        height: isMobile ? "calc(100vh - 56px - 50px)" : "75vh", // Adjust height for mobile screens
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
                className="flex justify-between items-center mb-4"
              >
                <div className="flex items-center">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                  <span className="ml-4">{item.name}</span>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(item.id, item.count - 1)}
                    className="text-sm px-2 py-1 bg-orange-500 text-white rounded-full"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.count}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.count + 1)}
                    className="text-sm px-2 py-1 bg-orange-500 text-white rounded-full"
                  >
                    +
                  </button>
                  <span className="ml-4 font-semibold text-orange-600">
                    ₹{item.price * item.count}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Total and Checkout Button */}
      <div className="p-4 flex justify-between items-center">
        <span className="font-semibold text-orange-600">
          Total: ₹
          {cartItems.reduce((acc, item) => acc + item.price * item.count, 0)}
        </span>
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded-full"
          onClick={() => console.log("Checkout button clicked")}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
