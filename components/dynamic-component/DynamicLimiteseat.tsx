"use client";

import Image from "next/image";
import { useModal } from "@/context/ModalContext";
import AdmissionForm from "@/components/AdmissionForm";
import type { LandingPageMedia } from "@/app/services/landingPageService";

interface LimitedSeatsStatistic {
  logo_media_id?: number;
  logo_alt?: string;
  logo_image?: string;
  title?: string;
  label?: string;
  value?: string;
  sort_order?: number;
}

interface LimitedSeatsContent {
  background_media_id?: number;
  background_alt?: string;
  background_image?: string;
  backgroundImage?: string;
  background_image_url?: string;
  feature_media_id?: number;
  feature_image?: string;
  feature_image_alt?: string;
  image?: string;
  availability_text?: string;
  urgency_text?: string;
  brochure_cta?: {
    label?: string;
    action?: string;
    url?: string | null;
  };
  form_title?: string;
  form_enabled?: boolean;
  default_form_intent?: string;
  statistics?: LimitedSeatsStatistic[];
}

interface DynamicLimiteseatProps {
  pageId: number;
  revisionId: number;
  content: Record<string, unknown>;
  media: Record<string, LandingPageMedia>;
  defaultCity?: string;
  defaultBranch?: string;
  defaultClass?: string;
  onOpenModal?: (action: "brochure" | "fees", title?: string) => void;
  isPreview?: boolean;
}

const defaultStats: LimitedSeatsStatistic[] = [
  {
    logo_image: "/assets/narayana-logo.png",
    logo_alt: "Narayana",
    title: "Narayana Schools",
    label: "Pan India Campuses",
    value: "300+",
  },
  {
    logo_image: "/assets/logo1.png",
    logo_alt: "Student Body",
    title: "Student Body",
    label: "Enrolled Students",
    value: "100,000+",
  },
];

