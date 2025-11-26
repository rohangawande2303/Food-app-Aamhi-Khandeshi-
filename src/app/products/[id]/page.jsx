"use client";

import { useState, useEffect } from "react";
// import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Coffee,
  Utensils,
  Cookie,
} from "lucide-react";
import { useCart } from "../../context/cartContext"; // Import the useCart hook
import { db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";

const iconMap = {
  breakfast: Coffee,
  lunch: Utensils,
  snack: Cookie, // Add mapping for snack
};

function ProductImageCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative h-96">
      <img
        src={images[currentIndex]}
        alt={`Product image ${currentIndex + 1}`}
        className="w-full h-full object-cover"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full"
          >
            <ChevronLeft className="w-6 h-6 text-[#8B4513]" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full"
          >
            <ChevronRight className="w-6 h-6 text-[#8B4513]" />
          </button>
        </>
      )}
    </div>
  );
}

function SizeSelector({ options, onSelect, initialSize }) {
  const [selectedSize, setSelectedSize] = useState(initialSize);

  const handleSelect = (size) => {
    setSelectedSize(size);
    onSelect(size);
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-[#8B4513] mb-2">
        Size Options:
      </h2>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.size}
            onClick={() => handleSelect(option.size)}
            className={`px-4 py-2 rounded-full ${selectedSize === option.size
              ? "bg-[#8B4513] text-white"
              : "bg-[#FDF6ED] text-[#8B4513] hover:bg-[#DEB887]"
              }`}
          >
            {option.size} - ₹{option.price}
          </button>
        ))}
      </div>
    </div>
  );
}

function TasteProfile({ tastes }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-[#8B4513] mb-2">
        Taste Profile:
      </h2>
      <div className="flex flex-wrap gap-2">
        {tastes.map((taste) => (
          <span
            key={taste}
            className="bg-[#FDF6ED] text-[#8B4513] px-3 py-1 rounded-full"
          >
            {taste}
          </span>
        ))}
      </div>
    </div>
  );
}

function IdealWith({ items }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-[#8B4513] mb-2">Ideal With:</h2>
      <div className="flex flex-wrap gap-4">
        {items.map((item) => {
          const Icon = iconMap[item.icon] || Utensils;
          return (
            <div key={item.label} className="flex items-center gap-2">
              <Icon className="w-6 h-6 text-[#8B4513]" />
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AddToCartButton({ product, selectedSize }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, updateQuantity } = useCart();

  const handleAddToCart = () => {
    // Find the price for the selected size
    const selectedSizeOption =
      product.sizeOptions.find((option) => option.size === selectedSize) ||
      product.sizeOptions[0];

    // Create a cart item with the selected size and current quantity
    const cartItem = {
      id: product.id,
      title: product.title,
      image: product.image || product.images?.[0],
      selectedSize: selectedSize,
      count: quantity,
      price: selectedSizeOption.price,
    };

    addToCart(cartItem);
    updateQuantity(product.id, quantity); // Ensure the correct quantity is updated in the cart
  };

  return (
    <div className="mt-6">
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="bg-[#FDF6ED] text-[#8B4513] px-3 py-1 rounded-full"
        >
          -
        </button>
        <span className="text-xl font-semibold">{quantity}</span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="bg-[#FDF6ED] text-[#8B4513] px-3 py-1 rounded-full"
        >
          +
        </button>
      </div>
      <button
        onClick={handleAddToCart}
        className="bg-[#8B4513] text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-[#A0522D] transition-colors"
      >
        <ShoppingCart className="w-5 h-5" />
        Add to Cart
      </button>
    </div>
  );
}

export default function ProductDetails({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // Try to fetch by ID directly (if ID is string)
        let docRef = doc(db, "products", params.id);
        let docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          // If not found, maybe it's because we used numeric IDs in seeding but params.id is string?
          // But Firestore IDs are strings. If we seeded with addDoc, they are auto-generated strings.
          // If we seeded using setDoc with custom ID, they are what we set.
          // In AdminPage, I used addDoc, so IDs are auto-generated.
          // BUT, the initial data had numeric IDs.
          // If the user clicks on a product from the list, it will use the Firestore ID.
          // So this should be fine.
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
      setLoading(false);
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  useEffect(() => {
    if (product && product.sizeOptions && product.sizeOptions.length > 0) {
      setSelectedSize(product.sizeOptions[0].size);
    }
  }, [product]);

  if (loading) {
    return <div className="text-center text-2xl mt-8">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center text-2xl mt-8">Product not found</div>;
  }

  return (
    <div className="bg-[#FDF6ED] min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              {product.images && product.images.length > 1 ? (
                <ProductImageCarousel images={product.images} />
              ) : (
                <div className="relative h-[35rem]">
                  <img
                    src={product.image || (product.images && product.images[0])}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold text-[#8B4513] mb-4">
                {product.title}
              </h1>
              <p className="text-lg text-[#8B4513] mb-4">
                {product.description}
              </p>

              {product.sizeOptions && (
                <SizeSelector
                  options={product.sizeOptions}
                  onSelect={setSelectedSize}
                  initialSize={product.sizeOptions[0].size}
                />
              )}
              {product.taste && <TasteProfile tastes={product.taste} />}
              {product.idealWith && <IdealWith items={product.idealWith} />}

              <AddToCartButton product={product} selectedSize={selectedSize} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
