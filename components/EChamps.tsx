"use client";

import Image from "next/image";
import { useModal } from "@/context/ModalContext";
import InfoBlock from "./InfoBlock";

type EChampsProps = {
  onOpenModal?: (action: "brochure" | "fees" | "enquiry", title?: string) => void;
};

const mobilePoints = [
  "Focus on overall development of the child",
  "Academic excellence blends with other skills",
  "Curriculum broken down into daily & Monthly Module",
  "Implemented Uniformly Across All Our Branches Nationwide",
  "An activity and Experience based Learning Approach",
  "Digital Classroom & Specious Playground",
  "Foster A Deeper Understanding of Concept",
  "Convenient and Safe Transportation",
];

export default function EChamps({ onOpenModal }: EChampsProps) {
  const { openModal } = useModal();
  const handleOpenModal = onOpenModal || openModal;
  return (
    <section className="overflow-hidden bg-[#f1f9ff] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4">
        {/* Desktop */}
        <div className="hidden items-center justify-center gap-8 md:flex">
          <div className="w-full md:w-[45%]" data-animate="fade-right">
            <Image
              src="/assets/Champ1.webp"
              alt="Kids playing"
              width={501}
              height={502}
              className="mb-8 h-auto w-full object-cover md:mb-10"
            />
          </div>

          <div className="w-full md:w-[45%]" data-animate="fade-left">
            <ProgramHeading />

            <InfoBlock
              title="Our Unique Approach to Learning"
              icon="fa-lightbulb"
              points={[
                "Focus on overall development of the child",
                "Academic excellence blends with other skills",
                "Creating a safe and nurturing learning environment",
              ]}
            />

            <InfoBlock
              title="Common Micro Schedule"
              icon="fa-calendar-alt"
              points={[
                "Curriculum broken down into daily and monthly modules.",
                "IImplemented uniformly across all our branches nationwide.",
              ]}
            />
          </div>
        </div>

        <div className="hidden items-center justify-center gap-8 md:flex">
          <div className="w-full md:w-[45%]" data-animate="fade-right">
            <InfoBlock
              title="Conceptual Understanding"
              icon="fa-brain"
              points={[
                "An activity-based learning approach (Classes 1-2).",
                "Older students benefit from experiential learning (Classes 3-5).",
                "Fosters a deeper understanding of concepts.",
              ]}
            />

            <InfoBlock
              title="Safe & Positive Learning Environment"
              icon="fa-shield-alt"
              points={[
                "A space where students feel motivated and supported.",
                "Spacious play areas and convenient transport facilities.",
              ]}
            />
          </div>

          <div className="w-full md:w-[45%]" data-animate="fade-left">
            <Image
              src="/assets/Champ2.webp"
              alt="Kids playing"
              width={501}
              height={502}
              className="mb-8 h-auto w-full object-cover md:mb-10"
            />
          </div>
        </div>

        {/* Mobile */}
        <div className="rounded-md bg-[#FF7600] p-4 md:hidden" data-animate="fade-up">
          <Image
            src="/assets/mobile-champs.webp"
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
              onClick={() => handleOpenModal("fees", "Get Fee Structure For eChamps")}
              className="w-full rounded bg-[#F5821F] px-8 py-3 font-bold text-white shadow-lg"
            >
              Get Fee Structure For eChamps
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
            onClick={() => handleOpenModal("fees", "Get Fee Structure For eChamps")}
            className="rounded bg-[#F5821F] px-8 py-3 font-bold text-white shadow-lg md:px-16"
          >
            Get Fee Structure For eChamps
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
          src={mobile ? "/assets/user.png" : "/assets/big-book-icon.png"}
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
          {mobile ? "Class 1 to 5" : "eChamps"}
        </span>

        <span className="text-[20px] font-semibold md:text-[18px]">
          {mobile ? " (eChamps)" : " (Class 1 to 5)"}
        </span>
      </div>
    </div>
  );
}
