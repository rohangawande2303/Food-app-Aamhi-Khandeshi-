"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ProcessSection() {
  const steps = [
    {
      id: "01",
      title: "Freshly picked raw veggies & fruits",
      description: "All our ingredients are freshly picked from select farmers/vendors to maintain quality and taste.",
      iconSrc: "/images/icons/01.svg",
      bgColor: "bg-green-100",
      borderColor: "border-green-200",
      textColor: "text-green-800"
    },
    {
      id: "02",
      title: "Washed thoroughly",
      description: "Each ingredient is thoroughly washed and cleaned.",
      iconSrc: "/images/icons/02.svg",
      bgColor: "bg-yellow-100",
      borderColor: "border-yellow-200",
      textColor: "text-yellow-800"
    },
    {
      id: "03",
      title: "Cut in a precise shape & size",
      description: "The vegetables/fruits are cut in a specific shape and size for each pickle.",
      iconSrc: "/images/icons/03.svg",
      bgColor: "bg-teal-100",
      borderColor: "border-teal-200",
      textColor: "text-teal-800"
    },
    {
      id: "04",
      title: "Special spices mixed manually",
      description: "Spices are added in the right quantity, ground to a precise scale and then mixed with the cut vegetables/fruits.",
      iconSrc: "/images/icons/04.svg",
      bgColor: "bg-amber-100",
      borderColor: "border-amber-200",
      textColor: "text-amber-800"
    },
    {
      id: "05",
      title: "Marinated in traditional methods",
      description: "The mixture is now marinated in a style that is specific to each pickle and made ready for consumption.",
      iconSrc: "/images/icons/05.svg",
      bgColor: "bg-blue-100",
      borderColor: "border-blue-200",
      textColor: "text-blue-800"
    },
  ];

  return (
    <div className="bg-[#fdf6ed] py-16 md:py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#7a5c43] mb-4">
            Made with Love and Respect
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our traditional process ensures authentic taste and premium quality in every jar
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute left-[2.25rem] top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#7a5c43]/20 via-[#7a5c43]/40 to-[#7a5c43]/20" />

          <div className="space-y-8 md:space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative flex flex-col md:flex-row items-start group"
              >
                <div className={`flex-shrink-0 relative z-10 ${step.bgColor} ${step.borderColor} border-2 rounded-full p-4 md:p-5 mr-0 md:mr-8 mb-4 md:mb-0 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  <Image
                    src={step.iconSrc}
                    alt={step.title}
                    width={40}
                    height={40}
                    className="w-10 h-10 md:w-12 md:h-12"
                  />
                  <div className="absolute -right-2 -top-2 bg-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-sm border border-gray-100">
                    {step.id}
                  </div>
                </div>

                <div className="flex-grow bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-[#e0d5c1]/30 w-full">
                  <h3 className={`text-lg md:text-xl font-bold ${step.textColor} mb-2`}>
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
