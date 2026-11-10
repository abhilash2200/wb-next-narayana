"use client";

import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import { useModal } from "@/context/ModalContext";

type AcademicResultsProps = {
  onOpenModal?: (action: "brochure" | "fees" | "enquiry", title?: string) => void;
};

const results = [
  {
    name: "Trisha Ghosh",
    score: "498/500",
    exam: "CBSE-X 2025",
    image: "/assets/person1.png",
  },
  {
    name: "Reyansh Devnani",
    score: "495/500",
    exam: "CBSE-XII 2025",
    image: "/assets/person2.png",
  },
  {
    name: "S. Vakhin",
    score: "495/500",
    exam: "CBSE-XII 2025",
    image: "/assets/person3.png",
  },
];

export default function AcademicResults({ onOpenModal }: AcademicResultsProps) {
  const { openModal } = useModal();
  const handleOpenModal = onOpenModal || openModal;
  const scrollingResults = [...results, ...results];

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl rounded-2xl bg-[#d9d9d956] px-4 py-8 md:px-6 md:text-center">
        <h2 className="mb-2 text-2xl font-bold text-gray-800 md:text-3xl lg:text-4xl">
          Academic Results That Speak for Themselves
        </h2>
        <p className="mb-8 text-md text-gray-500 md:mb-12">
          Our students don&apos;t just pass CBSE - they excel nationally
        </p>

        <div id="academic-results-slider" className="results-slider-wrapper relative max-w-6xl mx-auto px-2 sm:px-6">
          <Splide
            aria-label="Academic Results"
            options={{
              type: "loop",
              perPage: 3,
              perMove: 1,
              gap: "32px",
              autoplay: false,
              arrows: true,
              pagination: false,
              drag: true,
              swipe: true,
              speed: 650,
              flickPower: 600,
              flickMaxPages: 1,
              breakpoints: {
                768: {
                  perPage: 2,
                  gap: "24px",
                },
                640: {
                  perPage: 1,
                  gap: "20px",
                },
              },
            }}
          >
            {scrollingResults.map((result, index) => (
              <SplideSlide key={`${result.name}-${index}`}>
                <div className="flex h-full flex-col items-center">
                  <div className="relative w-[88%] sm:w-full max-w-[320px] sm:max-w-none h-80 sm:h-81.25 md:h-83.5 rounded-2xl md:rounded-3xl overflow-hidden bg-[#0a4b78] shadow-md mb-4 mx-auto">
                    <Image
                      src={result.image}
                      alt={result.name}
                      fill
                      sizes="(max-width: 640px) 320px, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-top"
                      draggable={false}
                    />
                  </div>

                  <h3 className="text-base font-bold text-black md:text-lg">
                    {result.name}
                  </h3>

                  <div className="my-1 text-2xl font-bold text-brandBlue md:text-3xl">
                    {result.score}
                  </div>

                  <div className="text-[10px] uppercase tracking-wide text-gray-500 md:text-xs">
                    {result.exam}
                  </div>
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>

        <div className="mt-8" data-animate="zoom-in">
          <button
            type="button"
            onClick={() => handleOpenModal("enquiry", "Get Call Back for Your Query")}
            className="open-modal-btn w-full sm:w-auto bg-brandOrange hover:bg-orange-600 text-white font-bold py-3 px-8 rounded shadow-lg transition duration-300 cursor-pointer"
          >
            <i className="fas fa-phone-alt transform -scale-x-100 mr-2" />
            Get Call Back for Your Query
          </button>
        </div>
      </div>
    </section>
  );
}
