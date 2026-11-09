"use client";

import Image from "next/image";
import { useModal } from "@/context/ModalContext";
import InfoBlock from "./InfoBlock";

type SeniorSecondaryProps = {
  onOpenModal?: (action: "brochure" | "fees" | "enquiry", title?: string) => void;
};

const mobilePoints = [
  "Additional teaching for IIT, NEET, CA-CPT, And UPSC",
  "We prepare students for more than just subject knowledge.",
  "Teach them to Maintain a disciplined for their passions along with Study.",
  "Teach them to Stay Calm under pressure of Study and life",
  "Teach them a Self-study and research to succeed in Competitive exams",
  "Our Aim is to help Students to become independent Learners.",
  "A customised, integrated curriculum drawing best of CBSE, and others boards.",
];

export default function SeniorSecondary({ onOpenModal }: SeniorSecondaryProps) {
  const { openModal } = useModal();
  const handleOpenModal = onOpenModal || openModal;
  return (
    <section className="overflow-hidden bg-[#f1f9ff] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4">
        {/* Desktop */}
        <div className="hidden items-center justify-center gap-8 md:flex">
          <div className="w-full md:w-[45%]" data-animate="fade-right">
            <Image
              src="/assets/secondary1.webp"
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
                "Additional teaching for IIT, NEET, CA-CPT, and UPSC.",
                "Students need more than just subject knowledge",
                "They require a comprehensive set of life skills.",
              ]}
            />

            <InfoBlock
              title="Time Management"
              icon="fa-clock"
              points={[
                "Essential to balancing academic responsibilities with other activities.",
                "Balancing competitive exam preparations and extracurricular activities.",
                "Maintain a disciplined study routine while pursuing their passions.",
              ]}
            />
          </div>
        </div>

        <div className="hidden items-center justify-center gap-8 md:flex">
          <div className="w-full md:w-[45%]" data-animate="fade-right">
            <InfoBlock
              title="Stress Management"
              icon="fa-heart"
              points={[
                "Senior secondary education can be stressful.",
                "Stress management techniques help to stay calm under pressure.",
                "Focus on their goals, and perform at their best during exams.",
              ]}
            />

            <InfoBlock
              title="Research and self-study skills"
              icon="fa-search"
              points={[
                "Success in competitive exams is important.",
                "Students must excel in self-study and research.",
                "We provide guidance and resources.",
              ]}
            />
          </div>

          <div className="w-full md:w-[45%]" data-animate="fade-left">
            <Image
              src="/assets/secondary2.webp"
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
            src="/assets/mobile-cls-10.webp"
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
              onClick={() => handleOpenModal("fees", "Get Fee Structure For SR. Secondary")}
              className="w-full rounded bg-[#F5821F] px-8 py-3 font-bold text-white shadow-lg"
            >
              Get Fee Structure For SR. Secondary
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
            onClick={() => handleOpenModal("fees", "Get Fee Structure For SR. Secondary")}
            className="rounded bg-[#F5821F] px-8 py-3 font-bold text-white shadow-lg md:px-16"
          >
            Get Fee Structure For SR. Secondary
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
          src={mobile ? "/assets/user.png" : "/assets/hat.png"}
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
          {mobile ? "Class 11 & 12" : "SR. Secondary"}
        </span>

        <span className="text-[20px] font-semibold md:text-[18px]">
          {mobile ? " (SR. Secondary)" : " (Class 11 & 12)"}
        </span>
      </div>
    </div>
  );
}
