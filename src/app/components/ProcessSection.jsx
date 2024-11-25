import Image from "next/image";

export default function ProcessSection() {
  const steps = [
    {
      id: "01",
      title: "Freshly picked raw veggies & fruits",
      description:
        "All our ingredients are freshly picked from select farmers/vendors to maintain quality and taste.",
      iconSrc: "/images/icons/01.svg", // SVG icon path
      bgColor: "bg-green-200",
    },
    {
      id: "02",
      title: "Washed thoroughly",
      description: "Each ingredient is thoroughly washed and cleaned.",
      iconSrc: "/images/icons/02.svg", // SVG icon path
      bgColor: "bg-yellow-200",
    },
    {
      id: "03",
      title: "Cut in a precise shape & size",
      description:
        "The vegetables/fruits are cut in a specific shape and size for each pickle.",
      iconSrc: "/images/icons/03.svg", // SVG icon path
      bgColor: "bg-teal-200",
    },
    {
      id: "04",
      title: "Special spices mixed manually",
      description:
        "Spices are added in the right quantity, ground to a precise scale and then mixed with the cut vegetables/fruits.",
      iconSrc: "/images/icons/04.svg", // SVG icon path
      bgColor: "bg-amber-200",
    },
    {
      id: "05",
      title: "Marinated in traditional methods",
      description:
        "The mixture is now marinated in a style that is specific to each pickle and made ready for consumption.",
      iconSrc: "/images/icons/05.svg", // SVG icon path
      bgColor: "bg-blue-200",
    },
  ];

  return (
    <div className="bg-[#fdf6ed] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
          Made with Love and Respect
        </h2>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-2/3 space-y-8">
            {steps.map((step) => (
              <div key={step.id} className="flex items-start">
                <div
                  className={`flex-shrink-0 ${step.bgColor} rounded-full p-4 lg:p-6 mr-4`}
                >
                  <Image
                    src={step.iconSrc}
                    alt={step.title}
                    width={48}
                    height={48}
                    className="w-12 h-12 lg:w-16 lg:h-16"
                  />
                </div>
                <div>
                  <h3 className="text-lg lg:text-xl font-semibold">
                    <span className="font-bold">{step.id}</span> {step.title}
                  </h3>
                  <p className="text-sm lg:text-base text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
