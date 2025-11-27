"use client";

import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/favoritesContext";
import dynamic from "next/dynamic";

// Dynamically load CartProvider to avoid SSR issues
const CartProvider = dynamic(
    () => import("./context/cartContext").then((mod) => mod.CartProvider),
    { ssr: false }
);

export function Providers({ children }) {
    return (
        <AuthProvider>
            <FavoritesProvider>
                <CartProvider>{children}</CartProvider>
            </FavoritesProvider>
        </AuthProvider>
    );
}
