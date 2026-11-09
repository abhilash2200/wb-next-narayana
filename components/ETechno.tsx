"use client";

import Image from "next/image";
import { useModal } from "@/context/ModalContext";
import InfoBlock from "./InfoBlock";

type ETechnoProps = {
  onOpenModal?: (action: "brochure" | "fees" | "enquiry", title?: string) => void;
};

const mobilePoints = [
  "A Customized, Integrated Curriculum.",
  "Microschedule for detailed breakdown of daily activities.",
  "Dedicated mentorship for each student.",
  "Implemented Uniformly Across All Our Branches Nationwide",
  "An activity and Experience based Learning Approach",
  "Digital Classroom & Specious Playground",
  "Foster A Deeper Understanding of Concept",
  "Convenient and Safe Transportation",
];

export default function ETechno({ onOpenModal }: ETechnoProps) {
  const { openModal } = useModal();
  const handleOpenModal = onOpenModal || openModal;
  return (
    <section className="overflow-hidden bg-[#fbfbfb] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4">
{/* Desktop */}
        <div className="hidden items-center justify-center gap-8 md:flex">
          <div className="w-full md:w-[45%]" data-animate="fade-right">
            <Image
              src="/assets/techno1.webp"
              alt="Kids playing"
              width={501}
              height={502}
              className="mb-8 h-auto w-full object-cover md:mb-10"
            />
          </div>

          <div className="w-full md:w-[45%]" data-animate="fade-left">
            <ProgramHeading />

            <InfoBlock
              title="Comprehensive Curriculum"
              icon="fa-book-open"
              points={[
                "A customised, integrated curriculum.",
                "Drawing the best of all boards for deeper conceptual understanding.",
              ]}
            />

            <InfoBlock
              title="Common Micro Schedule"
              icon="fa-calendar-alt"
              points={[
                "Our expertly organised curriculum is distributed across all branches nationwide, monthly and daily",
                "The microschedule provides a detailed breakdown of daily activities",
              ]}
            />
          </div>
        </div>

        <div className="hidden items-center justify-center gap-8 md:flex">
          <div className="w-full md:w-[45%]" data-animate="fade-right">
            <InfoBlock
              title="Adoption Calling Programme"
              icon="fa-user-graduate"
              points={[
                "A dedicated mentor for each student.",
                "A regular parents Engagements.",
                "Each student can realise their full potential.",
              ]}
            />

            <InfoBlock
              title="Personalized Error Analysis and Correction"
              icon="fa-clipboard-check"
              points={[
                "A detailed documented Error list for re-learning.",
                "Categorised both by question and subject in each test.",
                "An individual error list is generated for each student.",
              ]}
            />
          </div>

          <div className="w-full md:w-[45%]" data-animate="fade-left">
            <Image
              src="/assets/techno2.webp"
              alt="Kids playing"
              width={501}
              height={502}
              className="mb-8 h-auto w-full object-cover md:mb-10"
            />
          </div>
        </div>

        <div className="hidden items-center justify-center gap-8 md:flex">
          <div className="w-full md:w-[45%]" data-animate="fade-right">
            <Image
              src="/assets/techno3.webp"
              alt="Kids playing"
              width={501}
              height={502}
              className="mb-8 h-auto w-full object-cover md:mb-10"
            />
          </div>

          <div className="w-full md:w-[45%]" data-animate="fade-left">
            <InfoBlock
              title="DISHA Mental Wellness Programme"
              icon="fa-heart"
              points={[
                "Disha Programme focuses on comprehensive well-being.",
                "Offers extensive mental and emotional support.",
                "A child's growth goes beyond academics.",
              ]}
            />

            <InfoBlock
              title="Olympiad Programme"
              icon="fa-award"
              points={[
                "Designed for Olympiad aspirants.",
                "Focus is on comprehensive learning.",
                "Integrates practical applications.",
                "Encourages students to think critically & stand out.",
              ]}
            />
          </div>
        </div>

        {/* Mobile */}
        <div className="rounded-md bg-[#FF7600] p-4 md:hidden" data-animate="fade-up">
          <Image
            src="/assets/mobile-girl.webp"
            alt="Kids playing"
            width={308}
            height={177}
            className="mb-8 h-auto w-full object-cover"
          />

          <ProgramHeading mobile />

          <ul className="space-y-1.5 pl-1">
            {mobilePoints.map((point) => (
              <li
                key={point}
                className="flex items-center gap-2 text-[17px] text-white"
              >
                <span>
                  <Image
                    src="/assets/small-book-icon.png"
                    alt=""
                    width={17}
                    height={15}
                    className="h-auto w-auto"
                  />
                </span>

                {point}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col justify-center gap-4" data-animate="zoom-in" data-delay="200">
            <button
              type="button"
              onClick={() => handleOpenModal("fees", "Get Fee Structure For eTechno")}
              className="w-full rounded bg-[#F5821F] px-8 py-3 font-bold text-white shadow-lg"
            >
              Get Fee Structure For eTechno
            </button>

            <button
              type="button"
              onClick={() => handleOpenModal("brochure", "Download Brochure")}
              className="w-full rounded bg-brandBlueDark px-8 py-3 font-bold text-white shadow-lg"
            >
              <i className="fas fa-download mr-2" />
              Download Brochure
            </button>

            <button
              type="button"
              onClick={() => handleOpenModal("enquiry", "Get Call Back for Your Query")}
              className="w-full rounded border border-gray-300 bg-white px-8 py-3 font-bold text-gray-700 shadow"
            >
              <i className="fas fa-headset mr-2 text-[#F5821F]" />
              Get Call Back for Your Query
            </button>
          </div>
        </div>

        {/* Desktop buttons */}
        <div className="mt-10 hidden justify-center gap-4 md:flex md:mt-16" data-animate="zoom-in" data-delay="200">
          <button
            type="button"
            onClick={() => handleOpenModal("fees", "Get Fee Structure For eTechno")}
            className="rounded bg-[#F5821F] px-8 py-3 font-bold text-white shadow-lg md:px-16"
          >
            Get Fee Structure For eTechno
          </button>

          <button
            type="button"
            onClick={() => handleOpenModal("brochure", "Download Brochure")}
            className="rounded bg-brandBlueDark px-8 py-3 font-bold text-white shadow-lg md:px-16"
          >
            <i className="fas fa-download mr-2" />
            Download Brochure
          </button>

          <button
            type="button"
            onClick={() => handleOpenModal("enquiry", "Get Call Back for Your Query")}
            className="rounded border border-gray-300 bg-white px-8 py-3 font-bold text-gray-700 shadow"
          >
            <i className="fas fa-headset mr-2 text-[#F5821F]" />
            Get Call Back for Your Query
          </button>
        </div>
      </div>
    </section>
  );
}

function ProgramHeading({ mobile = false }: { mobile?: boolean }) {
  return (
    <div className="mb-6 flex items-center justify-center md:mb-8 md:justify-start">
      <div className="relative z-10 flex h-16 w-20 items-center justify-center rounded-full border-2 border-[#F5821F] bg-[#4782ED] md:h-20 md:w-20">
        <Image
          src={mobile ? "/assets/user.png" : "/assets/microscop.png"}
          alt="user"
          width={40}
          height={40}
          className="h-10 w-10 brightness-0 invert"
        />
      </div>

      <div
        className={`
          -ml-6 rounded-md px-8 py-3 text-white
          md:-ml-8 md:w-76.25 md:px-12
          ${mobile ? "bg-[#034DA2] w-full" : "bg-[#F5821F]"}
        `}
      >
        <span className="text-[22px] font-bold md:text-[18px]">
          {mobile ? "Class 6 to 10" : "eTechno"}
        </span>

        <span className="text-[20px] font-semibold md:text-[18px]">
          {mobile ? " (eTechno)" : " (Class 6 to 10)"}
        </span>
      </div>
    </div>
  );
}
