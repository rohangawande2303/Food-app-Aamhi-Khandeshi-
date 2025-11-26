"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";
import {
    collection,
    addDoc,
    deleteDoc,
    query,
    where,
    getDocs,
    doc
} from "firebase/firestore";
import { db } from "../firebase/config";

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    // Fetch user's favorites from Firestore
    useEffect(() => {
        if (user) {
            fetchFavorites();
        } else {
            setFavorites([]);
            setLoading(false);
        }
    }, [user, fetchFavorites]);

    const fetchFavorites = useCallback(async () => {
        if (!user) return;

        try {
            setLoading(true);
            const favoritesRef = collection(db, "favorites");
            const q = query(favoritesRef, where("userId", "==", user.uid));
            const querySnapshot = await getDocs(q);

            const favoritesData = [];
            querySnapshot.forEach((doc) => {
                favoritesData.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            setFavorites(favoritesData);
        } catch (error) {
            console.error("Error fetching favorites:", error);
        } finally {
            setLoading(false);
        }
    }, [user]);

    // Check if a product is in favorites
    const isFavorite = (productId) => {
        return favorites.some(fav => fav.productId === productId);
    };

    // Add product to favorites
    const addToFavorites = async (product) => {
        if (!user) {
            alert("Please sign in to add favorites");
            return;
        }

        // Check if already in favorites
        if (isFavorite(product.id)) {
            return;
        }

        try {
            const favoriteData = {
                userId: user.uid,
                productId: product.id,
                productTitle: product.title || product.name,
                productImage: product.image,
                productPrice: product.price || product.sizeOptions?.[0]?.price,
                addedAt: new Date().toISOString()
            };

            const docRef = await addDoc(collection(db, "favorites"), favoriteData);

            setFavorites(prev => [...prev, { id: docRef.id, ...favoriteData }]);
            return true;
        } catch (error) {
            console.error("Error adding to favorites:", error);
            return false;
        }
    };

    // Remove product from favorites
    const removeFromFavorites = async (productId) => {
        if (!user) return;

        try {
            const favorite = favorites.find(fav => fav.productId === productId);
            if (!favorite) return;

            await deleteDoc(doc(db, "favorites", favorite.id));
            setFavorites(prev => prev.filter(fav => fav.productId !== productId));
            return true;
        } catch (error) {
            console.error("Error removing from favorites:", error);
            return false;
        }
    };

    // Toggle favorite status
    const toggleFavorite = async (product) => {
        if (isFavorite(product.id)) {
            return await removeFromFavorites(product.id);
        } else {
            return await addToFavorites(product);
        }
    };

    const value = {
        favorites,
        loading,
        isFavorite,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
        fetchFavorites
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
};
