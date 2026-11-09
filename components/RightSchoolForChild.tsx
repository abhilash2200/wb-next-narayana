export default function RightSchoolForChild() {
  const points = [
    {
      title: "Parents seeking strong academics",
      description: "Structured learning with proven results",
      delay: 100,
    },
    {
      title: "Students Preparing For Competitive Exams",
      description: "Foundation for IIT, NEET, and Olympiads",
      delay: 200,
    },
    {
      title: "Family looking for disciplined Learning",
      description: "Character building alongside academics",
      delay: 300,
    },
    {
      title: "Parents who value long-term outcomes",
      description: "Investment is your child's future",
      delay: 400,
    },
  ];

  return (
    <section className="overflow-hidden border-t border-gray-100 bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">

        {/* Heading */}
        <div
          className="mb-10 text-left md:text-center"
          data-animate="fade-up"
        >
          <h2 className="mb-2 text-2xl font-bold text-gray-800 md:text-3xl">
            Is Narayana the Right School for Your Child?
          </h2>

          <p className="text-md text-gray-500">
            Every child is guided based on their learning needs
          </p>
        </div>

        {/* Points */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((point) => (
            <div
              key={point.title}
              className="flex items-start gap-4 p-2"
              data-animate="fade-up"
              data-delay={point.delay}
            >
              {/* EXACT INDEX.HTML TICK ICON */}
              <div className="mt-1 shrink-0">
                <i className="fas fa-check-circle text-2xl text-brandGreen md:text-3xl" />
              </div>

              <div>
                <h3 className="mb-2 text-md font-bold leading-tight text-brandBlue md:text-base">
                  {point.title}
                </h3>

                <p className="text-md text-gray-500 md:text-base">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
