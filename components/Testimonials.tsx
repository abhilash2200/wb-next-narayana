"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

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
  const scrollingTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-16 md:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Heading matching index.html line 2279 */}
        <h2
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 md:text-center text-left mb-3 md:mb-16"
          data-animate="fade-up"
        >
          What parents say about Narayana?
        </h2>

        {/* Slider matching index.html line 2284 & main.js */}
        <div data-animate="fade-up" data-delay="100">
          <div
            id="testimonial-slider"
            className="testimonial-slider splide max-w-6xl mx-auto"
            aria-label="Parent Testimonials"
          >
            <Splide
              options={{
                type: "loop",
                perPage: 3,
                perMove: 1,
                gap: "1.5rem",
                padding: "0.5rem",
                pagination: true,
                arrows: false,
                autoplay: false,
                drag: true,
                swipe: true,
                speed: 600,
                breakpoints: {
                  1024: {
                    perPage: 2,
                    gap: "1.5rem",
                    padding: "0.5rem",
                  },
                  640: {
                    perPage: 1,
                    gap: "1rem",
                    padding: "0rem",
                  },
                },
              }}
            >
              {scrollingTestimonials.map((testimonial, index) => (
                <SplideSlide key={`${testimonial.name}-${index}`} className="md:p-2 h-auto">
                  <div className="border border-orange-300 rounded-xl p-5 md:p-6 bg-white h-full flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
                    <div>
                      {/* Parent information */}
                      <div className="flex items-center gap-3 md:gap-4 mb-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-orange-200 flex items-center justify-center bg-orange-50 shrink-0">
                          <i className="far fa-user text-brandOrange text-lg md:text-xl" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 text-base md:text-lg leading-tight">
                            {testimonial.name}
                          </h4>
                          <p className="text-md md:text-base text-gray-500 mt-0.5">
                            {testimonial.location}
                          </p>
                        </div>
                      </div>

                      {/* Testimonial Quote */}
                      <p className="text-gray-600 text-md md:text-base leading-relaxed mb-6">
                        {testimonial.text}
                      </p>
                    </div>

                    {/* Star Rating */}
                    <div className="text-yellow-400 text-md md:text-base flex gap-1">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
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
