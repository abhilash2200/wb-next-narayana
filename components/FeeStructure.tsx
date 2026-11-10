"use client";

import { useModal } from "@/context/ModalContext";

export interface FeeStructureProps {
  title?: string;
  description?: string;
  buttonText?: string;
  image?: string;
}

export default function FeeStructure({
  title = "Narayana Schools Fee Structure",
  description = "Our fee structure is thoughtfully designed to provide high-quality education with exceptional value. We ensure that learning remains affordable, accessible, and enriching for every student.",
  buttonText = "Get Fee Details",
  image = "/assets/school-girl.webp",
}: FeeStructureProps) {
  const { openModal } = useModal();

  const handleOpenModal = () => {
    openModal("fees", title);
  };

  return (
    <section id="fee" className="py-12 md:py-16 overflow-visible">
      <div className="max-w-7xl mx-auto px-4">
        <div
          className="bg-[#007fc0] rounded-2xl overflow-visible flex flex-col md:flex-row md:items-end gap-6 md:gap-0 min-h-[280px] md:min-h-[320px]"
          data-animate="fade-up"
        >
          {/* Student Illustration */}
          <div
            className="flex justify-center md:justify-start md:order-1 md:flex-none md:w-[38%] lg:w-[34%] -mt-4 md:-mt-20 md:-ml-2 lg:-ml-4"
            style={{ flex: "0 0 auto" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt="Student with book"
              className="w-full max-w-[280px] md:max-w-none md:w-auto md:max-h-[340px] object-contain object-bottom"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Text Content & Action */}
          <div className="flex-1 flex flex-col justify-center px-6 pb-6 md:pb-8 md:pt-8 md:pl-4 lg:pl-8 md:pr-10 lg:pr-16 text-center md:text-left">
            <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
              {title}
            </h2>
            <p className="text-white text-base md:text-lg leading-relaxed mb-5 md:mb-6 max-w-2xl">
              {description}
            </p>
            <button
              type="button"
              onClick={handleOpenModal}
              className="open-modal-btn bg-[#f5821f] hover:bg-[#e0751a] text-white font-bold py-3 px-6 md:px-8 rounded-lg transition shadow-lg w-fit mx-auto md:mx-0 cursor-pointer"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
