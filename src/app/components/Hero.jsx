"use client";

import Image from "next/image";
import bannerImage from "../../images/hero-banner-ak.jpg";

const Hero = () => {
  return (
    <div className="relative h-[40vh] md:h-[50vh]">
      <Image
        src={bannerImage}
        alt="Banner Image"
        layout="fill" // Ensure the image covers the entire div
        objectFit="cover" // Maintain the aspect ratio and cover the area
        objectPosition="center" // Center the image
        priority // Ensure the image loads quickly
        className="w-full h-full"
      />

      {/* Overlay for better text visibility with lighter opacity */}
      <div className="absolute inset-0 bg-black opacity-0"></div>

      {/* Text in the center */}
      <div className="absolute inset-0 flex items-center justify-center text-white text-center px-4 pt-12">
        <h1 className="text-2xl md:text-4xl font-bold leading-tight md:leading-snug">
          A soulful destination of pickles, powders & savouries
        </h1>
      </div>
    </div>
  );
};

export default Hero;
