"use client";

import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useModal } from "@/context/ModalContext";
import { DynamicLearningOutcomesData } from "@/types/dynamic-page";

interface DynamicLearningOutcomesProps extends DynamicLearningOutcomesData {
  onOpenModal?: (action: "brochure" | "fees", title?: string) => void;
}

export default function DynamicLearningOutcomes({
  heading,
  subheading,
  outcomes = [],
  onOpenModal,
}: DynamicLearningOutcomesProps) {
  const { openModal } = useModal();
  const handleOpenModal = onOpenModal || openModal;

  if (!outcomes || outcomes.length === 0) return null;

  const splideOptions = {
    type: "loop" as const,
    perPage: 4,
    perMove: 1,
    gap: "1.25rem",
    pagination: false,
    arrows: true,
    breakpoints: {
      1280: { perPage: 3 },
      1024: { perPage: 2 },
      640: { perPage: 1 },
    },
  };

  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="md:text-center text-left mb-10 md:mb-12" data-animate="fade-up">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
            {heading}
          </h2>
          {subheading && (
            <p className="text-gray-500 text-md md:text-base">{subheading}</p>
          )}
        </div>

        <div
          id="dynamic-programs-slider"
          className="programs-slider-wrapper relative"
          aria-label="Academic Programs"
          data-animate="fade-up"
          data-delay="100"
        >
          <Splide options={splideOptions}>
            {outcomes.map((item, index) => (
              <SplideSlide key={index} className="py-2">
                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100">
                  {item.image ? (
                    <div className="md:h-64 h-48 relative rounded-t-2xl overflow-hidden bg-[#15539B]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                  ) : null}

                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-gray-800 text-[18px] md:text-[19px] font-bold mb-3 leading-snug">
                        {item.title}
                      </h3>
                      <ul className="space-y-2 text-[14px] md:text-[15px] font-medium text-gray-600">
                        {item.points.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-brandBlue mt-2 mr-2.5 shrink-0" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex text-white text-sm font-semibold mt-auto">
                    <button
                      type="button"
                      onClick={() => handleOpenModal("brochure", "Download Brochure")}
                      className="w-1/2 bg-brandOrange hover:bg-brandOrangeDark py-3 transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <i className="fas fa-download text-xs" />
                      <span>Brochure</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenModal("fees", "Get Fee Structure")}
                      className="w-1/2 bg-brandBlue hover:bg-brandBlueDark py-3 transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <i className="fas fa-download text-xs" />
                      <span>Fees</span>
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
