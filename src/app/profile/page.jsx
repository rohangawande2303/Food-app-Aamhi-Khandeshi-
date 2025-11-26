"use client";

import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/favoritesContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  ShoppingBag,
  Heart,
  Mail,
  Calendar,
  Package,
  LogOut,
  ChevronRight,
  Award,
} from "lucide-react";
import ProtectedRoute from "../components/ProtectedRoute";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";

export default function ProfilePage() {
  const { user, userProfile, logout, loading } = useAuth();
  const { favorites, loading: favoritesLoading } = useFavorites();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  // Get display name from user or userProfile
  const displayName = user?.displayName || userProfile?.displayName || user?.email?.split('@')[0] || "User";
  const photoURL = user?.photoURL || userProfile?.photoURL;

  // Fetch real orders from Firestore
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setOrdersLoading(false);
        return;
      }

      try {
        setOrdersLoading(true);
        const ordersRef = collection(db, "orders");
        const q = query(
          ordersRef,
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);

        const ordersData = [];
        querySnapshot.forEach((doc) => {
          ordersData.push({
            id: doc.id,
            ...doc.data()
          });
        });

        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      } finally {
        setOrdersLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const tabVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: { duration: 0.3 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <motion.div
            key="profile"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-4"
          >
            <motion.div
              className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-[#e0d5c1] hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-[#7a5c43] to-[#6a4e3b] rounded-lg">
                  <User className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-[#7a5c43]">Display Name</span>
              </div>
              <p className="text-lg text-[#5b4e3b] ml-14">{displayName}</p>
            </motion.div>

            <motion.div
              className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-[#e0d5c1] hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-[#7a5c43] to-[#6a4e3b] rounded-lg">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-[#7a5c43]">Email Address</span>
              </div>
              <p className="text-base sm:text-lg text-[#5b4e3b] ml-14 break-all overflow-wrap-anywhere">{user?.email}</p>
            </motion.div>

            <motion.div
              className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-[#e0d5c1] hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-[#7a5c43] to-[#6a4e3b] rounded-lg">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-[#7a5c43]">Member Since</span>
              </div>
              <p className="text-lg text-[#5b4e3b] ml-14">
                {new Date(user?.metadata?.creationTime).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-[#7a5c43]/10 to-[#6a4e3b]/5 p-6 rounded-xl border border-[#e0d5c1]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#7a5c43] font-medium mb-1">Account Status</p>
                  <p className="text-2xl font-bold text-[#5b4e3b]">Active Member</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-[#7a5c43] to-[#6a4e3b] rounded-full overflow-hidden">
                  {photoURL ? (
                    <Image src={photoURL} alt={displayName} width={32} height={32} className="w-8 h-8 rounded-full" />
                  ) : (
                    <User className="w-8 h-8 text-white" />
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        );

      case "orders":
        return (
          <motion.div
            key="orders"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order, i) => (
                  <motion.div
                    key={order.id}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-[#e0d5c1] hover:shadow-xl transition-all duration-300 group cursor-pointer"
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <div className="p-3 bg-gradient-to-br from-[#7a5c43] to-[#6a4e3b] rounded-xl group-hover:scale-110 transition-transform duration-300">
                          <Package className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-[#5b4e3b]">Order #{order.id}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                              }`}>
                              {order.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-[#7a5c43]">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{order.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <ShoppingBag className="w-4 h-4" />
                              <span>{order.items} items</span>
                            </div>
                          </div>
                          <p className="text-xl font-bold text-[#7a5c43] mt-2">
                            ₹{order.total.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-[#7a5c43] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="p-6 bg-gradient-to-br from-[#7a5c43]/10 to-[#6a4e3b]/5 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <ShoppingBag className="w-12 h-12 text-[#7a5c43]" />
                </div>
                <p className="text-lg text-[#5b4e3b] font-medium">No orders found</p>
                <p className="text-sm text-[#7a5c43] mt-2">Start shopping to see your orders here</p>
              </motion.div>
            )}
          </motion.div>
        );

      case "favorites":
        return (
          <motion.div
            key="favorites"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {favoritesLoading ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 border-4 border-[#7a5c43]/30 border-t-[#7a5c43] rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-[#7a5c43]">Loading favorites...</p>
              </div>
            ) : favorites.length > 0 ? (
              <div className="space-y-4">
                {favorites.map((item, i) => (
                  <motion.div
                    key={item.id}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-[#e0d5c1] hover:shadow-xl transition-all duration-300 group cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => router.push(`/products/${item.productId}`)}
                  >
                    <div className="flex items-center gap-4">
                      {/* Product Image */}
                      {item.productImage && (
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.productImage}
                            alt={item.productTitle}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}

                      {/* Product Details */}
                      <div className="flex-1">
                        <p className="text-lg font-semibold text-[#5b4e3b]">{item.productTitle}</p>
                        {item.productPrice && (
                          <p className="text-[#7a5c43] font-medium mt-1">₹{item.productPrice}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          Added {new Date(item.addedAt).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Heart Icon */}
                      <motion.div
                        className="p-3 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Heart className="w-6 h-6 text-white fill-white" />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="p-6 bg-gradient-to-br from-red-100 to-pink-100 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <Heart className="w-12 h-12 text-red-500" />
                </div>
                <p className="text-lg text-[#5b4e3b] font-medium">No favorites yet</p>
                <p className="text-sm text-[#7a5c43] mt-2">Add items to your favorites to see them here</p>
              </motion.div>
            )}
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-[#f7f0dd] via-[#faf5eb] to-[#f7f0dd] py-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          {/* Profile Header Card */}
          <motion.div
            className="bg-gradient-to-br from-[#7a5c43] to-[#6a4e3b] p-4 sm:p-6 lg:p-8 rounded-2xl shadow-2xl mb-6 lg:mb-8 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-32 h-32 lg:w-40 lg:h-40 bg-white/10 rounded-full -mr-16 lg:-mr-20 -mt-16 lg:-mt-20"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 lg:w-32 lg:h-32 bg-white/10 rounded-full -ml-12 lg:-ml-16 -mb-12 lg:-mb-16"></div>

            <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
              <motion.div
                className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/30 overflow-hidden flex-shrink-0"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {photoURL ? (
                  <Image src={photoURL} alt={displayName} fill className="object-cover" />
                ) : (
                  <User className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                )}
              </motion.div>
              <div className="flex-1 text-center sm:text-left">
                <motion.h1
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Welcome back, {displayName}!
                </motion.h1>
                <motion.p
                  className="text-white/80 text-sm sm:text-base lg:text-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Manage your profile and view your activity
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Main Content Card */}
          <motion.div
            className="bg-white/80 backdrop-blur-lg p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl border border-[#e0d5c1]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* Tabs */}
            <div className="flex gap-2 mb-6 lg:mb-8 bg-[#f7f0dd]/50 p-2 rounded-xl overflow-x-auto scrollbar-hide">
              {[
                { id: "profile", icon: User, label: "Profile" },
                { id: "orders", icon: ShoppingBag, label: "Orders" },
                { id: "favorites", icon: Heart, label: "Favorites" }
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  className={`flex-1 min-w-[100px] flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${activeTab === tab.id
                    ? "bg-gradient-to-br from-[#7a5c43] to-[#6a4e3b] text-white shadow-lg"
                    : "text-[#7a5c43] hover:bg-white/50"
                    }`}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <tab.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">{tab.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {renderTabContent()}
            </AnimatePresence>
          </motion.div>

          {/* Logout Button */}
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              className="bg-gradient-to-br from-[#7a5c43] to-[#6a4e3b] text-white py-3 px-8 rounded-xl hover:shadow-xl flex items-center gap-3 font-medium"
              onClick={handleLogout}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </ProtectedRoute>
  );
}
