"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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
    <div className="relative h-[50vh] md:h-[70vh] overflow-hidden bg-[#f7f0dd]">
      {/* Carousel */}
      <div className="relative h-full w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <Image
              src={banners[currentSlide].image}
              alt={banners[currentSlide].title}
              fill
              priority
              className="object-cover"
              style={{ objectPosition: banners[currentSlide].imagePosition }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-full max-w-7xl mx-auto px-6 md:px-12 relative h-full"
              >
                <div
                  className="absolute max-w-xl md:max-w-2xl text-white drop-shadow-lg"
                  style={{
                    ...(window.innerWidth > 768
                      ? Object.fromEntries(
                        banners[currentSlide].customPositionDesktop
                          .split(";")
                          .filter(Boolean)
                          .map((rule) => rule.trim().split(":"))
                      )
                      : {
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        textAlign: "center",
                        width: "100%",
                        padding: "0 20px"
                      }),
                  }}
                >
                  <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-3xl md:text-6xl font-bold mb-4 leading-tight tracking-tight"
                  >
                    {banners[currentSlide].title}
                  </motion.h2>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="text-lg md:text-2xl font-light text-white/90"
                  >
                    {banners[currentSlide].subtitle}
                  </motion.p>

                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="mt-8 px-8 py-3 bg-[#7a5c43] hover:bg-[#6a4e3b] text-white rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Shop Now
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-3 rounded-full transition-all duration-300 group z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-3 rounded-full transition-all duration-300 group z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${currentSlide === index
              ? "w-8 bg-white"
              : "w-2 bg-white/50 hover:bg-white/70"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
