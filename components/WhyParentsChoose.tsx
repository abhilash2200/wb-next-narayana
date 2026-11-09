import Image from "next/image";

const reasons = [
  {
    icon: "/assets/book-icon.png",
    title: "Integrated Curriculum",
    description:
      "The syllabus includes the foundations and advanced concepts for competitive examinations.",
  },
  {
    icon: "/assets/calender-icon.png",
    title: 'Structured "Micro Schedule"',
    description:
      "A concrete plan for consistent progress and coverage of the vast syllabus.",
  },
  {
    icon: "/assets/scarch-icon.png",
    title: "Early Start on Competitive Prep",
    description:
      "Advanced concepts start from grade 6, giving them an edge over other students.",
  },
  {
    icon: "/assets/book-icon.png",
    title: "Tech-Enabled Learning",
    description:
      "In-house digital platforms integrate technology into the learning process for more efficiency.",
  },
  {
    icon: "/assets/calender-icon.png",
    title: "Personalized Attention & Monitoring",
    description:
      'In the "Adoption Calling" program, a mentor teacher tracks the students\' holistic development.',
  },
  {
    icon: "/assets/scarch-icon.png",
    title: "Holistic Development Support",
    description:
      "Soft skills, Sports, and Disha program foster well-rounded individuals.",
  },
];

export default function WhyParentsChoose() {
  return (
    <section className="overflow-hidden bg-gray-50 py-12 md:py-20">
      <div className="mx-auto container px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl lg:text-4xl">
            Why Parents Choose Narayana Over Other Schools
          </h2>

          <p className="text-sm text-gray-500 md:text-base">
            A system built for consistency, discipline, and results.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="
                flex flex-col items-center text-center
                rounded-xl bg-white p-3.5 sm:p-6 shadow-sm
                transition duration-300
                hover:-translate-y-1 hover:shadow-lg
              "
            >
              <div className="mb-3 sm:mb-4 flex items-center justify-center">
                <Image
                  src={reason.icon}
                  alt={reason.title}
                  width={80}
                  height={80}
                  className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 object-contain"
                />
              </div>

              <h3 className="mb-1.5 sm:mb-2 text-sm sm:text-base font-bold leading-tight text-gray-800 md:text-lg">
                {reason.title}
              </h3>

              <p className="hidden max-w-xs text-xs md:leading-tight text-gray-500 md:block md:text-base">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}