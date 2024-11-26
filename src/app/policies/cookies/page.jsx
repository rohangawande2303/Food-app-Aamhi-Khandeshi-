"use client";
import Link from "next/link";

const ComingSoon = () => {
  return (
    <main className="relative min-h-screen bg-[#f7f0dd] text-[#4a3f35] overflow-hidden">
      <div className="absolute inset-0 flex flex-col items-center justify-start px-6 pt-12 sm:pt-16 lg:px-8 lg:pt-24 pb-0">
        <div className="text-center space-y-6 sm:space-y-8">
          <p className="text-base font-bold text-[#c4782d] uppercase tracking-wide">
            This Page is
          </p>
          <h1 className="text-4xl sm:text-7xl font-bold tracking-tight text-[#2c1810]">
            Coming Soon...
          </h1>
          <p className="text-base leading-7 text-[#5a4534] max-w-xl mx-auto">
            We are excited to share with you that our brand new website is
            currently under construction and will be launching soon.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-[#c4782d] px-6 py-3 text-sm font-semibold text-white 
              shadow-lg hover:bg-[#a56425] transition-colors duration-300 
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
              focus-visible:outline-[#c4782d]"
            >
              Go back home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ComingSoon;
