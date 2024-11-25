"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  // Initialize with empty array and update after mount
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart items from localStorage after component mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
    setIsLoaded(true);
  }, []);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  const toggleCart = () => {
    setIsCartOpen((prevState) => !prevState);
  };

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
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === productId
            ? { ...item, count: Math.max(newCount, 0) }
            : item
        )
        .filter((item) => item.count > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  // Always render the Provider, even during loading
  return (
    <CartContext.Provider
      value={{
        cartItems: isLoaded ? cartItems : [],
        addToCart: isLoaded ? addToCart : () => {},
        updateQuantity: isLoaded ? updateQuantity : () => {},
        removeFromCart: isLoaded ? removeFromCart : () => {},
        isCartOpen,
        toggleCart: isLoaded ? toggleCart : () => {},
        isLoaded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
