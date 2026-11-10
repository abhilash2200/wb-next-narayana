import Image from "next/image";

const reasons = [
  {
    icon: "/assets/book-icon.png",
    alt: "book-icon",
    title: "Integrated Curriculum",
    description:
      "The syllabus includes the foundations and advanced concepts for competitive examinations.",
    delay: 100,
  },
  {
    icon: "/assets/calender-icon.png",
    alt: "calendar-icon",
    title: 'Structured "Micro Schedule"',
    description:
      "A concrete plan for consistent progress and coverage of the vast syllabus.",
    delay: 200,
  },
  {
    icon: "/assets/scarch-icon.png",
    alt: "scarch-icon",
    title: "Early Start on Competitive Prep",
    description:
      "Advanced concepts start from grade 6, giving them an edge over other students.",
    delay: 300,
  },
  {
    icon: "/assets/book-icon.png",
    alt: "book-icon",
    title: "Tech-Enabled Learning",
    description:
      "In-house digital platforms integrate technology into the learning process for more efficiency.",
    delay: 100,
  },
  {
    icon: "/assets/calender-icon.png",
    alt: "calendar-icon",
    title: "Personalized Attention & Monitoring",
    description:
      'In the "Adoption Calling" program, a mentor teacher tracks the students\' holistic development.',
    delay: 200,
  },
  {
    icon: "/assets/scarch-icon.png",
    alt: "scarch-icon",
    title: "Holistic Development Support",
    description:
      "Soft skills, nSports, and Disha program foster well-rounded individuals.",
    delay: 300,
  },
];

export default function WhyParentsChoose() {
  return (
    <section className="py-12 md:py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="md:text-center text-left mb-10 md:mb-16" data-animate="fade-up">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Why Parents Choose Narayana Over Other Schools
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            A system built for consistency, discipline, and results.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 md:gap-8 gap-4 md:gap-x-8 md:gap-y-16">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="flex flex-col items-center text-center border p-2 rounded-md border-gray-200 bg-white"
              data-animate="fade-up"
              data-delay={reason.delay}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-brandOrangeLight rounded-full flex items-center justify-center mb-4 md:mb-6">
                <Image
                  src={reason.icon}
                  alt={reason.alt}
                  width={80}
                  height={80}
                  className="w-10 h-10 md:w-12 md:h-12 object-contain"
                />
              </div>

              <h3 className="font-bold text-base md:text-lg mb-2 md:mb-3 text-gray-800 leading-tight">
                {reason.title}
              </h3>

              <p className="text-gray-500 text-xs md:text-base leading-relaxed max-w-xs hidden md:block">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
