"use client";

import { useEffect, useMemo } from "react";
import { useModal } from "@/context/ModalContext";
import type {
  LandingPageTemplate,
  LandingPageMedia,
} from "@/app/services/landingPageService";
import {
  DynamicHero,
  DynamicLearningOutcomes,
  DynamicWhyChoose,
  DynamicAcademicStage,
  DynamicDesktopBanner,
  DynamicFacilities,
  DynamicRightSchool,
  DynamicAcademicResults,
  DynamicTestimonials,
  DynamicFAQ,
  DynamicLimiteseat,
} from "@/components/dynamic-component";
import type {
  DynamicLearningOutcomesData,
  LearningOutcomeItem,
  DynamicWhyChooseData,
  DynamicAcademicStageData,
  DynamicBannerData,
  DynamicFacilitiesData,
  DynamicRightSchoolData,
  DynamicAcademicResultsData,
  DynamicTestimonialsData,
  DynamicFAQData,
} from "@/types/dynamic-page";

export function getLearningOutcomes(
  content: Record<string, unknown>,
  media: Record<string, { public_url: string }>
): DynamicLearningOutcomesData {
  const heading =
    typeof content["heading"] === "string" ? content["heading"] : "";

  const subheading =
    typeof content["subheading"] === "string" ? content["subheading"] : "";

  const rawPrograms = content["programs"];

  const outcomes: LearningOutcomeItem[] = Array.isArray(rawPrograms)
    ? rawPrograms
        .filter((item) => typeof item === "object" && item !== null)
        .map((item) => {
          const program = item as Record<string, unknown>;

          const mediaId = program["desktop_media_id"] ?? program["media_id"];
          const mediaItem =
            mediaId !== null && mediaId !== undefined
              ? media[String(mediaId)]
              : undefined;

          const rawFeatures = program["features"];

          const points = Array.isArray(rawFeatures)
            ? rawFeatures
                .filter(
                  (feature) =>
                    typeof feature === "object" &&
                    feature !== null &&
                    "text" in feature &&
                    typeof feature.text === "string"
                )
                .map((feature) => (feature as { text: string }).text)
            : [];

          return {
            image:
              mediaItem?.public_url ||
              (typeof program["image"] === "string" ? program["image"] : ""),
            title:
              typeof program["name"] === "string" ? program["name"] : "",
            points:
              typeof program["class_range"] === "string"
                ? [program["class_range"], ...points]
                : points,
          };
        })
        .sort((a, b) => {
          const programs = rawPrograms as Record<string, unknown>[];
          const indexA = programs.findIndex(
            (program) => program["name"] === a.title
          );
          const indexB = programs.findIndex(
            (program) => program["name"] === b.title
          );
          return indexA - indexB;
        })
    : [];

  return { heading, subheading, outcomes };
}

