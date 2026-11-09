"use client";

import Link from "next/link";
import { useModal } from "@/context/ModalContext";

interface AdmissionsComingSoonProps {
  slugs: string[];
}

function formatSlug(slug: string): string {
  if (!slug) return "";
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function AdmissionsComingSoon({ slugs }: AdmissionsComingSoonProps) {
  const { openModal } = useModal();

  const city = slugs[0] ? formatSlug(slugs[0]) : "";
  const branch = slugs[1] ? formatSlug(slugs[1]) : "";
  const className = slugs[2] ? formatSlug(slugs[2]) : "";

  const scopeTitle = [className, branch, city].filter(Boolean).join(" • ");

  return (
    <main className="min-h-[70vh] bg-gradient-to-b from-[#f0f6fc] via-white to-gray-50 flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="max-w-2xl w-full text-center">
        {/* Notice Badge */}
        <div className="inline-flex items-center gap-2 bg-[#00549e]/10 text-brandBlue px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider mb-6 border border-[#00549e]/20">
          <i className="fas fa-clock text-brandOrange" />
          <span>Admissions Notice</span>
        </div>

        {/* Scope Pill Badge */}
        {scopeTitle && (
          <div className="flex items-center justify-center gap-2 flex-wrap mb-4">
            {city && (
              <span className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-brandBlue px-3 py-1 rounded-md text-xs font-semibold">
                <i className="fas fa-city text-[10px] text-brandOrange" />
                {city}
              </span>
            )}
            {branch && (
              <span className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-brandBlue px-3 py-1 rounded-md text-xs font-semibold">
                <i className="fas fa-school text-[10px] text-brandOrange" />
                {branch}
              </span>
            )}
            {className && (
              <span className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-200 text-orange-800 px-3 py-1 rounded-md text-xs font-semibold">
                <i className="fas fa-graduation-cap text-[10px] text-brandOrange" />
                {className}
              </span>
            )}
          </div>
        )}

        {/* Main Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
          Admissions Information Opening Soon
        </h1>

        {/* Friendly explanation */}
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl mx-auto mb-8">
          The curriculum details and admission schedules for this campus are currently being updated.
          You can search our other active campuses or connect directly with our admissions desk.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
          <Link
            href="/#school-finder"
            className="w-full sm:w-auto h-12 px-7 bg-brandOrange hover:bg-orange-600 text-white font-bold text-sm tracking-wider uppercase rounded-lg shadow-md hover:shadow-orange-500/30 active:scale-95 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <i className="fas fa-search text-xs" />
            <span>Back to School Finder</span>
          </Link>

          <button
            type="button"
            onClick={() => openModal("enquiry", "Admissions Enquiry")}
            className="w-full sm:w-auto h-12 px-7 bg-brandBlue hover:bg-[#00427a] text-white font-bold text-sm tracking-wider uppercase rounded-lg shadow-md active:scale-95 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <i className="fas fa-headset text-xs" />
            <span>Contact Admissions</span>
          </button>
        </div>

        {/* Quick Highlights Card */}
        <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-brandOrange shrink-0">
              <i className="fas fa-award text-sm" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">45+ Years</p>
              <p className="text-[11px] text-gray-500">Academic legacy of top ranks</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-brandBlue shrink-0">
              <i className="fas fa-chalkboard-teacher text-sm" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">Expert Faculty</p>
              <p className="text-[11px] text-gray-500">Dedicated mentorship & support</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-brandGreen shrink-0">
              <i className="fas fa-phone-volume text-sm" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">Toll-Free Helpline</p>
              <p className="text-[11px] text-gray-500">1800 102 3344 (Mon - Sat)</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
