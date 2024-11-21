import { useState } from "react";
import Image from "next/image";
import { productData } from "../products/data"; // Adjust the path as needed

export default function ItemCard({ productId }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");

  // Find the product by its id
  const product = productData.find((product) => product.id === productId);

  // If product is not found, display an error message
  if (!product) return <div>Product not found!</div>;

  const { title, category, description, sizeOptions, taste, image } = product;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {" "}
      {/* Change max-width to md */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Product Image */}
          <div className="md:w-1/4 w-full h-72 overflow-hidden">
            <Image
              src={image}
              alt={title}
              width={400} // Specify width for proper image rendering
              height={400} // Specify height for proper image rendering
              className="w-full h-full object-cover" // Ensure the image covers the container while being cropped if necessary
            />
          </div>

          {/* Product Details */}
          <div className="md:w-2/4 p-6 flex flex-col justify-between h-full">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <p className="text-gray-600 mb-2">{category}</p>

            {/* Only show description and taste profile for desktop */}
            <div className="hidden md:block">
              <p className="text-gray-700 mb-6">{description}</p>
              <div className="mt-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Taste Profile
                </p>
                <p>{taste.join(", ")}</p>
              </div>
            </div>
          </div>

          {/* Size Options and Quantity */}
          <div className="md:w-1/4 p-6 bg-gray-50 flex flex-col justify-between h-full">
            <div className="space-y-6">
              <div>
                <p className="font-medium text-gray-900 mb-2">Size Options</p>
                <div className="flex gap-2">
                  {sizeOptions?.map(({ size, price }, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSize(size)}
                      className={`flex-1 px-3 py-2 text-sm border rounded-lg ${
                        selectedSize === size
                          ? "border-green-500 text-green-600"
                          : "border-gray-300"
                      }`}
                    >
                      ₹{price}/{size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Controls and Add to Cart Button */}
              <div className="flex flex-row md:flex-col gap-4">
                {/* Quantity section */}
                <div className="w-1/2 md:w-1/2">
                  <p className="font-medium text-gray-900 mb-2">Quantity</p>
                  <div className="flex border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <div className="px-4 py-2 border-x border-gray-300">
                      {quantity}
                    </div>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <div className="w-1/2 md:w-full mt-8 md:mt-0">
                  <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                    <span className="md:hidden">Add</span>
                    <span className="hidden md:inline">Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
