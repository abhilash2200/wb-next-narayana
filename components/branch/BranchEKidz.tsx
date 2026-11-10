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

  const pillar1 = data.pillars[0];
  const pillar2 = data.pillars[1];
  const pillar3 = data.pillars[2];
  const pillar4 = data.pillars[3];

  return (
    <section className="overflow-hidden bg-[#fbfbfb] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4">
        {/* Mobile Heading */}
        <h2 className="mb-12 block text-left text-2xl font-bold text-gray-800 md:hidden">
          Academic Excellence at Every Stage
        </h2>

        {/* Desktop View - Row 1 (Image Left, Content Right) */}
        <div className="hidden items-center justify-center gap-8 md:flex">
          {/* Left Image 1 */}
          <div className="w-full md:w-[45%]" data-animate="fade-right">
            <Image
              src={data.image1 || "/assets/kidz1.webp"}
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

            {/* Pillar 1 */}
            {pillar1 && (
              <InfoBlock
                icon={pillar1.icon || "fa-book-open"}
                title={pillar1.title}
                points={pillar1.points}
                largeMargin
              />
            )}

            {/* Pillar 2 */}
            {pillar2 && (
              <InfoBlock
                icon={pillar2.icon || "fa-book-reader"}
                title={pillar2.title}
                points={pillar2.points}
              />
            )}
          </div>
        </div>

        {/* Desktop View - Row 2 (Content Left, Image 2 Right) */}
        <div className="hidden items-center justify-center gap-8 md:flex">
          {/* Left Content */}
          <div className="w-full md:w-[45%]" data-animate="fade-right">
            {/* Pillar 3 */}
            {pillar3 && (
              <InfoBlock
                icon={pillar3.icon || "fa-shield-alt"}
                title={pillar3.title}
                points={pillar3.points}
                largeMargin
              />
            )}

            {/* Pillar 4 */}
            {pillar4 && (
              <InfoBlock
                icon={pillar4.icon || "fa-city"}
                title={pillar4.title}
                points={pillar4.points}
              />
            )}
          </div>

          {/* Right Image 2 */}
          <div className="w-full md:w-[45%]" data-animate="fade-left">
            <Image
              src={data.image2 || "/assets/kidz2.webp"}
              alt="Kids playing"
              className="mb-8 h-auto w-full object-cover md:mb-10"
              width={500}
              height={500}
            />
          </div>
        </div>

        {/* Mobile View */}
        <div
          className="block rounded-md bg-[#034DA2] p-4 md:hidden"
          data-animate="fade-up"
        >
          <div className="flex flex-col">
            {/* Mobile Image */}
            <Image
              src={data.mobileImage || "/assets/mobile-kids.webp"}
              alt="Kids playing"
              className="mb-8 h-auto w-full object-cover md:mb-10"
              width={308}
              height={177}
            />

            {/* Mobile Program Heading */}
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
                "
              >
                <Image
                  src={data.badgeIcon || "/assets/user.png"}
                  alt="user"
                  className="h-10 w-10 brightness-0 invert"
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
                "
              >
                <span className="text-[22px] font-bold">
                  {data.badgeMobileTitle}
                </span>
                <span className="text-[20px] font-semibold">
                  {" "}({data.badgeMobileClass})
                </span>
              </div>
            </div>

            {/* Mobile Points */}
            <ul className="space-y-1.5 pl-1">
              {data.mobilePoints.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-2 text-[17px] text-white"
                >
                  <span className="shrink-0">
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
          </div>

          {/* Mobile Buttons */}
          <div
            className="mt-6 flex flex-col justify-center gap-4 sm:flex-row md:mt-16"
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

        {/* Desktop Buttons */}
        <div
          className="mt-6 hidden flex-col justify-center gap-4 md:mt-16 md:flex md:flex-row"
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
