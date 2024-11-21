"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomerReviews() {
  const testimonials = [
    {
      id: 1,
      name: "Vidya",
      location: "Hyderabad",
      date: "20 August 2020",
      quote: "'Irresistible taste', If I may sum it up in one phrase.",
      review:
        "We tried various brands of pickles, picking them off the shelves of supermarkets, but never enjoyed their taste because of the preservatives. Jandhyala's products are always fresh and you would not find any preservatives at all.",
    },
    {
      id: 2,
      name: "Priya",
      location: "Bangalore",
      date: "15 September 2020",
      quote: "'Authentic taste of home'",
      review:
        "The pickles remind me of my grandmother's recipes. The flavors are perfectly balanced and the quality is consistently excellent. I've been a regular customer for over a year now.",
    },
    {
      id: 3,
      name: "Raj",
      location: "Chennai",
      date: "5 October 2020",
      quote: "'Best pickles I've ever had'",
      review:
        "The traditional taste and the quality of ingredients used are exceptional. What I love most is that they don't use any artificial preservatives. It's pure, authentic, and delicious.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="w-full bg-[#fdf6ed] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          what our customers say
        </h2>

        <div className="relative h-[300px] md:h-[250px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <div className="flex flex-col items-center text-center">
                <h3 className="text-xl md:text-2xl font-semibold text-red-500 mb-2">
                  {testimonials[currentIndex].name}
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  {testimonials[currentIndex].location} |{" "}
                  {testimonials[currentIndex].date}
                </p>
                <p className="text-lg md:text-xl font-medium mb-4">
                  {testimonials[currentIndex].quote}
                </p>
                <p className="text-gray-700 max-w-2xl mx-auto">
                  {testimonials[currentIndex].review}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
