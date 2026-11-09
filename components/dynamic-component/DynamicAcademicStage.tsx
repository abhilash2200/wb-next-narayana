"use client";

import Image from "next/image";
import { useModal } from "@/context/ModalContext";
import { DynamicAcademicStageData } from "@/types/dynamic-page";

export interface DynamicAcademicStageProps extends DynamicAcademicStageData {
  onOpenModal?: (action: "brochure" | "fees" | "enquiry", title?: string) => void;
}

export default function DynamicAcademicStage({
  heading,
  badgeTitle = "",
  badgeSubtitle = "",
  badgeIcon,
  imageLeft,
  imageRight,
  mobileImage,
  pillars = [],
  mobilePoints = [],
  feesButtonText,
  feesButtonUrl,
  brochureButtonText,
  brochureButtonUrl,
  callbackButtonText,
  callbackButtonUrl,
  onOpenModal,
}: DynamicAcademicStageProps) {
  const { openModal } = useModal();
  const handleOpenModal = onOpenModal || openModal;

  const handleBtnClick = (
    action: "fees" | "brochure" | "enquiry",
    title: string,
    url?: string | null
  ) => {
    if (url && (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/"))) {
      window.open(url, "_blank");
      return;
    }
    handleOpenModal(action, title);
  };

  if (
    (!pillars || pillars.length === 0) &&
    (!mobilePoints || mobilePoints.length === 0) &&
    !imageLeft &&
    !imageRight
  ) {
    return null;
  }

  const firstHalfPillars = pillars.slice(0, 2);
  const secondHalfPillars = pillars.slice(2, 4);

  return (
    <section className="py-12 md:py-20 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {heading && (
          <h2
            className="text-left text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-10 md:mb-12 block md:hidden"
            data-animate="fade-up"
          >
            {heading}
          </h2>
        )}

        {/* DESKTOP ROW 1 */}
        <div className="justify-center items-center gap-10 lg:gap-14 hidden md:flex mb-16">
          {Boolean(imageLeft) && (
            <div className="w-full md:w-1/2" data-animate="fade-right">
              <Image
                src={imageLeft!}
                alt={badgeTitle || "Stage image"}
                width={560}
                height={560}
                className="w-full h-auto rounded-[32px] object-cover"
                loading="lazy"
              />
            </div>
          )}

          <div className="w-full md:w-1/2" data-animate="fade-left">
            {/* Stage Pill Badge */}
            {(badgeTitle || badgeIcon) && (
              <div className="flex items-center mb-6 md:mb-8 justify-start">
                <div className="bg-[#4782ED] text-white w-14 h-14 md:w-16 md:h-16 flex justify-center items-center rounded-full relative z-10 shrink-0 shadow-md">
                  {badgeIcon ? (
                    <Image
                      src={badgeIcon}
                      alt={badgeTitle || "Course badge icon"}
                      width={32}
                      height={32}
                      className="brightness-0 invert object-contain"
                    />
                  ) : (
                    <i className="fas fa-graduation-cap text-2xl" />
                  )}
                </div>
                {badgeTitle && (
                  <div className="-ml-6 bg-[#F5821F] w-auto max-w-full text-white pl-10 pr-8 py-3 rounded-md shadow-md">
                    <span className="text-lg md:text-[18px] font-bold">
                      {badgeTitle}
                    </span>
                    {badgeSubtitle && (
                      <span className="text-sm md:text-[18px] font-semibold ml-1.5">
                        {badgeSubtitle}
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Pillars in First Row */}
            {firstHalfPillars.map((pillar, idx) => (
              <div key={idx} className={idx === 0 ? "mb-8 md:mb-10" : ""}>
                <div className="flex items-center gap-3 mb-3">
                  <i className={`${pillar.icon} text-xl md:text-2xl text-gray-700`} />
                  <h3 className="text-lg md:text-[20px] font-bold text-gray-800">
                    {pillar.title}
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 pl-1">
                  {pillar.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start">
                      <i className="far fa-check-circle mr-2 mt-1 shrink-0 text-gray-400" />
                      <span className="text-sm font-medium md:text-[16px] text-gray-600">
                        {pt}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP ROW 2 */}
        <div className="justify-center items-center gap-10 lg:gap-14 hidden md:flex">
          <div className="w-full md:w-1/2" data-animate="fade-right">
            {secondHalfPillars.map((pillar, idx) => (
              <div key={idx} className={idx === 0 ? "mb-8 md:mb-10" : ""}>
                <div className="flex items-center gap-3 mb-3">
                  <i className={`${pillar.icon} text-xl md:text-2xl text-gray-700`} />
                  <h3 className="text-lg md:text-[20px] font-bold text-gray-800">
                    {pillar.title}
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 pl-1">
                  {pillar.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start">
                      <i className="far fa-check-circle mr-2 mt-1 shrink-0 text-gray-400" />
                      <span className="text-sm font-medium md:text-[16px] text-gray-600">
                        {pt}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {Boolean(imageRight) && (
            <div className="w-full md:w-1/2" data-animate="fade-left">
              <Image
                src={imageRight!}
                alt={badgeTitle || "Stage image"}
                width={560}
                height={560}
                className="w-full h-auto rounded-[32px] object-cover"
                loading="lazy"
              />
            </div>
          )}
        </div>

        {/* DESKTOP ACTION BUTTONS */}
        <div className="mt-12 hidden justify-center gap-4 md:flex md:mt-16" data-animate="zoom-in" data-delay="200">
          <button
            type="button"
            onClick={() =>
              handleBtnClick(
                "fees",
                feesButtonText || `Get Fee Structure For ${badgeTitle || "Courses"}`,
                feesButtonUrl
              )
            }
            className="rounded bg-[#F5821F] px-8 py-3.5 font-bold text-white shadow-lg hover:bg-orange-600 transition-colors md:px-12 cursor-pointer text-base"
          >
            {feesButtonText || `Get Fee Structure For ${badgeTitle || "Courses"}`}
          </button>

          <button
            type="button"
            onClick={() =>
              handleBtnClick(
                "brochure",
                brochureButtonText || "Download Brochure",
                brochureButtonUrl
              )
            }
            className="rounded bg-[#034DA2] px-8 py-3.5 font-bold text-white shadow-lg hover:bg-blue-800 transition-colors md:px-12 cursor-pointer text-base"
          >
            <i className="fas fa-download mr-2" />
            {brochureButtonText || "Download Brochure"}
          </button>

          <button
            type="button"
            onClick={() =>
              handleBtnClick(
                "enquiry",
                callbackButtonText || "Get Call Back for Your Query",
                callbackButtonUrl
              )
            }
            className="rounded border border-gray-300 bg-white px-8 py-3.5 font-bold text-gray-700 shadow hover:bg-gray-50 transition-colors md:px-8 cursor-pointer text-base"
          >
            <i className="fas fa-headset mr-2 text-[#F5821F]" />
            {callbackButtonText || "Get Call Back for Your Query"}
          </button>
        </div>

        {/* MOBILE VIEW */}
        <div
          className="block md:hidden bg-[#034DA2] rounded-2xl p-5 shadow-xl text-white"
          data-animate="fade-up"
        >
          {Boolean(mobileImage || imageLeft) && (
            <div className="mb-6">
              <Image
                src={(mobileImage || imageLeft)!}
                alt={badgeTitle || "Stage image"}
                width={400}
                height={280}
                className="w-full h-auto rounded-xl object-cover shadow-md"
              />
            </div>
          )}

          {(badgeTitle || badgeIcon) && (
            <div className="flex items-center mb-6">
              <div className="bg-[#4782ED] text-white w-14 h-14 flex justify-center items-center rounded-full relative z-10 shrink-0 shadow-md border-2 border-[#F5821F]">
                {badgeIcon ? (
                  <Image
                    src={badgeIcon}
                    alt={badgeTitle || "Course badge icon"}
                    width={28}
                    height={28}
                    className="brightness-0 invert object-contain"
                  />
                ) : (
                  <i className="fas fa-graduation-cap text-xl" />
                )}
              </div>
              {badgeTitle && (
                <div className="-ml-5 bg-[#F5821F] w-full text-white pl-8 pr-4 py-3 rounded-md shadow-md">
                  <span className="text-[19px] font-bold">{badgeTitle}</span>
                  {badgeSubtitle && (
                    <span className="text-[17px] font-semibold ml-1.5">{badgeSubtitle}</span>
                  )}
                </div>
              )}
            </div>
          )}

          <ul className="space-y-2.5 pl-1 mb-8">
            {mobilePoints.map((pt, idx) => (
              <li key={idx} className="text-white text-[15px] sm:text-[16px] flex gap-2.5 items-center">
                <span className="shrink-0 flex items-center justify-center">
                  <i className="fas fa-book-open text-xs text-white/90" />
                </span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>

          {/* Mobile action buttons */}
          <div className="flex flex-col justify-center gap-3">
            <button
              type="button"
              onClick={() =>
                handleBtnClick(
                  "fees",
                  feesButtonText || `Get Fee Structure For ${badgeTitle || "Courses"}`,
                  feesButtonUrl
                )
              }
              className="open-modal-btn w-full rounded bg-[#F5821F] px-6 py-3.5 font-bold text-white shadow-lg cursor-pointer text-center text-sm sm:text-base hover:bg-orange-600 transition-colors"
            >
              {feesButtonText || `Get Fee Structure For ${badgeTitle || "Courses"}`}
            </button>

            <button
              type="button"
              onClick={() =>
                handleBtnClick(
                  "brochure",
                  brochureButtonText || "Download Brochure",
                  brochureButtonUrl
                )
              }
              className="open-modal-btn w-full rounded bg-brandBlueDark px-6 py-3.5 font-bold text-white shadow-lg cursor-pointer text-center text-sm sm:text-base hover:bg-blue-900 transition-colors"
            >
              <i className="fas fa-download mr-2" />
              {brochureButtonText || "Download Brochure"}
            </button>

            <button
              type="button"
              onClick={() =>
                handleBtnClick(
                  "enquiry",
                  callbackButtonText || "Get Call Back for Your Query",
                  callbackButtonUrl
                )
              }
              className="open-modal-btn w-full rounded border border-gray-300 bg-white px-6 py-3.5 font-bold text-gray-700 shadow cursor-pointer text-center text-sm sm:text-base hover:bg-gray-50 transition-colors"
            >
              <i className="fas fa-headset mr-2 text-[#F5821F]" />
              {callbackButtonText || "Get Call Back for Your Query"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
