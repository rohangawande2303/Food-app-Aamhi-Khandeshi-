import { useState } from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link component
import { productData } from "../products/data"; // Adjust the path if needed
import { useCart } from "../context/cartContext"; // Use the CartContext

export default function ItemCard({ productId }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" }); // Notification message with type
  const { addToCart } = useCart(); // Access the addToCart function from CartContext

  // Find the product based on the ID
  const product = productData.find((product) => product.id === productId);

  // Handle case where product doesn't exist
  if (!product) return <div>Product not found!</div>;

  const { title, category, description, sizeOptions, taste, image } = product;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setNotification({
        message: "Please select a size before adding to the cart!",
        type: "error",
      });
      return;
    }

    // Add product to the cart using CartContext
    const selectedPrice = sizeOptions.find(
      (sizeOption) => sizeOption.size === selectedSize
    )?.price;

    addToCart({
      id: product.id,
      title: product.title,
      size: selectedSize,
      price: selectedPrice, // Include the price in the cart
      quantity,
    });

    setNotification({
      message: "Product successfully added to the cart!",
      type: "success",
    });

    // Clear notification after 3 seconds
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  return (
    <div className="relative max-w-6xl mx-auto p-6">
      {/* Notification Bar */}
      {notification.message && (
        <div
          className={`fixed top-16 left-1/2 transform -translate-x-1/2 p-3 bg-white border rounded-lg shadow-lg z-50 w-[90%] md:w-auto ${
            notification.type === "success"
              ? "border-green-500 text-green-600"
              : "border-red-500 text-red-600"
          }`}
        >
          <p className="text-sm font-medium">{notification.message}</p>
        </div>
      )}

      {/* Product Card with Link for Redirection */}
      <Link href={`/products/${product.id}`} passHref>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer">
          <div className="flex flex-col md:flex-row">
            {/* Product Image */}
            <div className="md:w-1/4 w-full h-72 overflow-hidden">
              <Image
                src={image}
                alt={title}
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="md:w-2/4 p-6 flex flex-col justify-between h-full">
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              <p className="text-gray-600 mb-2">{category}</p>
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
                        className={`flex-1 px-3 py-2 text-sm rounded-lg border ${
                          selectedSize === size
                            ? "border-green-500 text-green-600" // Highlight selected size
                            : "border-gray-300 text-gray-700" // Default style for unselected sizes
                        }`}
                      >
                        ₹{price}/{size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Controls and Add to Cart Button */}
                <div className="flex flex-row md:flex-col gap-4">
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

                  <div className="w-1/2 md:w-full mt-8 md:mt-0">
                    <button
                      onClick={handleAddToCart}
                      className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                    >
                      <span className="md:hidden">Add</span>
                      <span className="hidden md:inline">Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
