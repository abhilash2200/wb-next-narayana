"use client";

import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";


import { useModal } from "@/context/ModalContext";

interface AcademicProgramsProps {
  onOpenModal?: (action: "brochure" | "fees", title?: string) => void;
}

const programs = [
  {
    id: "ekidz",
    image: "/assets/e-kidz.webp",
    alt: "Kid",
    title: "eKidz",
    mobileTitle: "Ekidz",
    desktopClass: "(Nursery to UKG)",
    mobileClass: "Nursery to UKG",
    mobileName: "(eKidz)",
    mobileSubtitle: "Nursery to UKG",
    mobileBg: "#15539B",
    heading: "We Know Your Concern",
    points: [
      "Holistic Curriculum",
      "Personal Attention & safety",
      "Personalized safety and Hygiene",
      "Holistic Development Activities",
    ],
  },
  {
    id: "echamps",
    image: "/assets/echamps.webp",
    alt: "eChamps",
    title: "eChamps",
    mobileTitle: "eChamps",
    desktopClass: "(Class 1 to 5)",
    mobileClass: "Class 1 to 5",
    mobileName: "(eChamps)",
    mobileSubtitle: "Class 1 to 5",
    mobileBg: "#F5821F",
    heading: "Emphasises the overall development",
    points: [
      "Communication Skills",
      "Social Skills",
      "Emotional Skills",
      "Focus On Overall Development",
    ],
  },
  {
    id: "etechno",
    image: "/assets/etchno.webp",
    alt: "eTechno",
    title: "eTechno",
    mobileTitle: "eTechno",
    desktopClass: "(Class 6 to 10)",
    mobileClass: "Class 6 to 10",
    mobileName: "(eTechno)",
    mobileSubtitle: "Class 6 to 10",
    mobileBg: "#15539B",
    heading: "Preparing for careers, not just certificates.",
    points: [
      "Integrated Competitive Exam Prep",
      "Structured Learning Approach",
      "Technology-Enabled Framework",
      "Personalized Mentorship and Support",
    ],
  },
  {
    id: "secondary",
    image: "/assets/secondary.webp",
    alt: "SR. Secondary",
    title: "SR. Secondary",
    mobileTitle: "SR. Secondary",
    desktopClass: "(Class 11 & 12)",
    mobileClass: "Class 11 & 12",
    mobileName: "(SR. Secondary)",
    mobileSubtitle: "Class 11 & 12",
    mobileBg: "#F5821F",
    heading:
      "CBSE schooling that opens doors to top competitive exams.",
    points: [
      "Integrated coaching for competitive Exams",
      "Learning: Critical Thinking and Time Management",
      "Mentorship and Wellness Support for Growth",
    ],
  },
];

