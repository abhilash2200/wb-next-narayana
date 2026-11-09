import { Metadata } from "next";
import { getPageDataForSegments, pageDataRegistry } from "@/data/dynamicPages";
// import { getBranchPageData } from "@/data/branchPages";
import { getLandingPageTemplate, type LandingPageTemplate } from "@/app/services/landingPageService";
import {
  ADMISSION_DATA,
  // findBranchGlobally,
  getAllBranchList,
  slugify,
} from "@/lib/admissionData";
// import BranchDetailView from "@/components/branch/BranchDetailView";
import {
  DynamicHero,
  DynamicLearningOutcomes,
  DynamicWhyChoose,
  DynamicAcademicStage,
  DynamicFacilities,
  DynamicRightSchool,
  DynamicAcademicResults,
  DynamicTestimonials,
  DynamicFAQ,
  AdmissionsComingSoon,
  DynamicTemplateRenderer,
} from "@/components/dynamic-component";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export const dynamicParams = true;

export function generateStaticParams() {
  const params: { slug: string[] }[] = [];
  const seen = new Set<string>();

  const addParam = (slugArr: string[]) => {
    const key = slugArr.join("/");
    if (!seen.has(key)) {
      seen.add(key);
      params.push({ slug: slugArr });
    }
  };

  // 1. Registered landing pages (e.g. /cbse-school-class-1)
  Object.keys(pageDataRegistry).forEach((slug) => {
    addParam([slug]);
  });

  // 2. Direct branch pages: baseurl/{branchname} (e.g. /howrah, /newtown, /asansol)
  getAllBranchList().forEach((b) => {
    addParam([b.slug]);
  });

  // 3. City pages and hierarchical paths (e.g. /kolkata, /kolkata/newtown)
  ADMISSION_DATA.forEach((city) => {
    const citySlug = slugify(city.value);
    addParam([citySlug]);

    city.branches.forEach((branch) => {
      const branchSlug = slugify(branch.value);
      addParam([citySlug, branchSlug]);
    });
  });

  return params;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  if (slug.length >= 1 && slug.length <= 3) {
    try {
      const template = await getLandingPageTemplate(slug);
      if (template?.revision) {
        const canonicalPath =
          template.page?.canonical_path || `/${slug.join("/")}`;

        const isIndexed =
          template.revision.is_indexed ??
          template.revision.seo?.is_indexed ??
          template.revision.seo?.index ??
          template.page?.is_indexed ??
          (template.revision.robots
            ? !template.revision.robots.toLowerCase().includes("noindex")
            : template.revision.seo?.robots
            ? !template.revision.seo.robots.toLowerCase().includes("noindex")
            : false);

        return {
          title: template.revision.seo?.title || template.revision.title,
          description: template.revision.seo?.description || "",
          alternates: {
            canonical: canonicalPath,
          },
          robots: isIndexed
            ? {
                index: true,
                follow: true,
                googleBot: {
                  index: true,
                  follow: true,
                },
              }
            : {
                index: false,
                follow: false,
                googleBot: {
                  index: false,
                  follow: false,
                },
              },
        };
      }
    } catch {
      // Slug was requested but no active published template exists (404)
      const formattedScope = slug
        .map((s) => s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()))
        .join(" - ");
      return {
        title: `Admissions Opening Soon | ${formattedScope} | Narayana Schools`,
        description: `Admissions information for ${formattedScope} at Narayana Schools West Bengal is opening soon. Explore our campuses or contact the admissions desk.`,
        alternates: {
          canonical: `/${slug.join("/")}`,
        },
        robots: {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        },
      };
    }
  }

  const pageData = getPageDataForSegments(slug);
  return {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    alternates: {
      canonical: `/${slug.join("/")}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}


export default async function DynamicCatchAllPage({ params }: PageProps) {
  const { slug } = await params;

  // Dynamic API Page Resolver:
  // - 1 slug: /kolkata (Load exact city template)
  // - 2 slugs: /kolkata/saltlake (Load exact city and branch template)
  // - 3 slugs: /kolkata/saltlake/e-kidz-n-nursery (Load exact city, branch, and class template)
  if (slug.length >= 1 && slug.length <= 3) {
    let template: LandingPageTemplate | null = null;
    try {
      template = await getLandingPageTemplate(slug);
    } catch (error) {
      console.error("Landing page API error:", error);
    }

    const isKnownStaticPage =
      slug.length === 1 && Boolean(pageDataRegistry[slug[0]]);

    if (!template && !isKnownStaticPage) {
      return <AdmissionsComingSoon slugs={slug} />;
    }

    if (template) {
      return <DynamicTemplateRenderer template={template} />;
    }
  }

  // Direct branch page - temporarily commented off
  // if (slug.length === 1 && findBranchGlobally(slug[0])) {
  //   return <BranchDetailView branchId={slug[0]} />;
  // }

  // Existing dynamic pages
  const pageData = getPageDataForSegments(slug);



  return (

    <main>
      <DynamicHero {...pageData.hero} />

      {/* {pageData.banner && <DynamicDesktopBanner {...pageData.banner} />} */}

      <DynamicLearningOutcomes {...pageData.learningOutcomes} />
      <DynamicWhyChoose {...pageData.whyChoose} />
      <DynamicAcademicStage {...pageData.academicStage} />
      <DynamicFacilities {...pageData.facilities} />
      <DynamicRightSchool {...pageData.rightSchool} />
      <DynamicAcademicResults {...pageData.academicResults} />
      <DynamicTestimonials {...pageData.testimonials} />
      <DynamicFAQ {...pageData.faq} />


    </main>
  );
}

