"use client";

import Image from "next/image";
import { useModal } from "@/context/ModalContext";
import AdmissionForm from "@/components/AdmissionForm";
import type { LandingPageMedia } from "@/app/services/landingPageService";

interface LimitedSeatsStatistic {
  logo_media_id?: number;
  logo_alt?: string;
  title?: string;
  label?: string;
  value?: string;
  sort_order?: number;
}

interface LimitedSeatsContent {
  background_media_id?: number;
  background_alt?: string;
  feature_media_id?: number;
  feature_image_alt?: string;
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
    getMediaUrl(typeof rawBackgroundMediaId === "number" ? rawBackgroundMediaId : undefined) ||
    (typeof (content as Record<string, unknown>)["background_image"] === "string"
      ? ((content as Record<string, unknown>)["background_image"] as string)
      : undefined) ||
    (typeof (content as Record<string, unknown>)["backgroundImage"] === "string"
      ? ((content as Record<string, unknown>)["backgroundImage"] as string)
      : undefined) ||
    (typeof (content as Record<string, unknown>)["background_image_url"] === "string"
      ? ((content as Record<string, unknown>)["background_image_url"] as string)
      : undefined);

  const rawFeatureMediaId =
    sectionContent.feature_media_id ??
    (content as Record<string, unknown>)["media_id"];

  const featureUrl =
    getMediaUrl(typeof rawFeatureMediaId === "number" ? rawFeatureMediaId : undefined) ||
    (typeof (content as Record<string, unknown>)["feature_image"] === "string"
      ? ((content as Record<string, unknown>)["feature_image"] as string)
      : undefined) ||
    (typeof (content as Record<string, unknown>)["image"] === "string"
      ? ((content as Record<string, unknown>)["image"] as string)
      : undefined);

  const rawStats = sectionContent.statistics ?? [];
  const statistics = rawStats.slice().sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

  return (
    <>
      {/* Admission Section */}
      <section
        className="relative overflow-hidden bg-cover bg-center py-16 md:py-20 bg-[#15539B]"
        style={
          backgroundUrl
            ? {
                backgroundImage: `url("${backgroundUrl}")`,
              }
            : undefined
        }
      >
        <div className="pointer-events-none absolute inset-0 bg-slate-900/30" />
        <div className="doodle-overlay pointer-events-none absolute inset-0 opacity-10" />

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-8 lg:flex-row lg:gap-12">
            {/* LEFT SIDE */}
            <div
              className="w-full max-w-xl text-center lg:w-1/2 lg:text-left"
              data-animate="fade-right"
            >
              {Boolean(featureUrl) && (
                <div className="mb-6 overflow-hidden rounded-2xl shadow-2xl md:mb-8">
                  <Image
                    src={featureUrl!}
                    alt={sectionContent.feature_image_alt || "Campus"}
                    width={575}
                    height={437}
                    unoptimized={featureUrl!.startsWith("http") || featureUrl!.startsWith("data:")}
                    className="h-auto w-full object-cover"
                  />
                </div>
              )}

              <div className="space-y-3 text-white md:space-y-4">
                {sectionContent.availability_text && (
                  <p className="px-2 text-base font-medium md:text-lg lg:px-0">
                    {sectionContent.availability_text}
                  </p>
                )}

                {sectionContent.urgency_text && (
                  <p className="text-xl font-bold md:text-2xl">
                    {sectionContent.urgency_text}
                  </p>
                )}

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
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-brandOrange px-8 py-3.5 text-base font-bold text-white shadow-lg transition duration-300 hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300"
                >
                  <i className="fas fa-download text-sm" />
                  <span>
                    {sectionContent.brochure_cta?.label || "Download Brochure"}
                  </span>
                </button>
              </div>
            </div>

            {/* RIGHT SIDE (FORM) */}
            <div
              className="w-full max-w-md lg:w-1/2"
              data-animate="fade-left"
            >
              <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-2xl">
                <div className="p-6 md:p-8">
                  <h3 className="mb-6 text-center text-xl font-bold text-gray-900 md:text-2xl">
                    {sectionContent.form_title || "Apply for Admission"}
                  </h3>

                  <AdmissionForm
                    formId="dynamic-limited-seats"
                    pageId={pageId}
                    revisionId={revisionId}
                    pageSection="limited-seats"
                    variant="card"
                    initialCity={defaultCity}
                    initialBranch={defaultBranch}
                    initialClass={defaultClass}
                    isPreview={isPreview}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* STATISTICS ROW */}
          {statistics.length > 0 && (
            <div
              className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 max-w-3xl mx-auto"
              data-animate="fade-up"
            >
              {statistics.map((stat, index) => {
                const logoUrl = getMediaUrl(stat.logo_media_id);

                return (
                  <div
                    key={`${stat.title}-${index}`}
                    className="flex flex-col items-center justify-center rounded-2xl bg-white p-6 text-center shadow-lg transition-transform hover:-translate-y-1"
                  >
                    {Boolean(logoUrl) && (
                      <div className="mb-4 flex h-14 w-full items-center justify-center">
                        <Image
                          src={logoUrl!}
                          alt={stat.logo_alt || stat.title || "Logo"}
                          width={120}
                          height={48}
                          unoptimized={logoUrl!.startsWith("http") || logoUrl!.startsWith("data:")}
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
          )}
        </div>
      </section>
    </>
  );
}
