"use client";

import AdmissionForm from "@/components/AdmissionForm";
import { BranchPageData } from "@/types/branch-page";

interface BranchHeroProps {
  data: BranchPageData;
}

export default function BranchHero({ data }: BranchHeroProps) {
  return (
    <section className="relative bg-linear-to-r from-[#002f56] via-[#004f8c] to-[#002f56] text-white py-12 md:py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-brandOrange/20 border border-brandOrange/40 text-brandOrangeLight px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              <i className="fas fa-map-marker-alt text-brandOrange" />
              <span>
                {data.hero.badge} · {data.cityName}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              {data.hero.title}
            </h1>

            <p className="text-blue-100 text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {data.hero.subtitle}
            </p>

            {/* Key Quick Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 max-w-lg mx-auto lg:mx-0">
              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-lg border border-white/10 text-center">
                <div className="text-xl sm:text-2xl font-bold text-brandYellow">
                  47+
                </div>
                <div className="text-[11px] sm:text-xs text-blue-200">
                  Years Legacy
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-lg border border-white/10 text-center">
                <div className="text-xl sm:text-2xl font-bold text-brandYellow">
                  900+
                </div>
                <div className="text-[11px] sm:text-xs text-blue-200">
                  Campuses Pan India
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1 bg-white/10 backdrop-blur-xs p-3 rounded-lg border border-white/10 text-center">
                <div className="text-xl sm:text-2xl font-bold text-brandYellow">
                  6 Lakh+
                </div>
                <div className="text-[11px] sm:text-xs text-blue-200">
                  Proud Learners
                </div>
              </div>
            </div>

            {/* Contact strip */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-blue-100">
              {data.phone && (
                <a
                  href={`tel:${data.phone}`}
                  className="inline-flex items-center gap-2 hover:text-white transition"
                >
                  <i className="fas fa-phone text-brandOrange" />
                  <span>{data.phone}</span>
                </a>
              )}
              {data.phone && data.email && (
                <span className="hidden sm:inline">|</span>
              )}
              {data.email && (
                <a
                  href={`mailto:${data.email}`}
                  className="inline-flex items-center gap-2 hover:text-white transition"
                >
                  <i className="fas fa-envelope text-brandOrange" />
                  <span>{data.email}</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Card - Admission Enquiry Form */}
          <div className="lg:col-span-5 max-w-md mx-auto w-full">
            <div className="bg-white rounded-xl shadow-2xl border-2 border-brandOrange overflow-hidden p-5 sm:p-6 text-gray-900">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Admission Enquiry 2027-28
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Connect directly with the {data.branchName} campus counselor.
                </p>
              </div>
             <AdmissionForm
            formId="branch-admission"
            variant="card"
            initialCity={data.cityName}
            initialBranch={data.branchName}
            pageId={0}
            revisionId={0}
            />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
