"use client";

import { useState } from "react";

interface BranchFAQProps {
  branchName: string;
}

const faqs = [
  {
    q: "What are the school timings for this branch?",
    a: "Pre-Primary (eKidz) operates from 8:30 AM to 12:30 PM. Primary to Senior Secondary classes run from 8:00 AM to 2:30 PM with extended doubt-clearing sessions as scheduled.",
  },
  {
    q: "Is school transport available for our locality?",
    a: "Yes, GPS-enabled buses with verified drivers, female attendants, and real-time parent tracking operate across all major residential sectors surrounding the campus.",
  },
  {
    q: "What is the admission procedure for the 2027-28 session?",
    a: "You can submit an online enquiry or visit the campus directly. Our admission counselor will schedule an interaction, guide you through campus facilities, and assist with document verification.",
  },
  {
    q: "How does Narayana prepare students for competitive exams?",
    a: "We integrate Olympiad, JEE, and NEET syllabus modules directly with the CBSE curriculum starting in middle school (eTechno), eliminating the need for private tuition.",
  },
];

export default function BranchFAQ({ branchName }: BranchFAQProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-brandBlue font-bold text-xs uppercase tracking-wider mb-2">
            Got Questions?
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#003865]">
            Frequently Asked Questions · {branchName}
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            Everything you need to know about admissions, academics, and campus facilities.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="border border-gray-200 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full py-4 px-5 text-left font-semibold text-[#003865] flex items-center justify-between gap-4 hover:bg-gray-50 transition cursor-pointer text-sm sm:text-base"
                >
                  <span>{faq.q}</span>
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 transition-transform ${
                      isOpen
                        ? "bg-brandOrange text-white rotate-180"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <i className="fas fa-chevron-down" />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3 bg-gray-50/50">
                    {faq.a}
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