export function getWhyChooseData(
  content: Record<string, unknown>,
  media: Record<string, { public_url: string }>
): DynamicWhyChooseData {
  const rawItems = content["items"] ?? content["boxes"];

  const items = Array.isArray(rawItems)
    ? rawItems
        .filter((item) => typeof item === "object" && item !== null)
        .map((item) => {
          const data = item as Record<string, unknown>;
          const mediaId = data["icon_media_id"] ?? data["media_id"];
          const mediaItem =
            mediaId !== null && mediaId !== undefined
              ? media[String(mediaId)]
              : undefined;

          let iconUrl =
            mediaItem?.public_url ||
            (typeof data["icon"] === "string" ? data["icon"] : "") ||
            (typeof data["image"] === "string" ? data["image"] : "");

          if (iconUrl) {
            iconUrl = iconUrl.trim();
            if (
              !iconUrl.startsWith("http://") &&
              !iconUrl.startsWith("https://") &&
              !iconUrl.startsWith("/")
            ) {
              if (iconUrl.startsWith("assets/")) {
                iconUrl = `/${iconUrl}`;
              } else {
                const cdnBase = (
                  process.env.NEXT_PUBLIC_CDN_BASE_URL ?? ""
                ).trim().replace(/\/$/, "");
                iconUrl = cdnBase ? `${cdnBase}/${iconUrl}` : `/${iconUrl}`;
              }
            }
          }

          return {
            icon: iconUrl,
            title:
              typeof data["title"] === "string"
                ? data["title"]
                : typeof data["heading"] === "string"
                ? data["heading"]
                : "",
            description:
              typeof data["description"] === "string"
                ? data["description"]
                : typeof data["paragraph"] === "string"
                ? data["paragraph"]
                : "",
          };
        })
    : [];

  const rawHeading =
    typeof content["heading"] === "string"
      ? content["heading"]
      : typeof content["sectionHeading"] === "string"
      ? content["sectionHeading"]
      : "";

  let highlightWord =
    typeof content["highlight_word"] === "string"
      ? content["highlight_word"]
      : typeof content["highlightWord"] === "string"
      ? content["highlightWord"]
      : typeof content["highlighted_text"] === "string"
      ? content["highlighted_text"]
      : typeof content["highlightText"] === "string"
      ? content["highlightText"]
      : "";

  const headingSuffix =
    typeof content["heading_suffix"] === "string"
      ? content["heading_suffix"]
      : typeof content["headingSuffix"] === "string"
      ? content["headingSuffix"]
      : "";

  if (!highlightWord && rawHeading) {
    const bracketMatch = rawHeading.match(/[\[\{](.*?)[\]\}]/);
    if (bracketMatch) {
      highlightWord = bracketMatch[1].trim();
    } else {
      const narayanaMatch = rawHeading.match(/\bNarayana\b/i);
      if (narayanaMatch) {
        highlightWord = narayanaMatch[0];
      }
    }
  }

  return {
    heading: rawHeading,
    highlightWord,
    headingSuffix,
    subheading:
      typeof content["subheading"] === "string"
        ? content["subheading"]
        : typeof content["sectionSubHeading"] === "string"
        ? content["sectionSubHeading"]
        : "",
    items,
  };
}

