"use client";

import { DynamicRightSchoolData } from "@/types/dynamic-page";

export default function DynamicRightSchool({
  heading,
  subheading,
  items = [],
}: DynamicRightSchoolData) {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-12 md:py-16 bg-white border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="md:text-center text-left mb-10" data-animate="fade-up">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
            {heading}
          </h2>
          {subheading && (
            <p className="text-gray-500 text-base md:text-lg">{subheading}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 sm:gap-y-6 md:gap-8 gap-x-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4"
              data-animate="fade-up"
              data-delay={(index + 1) * 100}
            >
              <div className="shrink-0 mt-0.5">
                <i className="fas fa-check-circle text-brandGreen text-[22px] sm:text-2xl md:text-3xl" />
              </div>
              <div>
                <h3 className="font-bold text-brandBlue text-[16px] sm:text-base leading-snug mb-1.5">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-[14px] sm:text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
