"use client";

import Image from "next/image";
import { useModal } from "@/context/ModalContext";

interface BranchProgramsProps {
  branchName: string;
}

const programs = [
  {
    id: "ekidz",
    image: "/assets/e-kidz.webp",
    title: "eKidz",
    classes: "Nursery to UKG",
    heading: "Foundational & Play-based Learning",
    points: [
      "Holistic early childhood curriculum",
      "Personalized safety, hygiene & care",
      "Experiential, activity-driven growth",
      "Sensory and motor skills development",
    ],
    accent: "#15539B",
  },
  {
    id: "echamps",
    image: "/assets/echamps.webp",
    title: "eChamps",
    classes: "Class 1 to 5",
    heading: "Emphasising Conceptual Clarity",
    points: [
      "Strong foundation in Math & Science",
      "Effective communication & language skills",
      "Critical thinking and curiosity building",
      "Continuous assessment and mentoring",
    ],
    accent: "#F5821F",
  },
  {
    id: "etechno",
    image: "/assets/etchno.webp",
    title: "eTechno",
    classes: "Class 6 to 10",
    heading: "Competitive & Future-Oriented Preparation",
    points: [
      "Integrated CBSE & Olympiad syllabus",
      "Early foundation for JEE / NEET / CUET",
      "Advanced tech-enabled learning modules",
      "Regular testing & micro-level analytics",
    ],
    accent: "#15539B",
  },
  {
    id: "senior",
    image: "/assets/etchno.webp",
    title: "Senior Secondary",
    classes: "Class 11 & 12",
    heading: "Targeted Top Rank Coaching",
    points: [
      "Science & Commerce career streams",
      "Rigorous national test series",
      "Doubt clearing & 1-on-1 mentorship",
      "Proven track record of top AIR ranks",
    ],
    accent: "#F5821F",
  },
];

export default function BranchPrograms({ branchName }: BranchProgramsProps) {
  const { openModal } = useModal();

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-brandBlue font-bold text-xs uppercase tracking-wider mb-2">
            Academic Excellence
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#003865]">
            Academic Programs at {branchName}
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            A continuous, integrated academic continuum catering to every developmental stage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl shadow-xs hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col overflow-hidden group"
            >
              <div className="relative h-44 w-full overflow-hidden bg-gray-100">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#002f56]/90 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
                  {p.classes}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-[#003865] mb-1">
                    {p.title}
                  </h3>
                  <p className="text-xs font-medium text-brandOrange mb-3">
                    {p.heading}
                  </p>

                  <ul className="space-y-2 text-xs text-gray-600">
                    {p.points.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <i className="fas fa-check text-brandOrange mt-0.5 text-[10px] shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => openModal("brochure", "Download Curriculum")}
                  className="w-full py-2 px-3 text-xs font-semibold rounded-lg border border-[#003865] text-[#003865] hover:bg-[#003865] hover:text-white transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <i className="fas fa-file-arrow-down text-brandOrange" />
                  <span>Download Curriculum</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
