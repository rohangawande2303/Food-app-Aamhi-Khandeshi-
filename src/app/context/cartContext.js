"use client"; // Ensure this runs only on the client-side

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

// Custom hook for accessing the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedCart = localStorage.getItem("cartItems");
        if (storedCart) {
          setCartItems(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error("Failed to parse cart items from localStorage", error);
      }
      setIsLoaded(true);
    }
  }, []);

  // Sync cart with localStorage whenever cartItems change
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
      } catch (error) {
        console.error("Failed to save cart items to localStorage", error);
      }
    }
  }, [cartItems]);

  // Function to toggle cart visibility
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  // Function to add an item to the cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, count: item.count + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, count: 1 }];
      }
    });
  };

  // Function to update the quantity of a product
  const updateQuantity = (productId, newCount) => {
    setCartItems(
      (prevItems) =>
        prevItems
          .map((item) =>
            item.id === productId
              ? { ...item, count: Math.max(newCount, 0) } // Prevent negative counts
              : item
          )
          .filter((item) => item.count > 0) // Remove items with zero count
    );
  };

  // Function to remove an item from the cart
  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Function to remove all items of a specific product from the cart
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        removeItem, // Include the removeItem function in the context value
        isCartOpen,
        toggleCart,
        isLoaded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
