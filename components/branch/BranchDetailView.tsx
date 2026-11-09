"use client";

import { getBranchPageData } from "@/data/branchPages";
import BranchHero from "./BranchHero";
import BranchOverview from "./BranchOverview";
import BranchFacilities from "./BranchFacilities";
import BranchPrograms from "./BranchPrograms";
import BranchResults from "./BranchResults";
import BranchTestimonials from "./BranchTestimonials";
import BranchFAQ from "./BranchFAQ";

interface BranchDetailViewProps {
  branchId: string;
}

export default function BranchDetailView({ branchId }: BranchDetailViewProps) {
  const data = getBranchPageData(branchId);

  return (
    <main className="bg-white">
      {/* 1. Branch Hero with stats, badge, and admission form */}
      <BranchHero data={data} />

      {/* 2. Campus Overview and Location highlight */}
      <BranchOverview data={data} />

      {/* 3. Campus Infrastructure & Facilities */}
      <BranchFacilities
        branchName={data.branchName}
        facilities={data.facilities}
      />

      {/* 4. Academic Programs (eKidz, eChamps, eTechno, Senior Secondary) */}
      <BranchPrograms branchName={data.branchName} />

      {/* 5. Proven Academic Results and Toppers */}
      <BranchResults cityName={data.cityName} />

      {/* 6. Parent Testimonials & Trust */}
      <BranchTestimonials branchName={data.branchName} />

      {/* 7. Branch-specific Frequently Asked Questions */}
      <BranchFAQ branchName={data.branchName} />
    </main>
  );
}
