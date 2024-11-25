import React from "react";
import Image from "next/image";
import Link from "next/link"; // Import the Link component
import registerImage from "../../images/myaccount-cover.png"; // Adjust the path to your actual image

const RegisterPageContent = () => {
  return (
    <div className="flex min-h-screen bg-[#fcf9e9]">
      {/* Left side - Image */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <Image
          src={registerImage}
          alt="Assorted Indian dishes and spices"
          layout="fill"
          objectFit="cover"
          className="s-curve-image" // Custom class for the S-shaped curve
        />
      </div>

      {/* Right side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">
            Join the Family
          </h2>
          <p className="mb-6 text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-green-600 hover:underline">
              Login here!
            </Link>
          </p>
          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                className="w-full bg-transparent border-b-2 border-gray-300 focus:border-green-500 focus:outline-none py-2 text-lg transition duration-300"
              />
            </div>
            <div>
              <label
                htmlFor="whatsapp"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                WhatsApp Number
              </label>
              <input
                type="text"
                id="whatsapp"
                placeholder="Enter your WhatsApp number"
                className="w-full bg-transparent border-b-2 border-gray-300 focus:border-green-500 focus:outline-none py-2 text-lg transition duration-300"
              />
            </div>
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
                className="w-full bg-transparent border-b-2 border-gray-300 focus:border-green-500 focus:outline-none py-2 text-lg transition duration-300"
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
                className="w-full bg-transparent border-b-2 border-gray-300 focus:border-green-500 focus:outline-none py-2 text-lg transition duration-300"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-300"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPageContent;
