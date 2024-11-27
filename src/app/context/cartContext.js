"use client"; // Make sure the code is only run on the client-side

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Client-side code: Initialize cart from localStorage
      const storedCart = localStorage.getItem("cartItems");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Client-side code: Sync cart with localStorage whenever cartItems change
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const toggleCart = () => setIsCartOpen((prev) => !prev);

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

  const updateQuantity = (productId, newCount) => {
    setCartItems(
      (prevItems) =>
        prevItems
          .map((item) =>
            item.id === productId
              ? { ...item, count: Math.max(newCount, 0) }
              : item
          )
          .filter((item) => item.count > 0) // Filter out items with zero count
    );
  };

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
        isCartOpen,
        toggleCart,
        isLoaded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
