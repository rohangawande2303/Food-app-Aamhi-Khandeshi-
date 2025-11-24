"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Loader2,
  User,
  ShoppingBag,
  Heart,
  Settings,
  LogOut,
} from "lucide-react";

export default function ProfilePage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [orders, setOrders] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (isSignedIn) {
      // Simulating data fetch
      setTimeout(() => {
        setOrders([
          { id: 1, date: "2023-06-01", total: 25.99 },
          { id: 2, date: "2023-05-28", total: 34.5 },
        ]);
        setFavorites([
          { id: 1, name: "Organic Salad" },
          { id: 2, name: "Vegan Burger" },
        ]);
      }, 1000);
    }
  }, [isSignedIn]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#f7f0dd]">
        <Loader2 className="w-8 h-8 text-[#7a5c43] animate-spin" />
      </div>
    );
  }

  if (!isSignedIn) {
    router.push("/sign-in");
    return null;
  }

  const handleLogout = () => {
    signOut();
    router.push("/sign-in");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <p className="text-lg text-[#5b4e3b]">
              <span className="font-semibold">Name:</span> {user.firstName}{" "}
              {user.lastName}
            </p>
            <p className="text-lg text-[#5b4e3b]">
              <span className="font-semibold">Email:</span>{" "}
              {user.emailAddresses[0]?.emailAddress}
            </p>
            <p className="text-lg text-[#5b4e3b]">
              <span className="font-semibold">Phone:</span>{" "}
              {user.phoneNumbers[0]?.phoneNumber || "Not provided"}
            </p>
          </motion.div>
        );
      case "orders":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {orders.length > 0 ? (
              <ul className="space-y-4">
                {orders.map((order) => (
                  <li key={order.id} className="bg-white p-4 rounded-lg shadow">
                    <p className="text-[#5b4e3b]">Order #{order.id}</p>
                    <p className="text-[#5b4e3b]">Date: {order.date}</p>
                    <p className="text-[#5b4e3b] font-semibold">
                      Total: &#8377;{order.total.toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-lg text-[#5b4e3b]">No orders found.</p>
            )}
          </motion.div>
        );
      case "favorites":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {favorites.length > 0 ? (
              <ul className="space-y-4">
                {favorites.map((item) => (
                  <li
                    key={item.id}
                    className="bg-white p-4 rounded-lg shadow flex items-center justify-between"
                  >
                    <p className="text-[#5b4e3b]">{item.name}</p>
                    <Heart className="text-[#7a5c43]" />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-lg text-[#5b4e3b]">No favorites yet.</p>
            )}
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f0dd] py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl"
      >
        <h1 className="text-3xl font-semibold text-[#7a5c43] text-center mb-6">
          Welcome, {user.firstName}!
        </h1>

        <div className="flex mb-6 border-b border-[#e0d5c1]">
          <button
            className={`flex items-center px-4 py-2 ${
              activeTab === "profile"
                ? "text-[#7a5c43] border-b-2 border-[#7a5c43]"
                : "text-[#5b4e3b]"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <User className="mr-2" /> Profile
          </button>
          <button
            className={`flex items-center px-4 py-2 ${
              activeTab === "orders"
                ? "text-[#7a5c43] border-b-2 border-[#7a5c43]"
                : "text-[#5b4e3b]"
            }`}
            onClick={() => setActiveTab("orders")}
          >
            <ShoppingBag className="mr-2" /> Orders
          </button>
          {/* <button
            className={`flex items-center px-4 py-2 ${
              activeTab === "favorites"
                ? "text-[#7a5c43] border-b-2 border-[#7a5c43]"
                : "text-[#5b4e3b]"
            }`}
            onClick={() => setActiveTab("favorites")}
          >
            <Heart className="mr-2" /> Favorites
          </button> */}
        </div>

        <div className="bg-[#f7f0dd] rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-medium text-[#7a5c43] mb-4">
            {activeTab === "profile"
              ? "Profile Info"
              : activeTab === "orders"
              ? "Your Orders"
              : "Your Favorites"}
          </h2>
          {renderTabContent()}
        </div>

        <div className="mt-6 flex justify-between items-center">
          {/* <button
            className="bg-[#e0d5c1] text-[#5b4e3b] py-2 px-6 rounded-lg hover:bg-[#d5c7b0] flex items-center"
            onClick={() => router.push("/settings")}
          >
            <Settings className="mr-2" /> Settings
          </button> */}
          <button
            className="bg-[#7a5c43] text-white py-2 px-6 rounded-lg hover:bg-[#6a4e3b] flex items-center"
            onClick={handleLogout}
          >
            <LogOut className="mr-2" /> Logout
          </button>
        </div>
      </motion.div>
    </div>
  );
}
