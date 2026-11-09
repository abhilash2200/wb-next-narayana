"use client";

import Image from "next/image";

export default function Navbar() {
  return (
    <nav
      className="bg-white shadow-md py-3 px-4 md:px-6 sticky top-0 z-50"
      data-animate="fade-down"
      data-duration="600"
    >
      <div className="container mx-auto flex justify-center items-center">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-1 md:gap-2">
            <Image
              src="/assets/logo1.png"
              alt="Narayana Logo"
              className="h-8 md:h-12 w-auto object-contain"
              width={120}
              height={48}
              priority
            />
          </div>

          <div className="h-8 md:h-10 w-px bg-gray-300" />

          <div className="flex items-center gap-1.5 md:gap-2">
            <Image
              src="/assets/narayana-logo.png"
              alt="Narayana Logo"
              className="h-8 md:h-12 w-auto object-contain"
              width={120}
              height={48}
              priority
            />
          </div>

          <div className="h-8 md:h-10 w-px bg-gray-300" />

          <div className="flex items-center gap-1 md:gap-2">
            <Image
              src="/assets/logo2.png"
              alt="Cerdmont International School"
              className="h-8 md:h-12 w-auto object-contain"
              width={120}
              height={48}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}