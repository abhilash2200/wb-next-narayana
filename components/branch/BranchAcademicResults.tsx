"use client";

import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { BranchAcademicResultsData } from "@/data/branchStaticData";

interface BranchAcademicResultsProps {
  data: BranchAcademicResultsData;
}

export default function BranchAcademicResults({ data }: BranchAcademicResultsProps) {
  const scrollingResults = [...data.results, ...data.results];

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl rounded-2xl bg-[#d9d9d956] px-4 py-8 md:px-6 md:text-center">
        <h2 className="mb-2 text-2xl font-bold text-gray-800 md:text-3xl lg:text-4xl">
          {data.heading}
        </h2>
        <p className="mb-8 text-md text-gray-500 md:mb-12">
          {data.subheading}
        </p>

        <div
          id="branch-academic-results-slider"
          className="results-slider-wrapper relative max-w-6xl mx-auto px-2 sm:px-6"
        >
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
                  gap: "16px",
                },
              },
            }}
          >
            {scrollingResults.map((result, index) => (
              <SplideSlide key={`${result.name}-${index}`}>
                <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-brandOrange">
                    <Image
                      src={result.image}
                      alt={result.name}
                      width={128}
                      height={128}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="text-center">
                    <span className="mb-2 inline-block rounded-full bg-[#15539B] px-4 py-1 text-sm font-bold text-[#FCD200]">
                      {result.score}
                    </span>

                    <h3 className="text-lg font-bold text-gray-800">
                      {result.name}
                    </h3>

                    <p className="text-sm font-medium text-gray-500">
                      {result.exam}
                    </p>
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