export function getAcademicStageData(
  content: Record<string, unknown>,
  media: Record<string, { public_url: string }>
): DynamicAcademicStageData {
  const programs = Array.isArray(content["programs"])
    ? content["programs"]
    : [];

  const program = programs.find(
    (item) => typeof item === "object" && item !== null
  ) as Record<string, unknown> | undefined;

  if (!program) {
    return {
      heading:
        typeof content["heading"] === "string" ? content["heading"] : "",
      badgeTitle: "",
      pillars: [],
      mobilePoints: [],
    };
  }

  const getMediaUrl = (id: unknown, fallback: string = "") => {
    if (id === null || id === undefined) return fallback;
    return media[String(id)]?.public_url || fallback;
  };

  const featureGroups = Array.isArray(program["feature_groups"])
    ? program["feature_groups"]
    : [];

  const mapPillarIcon = (iconKey: unknown, title: string, idx: number) => {
    const key = String(iconKey || "").toUpperCase();
    if (key.includes("TREND") || key.includes("CHART")) return "fas fa-arrow-trend-up";
    if (key.includes("PUZZLE")) return "fas fa-puzzle-piece";
    if (key.includes("FLASK") || key.includes("SCIENCE")) return "fas fa-flask";
    if (key.includes("ID") || key.includes("BADGE") || key.includes("TEACHER")) return "fas fa-id-badge";
    if (key.includes("BRAIN")) return "fas fa-brain";
    if (key.includes("BOOK")) return "fas fa-book";
    if (key.includes("SHIELD")) return "fas fa-shield-alt";

    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("holistic") || lowerTitle.includes("development")) return "fas fa-arrow-trend-up";
    if (lowerTitle.includes("concept")) return "fas fa-puzzle-piece";
    if (lowerTitle.includes("logic") || lowerTitle.includes("scien")) return "fas fa-flask";
    if (lowerTitle.includes("structur") || lowerTitle.includes("support")) return "fas fa-id-badge";

    if (idx === 0) return "fas fa-arrow-trend-up";
    if (idx === 1) return "fas fa-puzzle-piece";
    if (idx === 2) return "fas fa-flask";
    if (idx === 3) return "fas fa-id-badge";
    return "fas fa-star";
  };

  const pillars = featureGroups
    .filter((item) => typeof item === "object" && item !== null)
    .map((item, idx) => {
      const group = item as Record<string, unknown>;
      const rawPoints = Array.isArray(group["points"]) ? group["points"] : [];
      const title = typeof group["title"] === "string" ? group["title"] : "";

      return {
        icon: mapPillarIcon(group["icon_key"], title, idx),
        title,
        points: rawPoints
          .filter(
            (point) =>
              typeof point === "object" &&
              point !== null &&
              "text" in point &&
              typeof point.text === "string"
          )
          .map((point) => (point as { text: string }).text),
      };
    });

  const rawHighlights = Array.isArray(program["mobile_highlights"])
    ? program["mobile_highlights"]
    : [];

  const extractedMobilePoints = rawHighlights
    .filter(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        "text" in item &&
        typeof item.text === "string"
    )
    .map((item) => (item as { text: string }).text);

  const fallbackPoints = pillars.flatMap((p) => p.points);
  const mobilePoints = extractedMobilePoints.length > 0 ? extractedMobilePoints : fallbackPoints;

  const badgeTitle = typeof program["name"] === "string" ? program["name"] : "";

  let badgeSubtitle = "";
  if (typeof program["class_range"] === "string" && program["class_range"].trim()) {
    const rawCr = program["class_range"].trim();
    const firstGroupTitle = typeof featureGroups[0]?.["title"] === "string" ? featureGroups[0]["title"].trim() : "";
    if (rawCr !== firstGroupTitle && !badgeTitle.toLowerCase().includes(rawCr.toLowerCase())) {
      badgeSubtitle = rawCr.startsWith("(") ? rawCr : `(${rawCr})`;
    }
  }

  const feesCta = program["fees_cta"] as Record<string, unknown> | undefined;
  const brochureCta = program["brochure_cta"] as Record<string, unknown> | undefined;
  const callbackCta = program["callback_cta"] as Record<string, unknown> | undefined;

  const feesButtonText = typeof feesCta?.["label"] === "string" ? feesCta["label"] : undefined;
  const feesButtonUrl = typeof feesCta?.["url"] === "string" ? feesCta["url"] : null;

  const brochureButtonText = typeof brochureCta?.["label"] === "string" ? brochureCta["label"] : undefined;
  const brochureButtonUrl = typeof brochureCta?.["url"] === "string" ? brochureCta["url"] : null;

  const callbackButtonText = typeof callbackCta?.["label"] === "string" ? callbackCta["label"] : undefined;
  const callbackButtonUrl = typeof callbackCta?.["url"] === "string" ? callbackCta["url"] : null;

  return {
    heading:
      typeof content["heading"] === "string" ? content["heading"] : "",
    badgeTitle,
    badgeSubtitle,
    badgeIcon: getMediaUrl(program["badge_icon_media_id"], ""),
    imageLeft: getMediaUrl(program["desktop_primary_media_id"], ""),
    imageRight: getMediaUrl(program["desktop_secondary_media_id"], ""),
    mobileImage: getMediaUrl(program["mobile_media_id"], ""),
    pillars,
    mobilePoints,
    feesButtonText,
    feesButtonUrl,
    brochureButtonText,
    brochureButtonUrl,
    callbackButtonText,
    callbackButtonUrl,
  };
}

