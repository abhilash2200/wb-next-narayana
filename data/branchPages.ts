import { BranchPageData } from "@/types/branch-page";
import { findBranchGlobally, slugify } from "@/lib/admissionData";

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
 * Validates whether a requested slug matches one of the allowed static branches.
 * Normalizes hyphens, spaces, and casing (e.g. "new-town", "newtown", "New Town" all match).
 */
export function isAllowedStaticBranch(branchSlug: string): boolean {
  if (!branchSlug) return false;
  const clean = branchSlug.toLowerCase().trim().replace(/[\s_-]+/g, "");
  return ALLOWED_STATIC_BRANCH_SLUGS.some(
    (b) => b.toLowerCase().replace(/[\s_-]+/g, "") === clean
  );
}

export const branchDataRegistry: Record<string, BranchPageData> = {};

/**
 * Retrieves branch-specific page data by branchId (e.g. "howrah", "newtown").
 * If custom curated data is not in the registry, it dynamically constructs
 * a complete, structured data profile based on ADMISSION_DATA.
 */
export function getBranchPageData(branchId: string): BranchPageData {
  const normId = slugify(branchId);

  if (branchDataRegistry[normId]) {
    return branchDataRegistry[normId];
  }

  const match = findBranchGlobally(branchId);
  const branchName = match ? match.branch.label || match.branch.value : branchId.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const cityName = match ? match.city.label || match.city.value : "West Bengal";

  const programs: string[] = match
    ? Array.from(
        new Set<string>(
          Object.values(match.branch.classes).flatMap((clsArr) => clsArr)
        )
      )
    : ["Pre-Primary", "Class 1 to 5", "Class 6 to 10", "Class 11 & 12"];

  return {
    branchId: normId,
    branchName,
    cityName,
    metaTitle: `Narayana School ${branchName}, ${cityName} | Admissions Open 2027-28`,
    metaDescription: `Admissions open at Narayana School ${branchName}, ${cityName}. Experience CBSE excellence, modern smart classrooms, advanced labs, and proven top ranks.`,
    address: `Narayana School Campus, ${branchName}, ${cityName}, West Bengal`,
    phone: "9073339933",
    email: "info@narayanaschools.in",
    hero: {
      title: `Narayana School, ${branchName}`,
      subtitle: `Empowering young minds in ${cityName} with academic excellence, digital learning, and holistic character building.`,
      badge: "CBSE Affiliated Campus",
      backgroundImage: "/assets/bvanner-4.webp",
    },
    about: {
      heading: `About Narayana School, ${branchName}`,
      description: `Narayana School ${branchName} is part of the renowned Narayana Educational Institutions, Asia's largest educational conglomerate with 47+ years of academic legacy. We offer integrated CBSE curriculum, stress-free pedagogy, and future-ready competitive orientation.`,
      highlights: [
        "State-of-the-art interactive smart classrooms",
        "Dedicated competitive exam coaching (Olympiads, JEE, NEET)",
        "Experienced and caring teaching faculty",
        "Safe and secure GPS-enabled school transport across key routes",
      ],
    },
    facilities: [
      {
        title: "Digital Classrooms",
        description: "Audio-visual interactive boards for conceptual understanding.",
        icon: "fas fa-chalkboard-teacher",
        image: "/assets/banner-4.webp",
      },
      {
        title: "Science & Computer Labs",
        description: "Fully equipped Physics, Chemistry, Biology, and IT labs for practical mastery.",
        icon: "fas fa-microscope",
        image: "/assets/banner-5.webp",
      },
      {
        title: "Library & Resource Hub",
        description: "Curated collection of academic books, periodicals, and digital research.",
        icon: "fas fa-book-reader",
        image: "/assets/banner-2.webp",
      },
      {
        title: "Sports & Physical Education",
        description: "Indoor and outdoor sports facilities with trained physical fitness coaches.",
        icon: "fas fa-volleyball-ball",
        image: "/assets/banner-6.webp",
      },
    ],
    programsOffered: programs,
  };
}
