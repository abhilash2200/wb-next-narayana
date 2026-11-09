import Image from "next/image";

const facilities = [
  {
    title: "Digital Classroom",
    description: "Technology-enabled learning spaces with interactive boards and digital resources",
    image: "/assets/digital-classroom.webp",
    alt: "Digital Classroom",
    delay: 100,
  },
  {
    title: "Lab & Activity Room",
    description: "Well-equipped Physics, Chemistry, Biology, and Computer labs for hands-on learning",
    image: "/assets/lab-activity.webp",
    alt: "Lab & Activity Room",
    delay: 200,
  },
  {
    title: "Hostel",
    description: "Comfortable and secure hostel facilities for students",
    image: "/assets/hostel.webp",
    alt: "Hostel",
    delay: 300,
  },
  {
    title: "Spacious Campus",
    description: "Modern playgrounds, indoor sports facilities, and activity centers for holistic development",
    image: "/assets/spaciouscampus.webp",
    alt: "Spacious Campus",
    delay: 100,
  },
  {
    title: "Safe Transport",
    description: "GPS-tracked buses covering major routes across the city",
    image: "/assets/safetransportation.webp",
    alt: "Safe Transport",
    delay: 200,
  },
  {
    title: "Safety & Security",
    description: "24/7 CCTV surveillance, trained security personnel, biometric access control",
    image: "/assets/safe.webp",
    alt: "Safety & Security",
    delay: 300,
  },
];

export default function Facilities() {
  return (
    <section className="overflow-hidden bg-gray-50 py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-left md:mb-12 md:text-center" data-animate="fade-up">
          <h2 className="mb-3 text-2xl font-bold text-gray-800 md:text-3xl lg:text-4xl">
            World-Class Campus &amp; Facilities
          </h2>
          <p className="text-md text-gray-500 md:text-base">
            Modern infrastructure designed to inspire learning and growth
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((facility) => (
            <div
              key={facility.title}
              className="overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md"
              data-animate="fade-up"
              data-delay={facility.delay}
            >
              <Image
                src={facility.image}
                alt={facility.alt}
                className="w-full object-cover"
                width={407}
                height={305}
              />
              <div className="p-4">
                <h3 className="mb-2 text-[18px] font-bold text-brandBlue md:mb-4 md:text-[22px]">
                  {facility.title}
                </h3>
                <p className="text-[15px] font-medium leading-relaxed text-gray-500">
                  {facility.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