export function getAllAcademicStagesData(
  content: Record<string, unknown>,
  media: Record<string, { public_url: string }>
): DynamicAcademicStageData[] {
  const rawPrograms = content["programs"];
  if (!Array.isArray(rawPrograms) || rawPrograms.length === 0) {
    const single = getAcademicStageData(content, media);
    return single.badgeTitle || single.pillars.length > 0 ? [single] : [];
  }

  return rawPrograms
    .filter((item) => typeof item === "object" && item !== null)
    .map((prog) => {
      const singleContent = {
        heading: typeof content["heading"] === "string" ? content["heading"] : "",
        programs: [prog],
      };
      return getAcademicStageData(singleContent, media);
    });
}

export function getFacilitiesData(
  content: Record<string, unknown>,
  media: Record<string, { public_url: string }>
): DynamicFacilitiesData {
  const rawItems = content["items"];

  const facilities = Array.isArray(rawItems)
    ? rawItems
        .filter((item) => typeof item === "object" && item !== null)
        .map((item) => {
          const data = item as Record<string, unknown>;
          const mediaId =
            data["facility_photo_media_id"] ??
            data["media_id"] ??
            data["photo_media_id"];

          return {
            title:
              typeof data["title"] === "string" ? data["title"] : "",
            description:
              typeof data["description"] === "string" ? data["description"] : "",
            image:
              mediaId !== null && mediaId !== undefined
                ? media[String(mediaId)]?.public_url || ""
                : "",
          };
        })
        .sort((a, b) => {
          const items = rawItems as Record<string, unknown>[];
          const indexA = items.findIndex((item) => item["title"] === a.title);
          const indexB = items.findIndex((item) => item["title"] === b.title);
          return indexA - indexB;
        })
    : [];

  return {
    heading:
      typeof content["heading"] === "string" ? content["heading"] : "",
    subheading:
      typeof content["subheading"] === "string" ? content["subheading"] : "",
    facilities,
  };
}

export function getRightSchoolData(
  content: Record<string, unknown>
): DynamicRightSchoolData {
  const rawItems = content["items"];

  const items = Array.isArray(rawItems)
    ? rawItems
        .filter((item) => typeof item === "object" && item !== null)
        .map((item) => {
          const data = item as Record<string, unknown>;

          return {
            title: typeof data["title"] === "string" ? data["title"] : "",
            description:
              typeof data["description"] === "string" ? data["description"] : "",
          };
        })
        .sort((a, b) => {
          const sourceItems = rawItems as Record<string, unknown>[];
          const orderA = sourceItems.find(
            (item) => item["title"] === a.title
          )?.["sort_order"];
          const orderB = sourceItems.find(
            (item) => item["title"] === b.title
          )?.["sort_order"];

          return (
            (typeof orderA === "number" ? orderA : 0) -
            (typeof orderB === "number" ? orderB : 0)
          );
        })
    : [];

  return {
    heading:
      typeof content["heading"] === "string" ? content["heading"] : "",
    subheading:
      typeof content["subheading"] === "string" ? content["subheading"] : "",
    items,
  };
}

export function getAcademicResultsData(
  content: Record<string, unknown>,
  media: Record<string, { public_url: string }>
): DynamicAcademicResultsData {
  const rawResults = content["results"];

  const results = Array.isArray(rawResults)
    ? rawResults
        .filter((item) => typeof item === "object" && item !== null)
        .map((item) => {
          const data = item as Record<string, unknown>;
          const mediaId =
            data["student_photo_media_id"] ??
            data["media_id"] ??
            data["photo_media_id"];

          return {
            name:
              typeof data["student_name"] === "string"
                ? data["student_name"]
                : "",
            marks:
              typeof data["score"] === "string" ||
              typeof data["score"] === "number"
                ? String(data["score"])
                : "",
            exam: typeof data["exam"] === "string" ? data["exam"] : "",
            image:
              mediaId !== null && mediaId !== undefined
                ? media[String(mediaId)]?.public_url || ""
                : "",
          };
        })
        .sort((a, b) => {
          const source = rawResults as Record<string, unknown>[];
          const orderA = source.find(
            (item) => item["student_name"] === a.name
          )?.["sort_order"];
          const orderB = source.find(
            (item) => item["student_name"] === b.name
          )?.["sort_order"];

          return (
            (typeof orderA === "number" ? orderA : 0) -
            (typeof orderB === "number" ? orderB : 0)
          );
        })
    : [];

  const cta = content["cta"];
  const ctaData =
    typeof cta === "object" && cta !== null
      ? (cta as Record<string, unknown>)
      : {};

  return {
    heading:
      typeof content["heading"] === "string" ? content["heading"] : "",
    subheading:
      typeof content["subheading"] === "string" ? content["subheading"] : "",
    results,
    ctaButtonText:
      typeof ctaData["label"] === "string" ? ctaData["label"] : "",
  };
}

