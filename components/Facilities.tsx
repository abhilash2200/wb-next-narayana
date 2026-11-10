"use client";

import Image from "next/image";
import { useModal } from "@/context/ModalContext";

const facilities = [
  {
    title: "Digital Classroom",
    description:
      "Technology-enabled learning spaces with interactive boards and digital resources",
    image: "/assets/digital-classroom.webp",
    alt: "Digital Classroom",
    delay: 100,
  },
  {
    title: "Lab & Activity Room",
    description:
      "Well-equipped Physics, Chemistry, Biology, and Computer labs for hands-on learning",
    image: "/assets/lab-activity.webp",
    alt: "Lab & Activity Room",
    delay: 200,
  },
  {
    title: "Hostel",
    description:
      "Comfortable and secure hostel facilities for students",
    image: "/assets/hostel.webp",
    alt: "Hostel",
    delay: 300,
  },
  {
    title: "Spacious Campus",
    description:
      "Modern playgrounds, indoor sports facilities, and activity centers for holistic development",
    image: "/assets/spaciouscampus.webp",
    alt: "Spacious Campus",
    delay: 100,
  },
  {
    title: "Safe Transport",
    description:
      "GPS-tracked buses covering major routes across the city",
    image: "/assets/safetransportation.webp",
    alt: "Safe Transport",
    delay: 200,
    anchorId: "school-transport",
  },
  {
    title: "Safety & Security",
    description:
      "24/7 CCTV surveillance, trained security personnel, biometric access control",
    image: "/assets/safe.webp",
    alt: "Safety & Security",
    delay: 300,
  },
];

export default function Facilities() {
  const { openModal } = useModal();

  const handleApply = (facilityTitle: string) => {
    openModal("fees", `Campus Facility: ${facilityTitle}`);
  };

  return (
    <section id="campus-facilities" className="py-16 md:py-20 bg-gray-50 overflow-hidden">
      <div id="school-infrastructure" className="scroll-mt-24" />
      <div className="container mx-auto px-4">
        <div className="md:text-center text-left mb-10 md:mb-12" data-animate="fade-up">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
            World-Class Campus &amp; Facilities
          </h2>
          <p className="text-gray-500 text-md md:text-base">
            Modern infrastructure designed to inspire learning and growth
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility) => (
            <div
              key={facility.title}
              id={facility.anchorId}
              className={`bg-white rounded-lg overflow-hidden shadow-xs hover:shadow-md transition-shadow ${
                facility.anchorId ? "scroll-mt-24" : ""
              }`}
              data-animate="fade-up"
              data-delay={facility.delay}
            >
              <Image
                src={facility.image}
                alt={facility.alt}
                className="w-full object-cover"
                width={407}
                height={305}
                loading="lazy"
              />
              <div className="p-4">
                <h3 className="text-brandBlue font-bold text-[18px] md:text-[22px] mb-2 md:mb-4">
                  {facility.title}
                </h3>
                <p className="text-gray-500 text-[15px] font-medium md:text-[15px] leading-relaxed">
                  {facility.description}
                </p>
                <button
                  type="button"
                  onClick={() => handleApply(facility.title)}
                  className="open-modal-btn inline-block mt-3 text-brandOrange font-semibold text-[15px] underline underline-offset-4 hover:text-orange-600 transition-colors cursor-pointer text-left bg-transparent border-0 p-0"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
