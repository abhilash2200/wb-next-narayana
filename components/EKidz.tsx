"use client";

import Image from "next/image";
import { useModal } from "@/context/ModalContext";

type EKidzProps = {
  onOpenModal?: (action: "brochure" | "fees" | "enquiry", title?: string) => void;
};

export default function EKidz({ onOpenModal }: EKidzProps) {
  const { openModal } = useModal();
  const handleOpenModal = onOpenModal || openModal;
  const mobilePoints = [
    "Perfect Balance of Fun and Learning",
    "Optimal Student-Teacher Ratio",
    "Individual Guidance and Support",
    "Safe and Hygienic Environment",
    "CCTV Enabled and Secure Campus",
    "Advanced Apps for Parent-School Connectivity",
    "Our facilities include well-structured play areas",
    "Dedicated management team to overseeing both safety and learning",
    "An activity and Experience based Learning Approach",
  ];

  return (
    <section className="overflow-hidden bg-[#fbfbfb] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4">
        {/* Mobile Heading */}
        <h2 className="mb-12 block text-left text-2xl font-bold text-gray-800 md:hidden">
          Academic Excellence at Every Stage
        </h2>

        <div className="hidden items-center justify-center gap-8 md:flex">
          {/* Left Image */}
          <div
            className="w-full md:w-[45%]"
            data-animate="fade-right"
          >
            <Image
              src="/assets/kidz1.webp"
              alt="Kids playing"
              className="mb-8 h-auto w-full object-cover md:mb-10"
              width={500}
              height={500}
            />
          </div>

          {/* Right Content */}
          <div
            className="w-full md:w-[45%]"
            data-animate="fade-left"
          >
            {/* Program Heading */}
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
                  src="/assets/user.png"
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
                  eKidz
                </span>

                <span className="text-sm font-semibold md:text-[18px]">
                  {" "}
                  (Nursery to UKG)
                </span>
              </div>
            </div>

            {/* Age Appropriate Curriculum */}
            <InfoBlock
              icon="fa-book-open"
              title="Age appropriate curriculum:"
              points={[
                "Meets the developmental needs of each child",
                "Perfect balance of fun and learning",
                "Commitment to personal attention",
              ]}
              largeMargin
            />

            {/* Personal Attention */}
            <InfoBlock
              icon="fa-book-reader"
              title="Personal attention:"
              points={[
                "Optimal student-teacher ratio.",
                "Individual guidance and support.",
                "A warm, nurturing environment.",
                "We maintain rigorous safety protocols.",
              ]}
            />
          </div>
        </div>

        <div className="hidden items-center justify-center gap-8 md:flex">
          {/* Left Content */}
          <div
            className="w-full md:w-[45%]"
            data-animate="fade-right"
          >
            {/* Safety */}
            <InfoBlock
              icon="fa-shield-alt"
              title="Safety:"
              points={[
                "We prioritise a safe and hygienic environment",
                "We ensure a safe and secure campus",
              ]}
              largeMargin
            />

            {/* State-of-the-Art Infrastructure */}
            <InfoBlock
              icon="fa-city"
              title="State-of-the-Art Infrastructure:"
              points={[
                "Our facilities include well-structured play areas.",
                "Tech-enabled framework featuring CCTV.",
                "Advanced apps for parent-school connectivity.",
              ]}
            />
          </div>

          {/* Right Image */}
          <div
            className="w-full md:w-[45%]"
            data-animate="fade-left"
          >
            <Image
              src="/assets/kidz2.webp"
              alt="Kids playing"
              className="mb-8 h-auto w-full object-cover md:mb-10"
              width={500}
              height={500}
            />
          </div>
        </div>

        <div
          className="block rounded-md bg-[#034DA2] p-4 md:hidden"
          data-animate="fade-up"
        >
          <div className="flex flex-col">
            {/* Mobile Image */}
            <Image
              src="/assets/mobile-kids.webp"
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
                  src="/assets/user.png"
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
                  Nursery to UKG
                </span>

                <span className="text-[20px] font-semibold">
                  {" "}
                  (eKidz)
                </span>
              </div>
            </div>

            {/* Mobile Points */}
            <ul className="space-y-1.5 pl-1">
              {mobilePoints.map((point) => (
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
              onClick={() => handleOpenModal("fees", "Get Fee Structure For eKidz")}
              className="
                open-modal-btn w-full rounded bg-[#F5821F]
                px-8 py-3 font-bold text-white shadow-lg
                transition hover:bg-[#F5821F]
                sm:w-auto md:px-16
              "
            >
              Get Fee Structure For eKidz
            </button>

            <button
              type="button"
              onClick={() => handleOpenModal("brochure", "Download Brochure")}
              className="
                open-modal-btn w-full rounded bg-brandBlueDark
                px-8 py-3 font-bold text-white shadow-lg
                transition hover:bg-brandBlueDark
                sm:w-auto md:px-16
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
                sm:w-auto
              "
            >
              <i className="fas fa-headset mr-2 text-[#F5821F]" />
              Get Call Back for Your Query
            </button>
          </div>
        </div>


        <div
          className="mt-6 hidden flex-col justify-center gap-4 md:mt-16 md:flex md:flex-row"
          data-animate="zoom-in"
          data-delay="200"
        >
          <button
            type="button"
            onClick={() => handleOpenModal("fees", "Get Fee Structure For eKidz")}
            className="
              open-modal-btn w-full rounded bg-[#F5821F]
              px-8 py-3 font-bold text-white shadow-lg
              transition hover:bg-[#F5821F]
              sm:w-auto md:px-16
            "
          >
            Get Fee Structure For eKidz
          </button>

          <button
            type="button"
            onClick={() => handleOpenModal("brochure", "Download Brochure")}
            className="
              open-modal-btn w-full rounded bg-brandBlueDark
              px-8 py-3 font-bold text-white shadow-lg
              transition hover:bg-[#15539B]
              sm:w-auto md:px-16
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
              sm:w-auto
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

function InfoBlock({
  icon,
  title,
  points,
  largeMargin = false,
}: {
  icon: string;
  title: string;
  points: string[];
  largeMargin?: boolean;
}) {
  return (
    <div className={largeMargin ? "mb-16" : "mb-8 md:mb-10"}>
      <div className="mb-3 flex items-center gap-3">
        <i
          className={`fas ${icon} text-xl text-gray-700 md:text-2xl`}
        />

        <h3
          className={
            icon === "fa-shield-alt" || icon === "fa-city"
              ? "text-lg font-bold text-gray-800 md:text-xl"
              : "text-lg font-bold text-gray-800 md:text-[20px]"
          }
        >
          {title}
        </h3>
      </div>

      <ul className="space-y-2 pl-1 text-sm text-gray-600">
        {points.map((point) => (
          <li key={point} className="flex items-start">
            <i className="far fa-check-circle mr-2 mt-1 shrink-0 text-gray-400" />

            <span className="text-sm font-medium md:text-[18px]">
              {point}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}