export default function AcademicPrograms({
  onOpenModal,
}: AcademicProgramsProps) {
  const { openModal } = useModal();
  const handleOpenModal = onOpenModal || openModal;

  /*
   * Original 4 cards + duplicate 4 cards.
   * Splide's loop mode makes this behave as one continuous
   * manually draggable/infinite slider.
   */
  const scrollingPrograms = [...programs, ...programs];

  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">

        <div className="md:text-center text-left mb-8 md:mb-12" data-animate="fade-up">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
            Where do you want to start from?
          </h2>
          <p className="text-gray-500 text-md md:text-base">
            We shape your child futures with care – from pre-primary dreams to higher-secondary success.
          </p>
        </div>

        {/* Mobile View: 2x2 Grid Matching Reference Image */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-lg mx-auto md:hidden" data-animate="fade-up">
          {programs.map((program) => (
            <div
              key={`mobile-${program.id}`}
              className="bg-white rounded-[20px] p-2 sm:p-2.5 shadow-md border border-gray-100 flex flex-col justify-between"
            >
              {/* Image banner with overlaid title */}
              <div className="relative w-full aspect-[4/5.2] rounded-[15px] overflow-hidden">
                <Image
                  src={program.image}
                  alt={program.alt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute top-0 left-0 p-2.5 sm:p-3 z-10">
                  <h3 className="font-bold text-[18px] sm:text-[20px] text-white leading-tight drop-shadow-xs">
                    {program.mobileTitle}
                  </h3>
                  <p className="text-[12px] sm:text-[13px] font-semibold text-white/95 mt-0.5 leading-tight drop-shadow-xs">
                    {program.mobileSubtitle}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-1.5 mt-2.5">
                <button
                  type="button"
                  onClick={() => handleOpenModal("fees", "Get Fee Structure")}
                  className="w-full bg-[#0077c8] hover:bg-[#0065ab] text-white font-bold text-[13px] sm:text-[14px] py-2 sm:py-2.5 px-2 rounded-[10px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs active:scale-[0.98]"
                >
                  <i className="fas fa-download text-[11px] sm:text-xs"></i>
                  <span>Fees</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenModal("brochure", "Download Brochure")}
                  className="w-full bg-[#f5821f] hover:bg-[#e06d0e] text-white font-bold text-[13px] sm:text-[14px] py-2 sm:py-2.5 px-2 rounded-[10px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs active:scale-[0.98]"
                >
                  <i className="fas fa-download text-[11px] sm:text-xs"></i>
                  <span>Brochure</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View: Splide Carousel Slider */}
        <div
          id="programs-slider"
          className="splide mx-auto hidden md:block"
          aria-label="Academic Programs"
          data-animate="fade-up"
          data-delay="100"
        >
          <Splide
            options={{
              /*
               * INFINITE LOOP
               */
              type: "loop",

              /*
               * ORIGINAL DESKTOP DISPLAY:
               * 4 cards visible at once.
               */
              perPage: 4,

              /*
               * One card moves with every drag.
               */
              perMove: 1,

              /*
               * Space between cards.
               */
              gap: "16px",

              /*
               * MANUAL ONLY.
               */
              autoplay: false,

              /*
               * NO visible slider controls.
               */
              arrows: false,
              pagination: false,

              /*
               * User can drag with mouse.
               */
              drag: true,
              swipe: true,

              /*
               * Smooth movement.
               */
              speed: 600,

              /*
               * Natural drag behavior.
               */
              flickPower: 600,
              flickMaxPages: 1,

              /*
               * Don't allow keyboard/other controls
               * to become visible.
               */
              keyboard: false,

              /*
               * Responsive.
               */
              breakpoints: {
                1280: {
                  perPage: 4,
                  gap: "16px",
                },

                1024: {
                  perPage: 3,
                  gap: "16px",
                },

                768: {
                  perPage: 2,
                  gap: "16px",
                },

                640: {
                  perPage: 1,
                  gap: "16px",
                },
              },
            }}
          >
            {scrollingPrograms.map((program, index) => (
              <SplideSlide key={`${program.id}-${index}`}>
                <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 flex flex-col h-full">
                  <div className="md:h-72 h-48 relative rounded-t-xl overflow-hidden">
                    <Image
                      src={program.image}
                      alt={program.alt}
                      className="absolute inset-0 w-full h-full object-cover z-0"
                      width={287}
                      height={263}
                      draggable={false}
                    />

                    <div className="absolute top-0 left-0 p-4 text-white z-10 hidden md:block">
                      <h3 className="font-bold text-[24px] text-white leading-tight">
                        {program.title}
                      </h3>
                      <p className="text-lg font-medium text-white mt-0.5 leading-tight">
                        {program.desktopClass}
                      </p>
                    </div>
                  </div>

                  <div
                    className="block md:hidden px-4 py-2"
                    style={{ backgroundColor: program.mobileBg }}
                  >
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-[24px] text-white leading-tight">
                        {program.mobileClass}
                      </h3>
                      <p className="text-lg font-medium text-white mt-0.5 leading-tight">
                        {program.mobileName}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 grow">
                    <h4
                      className={`text-gray-700 text-[20px] font-semibold mb-3 ${
                        program.id !== "ekidz" ? "leading-[1.2]" : ""
                      }`}
                    >
                      {program.heading}
                    </h4>

                    <ul className="space-y-2 text-[16px] font-medium text-gray-600">
                      {program.points.map((point, pointIndex) => (
                        <li key={pointIndex}>
                          <i className="fas fa-circle text-[6px] text-brandBlue mr-2"></i>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex text-white text-sm font-semibold">
                    <button
                      type="button"
                      onClick={() => handleOpenModal("brochure", "Download Brochure")}
                      className="w-1/2 bg-brandOrange hover:bg-brandOrangeDark py-3 transition"
                    >
                      <i className="fas fa-download mr-1"></i>
                      Brochure
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenModal("fees", "Get Fee Structure")}
                      className="w-1/2 bg-brandBlue hover:bg-brandBlueDark py-3 transition"
                    >
                      <i className="fas fa-download hidden sm:inline-block mr-1"></i>
                      Fees{" "}
                      <span className="inline-block md:hidden">
                        Structure
                      </span>
                    </button>

                  </div>
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </section>
  );
}