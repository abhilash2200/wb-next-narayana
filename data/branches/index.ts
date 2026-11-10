import { BranchStaticPageData } from "./types";
import { ballyBranchData } from "./bally";
import { mahestalaBranchData } from "./mahestala";
import { howrahBranchData } from "./howrah";
import { newtownBranchData } from "./newtown";
import { findBranchGlobally, slugify } from "@/lib/admissionData";

export * from "./types";
export { ballyBranchData } from "./bally";
export { mahestalaBranchData } from "./mahestala";
export { howrahBranchData } from "./howrah";
export { newtownBranchData } from "./newtown";

/**
 * Fixed list of branch slugs allowed for direct `baseurl/{branch}` routing.
 * Only the branch names defined in this constant will be accessible as direct static branch pages.
 * You can edit, add, or remove branch slugs here.
 */
export const ALLOWED_STATIC_BRANCH_SLUGS = [
  "mahestala",
  "bally",
] as const;

export type AllowedStaticBranchSlug = (typeof ALLOWED_STATIC_BRANCH_SLUGS)[number];

/**
 * Registry mapping each branch slug to its dedicated, independent data file.
 */
export const branchDataRegistry: Record<string, BranchStaticPageData> = {
  bally: ballyBranchData,
  mahestala: mahestalaBranchData,
  howrah: howrahBranchData,
  newtown: newtownBranchData,
  "new-town": newtownBranchData,
};

/**
 * Validates whether a requested slug matches one of the allowed static branches.
 * Normalizes hyphens, spaces, and casing.
 */
export function isAllowedStaticBranch(branchSlug: string): boolean {
  if (!branchSlug) return false;
  const clean = branchSlug.toLowerCase().trim().replace(/[\s_-]+/g, "");
  return ALLOWED_STATIC_BRANCH_SLUGS.some(
    (b) => b.toLowerCase().replace(/[\s_-]+/g, "") === clean
  );
}

/**
 * Retrieves the static page data for a requested branch.
 * First checks the dedicated branch data files in `data/branches/`.
 * If not specifically registered, dynamically generates the complete 14-section
 * structure derived from global admission data.
 */
export function getBranchStaticData(branchId: string): BranchStaticPageData {
  const normId = slugify(branchId);
  const cleanKey = normId.replace(/[\s_-]+/g, "");

  // 1. Check exact dedicated branch file registry
  if (branchDataRegistry[normId]) {
    return branchDataRegistry[normId];
  }
  for (const [key, data] of Object.entries(branchDataRegistry)) {
    if (key.replace(/[\s_-]+/g, "") === cleanKey) {
      return data;
    }
  }

  // 2. Fallback generation if a new branch slug is added
  const match = findBranchGlobally(branchId);
  const branchName = match
    ? match.branch.label || match.branch.value
    : branchId.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const cityName = match ? match.city.label || match.city.value : "West Bengal";

  // Use Bally as base template and tailor city/branch
  return {
    ...ballyBranchData,
    branchId: normId,
    branchName,
    cityName,
    metaTitle: `Narayana School ${branchName}, ${cityName} | Best CBSE School Admissions Open`,
    metaDescription: `Admissions open for AY 2027-28 at Narayana School ${branchName}, ${cityName}. Experience technologically driven CBSE curriculum, smart digital classrooms, advanced labs, and top competitive ranks.`,
    hero: {
      ...ballyBranchData.hero,
      branchHighlight: branchName,
      defaultCity: match?.city.value || cityName,
      defaultBranch: match?.branch.value || branchName,
    },
    limitedSeats: {
      ...ballyBranchData.limitedSeats,
      subheading: `Secure your spot at Narayana School, ${branchName} today!`,
      defaultCity: match?.city.value || cityName,
      defaultBranch: match?.branch.value || branchName,
    },
  };
}
