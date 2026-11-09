"use client";

import { useEffect, useRef } from "react";
import Splide from "@splidejs/splide";
import "@splidejs/splide/css";

const testimonials = [
  {
    name: "Noor Alam",
    location: "Fulbari",
    text: "Narayana has exceeded our expectations in every way. The emphasis on values, discipline, and academic rigor is helping shape our child into a responsible and capable young adult.",
  },
  {
    name: "Radhey Shyam Shaw",
    location: "Howrah",
    text: "The supportive and encouraging atmosphere at Narayana has allowed my child to thrive. We appreciate the dedicated staff and their personalized approach to education.which is very good.",
  },
  {
    name: "Shubadip Bhiswas",
    location: "Kalyani Town",
    text: "Narayana has transformed my child's learning experience. The teachers are dedicated.My child looks forward to school every day, which speaks volumes about the positive environment here.",
  },
];

export default function Testimonial() {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sliderRef.current) return;

    const splide = new Splide(sliderRef.current, {
      type: "loop",
      perPage: 4,
      perMove: 1,
      gap: "1rem",
      pagination: false,
      arrows: false,
      autoplay: false,
      drag: true,
      swipe: true,
      keyboard: true,
      speed: 600,
      breakpoints: {
        1023: {
          perPage: 2,
        },
        767: {
          perPage: 1,
        },
      },
    });

    splide.mount();

    return () => {
      splide.destroy();
    };
  }, []);

  return (
    <section className="overflow-hidden bg-white py-16 md:py-20">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2
          className="mb-3 text-left text-2xl font-bold text-gray-800 md:mb-16 md:text-center md:text-3xl lg:text-4xl"
          data-animate="fade-up"
        >
          What parents say about Narayana?
        </h2>

        {/* Slider */}
        <div data-animate="fade-up" data-delay="100">
          <div
            ref={sliderRef}
            className="splide mx-auto"
            aria-label="Parent Testimonials"
          >
            <div className="splide__track md:pb-12">
              <ul className="splide__list">
                {testimonials.map((testimonial) => (
                  <li
                    key={testimonial.name}
                    className="splide__slide h-auto p-2"
                  >
                    <div className="flex h-full flex-col justify-between rounded-xl border border-orange-300 bg-white p-5 transition-shadow duration-300 hover:shadow-lg md:p-6">
                      <div>
                        {/* Parent information */}
                        <div className="mb-4 flex items-center gap-3 md:gap-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-orange-200 bg-orange-50 md:h-12 md:w-12">
                            <i className="far fa-user text-lg text-brandOrange md:text-xl" />
                          </div>

                          <div>
                            <h4 className="text-base font-bold leading-tight text-gray-800 md:text-lg">
                              {testimonial.name}
                            </h4>

                            <p className="mt-0.5 text-xs text-gray-500 md:text-sm">
                              {testimonial.location}
                            </p>
                          </div>
                        </div>

                        {/* Testimonial */}
                        <p className="mb-6 text-xs leading-relaxed text-gray-600 md:text-sm">
                          {testimonial.text}
                        </p>
                      </div>

                      {/* Stars */}
                      <div className="flex gap-1 text-xs text-yellow-400 md:text-sm">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}