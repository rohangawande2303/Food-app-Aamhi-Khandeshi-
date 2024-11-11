"use client";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ id, name, image, link, isMobile }) => {
  return (
    <Link href={link} passHref>
      <div
        className={`${
          isMobile
            ? "flex items-center gap-2 p-2 bg-white rounded-lg shadow-md"
            : "w-64 h-64 md:h-56 border p-4 rounded-lg shadow-2xl bg-white transition-all duration-300 transform hover:scale-105 hover:shadow-3xl flex flex-col items-center justify-center"
        } cursor-pointer`}
      >
        <Image
          src={image}
          alt={name}
          width={isMobile ? 30 : 80}
          height={isMobile ? 30 : 80}
          className={isMobile ? "mr-2" : "mb-4"}
        />
        <h3
          className={`text-center ${
            isMobile ? "text-xs" : "text-lg"
          } font-semibold`}
        >
          {name}
        </h3>
      </div>
    </Link>
  );
};

export default ProductCard;
