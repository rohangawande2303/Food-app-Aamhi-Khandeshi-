import { Utensils, Cookie } from "lucide-react";

export const productData = [
  {
    id: 1,
    title: "Bibdi Papad",
    category: "Papads",
    description: "Crispy and flavorful papad with a touch of sweetness.",
    sizeOptions: [
      { size: "500g", price: 350 },
      { size: "250g", price: 180 },
    ],
    taste: ["Crispy", "Sweet", "Spicy"],
    image: "/images/papads/bibdi-papad.png",
    idealWith: [
      { label: "Lunch/Dinner", icon: Utensils },
      { label: "Snack", icon: Cookie },
    ],
  },
  {
    id: 2,
    title: "Jwari Papad",
    category: "Papads",
    description: "A traditional papad made from jwari flour with a sour kick.",
    sizeOptions: [
      { size: "500g", price: 440 },
      { size: "250g", price: 225 },
    ],
    taste: ["Crispy", "Sour", "Spicy"],
    image: "/images/papads/jwari-papad.png",
    idealWith: [
      { label: "Lunch/Dinner", icon: Utensils },
      { label: "Snack", icon: Cookie },
    ],
  },
  {
    id: 3,
    title: "Udid Papad",
    category: "Papads",
    description: "Popular Udid dal papad with a tangy flavor.",
    sizeOptions: [
      { size: "500g", price: 440 },
      { size: "250g", price: 225 },
    ],
    taste: ["Crispy", "Spicy", "Tangy"],
    image: "/images/papads/udid-papad.png",
    idealWith: [
      { label: "Lunch/Dinner", icon: Utensils },
      { label: "Snack", icon: Cookie },
    ],
  },
  {
    id: 4,
    title: "Nachani Papad",
    category: "Papads",
    description: "Spicy and unique nachani papad with a touch of heat.",
    sizeOptions: [
      { size: "600g", price: 500 },
      { size: "400g", price: 300 },
    ],
    taste: ["Crispy", "Spicy", "Sour"],
    image: "/images/papads/nachani-papad.png",
    idealWith: [
      { label: "Lunch/Dinner", icon: Utensils },
      { label: "Snack", icon: Cookie },
    ],
  },
  {
    id: 5,
    title: "Mango Pickle",
    category: "Pickles",
    description: "Classic mango pickle with a spicy and tangy kick.",
    sizeOptions: [
      { size: "500g", price: 350 },
      { size: "250g", price: 180 },
    ],
    taste: ["Spicy", "Tangy", "Sour"],
    image: "/images/pickles/mango-pickle.png",
    idealWith: [
      { label: "Lunch/Dinner", icon: Utensils },
      { label: "Snack", icon: Cookie },
    ],
  },
  {
    id: 6,
    title: "Garlic Pickle",
    category: "Pickles",
    description: "Rich garlic pickle with a balance of spice.",
    sizeOptions: [
      { size: "500g", price: 420 },
      { size: "250g", price: 220 },
    ],
    taste: ["Spicy", "Tangy", "Sour"],
    image: "/images/pickles/garlic-pickle.png",
    idealWith: [
      { label: "Lunch/Dinner", icon: Utensils },
      { label: "Snack", icon: Cookie },
    ],
  },
  {
    id: 7,
    title: "Lemon Pickle",
    category: "Pickles",
    description: "Zesty lemon pickle with bold tangy flavors.",
    sizeOptions: [
      { size: "500g", price: 380 },
      { size: "250g", price: 200 },
    ],
    taste: ["Tangy", "Sour", "Spicy"],
    image: "/images/pickles/lemon-pickle.jpeg",
    idealWith: [
      { label: "Lunch/Dinner", icon: Utensils },
      { label: "Snack", icon: Cookie },
    ],
  },
  {
    id: 8,
    title: "Green Chili Pickle",
    category: "Pickles",
    description: "Hot green chili pickle for spice lovers.",
    sizeOptions: [
      { size: "500g", price: 400 },
      { size: "250g", price: 210 },
    ],
    taste: ["Spicy", "Tangy", "Sour"],
    image: "/images/pickles/green-chili-pickle.png",
    idealWith: [
      { label: "Lunch/Dinner", icon: Utensils },
      { label: "Snack", icon: Cookie },
    ],
  },
  {
    id: 9,
    title: "Peanut Powder",
    category: "Powders",
    description: "Smooth peanut powder for versatile cooking.",
    sizeOptions: [
      { size: "400g", price: 280 },
      { size: "200g", price: 150 },
    ],
    taste: ["Spicy", "Sour", "Tangy"],
    image: "/images/powders/peanut-powder.png",
    idealWith: [
      { label: "Lunch/Dinner", icon: Utensils },
      { label: "Snack", icon: Cookie },
    ],
  },
  {
    id: 10,
    title: "Sesame Powder",
    category: "Powders",
    description: "Nutty sesame powder for added flavor.",
    sizeOptions: [
      { size: "400g", price: 230 },
      { size: "200g", price: 120 },
    ],
    taste: ["Spicy", "Sour", "Tangy"],
    image: "/images/powders/sesame-powder.png",
    idealWith: [
      { label: "Lunch/Dinner", icon: Utensils },
      { label: "Snack", icon: Cookie },
    ],
  },
  {
    id: 11,
    title: "Coconut Powder",
    category: "Powders",
    description: "Rich and spicy coconut powder for an extra kick.",
    sizeOptions: [
      { size: "400g", price: 350 },
      { size: "200g", price: 180 },
    ],
    taste: ["Spicy", "Tangy", "Sour"],
    image: "/images/powders/coconut-powder.png",
    idealWith: [
      { label: "Lunch/Dinner", icon: Utensils },
      { label: "Snack", icon: Cookie },
    ],
  },
  {
    id: 12,
    title: "Aam ka Murabba",
    category: "Powders",
    description:
      "A traditional Indian preserve made from raw mangoes, sugar, and spices, known for its sweet and tangy flavor.",
    sizeOptions: [
      { size: "400g", price: 240 },
      { size: "200g", price: 130 },
    ],
    taste: ["Sweet", "Tangy", "Spicy"],
    image: "/images/powders/murabba-powder.png",
    idealWith: [
      { label: "Lunch/Dinner", icon: Utensils },
      { label: "Snack", icon: Cookie },
    ],
  },
];
