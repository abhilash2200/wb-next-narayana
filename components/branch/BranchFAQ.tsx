"use client";

import { useState } from "react";
import { BranchFaqData } from "@/data/branchStaticData";

interface BranchFAQProps {
  data: BranchFaqData;
}

export default function BranchFAQ({ data }: BranchFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="overflow-hidden bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-800 md:mb-10 md:text-3xl lg:text-4xl">
          {data.heading}
        </h2>

        <div className="space-y-3 md:space-y-4">
          {data.faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-md border border-gray-200 bg-slate-50 transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left focus:outline-none md:px-6 md:py-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4 text-sm text-gray-800 md:text-lg">
                    <strong>
                      {index + 1}. {faq.question}
                    </strong>
                  </span>

                  <span
                    className={`
                      flex h-5 w-5 shrink-0 items-center justify-center
                      rounded-full border border-gray-400 text-xs text-gray-500
                      transition-transform duration-300 md:h-6 md:w-6
                      ${isOpen ? "rotate-180" : ""}
                    `}
                  >
                    ↑
                  </span>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 text-xs leading-relaxed text-gray-600 md:px-6 md:text-[15px]">
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
