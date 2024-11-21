import { Leaf, Truck } from "lucide-react";

export default function InfoBar() {
  return (
    <div className="w-full bg-[#E5D3A4] py-3 md:py-5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-28">
          {/* No Preservatives Section */}
          <div className="flex flex-col items-center gap-2 md:flex-row md:items-center">
            <Leaf className="w-6 h-6 md:w-8 md:h-8" />
            <span className="text-sm sm:text-lg md:text-xl font-medium">
              No Preservatives
            </span>
          </div>

          {/* Fast Shipping Section */}
          <div className="flex flex-col items-center gap-2 md:flex-row md:items-center">
            <Truck className="w-6 h-6 md:w-8 md:h-8" />
            <span className="text-sm sm:text-lg md:text-xl font-medium">
              Fast Shipping
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
