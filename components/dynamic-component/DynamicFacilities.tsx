"use client";

import Image from "next/image";
import { DynamicFacilitiesData } from "@/types/dynamic-page";

export default function DynamicFacilities({
  heading,
  subheading,
  facilities = [],
}: DynamicFacilitiesData) {
  if (!facilities || facilities.length === 0) return null;

  return (
    <section className="py-16 md:py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="md:text-center text-left mb-10 md:mb-12" data-animate="fade-up">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
            {heading}
          </h2>
          {subheading && (
            <p className="text-gray-500 text-md md:text-base">{subheading}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col"
              data-animate="fade-up"
              data-delay={(index % 3 + 1) * 100}
            >
              {facility.image ? (
                <div className="relative w-full h-[335px] bg-gray-100">
                  <Image
                    src={facility.image}
                    alt={facility.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              ) : null}
              <div className="p-5 flex-grow">
                <h3 className="text-brandBlue font-bold text-[18px] md:text-[22px] mb-2 md:mb-3">
                  {facility.title}
                </h3>
                <p className="text-gray-500 text-[15px] font-medium leading-relaxed">
                  {facility.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
