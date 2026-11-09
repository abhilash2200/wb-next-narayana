"use client";

import Image from "next/image";
import { useModal } from "@/context/ModalContext";

interface BranchResultsProps {
  cityName?: string;
}

const toppers = [
  {
    name: "Trisha Ghosh",
    score: "498/500",
    exam: "CBSE Class X",
    percent: "99.6%",
    image: "/assets/person1.png",
  },
  {
    name: "Reyansh Devnani",
    score: "495/500",
    exam: "CBSE Class XII",
    percent: "99.0%",
    image: "/assets/person2.png",
  },
  {
    name: "S. Vakhin",
    score: "495/500",
    exam: "CBSE Class XII",
    percent: "99.0%",
    image: "/assets/person3.png",
  },
];

export default function BranchResults({ cityName = "West Bengal" }: BranchResultsProps) {
  const { openModal } = useModal();

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-brandBlue font-bold text-xs uppercase tracking-wider mb-2">
            Proven Performance
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#003865]">
            Academic Results That Speak for Themselves
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            Consistently leading CBSE Board Examinations & National Competitive Ranks in {cityName}.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {toppers.map((t, idx) => (
            <div
              key={idx}
              className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg transition flex flex-col items-center"
            >
              <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-3 border-brandOrange">
                <Image
                  src={t.image}
                  alt={t.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="inline-block bg-[#002f56] text-brandYellow text-xs font-bold px-3 py-1 rounded-full mb-2">
                {t.score} ({t.percent})
              </div>

              <h3 className="text-base font-bold text-[#003865]">{t.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{t.exam}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => openModal("brochure", "View All Toppers & Ranks")}
            className="inline-flex items-center gap-2 bg-[#002f56] text-white px-6 py-2.5 rounded-lg text-xs sm:text-sm font-semibold hover:bg-brandOrange transition shadow-md cursor-pointer"
          >
            <span>View All Toppers & Ranks</span>
            <i className="fas fa-arrow-right text-xs" />
          </button>
        </div>
      </div>
    </section>
  );
}
