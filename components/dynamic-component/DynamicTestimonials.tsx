"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { DynamicTestimonialsData } from "@/types/dynamic-page";

export default function DynamicTestimonials({
  heading,
  subheading,
  testimonials = [],
}: DynamicTestimonialsData) {
  if (!testimonials || testimonials.length === 0) return null;

  const splideOptions = {
    type: "loop" as const,
    perPage: 3,
    perMove: 1,
    gap: "1.5rem",
    pagination: true,
    arrows: false,
    breakpoints: {
      1024: { perPage: 2 },
      640: { perPage: 1 },
    },
  };

  return (
    <section className="py-16 md:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="md:text-center text-left mb-10 md:mb-14" data-animate="fade-up">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
            {heading}
          </h2>
          {subheading && (
            <p className="text-gray-500 text-base md:text-lg">{subheading}</p>
          )}
        </div>

        <div data-animate="fade-up" data-delay="100">
          <div className="max-w-6xl mx-auto testimonial-slider">
            <Splide options={splideOptions}>
              {testimonials.map((item, index) => (
                <SplideSlide key={index} className="pb-10 pt-2 px-2">
                  <div className="border border-orange-300 rounded-2xl p-6 bg-white h-full flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
                    <div>
                      <div className="flex items-center gap-3 md:gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full border border-orange-200 flex items-center justify-center bg-orange-50 shrink-0">
                          <i className="far fa-user text-brandOrange text-lg md:text-xl" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 text-base md:text-lg leading-tight">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-500 mt-0.5">
                            {item.location}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                        &quot;{item.quote}&quot;
                      </p>
                    </div>

                    <div className="text-yellow-400 text-base flex gap-1">
                      {Array.from({ length: item.rating || 5 }).map((_, sIdx) => (
                        <i key={sIdx} className="fas fa-star" />
                      ))}
                    </div>
                  </div>
                </SplideSlide>
              ))}
            </Splide>
          </div>
        </div>
      </div>
    </section>
  );
}
