"use client";

import { BranchPageData } from "@/types/branch-page";

interface BranchOverviewProps {
  data: BranchPageData;
}

export default function BranchOverview({ data }: BranchOverviewProps) {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-block text-brandBlue font-bold text-xs uppercase tracking-wider">
              Campus Overview
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#003865]">
              {data.about.heading}
            </h2>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              {data.about.description}
            </p>

            <div className="space-y-2.5 pt-2">
              {data.about.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-brandOrange/15 text-brandOrange flex items-center justify-center shrink-0 mt-0.5">
                    <i className="fas fa-check text-xs" />
                  </span>
                  <span className="text-gray-800 text-sm sm:text-[15px] font-medium">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Campus Highlight Box */}
          <div className="lg:col-span-5 bg-white p-6 rounded-xl shadow-md border border-gray-100 space-y-4">
            <h3 className="text-lg font-bold text-[#003865] flex items-center gap-2">
              <i className="fas fa-location-dot text-brandOrange" />
              <span>Campus Location</span>
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {data.address || `Narayana School Campus, ${data.branchName}, ${data.cityName}`}
            </p>
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span>
                City: <strong>{data.cityName}</strong>
              </span>
              <span>
                Affiliation: <strong>CBSE Board</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
