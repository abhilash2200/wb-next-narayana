import Image from "next/image";
import { BranchWhyChooseData } from "@/data/branchStaticData";

interface BranchWhyChooseProps {
  data: BranchWhyChooseData;
}

export default function BranchWhyChoose({ data }: BranchWhyChooseProps) {
  return (
    <section className="overflow-hidden bg-gray-50 py-12 md:py-20">
      <div className="mx-auto container px-4">
        <div className="mb-10 text-center" data-animate="fade-up">
          <h2 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl lg:text-4xl">
            {data.heading}
          </h2>

          <p className="text-sm text-gray-500 md:text-base">
            {data.subheading}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {data.items.map((reason) => (
            <div
              key={reason.title}
              className="
                flex flex-col items-center text-center
                rounded-xl bg-white p-3.5 sm:p-6 shadow-sm
                transition duration-300
                hover:-translate-y-1 hover:shadow-lg
              "
              data-animate="fade-up"
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
