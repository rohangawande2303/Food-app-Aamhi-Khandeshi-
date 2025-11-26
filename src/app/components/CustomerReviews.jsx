"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";

export default function CustomerReviews() {
  const testimonials = [
    {
      id: 1,
      name: "Vidya",
      location: "Hyderabad",
      date: "20 August 2024",
      quote: "Irresistible taste",
      review: "We tried various brands of pickles, picking them off the shelves of supermarkets, but never enjoyed their taste because of the preservatives. Jandhyala's products are always fresh and you would not find any preservatives at all.",
      avatarColor: "bg-red-100 text-red-600"
    },
    {
      id: 2,
      name: "Priya",
      location: "Bangalore",
      date: "15 September 2024",
      quote: "Authentic taste of home",
      review: "The pickles remind me of my grandmother's recipes. The flavors are perfectly balanced and the quality is consistently excellent. I've been a regular customer for over a year now.",
      avatarColor: "bg-orange-100 text-orange-600"
    },
    {
      id: 3,
      name: "Raj",
      location: "Chennai",
      date: "5 October 2024",
      quote: "Best pickles I've ever had",
      review: "The traditional taste and the quality of ingredients used are exceptional. What I love most is that they don't use any artificial preservatives. It's pure, authentic, and delicious.",
      avatarColor: "bg-yellow-100 text-yellow-600"
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="w-full bg-[#fdf6ed] py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#7a5c43] mb-4">
            What Our Customers Say
          </h2>
          <div className="w-24 h-1 bg-[#7a5c43] mx-auto rounded-full opacity-20"></div>
        </motion.div>

        <div className="relative h-[400px] md:h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-[#e0d5c1]/30 relative mx-4 md:mx-0">
                <Quote className="absolute top-8 left-8 w-12 h-12 text-[#7a5c43]/10 rotate-180" />

                <div className="flex flex-col items-center text-center relative z-10">
                  <div className={`w-16 h-16 rounded-full ${testimonials[currentIndex].avatarColor} flex items-center justify-center text-2xl font-bold mb-6 shadow-inner`}>
                    {testimonials[currentIndex].name.charAt(0)}
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-[#7a5c43] mb-2 font-serif italic">
                    &quot;{testimonials[currentIndex].quote}&quot;
                  </h3>

                  <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-2xl">
                    {testimonials[currentIndex].review}
                  </p>

                  <div className="border-t border-gray-100 pt-6 w-full max-w-xs">
                    <p className="font-bold text-gray-900 text-lg">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {testimonials[currentIndex].location} • {testimonials[currentIndex].date}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${currentIndex === index
                ? "w-8 bg-[#7a5c43]"
                : "w-2 bg-[#7a5c43]/20 hover:bg-[#7a5c43]/40"
                }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
