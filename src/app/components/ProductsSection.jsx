"use client";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import papadImage from "../../images/papads.svg";
import picklesImage from "../../images/pickles.svg";
import powdersImage from "../../images/powders.svg";

const ProductsSection = () => {
  const products = [
    { id: "1", name: "Pickles", image: picklesImage, link: "/products/pickles", desc: "Tangy & Spicy" },
    { id: "2", name: "Powders", image: powdersImage, link: "/products/powders", desc: "Authentic Spices" },
    { id: "3", name: "Papads", image: papadImage, link: "/products/papads", desc: "Crispy Delight" },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#f7f0dd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#7a5c43] mb-4">
            Explore Aamhi Khandeshi Food
          </h2>
          <p className="text-lg text-[#5b4e3b]/80 max-w-2xl mx-auto">
            Discover the authentic taste of Khandesh with our handcrafted traditional delicacies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <ProductCard
                id={product.id}
                name={product.name}
                image={product.image}
                link={product.link}
                desc={product.desc}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
