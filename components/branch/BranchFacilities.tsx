import Image from "next/image";
import { BranchFacilitiesData } from "@/data/branchStaticData";

interface BranchFacilitiesProps {
  data: BranchFacilitiesData;
}

export default function BranchFacilities({ data }: BranchFacilitiesProps) {
  return (
    <section className="overflow-hidden bg-gray-50 py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div
          className="mb-10 text-left md:mb-12 md:text-center"
          data-animate="fade-up"
        >
          <h2 className="mb-3 text-2xl font-bold text-gray-800 md:text-3xl lg:text-4xl">
            {data.heading}
          </h2>
          <p className="text-md text-gray-500 md:text-base">
            {data.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {data.facilities.map((facility) => (
            <div
              key={facility.title}
              className="overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md"
              data-animate="fade-up"
              data-delay={facility.delay}
            >
              <Image
                src={facility.image}
                alt={facility.alt}
                width={360}
                height={240}
                className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold text-gray-800">
                  {facility.title}
                </h3>
                <p className="text-sm text-gray-600">
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