export default function DynamicLimiteseat({
  pageId,
  revisionId,
  content,
  media,
  defaultCity,
  defaultBranch,
  defaultClass,
  onOpenModal,
  isPreview = false,
}: DynamicLimiteseatProps) {
  const { openModal } = useModal();
  const handleOpenModal = onOpenModal || openModal;

  const sectionContent = content as LimitedSeatsContent;

  const getMediaUrl = (mediaId?: number): string | undefined => {
    if (mediaId === undefined || mediaId === null) return undefined;
    return media[String(mediaId)]?.public_url;
  };

  const rawBackgroundMediaId =
    sectionContent.background_media_id ??
    (content as Record<string, unknown>)["desktop_background_media_id"];

  const backgroundUrl =
    getMediaUrl(
      typeof rawBackgroundMediaId === "number" ? rawBackgroundMediaId : undefined
    ) ||
    (typeof (content as Record<string, unknown>)["background_image"] === "string"
      ? ((content as Record<string, unknown>)["background_image"] as string)
      : undefined) ||
    (typeof (content as Record<string, unknown>)["backgroundImage"] === "string"
      ? ((content as Record<string, unknown>)["backgroundImage"] as string)
      : undefined) ||
    (typeof (content as Record<string, unknown>)["background_image_url"] === "string"
      ? ((content as Record<string, unknown>)["background_image_url"] as string)
      : undefined) ||
    "/assets/footer-bg.webp";

  const rawFeatureMediaId =
    sectionContent.feature_media_id ??
    (content as Record<string, unknown>)["media_id"];

  const featureUrl =
    getMediaUrl(
      typeof rawFeatureMediaId === "number" ? rawFeatureMediaId : undefined
    ) ||
    (typeof (content as Record<string, unknown>)["feature_image"] === "string"
      ? ((content as Record<string, unknown>)["feature_image"] as string)
      : undefined) ||
    (typeof (content as Record<string, unknown>)["image"] === "string"
      ? ((content as Record<string, unknown>)["image"] as string)
      : undefined) ||
    "/assets/footer.webp";

  const rawStats = sectionContent.statistics ?? [];
  const statistics =
    rawStats.length > 0
      ? rawStats.slice().sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
      : defaultStats;

  return (
    <section
      className="
        relative overflow-hidden
        bg-cover bg-center
        py-16 md:py-20
      "
      style={{
        backgroundImage: `url("${backgroundUrl}")`,
      }}
    >
      <div className="doodle-overlay pointer-events-none absolute inset-0 opacity-10" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center gap-8 lg:flex-row lg:gap-12">
          {/* LEFT SIDE */}
          <div
            className="w-full max-w-xl text-center lg:w-1/2 lg:text-left"
            data-animate="fade-right"
          >
            <div className="mb-6 overflow-hidden rounded-2xl shadow-2xl md:mb-8">
              <Image
                src={featureUrl}
                alt={sectionContent.feature_image_alt || "Students in hallway"}
                width={575}
                height={437}
                unoptimized={
                  featureUrl.startsWith("http") || featureUrl.startsWith("data:")
                }
                className="h-auto w-full object-cover"
              />
            </div>

            <div className="space-y-3 text-white md:space-y-4">
              <p className="px-2 text-base font-medium md:text-lg lg:px-0">
                {sectionContent.availability_text || "Secure your spot today!"}
              </p>

              <p className="text-xl font-bold md:text-2xl">
                {sectionContent.urgency_text ||
                  "Limited seats available for 2027–28 academic year."}
              </p>

              <button
                type="button"
                onClick={() => {
                  if (sectionContent.brochure_cta?.url) {
                    window.open(
                      sectionContent.brochure_cta.url,
                      "_blank",
                      "noopener,noreferrer"
                    );
                  } else {
                    handleOpenModal(
                      "brochure",
                      sectionContent.brochure_cta?.label || "Download Brochure"
                    );
                  }
                }}
                className="
                  inline-flex w-full items-center justify-center
                  gap-2 rounded-md bg-white
                  px-8 py-3 font-bold
                  text-brandOrangeDark
                  shadow-lg transition
                  hover:bg-gray-100
                  sm:w-auto
                  md:mt-4
                  cursor-pointer
                "
              >
                <i className="fas fa-download" />
                <span>
                  {sectionContent.brochure_cta?.label || "Download Brochure"}
                </span>
              </button>
            </div>
          </div>

          {/* RIGHT SIDE (ADMISSION FORM CARD) */}
          <div
            className="
              mx-auto w-full max-w-lg
              rounded-xl border-[3px]
              border-brandBlue bg-white
              p-5 shadow-2xl
              md:p-6
              lg:w-150 lg:max-w-none
            "
            data-animate="fade-left"
          >
            <h3 className="mb-5 text-xl font-bold text-black md:mb-6 md:text-3xl">
              {sectionContent.form_title || "Admission Open for AY 2027-28"}
            </h3>

            <AdmissionForm
              formId="dynamic-limited-seats"
              pageId={pageId}
              revisionId={revisionId}
              pageSection="limited-seats"
              variant="footer"
              initialCity={defaultCity}
              initialBranch={defaultBranch}
              initialClass={defaultClass}
              isPreview={isPreview}
            />
          </div>
        </div>

        {/* SCHOOL COUNT CARDS */}
        <div className="relative z-20 mt-12 flex flex-col items-center justify-center gap-4 md:mt-16 sm:flex-row md:gap-6">
          {statistics.map((stat, index) => {
            const logoUrl =
              getMediaUrl(stat.logo_media_id) || stat.logo_image;

            return (
              <div
                key={`${stat.title}-${index}`}
                className="w-full max-w-md rounded-2xl bg-white p-5 text-center shadow-xl md:p-6 transition-transform hover:-translate-y-1 duration-200"
                data-animate="fade-up"
                data-delay={100 * (index + 1)}
              >
                {Boolean(logoUrl) && (
                  <div className="mb-3 flex justify-center">
                    <Image
                      src={logoUrl!}
                      alt={stat.logo_alt || stat.title || "Logo"}
                      width={120}
                      height={48}
                      unoptimized={
                        logoUrl!.startsWith("http") ||
                        logoUrl!.startsWith("data:")
                      }
                      className="h-10 max-h-12 w-auto object-contain"
                    />
                  </div>
                )}

                <h4 className="text-base font-bold text-gray-900 md:text-lg">
                  {stat.title}
                </h4>

                <p className="mb-2 text-sm text-gray-500 md:text-base">
                  {stat.label}
                </p>

                <div
                  className={`text-3xl font-extrabold md:text-4xl lg:text-5xl ${
                    index % 2 === 0
                      ? "text-brandBlue"
                      : "text-brandOrange"
                  }`}
                >
                  {stat.value}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
