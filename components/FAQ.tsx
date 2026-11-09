"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What curriculum does Narayana Schools follow?",
    answer:
      "A power-packed blend of CBSE, state board & competitive exam prep—IIT, NEET, UPSC, Olympiads & more!",
  },
  {
    question: "What facilities are available on campus?",
    answer:
      "Smart classrooms, high-tech labs, sports zones, libraries & activity hubs—learning meets fun!",
  },
  {
    question: "How does the school ensure student safety?",
    answer:
      "24/7 CCTV, trained security, fire safety & GPS-tracked buses—safe, secure & stress-free!",
  },
  {
    question: "Does the school offer hostels & daycare?",
    answer:
      "Absolutely! Comfortable hostels & nurturing daycare for a home-away-from-home experience.",
  },
  {
    question: "What makes Narayana School one of the best CBSE schools?",
    answer:
      "Narayana School is among the best CBSE schools offering a unique blend of board and competitive exam preparation through programmes like e-Kidz, e-Champs, and e-Techno. Our advanced microschedules, personalised mentorship, and digital learning tools set us apart.",
  },
  {
    question: "Is Narayana an English medium school?",
    answer:
      "Yes, Narayana School offers a comprehensive English medium education, starting from nursery to senior secondary, with a strong focus on language development and overall growth. That's why, it is one of the best secondary schools.",
  },
  {
    question:
      "How do I apply for admission to Narayana School under the CBSE curriculum?",
    answer:
      "Admissions at Narayana School can be done online or by visiting our nearest branch. We offer the CBSE curriculum only. So, every Narayana School admission will be a CBSE admission. We welcome students for kindergarten, primary, and secondary levels",
  },
  {
    question: "Does Narayana offer preschool and nursery education?",
    answer:
      "Yes, through our e-Kidz programme, we offer a well-structured preschool and nursery curriculum that focuses on play-based learning and foundational skill development. It is as good as the best nursery school.",
  },
  {
    question: "How do I know where the nearest Narayana School is?",
    answer:
      "You can find the nearest Narayana School branch by checking the available locations and contacting the branch for admission-related information.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="overflow-hidden bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-800 md:mb-10 md:text-3xl lg:text-4xl">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3 md:space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-md border border-gray-200 bg-slate-50 transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="flex w-full items-center justify-between px-4 py-3 text-left focus:outline-none md:px-6 md:py-4"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4 text-sm text-gray-800 md:text-lg">
                    <strong>{index + 1}. {faq.question}</strong>
                  </span>

                  <span
                    className={`
                      flex h-5 w-5 flex-shrink-0 items-center justify-center
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