import { Leaf, Truck } from "lucide-react";

export default function InfoBar() {
  return (
    <div className="w-full bg-[#7a5c43] py-4 md:py-6 text-white shadow-md relative z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-24">
          {/* No Preservatives Section */}
          <div className="flex items-center gap-3 bg-white/10 px-6 py-2 rounded-full backdrop-blur-sm">
            <Leaf className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-sm sm:text-base md:text-lg font-medium tracking-wide">
              No Preservatives
            </span>
          </div>

          {/* Fast Shipping Section */}
          <div className="flex items-center gap-3 bg-white/10 px-6 py-2 rounded-full backdrop-blur-sm">
            <Truck className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-sm sm:text-base md:text-lg font-medium tracking-wide">
              Fast Shipping
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
