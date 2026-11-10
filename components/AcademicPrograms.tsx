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
    alt: "Ekidz",
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
    heading: "CBSE schooling that opens doors to top competitive exams.",
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

  const scrollingPrograms = [...programs, ...programs];

  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="md:text-center text-left mb-10 md:mb-12" data-animate="fade-up">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
            Where do you want to start from?
          </h2>
          <p className="text-gray-500 text-md md:text-base">
            We shape your child futures with care – from pre-primary dreams to
            higher-secondary success.
          </p>

          {/* Compact Class Timings Cards (from index.html line 360) */}
          <div id="academic-programs-target" className="mt-4 md:mt-5 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-3">
              {/* Card 1: eKidz */}
              <div className="bg-orange-50/50 hover:bg-white rounded-xl py-2.5 px-3 border border-orange-200/80 hover:border-brandOrange hover:shadow-xs transition-all text-center">
                <h4 className="font-bold text-gray-900 text-sm">eKidz</h4>
                <span className="block text-[10px] text-gray-400 font-medium tracking-wider">
                  School Timings
                </span>
                <div className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-brandOrange mt-0.5">
                  <i className="fa-regular fa-clock text-[11px]" />
                  <span>8:30 am – 1:15 pm</span>
                </div>
              </div>

              {/* Card 2: eChamps */}
              <div className="bg-blue-50/50 hover:bg-white rounded-xl py-2.5 px-3 border border-blue-200/80 hover:border-brandBlue hover:shadow-xs transition-all text-center">
                <h4 className="font-bold text-gray-900 text-sm">eChamps</h4>
                <span className="block text-[10px] text-gray-400 font-medium tracking-wider">
                  School Timings
                </span>
                <div className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-brandBlue mt-0.5">
                  <i className="fa-regular fa-clock text-[11px]" />
                  <span>8:30 am – 2:30 pm</span>
                </div>
              </div>

              {/* Card 3: eTechno */}
              <div className="bg-orange-50/50 hover:bg-white rounded-xl py-2.5 px-3 border border-orange-200/80 hover:border-brandOrange hover:shadow-xs transition-all text-center">
                <h4 className="font-bold text-gray-900 text-sm">eTechno</h4>
                <span className="block text-[10px] text-gray-400 font-medium tracking-wider">
                  School Timings
                </span>
                <div className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-brandOrange mt-0.5">
                  <i className="fa-regular fa-clock text-[11px]" />
                  <span>8:15 am – 4:30 pm</span>
                </div>
              </div>

              {/* Card 4: SR. Secondary */}
              <div className="bg-blue-50/50 hover:bg-white rounded-xl py-2.5 px-3 border border-blue-200/80 hover:border-brandBlue hover:shadow-xs transition-all text-center">
                <h4 className="font-bold text-gray-900 text-sm">SR. Secondary</h4>
                <span className="block text-[10px] text-gray-400 font-medium tracking-wider">
                  School Timings
                </span>
                <div className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-brandBlue mt-0.5">
                  <i className="fa-regular fa-clock text-[11px]" />
                  <span>8:15 am – 4:30 pm</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View: 2-column Grid on Mobile matching index.html line 689 */}
        <div
          className="grid grid-cols-2 gap-4 md:gap-6 block md:hidden"
          data-animate="fade-up"
          data-delay="100"
        >
          {programs.map((program) => (
            <div
              key={`mobile-${program.id}`}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 flex flex-col border border-gray-100"
            >
              <div className="relative h-64 overflow-hidden bg-brandOrange">
                <Image
                  src={program.image}
                  alt={program.mobileTitle}
                  fill
                  className="object-cover object-bottom z-0"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute top-0 left-0 right-0 p-5 z-10">
                  <h3 className="font-bold text-xl text-white leading-tight">
                    {program.mobileTitle}
                  </h3>
                  <p className="inline-flex text-sm font-extrabold text-white mt-1">
                    {program.mobileSubtitle}
                  </p>
                </div>
              </div>

              <div className="p-2 bg-white flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenModal("fees", `Fee Structure: ${program.title}`)}
                  className="open-modal-btn w-full bg-[#007cc2] hover:bg-[#0069a5] text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <i className="fas fa-download text-sm" />
                  <span>Fees</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenModal("brochure", `Download Brochure: ${program.title}`)}
                  className="open-modal-btn w-full bg-brandOrange hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <i className="fas fa-download text-sm" />
                  <span>Brochure</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View: Splide Carousel Slider matching index.html line 416 */}
        <div
          id="programs-slider"
          className="splide mx-auto hidden md:block"
          aria-label="Academic Programs"
          data-animate="fade-up"
          data-delay="100"
        >
          <Splide
            options={{
              type: "loop",
              perPage: 4,
              perMove: 1,
              gap: "16px",
              autoplay: false,
              arrows: false,
              pagination: false,
              drag: true,
              swipe: true,
              speed: 600,
              flickPower: 600,
              flickMaxPages: 1,
              keyboard: false,
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
                          <i className="fas fa-circle text-[6px] text-brandBlue mr-2" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex text-white text-sm font-semibold">
                    <button
                      type="button"
                      onClick={() => handleOpenModal("brochure", "Download Brochure")}
                      className="open-modal-btn w-1/2 bg-brandOrange hover:bg-orange-600 py-3 transition cursor-pointer"
                    >
                      <i className="fas fa-download mr-1" />
                      Brochure
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenModal("fees", "Get Fee Structure")}
                      className="open-modal-btn w-1/2 bg-brandBlue hover:bg-[#002a5c] py-3 transition cursor-pointer"
                    >
                      <i className="fas fa-download hidden sm:inline-block mr-1" />
                      Fees{" "}
                      <span className="inline-block md:hidden">Structure</span>
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
