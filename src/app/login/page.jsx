import React from "react";
import Image from "next/image";
import loginImage from "../../images/myaccount-cover.png"; // Adjust the path to your actual image
import Link from "next/link";

const LoginPageContent = () => {
  return (
    <div className="flex min-h-screen bg-[#fcf9e9]">
      {/* Left side - Image */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <Image
          src={loginImage}
          alt="Assorted Indian dishes and spices"
          layout="fill"
          objectFit="cover"
          className="s-curve-image" // Custom class for the S-shaped curve is been added here
        />
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">
            Welcome Back
          </h2>
          <p className="mb-6 text-sm text-gray-600">
            Did you not join the family yet?{" "}
            <Link href="/register" className="text-green-600 hover:underline">
              Register here!
            </Link>
          </p>
          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full bg-transparent border-b-2 border-gray-300 focus:border-green-500 focus:outline-none py-2 text-lg transition duration-300" // Custom underline input styling
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full bg-transparent border-b-2 border-gray-300 focus:border-green-500 focus:outline-none py-2 text-lg transition duration-300" // Custom underline input styling added it before the same
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 rounded text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link href="#" className="text-sm text-green-600 hover:underline">
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPageContent;