export function getTestimonialsData(
  content: Record<string, unknown>
): DynamicTestimonialsData {
  const rawTestimonials = content["testimonials"];

  const testimonials = Array.isArray(rawTestimonials)
    ? rawTestimonials
        .filter((item) => typeof item === "object" && item !== null)
        .map((item) => {
          const data = item as Record<string, unknown>;

          return {
            name: typeof data["name"] === "string" ? data["name"] : "",
            location:
              typeof data["location"] === "string" ? data["location"] : "",
            quote: typeof data["quote"] === "string" ? data["quote"] : "",
            rating:
              typeof data["rating"] === "number"
                ? Math.max(0, Math.min(5, data["rating"]))
                : 5,
          };
        })
        .sort((a, b) => {
          const source = rawTestimonials as Record<string, unknown>[];
          const orderA = source.find(
            (item) => item["name"] === a.name
          )?.["sort_order"];
          const orderB = source.find(
            (item) => item["name"] === b.name
          )?.["sort_order"];

          return (
            (typeof orderA === "number" ? orderA : 0) -
            (typeof orderB === "number" ? orderB : 0)
          );
        })
    : [];

  return {
    heading:
      typeof content["heading"] === "string" ? content["heading"] : "",
    subheading:
      typeof content["subheading"] === "string" ? content["subheading"] : "",
    testimonials,
  };
}

export function getFAQData(content: Record<string, unknown>): DynamicFAQData {
  const rawItems = content["items"];

  const faqs = Array.isArray(rawItems)
    ? rawItems
        .filter((item) => typeof item === "object" && item !== null)
        .map((item) => {
          const data = item as Record<string, unknown>;

          return {
            question: typeof data["question"] === "string" ? data["question"] : "",
            answer: typeof data["answer"] === "string" ? data["answer"] : "",
            sort_order:
              typeof data["sort_order"] === "number" ? data["sort_order"] : 0,
          };
        })
        .sort((a, b) => a.sort_order - b.sort_order)
        .map(({ question, answer }) => ({ question, answer }))
    : [];

  return {
    heading:
      typeof content["heading"] === "string" ? content["heading"] : "",
    faqs,
  };
}

export function getImageSectionData(
  content: Record<string, unknown>,
  media: Record<string, { public_url: string }>
): DynamicBannerData {
  const getMediaUrl = (id: unknown, fallback: string = "") => {
    if (id === null || id === undefined) return fallback;
    return media[String(id)]?.public_url || fallback;
  };

  const desktopId = content["desktop_media_id"] ?? content["media_id"];
  const mobileImages = Array.isArray(content["mobile_images"]) ? content["mobile_images"] : [];
  const mobileId = mobileImages[0]?.["media_id"] ?? content["mobile_media_id"];

  return {
    desktopImage: getMediaUrl(desktopId, ""),
    mobileImage: getMediaUrl(mobileId, ""),
    altText:
      typeof content["desktop_alt"] === "string"
        ? content["desktop_alt"]
        : typeof content["title"] === "string"
        ? content["title"]
        : "Campus Gallery Showcase",
  };
}

