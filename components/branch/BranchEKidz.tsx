"use client";

import Image from "next/image";
import { useModal } from "@/context/ModalContext";
import { BranchStageData } from "@/data/branchStaticData";
import InfoBlock from "@/components/InfoBlock";

interface BranchEKidzProps {
  data: BranchStageData;
  onOpenModal?: (action: "brochure" | "fees" | "enquiry", title?: string) => void;
}

export default function BranchEKidz({ data, onOpenModal }: BranchEKidzProps) {
  const { openModal } = useModal();
  const handleOpenModal = onOpenModal || openModal;

  return (
    <section className="overflow-hidden bg-[#fbfbfb] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4">
        {/* Mobile Heading */}
        <h2 className="mb-12 block text-left text-2xl font-bold text-gray-800 md:hidden">
          Academic Excellence at Every Stage
        </h2>

        {/* Desktop View */}
        <div className="hidden items-center justify-center gap-8 md:flex">
          {/* Left Image */}
          <div className="w-full md:w-[45%]" data-animate="fade-right">
            <Image
              src={data.image1}
              alt="Kids playing"
              className="mb-8 h-auto w-full object-cover md:mb-10"
              width={500}
              height={500}
            />
          </div>

          {/* Right Content */}
          <div className="w-full md:w-[45%]" data-animate="fade-left">
            {/* Program Heading Badge */}
            <div className="group mb-6 flex items-center justify-center md:mb-8 md:justify-start">
              <div
                className="
                  relative z-10 flex h-16 w-20 items-center justify-center
                  rounded-full border-2 border-[#F5821F]
                  bg-[#4782ED]
                  text-sm font-bold text-white
                  transition-all duration-300
                  group-hover:scale-110
                  group-hover:bg-[#F5821F]
                  md:h-20 md:w-20
                "
              >
                <Image
                  src={data.badgeIcon || "/assets/user.png"}
                  alt="user"
                  className="h-10 w-10 brightness-0 invert md:h-8 md:w-8"
                  width={40}
                  height={40}
                />
              </div>

              <div
                className="
                  -ml-6 w-full rounded-md bg-[#F5821F]
                  px-8 py-3 text-white
                  transition-colors duration-300
                  group-hover:bg-[#4782ED]
                  md:-ml-8 md:w-76.25 md:px-12
                "
              >
                <span className="text-lg font-bold md:text-[18px]">
                  {data.badgeDesktopTitle}
                </span>
                <span className="text-sm font-semibold md:text-[18px]">
                  {data.badgeDesktopClass}
                </span>
              </div>
            </div>

            {/* Stage Pillars */}
            {data.pillars.map((pillar, idx) => (
              <InfoBlock
                key={pillar.title}
                icon={pillar.icon}
                title={pillar.title}
                points={pillar.points}
                largeMargin={idx === data.pillars.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Mobile View */}
        <div
          className="rounded-md bg-[#15539B] p-4 md:hidden"
          data-animate="fade-up"
        >
          {/* Header */}
          <div className="mb-6 flex items-center justify-center">
            <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#F5821F] bg-[#4782ED]">
              <Image
                src={data.badgeIcon || "/assets/user.png"}
                alt="user"
                width={32}
                height={32}
                className="brightness-0 invert"
              />
            </div>

            <div className="-ml-6 w-full rounded-md bg-[#F5821F] px-8 py-3 text-white">
              <span className="text-[22px] font-bold">
                {data.badgeMobileTitle}
              </span>
              <span className="text-[20px] font-semibold">
                {" "}({data.badgeMobileClass})
              </span>
            </div>
          </div>

          {/* Mobile Image */}
          <div className="mb-4">
            <Image
              src={data.mobileImage || data.image1}
              alt="Kids playing"
              width={500}
              height={300}
              className="h-auto w-full rounded-md object-cover"
            />
          </div>

          {/* Mobile Points List */}
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

          {/* Mobile CTA Buttons */}
          <div className="mt-6 flex flex-col justify-center gap-4">
            <button
              type="button"
              onClick={() => handleOpenModal("fees", data.feeButtonText || "Get Fee Structure For eKidz")}
              className="w-full rounded bg-[#F5821F] px-8 py-3 font-bold text-white shadow-lg cursor-pointer"
            >
              {data.feeButtonText || "Get Fee Structure For eKidz"}
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

        {/* Desktop CTA Buttons */}
        <div
          className="mt-10 hidden justify-center gap-4 md:flex md:mt-16"
          data-animate="zoom-in"
          data-delay="200"
        >
          <button
            type="button"
            onClick={() => handleOpenModal("fees", data.feeButtonText || "Get Fee Structure For eKidz")}
            className="
              open-modal-btn w-full rounded bg-[#F5821F]
              px-8 py-3 font-bold text-white shadow-lg
              transition hover:bg-[#e06d0e]
              sm:w-auto md:px-16 cursor-pointer
            "
          >
            {data.feeButtonText || "Get Fee Structure For eKidz"}
          </button>

          <button
            type="button"
            onClick={() => handleOpenModal("brochure", "Download Brochure")}
            className="
              open-modal-btn w-full rounded bg-brandBlueDark
              px-8 py-3 font-bold text-white shadow-lg
              transition hover:bg-[#15539B]
              sm:w-auto md:px-16 cursor-pointer
            "
          >
            <i className="fas fa-download mr-2" />
            Download Brochure
          </button>

          <button
            type="button"
            onClick={() => handleOpenModal("enquiry", "Get Call Back for Your Query")}
            className="
              open-modal-btn w-full rounded border border-gray-300
              bg-white px-8 py-3 font-bold text-gray-700 shadow
              transition hover:bg-gray-50
              sm:w-auto cursor-pointer
            "
          >
            <i className="fas fa-headset mr-2 text-[#F5821F]" />
            Get Call Back for Your Query
          </button>
        </div>
      </div>
    </section>
  );
}
