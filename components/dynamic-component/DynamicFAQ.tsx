"use client";

import { useState } from "react";
import { DynamicFAQData } from "@/types/dynamic-page";

export default function DynamicFAQ({
  heading,
  subheading,
  faqs = [],
}: DynamicFAQData) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Default first item open

  if (!faqs || faqs.length === 0) return null;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-8 md:mb-12" data-animate="fade-up">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
            {heading}
          </h2>
          {subheading && (
            <p className="text-gray-500 text-base md:text-lg">{subheading}</p>
          )}
        </div>

        <div className="space-y-3 md:space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="border border-gray-200 rounded-xl bg-slate-50 overflow-hidden transition-all duration-300"
                data-animate="fade-up"
                data-delay={(index % 4 + 1) * 50}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-4 md:px-6 py-3.5 md:py-4.5 text-left flex justify-between items-center focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-gray-800 text-sm md:text-lg pr-4">
                    {index + 1}. {faq.question}
                  </span>
                  <div
                    className={`border border-gray-400 rounded-full w-6 h-6 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-brandBlue border-brandBlue text-white" : "text-gray-500"
                    }`}
                  >
                    <i className="fas fa-chevron-up text-[10px] md:text-xs" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 md:px-6 pb-5 pt-1 text-xs md:text-[15px] leading-relaxed text-gray-600 border-t border-gray-100 bg-white">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
