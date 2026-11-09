"use client";

import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useModal } from "@/context/ModalContext";
import { DynamicAcademicResultsData } from "@/types/dynamic-page";

interface DynamicAcademicResultsProps extends DynamicAcademicResultsData {
  onOpenModal?: () => void;
}

export default function DynamicAcademicResults({
  heading,
  subheading,
  results = [],
  ctaButtonText,
  onOpenModal,
}: DynamicAcademicResultsProps) {
  const { openModal } = useModal();
  const handleOpenModal =
    onOpenModal ||
    (() => openModal("enquiry", ctaButtonText || "Enquiry Now"));

  if (!results || results.length === 0) return null;

  const splideOptions = {
    type: "loop" as const,
    perPage: 3,
    perMove: 1,
    gap: "2.5rem",
    pagination: false,
    arrows: true,
    breakpoints: {
      1024: { perPage: 2, gap: "1.5rem" },
      640: { perPage: 1, gap: "1rem" },
    },
  };

  return (
    <section className="py-14 md:py-20 bg-white overflow-hidden">
      <div className="w-[95%] max-w-[1540px] mx-auto">
        <div className="bg-[#f3f4f6] rounded-2xl px-6 sm:px-12 md:px-20 py-12 md:py-16 text-center relative shadow-sm">
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2"
            data-animate="fade-up"
          >
            {heading}
          </h2>
          {subheading && (
            <p
              className="text-gray-500 text-sm md:text-base mb-8 md:mb-12"
              data-animate="fade-up"
              data-delay="100"
            >
              {subheading}
            </p>
          )}

          <div data-animate="fade-up" data-delay="200">
            <div className="results-slider-wrapper relative max-w-6xl mx-auto">
              <Splide options={splideOptions}>
                {results.map((item, index) => (
                  <SplideSlide key={index} className="px-1">
                    <div className="flex flex-col items-center">
                      {/* Image container: larger mobile size */}
                      {item.image ? (
                        <div className="relative w-[88%] sm:w-full max-w-[320px] sm:max-w-none h-[320px] sm:h-[325px] md:h-[334px] rounded-2xl md:rounded-3xl overflow-hidden bg-[#0a4b78] shadow-md mb-4 mx-auto">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="(max-width: 640px) 320px, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover object-top"
                            loading="lazy"
                          />
                        </div>
                      ) : null}
                      <h3 className="font-bold text-base md:text-lg text-black">
                        {item.name}
                      </h3>
                      <div className="text-2xl md:text-3xl font-extrabold text-brandBlue my-1">
                        {item.marks}
                      </div>
                      <div className="text-[11px] md:text-xs text-gray-500 uppercase tracking-wider font-semibold">
                        {item.exam}
                      </div>
                    </div>
                  </SplideSlide>
                ))}
              </Splide>
            </div>
          </div>

          <div className="mt-10" data-animate="zoom-in">
            <button
              type="button"
              onClick={handleOpenModal}
              className="bg-brandOrange hover:bg-orange-600 text-white font-bold py-3.5 px-8 rounded-lg shadow-lg transition duration-300 inline-flex items-center justify-center gap-2 cursor-pointer text-sm md:text-base"
            >
              <i className="fas fa-phone-alt transform -scale-x-100" />
              <span>{ctaButtonText || "Enquiry Now"}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
