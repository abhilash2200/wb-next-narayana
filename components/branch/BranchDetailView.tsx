"use client";

import { getBranchStaticData } from "@/data/branchStaticData";
import BranchHero from "./BranchHero";
import BranchAcademicPrograms from "./BranchAcademicPrograms";
import BranchWhyChoose from "./BranchWhyChoose";
import BranchEKidz from "./BranchEKidz";
import BranchEChamps from "./BranchEChamps";
import BranchETechno from "./BranchETechno";
import BranchSeniorSecondary from "./BranchSeniorSecondary";
import BranchRightSchool from "./BranchRightSchool";
import BranchAcademicResults from "./BranchAcademicResults";
import BranchTestimonials from "./BranchTestimonials";
import BranchDesktopBanner from "./BranchDesktopBanner";
import BranchFacilities from "./BranchFacilities";
import BranchFAQ from "./BranchFAQ";
import BranchLimitedSeats from "./BranchLimitedSeats";

interface BranchDetailViewProps {
  branchId: string;
}

export default function BranchDetailView({ branchId }: BranchDetailViewProps) {
  const data = getBranchStaticData(branchId);

  return (
    <main className="bg-white">
      {/* 1. Hero with counters, bullet points, and prefilled admission form */}
      <BranchHero data={data.hero} />

      {/* Note: SchoolFinder is deliberately omitted for branch-specific pages */}

      {/* 2. Academic Programs (Desktop carousel + Mobile 2x2 grid) */}
      <BranchAcademicPrograms data={data.academicPrograms} />

      {/* 3. Why Parents Choose Narayana */}
      <BranchWhyChoose data={data.whyChoose} />

      {/* 4. eKidz Stage */}
      <BranchEKidz data={data.ekidz} />

      {/* 5. eChamps Stage */}
      <BranchEChamps data={data.echamps} />

      {/* 6. eTechno Stage */}
      <BranchETechno data={data.etechno} />

      {/* 7. Senior Secondary Stage */}
      <BranchSeniorSecondary data={data.seniorSecondary} />

      {/* 8. Is Narayana the Right School for Your Child? */}
      <BranchRightSchool data={data.rightSchool} />

      {/* 9. Proven Academic Results & Toppers */}
      <BranchAcademicResults data={data.academicResults} />

      {/* 10. Parent Testimonials & Trust */}
      <BranchTestimonials data={data.testimonials} />

      {/* 11. Desktop & Mobile Banners */}
      <BranchDesktopBanner data={data.desktopBanner} />

      {/* 12. Campus Infrastructure & Facilities */}
      <BranchFacilities data={data.facilities} />

      {/* 13. Frequently Asked Questions */}
      <BranchFAQ data={data.faq} />

      {/* 14. Limited Seats urgency footer & prefilled admission form */}
      <BranchLimitedSeats data={data.limitedSeats} />
    </main>
  );
}
