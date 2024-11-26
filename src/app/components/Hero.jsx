"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      image: "/images/banner1.jpg",
      title: "A soulful destination of pickles, powders & savouries",
      subtitle: "Discover authentic flavors",
      textAlign: "left", // Default alignment
      customPositionDesktop:
        "left: 10%; top: 50%; transform: translateY(-50%);",
      customPositionMobile:
        "left: 50%; top: 50%; transform: translate(-50%, -50%);",
      imagePosition: "50% 80%", // Horizontal 50%, Vertical 80%
    },
    {
      image: "/images/banner2.jpg",
      title: "Exciting update!",
      subtitle: "Enjoy free shipping on orders over ₹1500",
      textAlign: "center", // Centered alignment
      customPositionDesktop:
        "left: 50%; top: 50%; transform: translate(-50%, -50%);",
      customPositionMobile:
        "left: 50%; top: 50%; transform: translate(-50%, -50%);",
      imagePosition: "50% 50%", // Centered
    },
    {
      image: "/images/banner3.jpg",
      title: "Authentic Mango Pickle",
      subtitle: "Made with love and traditional recipes",
      textAlign: "left",
      customPositionDesktop: "left: 1rem; top: 10rem;",
      customPositionMobile:
        "left: 50%; top: 50%; transform: translate(-50%, -50%);",
      imagePosition: "30% 20%",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [banners.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
      {/* Carousel */}
      <div
        className="relative h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        <div
          className="absolute top-0 left-0 flex h-full"
          style={{ width: `${banners.length * 100}%` }}
        >
          {banners.map((banner, index) => (
            <div
              key={index}
              className="relative h-full"
              style={{ width: `${100 / banners.length}%` }}
            >
              <Image
                src={banner.image}
                alt={`Banner ${index + 1}`}
                fill
                priority={index === 0}
                className="object-cover"
                style={{ objectPosition: banner.imagePosition }} // Apply the position
              />
              <div className="absolute inset-0 bg-black/20" />
              <div
                className="absolute px-8 md:px-16 max-w-2xl"
                style={{
                  textAlign: banner.textAlign,
                  ...(banner.customPositionDesktop && {
                    position: "absolute",
                    ...(window.innerWidth > 768
                      ? Object.fromEntries(
                          banner.customPositionDesktop
                            .split(";")
                            .map((rule) => rule.trim().split(":"))
                        )
                      : Object.fromEntries(
                          banner.customPositionMobile
                            .split(";")
                            .map((rule) => rule.trim().split(":"))
                        )),
                  }),
                }}
              >
                <h2 className="text-xl md:text-4xl font-bold text-white mb-2 md:mb-4">
                  {banner.title}
                </h2>
                <p className="text-sm md:text-lg text-white/90">
                  {banner.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full transition-colors duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full transition-colors duration-200"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              currentSlide === index ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
