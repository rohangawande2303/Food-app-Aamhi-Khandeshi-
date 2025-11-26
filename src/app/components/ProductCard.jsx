"use client";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ id, name, image, link, desc }) => {
  return (
    <Link href={link} passHref className="block h-full">
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group h-full border border-[#e0d5c1]/50 flex flex-col items-center p-6 md:p-8">
        <div className="relative w-32 h-32 md:w-40 md:h-40 mb-6 transition-transform duration-300 group-hover:scale-110">
          <div className="absolute inset-0 bg-[#f7f0dd] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-110" />
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain relative z-10"
          />
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-[#7a5c43] mb-2 group-hover:text-[#6a4e3b] transition-colors">
          {name}
        </h3>

        {desc && (
          <p className="text-sm md:text-base text-gray-600 text-center font-medium">
            {desc}
          </p>
        )}

        <div className="mt-6 px-6 py-2 rounded-full border border-[#7a5c43] text-[#7a5c43] text-sm font-semibold group-hover:bg-[#7a5c43] group-hover:text-white transition-all duration-300">
          View Products
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
