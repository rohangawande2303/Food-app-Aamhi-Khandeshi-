"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useCart } from "../context/cartContext";

export default function CheckoutPage() {
  const { cartItems } = useCart();
  const [showShippingAddress, setShowShippingAddress] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Order Data:", data);
    console.log("Cart Items:", cartItems);
  };

  const calculateSubtotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.count, 0)
      .toFixed(2);
  };

  const shippingCost = 50.0;

  return (
    <div className="bg-[#FDF6ED] min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#8B4513] mb-8">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order Summary Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-[#8B4513] mb-4">
              Your Order
            </h2>
            <div className="space-y-4">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <OrderItem
                    key={item.id}
                    name={item.title || item.name}
                    quantity={item.count}
                    price={item.price}
                  />
                ))
              ) : (
                <p className="text-gray-500">Your cart is empty.</p>
              )}

              {/* Summary */}
              {cartItems.length > 0 && (
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold">Subtotal:</span>
                    <span>${calculateSubtotal()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Shipping:</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold mt-2">
                    <span>Total:</span>
                    <span>
                      $
                      {(parseFloat(calculateSubtotal()) + shippingCost).toFixed(
                        2
                      )}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Billing Details Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-[#8B4513] mb-4">
              Billing Details
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  name="firstName"
                  register={register}
                  required
                  error={errors.firstName}
                />
                <Input
                  label="Last Name"
                  name="lastName"
                  register={register}
                  required
                  error={errors.lastName}
                />
              </div>
              <Input
                label="Email"
                name="email"
                type="email"
                register={register}
                required
                error={errors.email}
              />
              <Input
                label="Phone"
                name="phone"
                type="tel"
                register={register}
                required
                error={errors.phone}
              />
              <Input
                label="Address"
                name="address"
                register={register}
                required
                error={errors.address}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="City"
                  name="city"
                  register={register}
                  required
                  error={errors.city}
                />
                <Input
                  label="State"
                  name="state"
                  register={register}
                  required
                  error={errors.state}
                />
                <Input
                  label="ZIP Code"
                  name="zipCode"
                  register={register}
                  required
                  error={errors.zipCode}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="shipToDifferentAddress"
                  className="rounded text-[#8B4513] focus:ring-[#8B4513]"
                  onChange={(e) => setShowShippingAddress(e.target.checked)}
                />
                <label htmlFor="shipToDifferentAddress">
                  Ship to a different address?
                </label>
              </div>

              {showShippingAddress && (
                <div className="space-y-4 mt-4 p-4 bg-[#FDF6ED] rounded-lg">
                  <h3 className="text-lg font-semibold text-[#8B4513]">
                    Shipping Address
                  </h3>
                  <Input
                    label="Address"
                    name="shippingAddress"
                    register={register}
                    required={showShippingAddress}
                    error={errors.shippingAddress}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      label="City"
                      name="shippingCity"
                      register={register}
                      required={showShippingAddress}
                      error={errors.shippingCity}
                    />
                    <Input
                      label="State"
                      name="shippingState"
                      register={register}
                      required={showShippingAddress}
                      error={errors.shippingState}
                    />
                    <Input
                      label="ZIP Code"
                      name="shippingZipCode"
                      register={register}
                      required={showShippingAddress}
                      error={errors.shippingZipCode}
                    />
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold text-[#8B4513] mb-2">
                  Payment Method
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="creditCard"
                      className="text-[#8B4513] focus:ring-[#8B4513]"
                      {...register("paymentMethod", { required: true })}
                    />
                    <span>Credit Card</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      className="text-[#8B4513] focus:ring-[#8B4513]"
                      {...register("paymentMethod", { required: true })}
                    />
                    <span>PayPal</span>
                  </label>
                </div>
                {errors.paymentMethod && (
                  <p className="mt-1 text-sm text-red-500">
                    Please select a payment method
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#8B4513] text-white py-2 px-4 rounded-lg hover:bg-[#A0522D] transition duration-300"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

function Input({ label, name, register, required, error, type = "text" }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={name}
        {...register(name, { required })}
        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8B4513] focus:ring focus:ring-[#8B4513] focus:ring-opacity-50 ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{label} is required</p>
      )}
    </div>
  );
}

function OrderItem({ name, quantity, price }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b pb-2">
      <div className="flex justify-between items-center">
        <div>
          <span className="font-semibold">{name}</span>
          <span className="text-gray-600 ml-2">x{quantity}</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2">${(price * quantity).toFixed(2)}</span>
          <button onClick={() => setIsOpen(!isOpen)} className="text-[#8B4513]">
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="mt-2 text-sm text-gray-600">
          <p>Price: ${price.toFixed(2)}</p>
          <p>Total: ${(price * quantity).toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}
