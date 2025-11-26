"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, CreditCard, Package, IndianRupee } from "lucide-react";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import Script from "next/script";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const { user, userProfile } = useAuth();
  const [showShippingAddress, setShowShippingAddress] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setIsProcessing(true);

    try {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: Math.round((parseFloat(calculateSubtotal()) + shippingCost) * 100), // Amount in paise
        currency: "INR",
        name: "Aamhi Khandeshi",
        description: "Order Payment",
        image: "/logo.png", // Add your logo
        handler: async function (response) {
          // Payment successful
          try {
            // Create order in Firestore
            const orderData = {
              userId: user?.uid || "guest",
              customerName: `${data.firstName} ${data.lastName}`,
              customerEmail: data.email,
              customerPhone: data.phone,
              billingAddress: {
                address: data.address,
                city: data.city,
                state: data.state,
                zipCode: data.zipCode
              },
              shippingAddress: showShippingAddress ? {
                address: data.shippingAddress,
                city: data.shippingCity,
                state: data.shippingState,
                zipCode: data.shippingZipCode
              } : {
                address: data.address,
                city: data.city,
                state: data.state,
                zipCode: data.zipCode
              },
              items: cartItems.map(item => ({
                productId: item.id,
                title: item.title || item.name,
                quantity: item.count,
                price: item.price,
                size: item.size || "N/A"
              })),
              subtotal: parseFloat(calculateSubtotal()),
              shipping: shippingCost,
              total: parseFloat(calculateSubtotal()) + shippingCost,
              paymentId: response.razorpay_payment_id,
              paymentMethod: data.paymentMethod,
              status: "Pending",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            };

            await addDoc(collection(db, "orders"), orderData);

            // Clear cart
            clearCart();

            // Show success message
            alert("Payment successful! Your order has been placed.");

            // Redirect to home or orders page
            window.location.href = "/profile";
          } catch (error) {
            console.error("Error creating order:", error);
            alert("Payment successful but failed to create order. Please contact support.");
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          contact: data.phone
        },
        theme: {
          color: "#7a5c43"
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            alert("Payment cancelled");
          }
        }
      };

      if (window.Razorpay) {
        const razorpay = new window.Razorpay(options);
        razorpay.on('payment.failed', function (response) {
          setIsProcessing(false);
          alert("Payment failed: " + response.error.description);
        });
        razorpay.open();
      } else {
        setIsProcessing(false);
        alert("Razorpay SDK not loaded. Please refresh the page.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setIsProcessing(false);
      alert("Error initiating payment. Please try again.");
    }
  };

  const calculateSubtotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.count, 0)
      .toFixed(2);
  };

  const shippingCost = 50.0;

  return (
    <ProtectedRoute>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setRazorpayLoaded(true)}
      />
      <div className="min-h-screen bg-gradient-to-br from-[#f7f0dd] via-[#faf5eb] to-[#f7f0dd] py-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto max-w-7xl"
        >
          <h1 className="text-4xl font-bold text-[#7a5c43] mb-8 text-center">
            Checkout
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-[#e0d5c1] h-fit"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-[#7a5c43] to-[#6a4e3b] rounded-xl">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-[#7a5c43]">
                  Your Order
                </h2>
              </div>

              <div className="space-y-4">
                {cartItems.length > 0 ? (
                  <>
                    {cartItems.map((item) => (
                      <OrderItem
                        key={item.id}
                        name={item.title || item.name}
                        quantity={item.count}
                        price={item.price}
                      />
                    ))}

                    {/* Summary */}
                    <div className="border-t-2 border-[#e0d5c1] pt-4 mt-4 space-y-3">
                      <div className="flex justify-between text-lg">
                        <span className="font-semibold text-[#5b4e3b]">Subtotal:</span>
                        <span className="text-[#7a5c43] font-medium">₹{calculateSubtotal()}</span>
                      </div>
                      <div className="flex justify-between text-lg">
                        <span className="font-semibold text-[#5b4e3b]">Shipping:</span>
                        <span className="text-[#7a5c43] font-medium">₹{shippingCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xl font-bold pt-3 border-t border-[#e0d5c1]">
                        <span className="text-[#5b4e3b]">Total:</span>
                        <span className="text-[#7a5c43]">
                          ₹{(parseFloat(calculateSubtotal()) + shippingCost).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Your cart is empty.</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Billing Details Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-[#e0d5c1]"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-[#7a5c43] to-[#6a4e3b] rounded-xl">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-[#7a5c43]">
                  Billing Details
                </h2>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    name="firstName"
                    icon={<User className="w-5 h-5" />}
                    register={register}
                    required
                    error={errors.firstName}
                  />
                  <Input
                    label="Last Name"
                    name="lastName"
                    icon={<User className="w-5 h-5" />}
                    register={register}
                    required
                    error={errors.lastName}
                  />
                </div>

                <Input
                  label="Email"
                  name="email"
                  type="email"
                  icon={<Mail className="w-5 h-5" />}
                  register={register}
                  required
                  error={errors.email}
                />

                <Input
                  label="Phone"
                  name="phone"
                  type="tel"
                  icon={<Phone className="w-5 h-5" />}
                  register={register}
                  required
                  error={errors.phone}
                />

                <Input
                  label="Address"
                  name="address"
                  icon={<MapPin className="w-5 h-5" />}
                  register={register}
                  required
                  error={errors.address}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="City"
                    name="city"
                    icon={<MapPin className="w-5 h-5" />}
                    register={register}
                    required
                    error={errors.city}
                  />
                  <Input
                    label="State"
                    name="state"
                    icon={<MapPin className="w-5 h-5" />}
                    register={register}
                    required
                    error={errors.state}
                  />
                  <Input
                    label="PIN Code"
                    name="zipCode"
                    icon={<MapPin className="w-5 h-5" />}
                    register={register}
                    required
                    error={errors.zipCode}
                  />
                </div>

                {/* Ship to Different Address */}
                <div className="flex items-center space-x-2 p-4 bg-[#f7f0dd]/50 rounded-xl">
                  <input
                    type="checkbox"
                    id="shipToDifferentAddress"
                    className="rounded text-[#7a5c43] focus:ring-[#7a5c43] w-4 h-4"
                    onChange={(e) => setShowShippingAddress(e.target.checked)}
                  />
                  <label htmlFor="shipToDifferentAddress" className="text-sm font-medium text-[#5b4e3b]">
                    Ship to a different address?
                  </label>
                </div>

                {showShippingAddress && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 p-6 bg-gradient-to-br from-[#f7f0dd]/30 to-[#faf5eb]/30 rounded-xl border border-[#e0d5c1]"
                  >
                    <h3 className="text-lg font-semibold text-[#7a5c43] mb-4">
                      Shipping Address
                    </h3>
                    <Input
                      label="Address"
                      name="shippingAddress"
                      icon={<MapPin className="w-5 h-5" />}
                      register={register}
                      required={showShippingAddress}
                      error={errors.shippingAddress}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Input
                        label="City"
                        name="shippingCity"
                        icon={<MapPin className="w-5 h-5" />}
                        register={register}
                        required={showShippingAddress}
                        error={errors.shippingCity}
                      />
                      <Input
                        label="State"
                        name="shippingState"
                        icon={<MapPin className="w-5 h-5" />}
                        register={register}
                        required={showShippingAddress}
                        error={errors.shippingState}
                      />
                      <Input
                        label="PIN Code"
                        name="shippingZipCode"
                        icon={<MapPin className="w-5 h-5" />}
                        register={register}
                        required={showShippingAddress}
                        error={errors.shippingZipCode}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Payment Method */}
                <div className="p-6 bg-gradient-to-br from-[#f7f0dd]/30 to-[#faf5eb]/30 rounded-xl border border-[#e0d5c1]">
                  <div className="flex items-center gap-3 mb-4">
                    <CreditCard className="w-5 h-5 text-[#7a5c43]" />
                    <h3 className="text-lg font-semibold text-[#7a5c43]">
                      Payment Method
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 p-3 border-2 border-[#e0d5c1] rounded-lg hover:border-[#7a5c43] transition-colors cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="creditCard"
                        className="text-[#7a5c43] focus:ring-[#7a5c43] w-4 h-4"
                        {...register("paymentMethod", { required: true })}
                      />
                      <span className="font-medium text-[#5b4e3b]">Credit/Debit Card</span>
                    </label>
                    <label className="flex items-center space-x-3 p-3 border-2 border-[#e0d5c1] rounded-lg hover:border-[#7a5c43] transition-colors cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        className="text-[#7a5c43] focus:ring-[#7a5c43] w-4 h-4"
                        {...register("paymentMethod", { required: true })}
                      />
                      <span className="font-medium text-[#5b4e3b]">UPI</span>
                    </label>
                    <label className="flex items-center space-x-3 p-3 border-2 border-[#e0d5c1] rounded-lg hover:border-[#7a5c43] transition-colors cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        className="text-[#7a5c43] focus:ring-[#7a5c43] w-4 h-4"
                        {...register("paymentMethod", { required: true })}
                      />
                      <span className="font-medium text-[#5b4e3b]">Cash on Delivery</span>
                    </label>
                  </div>
                  {errors.paymentMethod && (
                    <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      Please select a payment method
                    </p>
                  )}
                </div>

                {/* Place Order Button */}
                <motion.button
                  type="submit"
                  disabled={isProcessing || cartItems.length === 0}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${isProcessing || cartItems.length === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-br from-[#7a5c43] to-[#6a4e3b] text-white hover:shadow-2xl"
                    }`}
                  whileHover={!isProcessing && cartItems.length > 0 ? { scale: 1.02, y: -2 } : {}}
                  whileTap={!isProcessing && cartItems.length > 0 ? { scale: 0.98 } : {}}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Processing Payment...</span>
                    </>
                  ) : (
                    <>
                      <IndianRupee className="w-5 h-5" />
                      <span>Proceed to Payment</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </ProtectedRoute>
  );
}

function Input({ label, name, register, required, error, type = "text", icon }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-semibold text-[#7a5c43] mb-2">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a5c43]">
            {icon}
          </div>
        )}
        <input
          type={type}
          id={name}
          {...register(name, { required })}
          className={`w-full ${icon ? 'pl-12' : 'pl-4'} pr-4 py-3 rounded-xl border-2 border-[#e0d5c1] bg-white/50 focus:border-[#7a5c43] focus:bg-white focus:outline-none transition-all duration-300 text-[#5b4e3b] ${error ? "border-red-500" : ""
            }`}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
          <span className="w-1 h-1 bg-red-500 rounded-full"></span>
          {label} is required
        </p>
      )}
    </div>
  );
}

function OrderItem({ name, quantity, price }) {
  return (
    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-[#f7f0dd]/30 to-transparent rounded-xl border border-[#e0d5c1]/50">
      <div>
        <span className="font-semibold text-[#5b4e3b]">{name}</span>
        <span className="text-[#7a5c43] ml-2">x{quantity}</span>
      </div>
      <span className="font-bold text-[#7a5c43]">₹{(price * quantity).toFixed(2)}</span>
    </div>
  );
}