export interface DynamicTemplateRendererProps {
  template: LandingPageTemplate;
  isPreview?: boolean;
  className?: string;
}

function getSectionVisibilityClass(
  content?: Record<string, unknown>
): string | false {
  if (!content) return "";
  const isDesktop =
    content.desktop_active !== false &&
    content.show_desktop !== false &&
    content.desktopActive !== false;
  const isMobile =
    content.mobile_active !== false &&
    content.show_mobile !== false &&
    content.mobileActive !== false;

  if (!isDesktop && !isMobile) return false;
  if (!isDesktop) return "block md:hidden";
  if (!isMobile) return "hidden md:block";
  return "";
}

export default function DynamicTemplateRenderer({
  template,
  isPreview = false,
  className = "",
}: DynamicTemplateRendererProps) {
  const { setPageContext } = useModal();

  // Register page context with ModalProvider
  useEffect(() => {
    if (template.page?.id && template.revision?.id) {
      setPageContext(template.page.id, template.revision.id, isPreview);
    }
  }, [template.page?.id, template.revision?.id, isPreview, setPageContext]);

  const sortedSections = useMemo(
    () => [...template.sections].sort((a, b) => a.sort_order - b.sort_order),
    [template.sections]
  );

  // Extract sections & precompute data
  const bannerSection = sortedSections.find((s) => s.type === "BANNER");
  const bannerContent = bannerSection?.content;

  const heading =
    typeof bannerContent?.heading === "string"
      ? bannerContent.heading
      : typeof bannerContent?.h1 === "string"
      ? bannerContent.h1
      : "";

  const eyebrow =
    typeof bannerContent?.eyebrow === "string"
      ? bannerContent.eyebrow
      : typeof bannerContent?.subHeading === "string"
      ? bannerContent.subHeading
      : typeof bannerContent?.sub_heading === "string"
      ? bannerContent.sub_heading
      : "";

  const eyebrowHighlight =
    typeof bannerContent?.eyebrow_highlight === "string"
      ? bannerContent.eyebrow_highlight
      : typeof bannerContent?.eyebrowHighlight === "string"
      ? bannerContent.eyebrowHighlight
      : "";

  const highlightText =
    typeof bannerContent?.highlighted_text === "string"
      ? bannerContent.highlighted_text
      : typeof bannerContent?.highlightText === "string"
      ? bannerContent.highlightText
      : typeof bannerContent?.highlight_text === "string"
      ? bannerContent.highlight_text
      : "";

  const mainHeadingPrefix =
    typeof bannerContent?.main_heading_prefix === "string"
      ? bannerContent.main_heading_prefix
      : typeof bannerContent?.mainHeadingPrefix === "string"
      ? bannerContent.mainHeadingPrefix
      : "";

  const mainHeadingSuffix =
    typeof bannerContent?.main_heading_suffix === "string"
      ? bannerContent.main_heading_suffix
      : typeof bannerContent?.mainHeadingSuffix === "string"
      ? bannerContent.mainHeadingSuffix
      : "";

  const formTitle =
    typeof bannerContent?.form_title === "string"
      ? bannerContent.form_title
      : typeof bannerContent?.formTitle === "string"
      ? bannerContent.formTitle
      : typeof bannerContent?.card_title === "string"
      ? bannerContent.card_title
      : "";

  const bullets = Array.isArray(bannerContent?.bullets)
    ? bannerContent.bullets
        .map((item: unknown) => {
          if (typeof item === "string") return item.trim();
          if (typeof item === "object" && item !== null && "text" in item) {
            return String((item as { text: unknown }).text || "").trim();
          }
          return "";
        })
        .filter((text: string) => text.length > 0)
    : [];

  const primaryCta = bannerContent?.primary_cta;
  const ctaButtonText =
    (typeof primaryCta === "object" &&
      primaryCta !== null &&
      "label" in primaryCta &&
      typeof primaryCta.label === "string" &&
      primaryCta.label.trim()) ||
    (typeof bannerContent?.buttonText === "string" &&
      bannerContent.buttonText.trim()) ||
    (typeof bannerContent?.button_text === "string" &&
      bannerContent.button_text.trim()) ||
    (typeof bannerContent?.ctaButtonText === "string" &&
      bannerContent.ctaButtonText.trim()) ||
    "";

  const bannerMediaId =
    bannerContent?.desktop_background_media_id ??
    bannerContent?.desktop_media_id ??
    bannerContent?.background_media_id ??
    bannerContent?.media_id;

  const bannerBgImage =
    (bannerMediaId !== null && bannerMediaId !== undefined
      ? template.media[String(bannerMediaId)]?.public_url
      : undefined) ||
    (typeof bannerContent?.background_image_url === "string"
      ? bannerContent.background_image_url
      : undefined) ||
    (typeof bannerContent?.desktop_background_url === "string"
      ? bannerContent.desktop_background_url
      : undefined) ||
    (typeof bannerContent?.backgroundImage === "string"
      ? bannerContent.backgroundImage
      : undefined);

  const rawCounters = Array.isArray(bannerContent?.counters)
    ? bannerContent.counters
    : Array.isArray(bannerContent?.stats)
    ? bannerContent.stats
    : [];

  const counters = rawCounters
    .filter(
      (c): c is Record<string, unknown> => typeof c === "object" && c !== null
    )
    .map((c, idx) => {
      const rawVal = String(c["target"] ?? c["value"] ?? "").trim();
      const numericPart = parseInt(rawVal.replace(/\D/g, ""), 10) || 0;
      const extractedSuffix = rawVal.replace(/^[\d,.\s]+/, "");
      const suffix =
        typeof c["suffix"] === "string"
          ? c["suffix"]
          : extractedSuffix || (rawVal.includes("+") ? "+" : undefined);

      return {
        target: numericPart,
        label: String(c["label"] ?? "").trim(),
        suffix,
        delay: typeof c["delay"] === "number" ? c["delay"] : (idx + 1) * 100,
      };
    })
    .filter((c) => c.label.length > 0 || c.target > 0);

  const classesSection = sortedSections.find((s) => s.type === "CLASSES");
  const learningOutcomes = classesSection
    ? getLearningOutcomes(classesSection.content, template.media)
    : null;

  const whyUsSection = sortedSections.find((s) => s.type === "WHY_US");
  const whyChooseData = whyUsSection
    ? getWhyChooseData(whyUsSection.content, template.media)
    : null;

  const coursesSection = sortedSections.find((s) => s.type === "COURSES");
  const academicStageData = coursesSection
    ? getAcademicStageData(coursesSection.content, template.media)
    : null;
  const allAcademicStages = coursesSection
    ? getAllAcademicStagesData(coursesSection.content, template.media)
    : [];

  const facilitiesSection = sortedSections.find((s) => s.type === "FACILITIES");
  const facilitiesData = facilitiesSection
    ? getFacilitiesData(facilitiesSection.content, template.media)
    : null;

  const rightSchoolSection = sortedSections.find(
    (s) => s.type === "RIGHT_SCHOOL"
  );
  const rightSchoolData = rightSchoolSection
    ? getRightSchoolData(rightSchoolSection.content)
    : null;

  const academicResultsSection = sortedSections.find(
    (s) => s.type === "ACADEMIC_RESULTS"
  );
  const academicResultsData = academicResultsSection
    ? getAcademicResultsData(academicResultsSection.content, template.media)
    : null;

  const testimonialsSection = sortedSections.find(
    (s) => s.type === "PARENTS_SAY"
  );
  const testimonialsData = testimonialsSection
    ? getTestimonialsData(testimonialsSection.content)
    : null;

  const faqSection = sortedSections.find((s) => s.type === "FAQ");
  const faqData = faqSection ? getFAQData(faqSection.content) : null;

  const imageSection = sortedSections.find((s) => s.type === "IMAGE_SECTION");
  const imageSectionData = imageSection
    ? getImageSectionData(imageSection.content, template.media)
    : null;

  const defaultCity = template.page.scope?.city?.slug;
  const defaultBranch = template.page.scope?.branch?.slug;
  const defaultClass = template.page.scope?.class?.slug;

  return (
    <main className={className}>
      {sortedSections.map((section, index) => {
        const key = `section-${section.type}-${section.sort_order ?? index}-${index}`;
        const visibilityClass = getSectionVisibilityClass(section.content);
        if (visibilityClass === false) return null;

        const renderSectionNode = () => {
          switch (section.type) {
            case "BANNER":
              return (
                <DynamicHero
                  key={key}
                  pageId={template.page.id}
                  revisionId={template.revision.id}
                  heading={heading}
                  headingOverride={heading}
                  preHeading={eyebrow}
                  eyebrowHighlight={eyebrowHighlight}
                  highlightText={highlightText}
                  mainHeadingPrefix={mainHeadingPrefix}
                  mainHeadingSuffix={mainHeadingSuffix}
                  bulletPoints={bullets}
                  counters={counters}
                  backgroundImage={bannerBgImage}
                  formTitle={formTitle}
                  ctaButtonText={ctaButtonText}
                  defaultCity={defaultCity}
                  defaultBranch={defaultBranch}
                  defaultClass={defaultClass}
                  isPreview={isPreview}
                />
              );

            case "CLASSES":
              return learningOutcomes ? (
                <DynamicLearningOutcomes key={key} {...learningOutcomes} />
              ) : null;

            case "WHY_US":
              return whyChooseData ? (
                <DynamicWhyChoose key={key} {...whyChooseData} />
              ) : null;

            case "COURSES":
              return allAcademicStages.length > 0 ? (
                <div key={key} className="space-y-12 md:space-y-16">
                  {allAcademicStages.map((stageData, sIdx) => (
                    <DynamicAcademicStage key={`${key}-${sIdx}`} {...stageData} />
                  ))}
                </div>
              ) : academicStageData ? (
                <DynamicAcademicStage key={key} {...academicStageData} />
              ) : null;

            case "FACILITIES":
              return facilitiesData ? (
                <DynamicFacilities key={key} {...facilitiesData} />
              ) : null;

            case "RIGHT_SCHOOL":
              return rightSchoolData ? (
                <DynamicRightSchool key={key} {...rightSchoolData} />
              ) : null;

            case "ACADEMIC_RESULTS":
              return academicResultsData ? (
                <DynamicAcademicResults key={key} {...academicResultsData} />
              ) : null;

            case "PARENTS_SAY":
              return testimonialsData ? (
                <DynamicTestimonials key={key} {...testimonialsData} />
              ) : null;

            case "FAQ":
              return faqData ? <DynamicFAQ key={key} {...faqData} /> : null;

            case "LIMITED_SEATS":
              return (
                <DynamicLimiteseat
                  key={key}
                  pageId={template.page.id}
                  revisionId={template.revision.id}
                  content={section.content}
                  media={template.media as Record<string, LandingPageMedia>}
                  defaultCity={defaultCity}
                  defaultBranch={defaultBranch}
                  defaultClass={defaultClass}
                  isPreview={isPreview}
                />
              );

            case "IMAGE_SECTION":
              return imageSectionData && (imageSectionData.desktopImage || imageSectionData.mobileImage) ? (
                <DynamicDesktopBanner key={key} {...imageSectionData} />
              ) : null;

            default:
              return null;
          }
        };

        const sectionNode = renderSectionNode();
        if (!sectionNode) return null;

        if (visibilityClass) {
          return (
            <div key={key} className={visibilityClass}>
              {sectionNode}
            </div>
          );
        }

        return sectionNode;
      })}
    </main>
  );
}
