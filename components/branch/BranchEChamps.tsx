"use client";

import Image from "next/image";
import { useModal } from "@/context/ModalContext";
import { BranchStageData } from "@/data/branchStaticData";
import InfoBlock from "@/components/InfoBlock";

interface BranchEChampsProps {
  data: BranchStageData;
  onOpenModal?: (action: "brochure" | "fees" | "enquiry", title?: string) => void;
}

export default function BranchEChamps({ data, onOpenModal }: BranchEChampsProps) {
  const { openModal } = useModal();
  const handleOpenModal = onOpenModal || openModal;

  const firstTwoPillars = data.pillars.slice(0, 2);
  const nextTwoPillars = data.pillars.slice(2, 4);

  return (
    <section className="overflow-hidden bg-[#f1f9ff] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4">
        {/* Desktop View Row 1 */}
        <div className="hidden items-center justify-center gap-8 md:flex">
          <div className="w-full md:w-[45%]" data-animate="fade-right">
            <Image
              src={data.image1}
              alt="Kids learning"
              width={501}
              height={502}
              className="mb-8 h-auto w-full object-cover md:mb-10"
            />
          </div>

          <div className="w-full md:w-[45%]" data-animate="fade-left">
            {/* Program Heading Badge */}
            <div className="mb-6 flex items-center justify-center md:mb-8 md:justify-start">
              <div className="relative z-10 flex h-16 w-20 items-center justify-center rounded-full border-2 border-[#F5821F] bg-[#4782ED] md:h-20 md:w-20">
                <Image
                  src={data.badgeIcon || "/assets/big-book-icon.png"}
                  alt="icon"
                  width={40}
                  height={40}
                  className="h-10 w-10 brightness-0 invert"
                />
              </div>

              <div className="-ml-6 rounded-md px-8 py-3 text-white md:-ml-8 md:w-76.25 md:px-12 bg-[#F5821F]">
                <span className="text-[22px] font-bold md:text-[18px]">
                  {data.badgeDesktopTitle}
                </span>
                <span className="text-[20px] font-semibold md:text-[18px]">
                  {data.badgeDesktopClass}
                </span>
              </div>
            </div>

            {firstTwoPillars.map((pillar) => (
              <InfoBlock
                key={pillar.title}
                title={pillar.title}
                icon={pillar.icon}
                points={pillar.points}
              />
            ))}
          </div>
        </div>

        {/* Desktop View Row 2 */}
        <div className="hidden items-center justify-center gap-8 md:flex">
          <div className="w-full md:w-[45%]" data-animate="fade-right">
            {nextTwoPillars.map((pillar) => (
              <InfoBlock
                key={pillar.title}
                title={pillar.title}
                icon={pillar.icon}
                points={pillar.points}
              />
            ))}
          </div>

          <div className="w-full md:w-[45%]" data-animate="fade-left">
            <Image
              src={data.image2 || data.image1}
              alt="Kids learning"
              width={501}
              height={502}
              className="mb-8 h-auto w-full object-cover md:mb-10"
            />
          </div>
        </div>

        {/* Mobile View */}
        <div
          className="rounded-md bg-[#FF7600] p-4 md:hidden"
          data-animate="fade-up"
        >
          <Image
            src={data.mobileImage || "/assets/mobile-champs.webp"}
            alt="Mobile banner"
            width={500}
            height={300}
            className="mb-4 h-auto w-full rounded-md object-cover"
          />

          {/* Header */}
          <div className="mb-6 flex items-center justify-center">
            <div className="relative z-10 flex h-16 w-20 items-center justify-center rounded-full border-2 border-[#F5821F] bg-[#4782ED]">
              <Image
                src="/assets/user.png"
                alt="user"
                width={40}
                height={40}
                className="h-10 w-10 brightness-0 invert"
              />
            </div>

            <div className="-ml-6 w-full rounded-md px-8 py-3 text-white bg-[#034DA2]">
              <span className="text-[22px] font-bold">
                {data.badgeMobileTitle}
              </span>
              <span className="text-[20px] font-semibold">
                {data.badgeMobileClass}
              </span>
            </div>
          </div>

          <ul className="space-y-3 text-sm text-white">
            {data.mobilePoints.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <i className="far fa-check-circle mt-1 shrink-0 text-white" />
                <span className="text-md font-medium text-white">
                  {point}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col justify-center gap-4">
            <button
              type="button"
              onClick={() => handleOpenModal("fees", data.feeButtonText || "Get Fee Structure For eChamps")}
              className="w-full rounded bg-[#034DA2] px-8 py-3 font-bold text-white shadow-lg cursor-pointer"
            >
              {data.feeButtonText || "Get Fee Structure For eChamps"}
            </button>

            <button
              type="button"
              onClick={() => handleOpenModal("brochure", "Download Brochure")}
              className="w-full rounded bg-brandBlueDark px-8 py-3 font-bold text-white shadow-lg cursor-pointer"
            >
              <i className="fas fa-download mr-2" />
              Download Brochure
            </button>

            <button
              type="button"
              onClick={() => handleOpenModal("enquiry", "Get Call Back for Your Query")}
              className="w-full rounded border border-gray-300 bg-white px-8 py-3 font-bold text-gray-700 shadow cursor-pointer"
            >
              <i className="fas fa-headset mr-2 text-[#F5821F]" />
              Get Call Back for Your Query
            </button>
          </div>
        </div>

        {/* Desktop CTA buttons */}
        <div
          className="mt-10 hidden justify-center gap-4 md:flex md:mt-16"
          data-animate="zoom-in"
          data-delay="200"
        >
          <button
            type="button"
            onClick={() => handleOpenModal("fees", data.feeButtonText || "Get Fee Structure For eChamps")}
            className="rounded bg-[#F5821F] px-8 py-3 font-bold text-white shadow-lg md:px-16 cursor-pointer hover:bg-[#e06d0e] transition"
          >
            {data.feeButtonText || "Get Fee Structure For eChamps"}
          </button>

          <button
            type="button"
            onClick={() => handleOpenModal("brochure", "Download Brochure")}
            className="rounded bg-brandBlueDark px-8 py-3 font-bold text-white shadow-lg md:px-16 cursor-pointer hover:bg-[#15539B] transition"
          >
            <i className="fas fa-download mr-2" />
            Download Brochure
          </button>

          <button
            type="button"
            onClick={() => handleOpenModal("enquiry", "Get Call Back for Your Query")}
            className="rounded border border-gray-300 bg-white px-8 py-3 font-bold text-gray-700 shadow cursor-pointer hover:bg-gray-50 transition"
          >
            <i className="fas fa-headset mr-2 text-[#F5821F]" />
            Get Call Back for Your Query
          </button>
        </div>
      </div>
    </section>
  );
}
