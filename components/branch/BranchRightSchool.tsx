import { BranchRightSchoolData } from "@/data/branchStaticData";

interface BranchRightSchoolProps {
  data: BranchRightSchoolData;
}

export default function BranchRightSchool({ data }: BranchRightSchoolProps) {
  return (
    <section className="overflow-hidden border-t border-gray-100 bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Heading */}
        <div
          className="mb-10 text-left md:text-center"
          data-animate="fade-up"
        >
          <h2 className="mb-2 text-2xl font-bold text-gray-800 md:text-3xl">
            {data.heading}
          </h2>

          <p className="text-md text-gray-500">
            {data.subheading}
          </p>
        </div>

        {/* Points */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.points.map((point) => (
            <div
              key={point.title}
              className="flex items-start gap-4 p-2"
              data-animate="fade-up"
              data-delay={point.delay}
            >
              <div className="mt-1 shrink-0">
                <i className="fas fa-check-circle text-2xl text-brandGreen md:text-3xl" />
              </div>

              <div>
                <h3 className="mb-2 text-md font-bold leading-tight text-brandBlue md:text-base">
                  {point.title}
                </h3>

                <p className="text-sm text-gray-600">
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
