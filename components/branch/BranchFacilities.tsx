"use client";

import Image from "next/image";
import { BranchFacility } from "@/types/branch-page";

interface BranchFacilitiesProps {
  branchName: string;
  facilities: BranchFacility[];
}

export default function BranchFacilities({
  branchName,
  facilities,
}: BranchFacilitiesProps) {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-brandBlue font-bold text-xs uppercase tracking-wider mb-2">
            Campus Infrastructure
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#003865]">
            World-Class Facilities at {branchName}
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            Providing students with an enabling environment designed for exploration and growth.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((fac, idx) => (
            <div
              key={idx}
              className="bg-gray-50 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition border border-gray-100 flex flex-col"
            >
              {fac.image && (
                <div className="relative h-44 w-full">
                  <Image
                    src={fac.image}
                    alt={fac.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-[#003865] text-base mb-1.5 flex items-center gap-2">
                    {fac.icon && (
                      <i className={`${fac.icon} text-brandOrange text-sm`} />
                    )}
                    <span>{fac.title}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {fac.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
