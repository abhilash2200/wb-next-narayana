"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useModal } from "@/context/ModalContext";
import AdmissionForm from "@/components/AdmissionForm";
import { DynamicHeroData } from "@/types/dynamic-page";
import AdmissionActionButton from "@/components/dynamic-component/AdmissionActionButton";

interface DynamicHeroProps extends DynamicHeroData {
  headingOverride?: string;
  heading?: string;
  eyebrowHighlight?: string;
  pageId?: number;
  revisionId?: number;
  isPreview?: boolean;
}

function renderEyebrowContent(preHeading?: string, eyebrowHighlight?: string) {
  const fullEyebrow = (preHeading || "").trim();
  const explicitHighlight = (eyebrowHighlight || "").trim();

  // If no eyebrow data is configured, do not render mock eyebrow
  if (!fullEyebrow && !explicitHighlight) {
    return null;
  }

  // Check for bracket syntax e.g. "Admission Open For [Narayana School]"
  const bracketMatch = fullEyebrow.match(/^(.*?)[\[\{](.*?)[\]\}](.*?)$/);
  if (bracketMatch) {
    const before = bracketMatch[1];
    const match = bracketMatch[2];
    const after = bracketMatch[3];
    return (
      <>
        {before}
        <span className="text-brandYellow">{match}</span>
        {after}
      </>
    );
  }

  // Determine highlight target: explicit highlight, or search for "Narayana School" / "Narayana"
  let highlight = explicitHighlight;
  if (!highlight) {
    const narayanaMatch = fullEyebrow.match(/(Narayana\s+Schools?|Narayana)/i);
    if (narayanaMatch) {
      highlight = narayanaMatch[0];
    }
  }

  if (fullEyebrow && highlight) {
    const lowerEyebrow = fullEyebrow.toLowerCase();
    const lowerHighlight = highlight.toLowerCase();
    const matchIndex = lowerEyebrow.indexOf(lowerHighlight);

    if (matchIndex !== -1) {
      const before = fullEyebrow.slice(0, matchIndex);
      const match = fullEyebrow.slice(matchIndex, matchIndex + highlight.length);
      const after = fullEyebrow.slice(matchIndex + highlight.length);

      return (
        <>
          {before}
          <span className="text-brandYellow">{match}</span>
          {after}
        </>
      );
    }

    return (
      <>
        {fullEyebrow} <span className="text-brandYellow">{highlight}</span>
      </>
    );
  }

  if (highlight) {
    return <span className="text-brandYellow">{highlight}</span>;
  }

  return <>{fullEyebrow}</>;
}

function renderHeadingContent({
  heading,
  headingOverride,
  mainHeadingPrefix,
  highlightText,
  mainHeadingSuffix,
}: {
  heading?: string;
  headingOverride?: string;
  mainHeadingPrefix?: string;
  highlightText?: string;
  mainHeadingSuffix?: string;
}) {
  const fullHeading = (headingOverride || heading || "").trim();
  let trimmedHighlight = (highlightText || "").trim();

  // If no heading is configured, do not render mock heading
  if (!fullHeading && !trimmedHighlight && !mainHeadingPrefix) {
    return null;
  }

  // Check for bracket notation e.g. "CBSE School for [Class- I]"
  const bracketMatch = fullHeading.match(/^(.*?)[\[\{](.*?)[\]\}](.*?)$/);
  if (bracketMatch) {
    const before = bracketMatch[1];
    trimmedHighlight = bracketMatch[2];
    const after = bracketMatch[3];
    return (
      <>
        {before && <span className="block lg:inline">{before}</span>}
        <span className="relative inline-block text-brandYellow mt-1 sm:mt-2 lg:mt-0">
          <span className="relative z-10">{trimmedHighlight}</span>
          <svg
            className="absolute left-0 -bottom-2 w-[105%] h-3.5 sm:h-4 text-brandYellow z-0 pointer-events-none"
            viewBox="0 0 100 20"
            preserveAspectRatio="none"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          >
            <path d="M 2,6 Q 50,18 98,8" />
          </svg>
        </span>
        {after && <span className="block lg:inline">{after}</span>}
      </>
    );
  }

  // Auto-detect class or grade keyword if highlightText is not provided
  if (!trimmedHighlight && fullHeading) {
    const classMatch = fullHeading.match(/\b(Class[-\s][^\s]+|Nursery|KG|Pre-Primary|Kindergarten)\b/i);
    if (classMatch) {
      trimmedHighlight = classMatch[0];
    }
  }

  // If fullHeading contains highlightText, highlight that segment with the yellow curved SVG
  if (fullHeading && trimmedHighlight) {
    const lowerHeading = fullHeading.toLowerCase();
    const lowerHighlight = trimmedHighlight.toLowerCase();
    const matchIndex = lowerHeading.indexOf(lowerHighlight);

    if (matchIndex !== -1) {
      const before = fullHeading.slice(0, matchIndex);
      const match = fullHeading.slice(matchIndex, matchIndex + trimmedHighlight.length);
      const after = fullHeading.slice(matchIndex + trimmedHighlight.length);

      return (
        <>
          {before && <span className="block lg:inline">{before}</span>}
          <span className="relative inline-block text-brandYellow mt-1 sm:mt-2 lg:mt-0">
            <span className="relative z-10">{match}</span>
            <svg
              className="absolute left-0 -bottom-2 w-[105%] h-3.5 sm:h-4 text-brandYellow z-0 pointer-events-none"
              viewBox="0 0 100 20"
              preserveAspectRatio="none"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
            >
              <path d="M 2,6 Q 50,18 98,8" />
            </svg>
          </span>
          {after && <span className="block lg:inline">{after}</span>}
        </>
      );
    }

    // If highlightText is provided separately and not part of fullHeading, append it
    return (
      <>
        <span className="block lg:inline">{fullHeading}{" "}</span>
        <span className="relative inline-block text-brandYellow mt-1 sm:mt-2 lg:mt-0">
          <span className="relative z-10">{trimmedHighlight}</span>
          <svg
            className="absolute left-0 -bottom-2 w-[105%] h-3.5 sm:h-4 text-brandYellow z-0 pointer-events-none"
            viewBox="0 0 100 20"
            preserveAspectRatio="none"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          >
            <path d="M 2,6 Q 50,18 98,8" />
          </svg>
        </span>
      </>
    );
  }

  // If separate mainHeadingPrefix and/or highlightText are provided
  if (mainHeadingPrefix || trimmedHighlight) {
    return (
      <>
        {mainHeadingPrefix && <span className="block lg:inline">{mainHeadingPrefix}{" "}</span>}
        {trimmedHighlight && (
          <span className="relative inline-block text-brandYellow mt-1 sm:mt-2 lg:mt-0">
            <span className="relative z-10">{trimmedHighlight}</span>
            <svg
              className="absolute left-0 -bottom-2 w-[105%] h-3.5 sm:h-4 text-brandYellow z-0 pointer-events-none"
              viewBox="0 0 100 20"
              preserveAspectRatio="none"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
            >
              <path d="M 2,6 Q 50,18 98,8" />
            </svg>
          </span>
        )}
        {mainHeadingSuffix && <span className="block lg:inline">{" "}{mainHeadingSuffix}</span>}
      </>
    );
  }

  // Plain heading fallback
  if (fullHeading) {
    return <span>{fullHeading}</span>;
  }

  return null;
}

export default function DynamicHero({
  headingOverride,
  heading,
  backgroundImage,
  preHeading,
  eyebrowHighlight,
  mainHeadingPrefix,
  highlightText,
  mainHeadingSuffix,
  counters = [],
  bulletPoints = [],
  ctaButtonText,
  formTitle,
  defaultCity,
  defaultBranch,
  defaultClass,
  pageId,
  revisionId,
  isPreview = false,
}: DynamicHeroProps) {
  const statsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !statsContainerRef.current) return;

    const counterElements =
      statsContainerRef.current.querySelectorAll<HTMLElement>("[data-counter-target]");

    const ctx = gsap.context(() => {
      counterElements.forEach((el) => {
        const targetVal = parseFloat(el.getAttribute("data-counter-target") || "0");
        const delayAttr = parseFloat(el.getAttribute("data-counter-delay") || "0");
        const delayInSec = delayAttr >= 10 ? delayAttr / 1000 : delayAttr;

        if (isNaN(targetVal) || targetVal <= 0) return;

        const obj = { val: 0 };
        el.textContent = "0";

        gsap.to(obj, {
          val: targetVal,
          duration: 2,
          delay: delayInSec,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = Math.floor(obj.val).toLocaleString("en-IN");
          },
          onComplete: () => {
            el.textContent = targetVal.toLocaleString("en-IN");
          },
        });
      });
    }, statsContainerRef);

    return () => {
      ctx.revert();
    };
  }, [counters]);

  const { setPageContext } = useModal();

  useEffect(() => {
    if (pageId != null && revisionId != null && pageId > 0 && revisionId > 0) {
      setPageContext(pageId, revisionId);
    }
  }, [pageId, revisionId, setPageContext]);

  const eyebrowContent = renderEyebrowContent(preHeading, eyebrowHighlight);

  const headingContent = renderHeadingContent({
    heading,
    headingOverride,
    mainHeadingPrefix,
    highlightText,
    mainHeadingSuffix,
  });

  return (
    <section
      style={
        backgroundImage
          ? ({
              "--hero-bg-desktop": `url('${backgroundImage}')`,
            } as React.CSSProperties)
          : undefined
      }
      className="
        dynamic-hero-banner
        pt-8 md:pt-0
        bg-[#15539B]
        bg-cover bg-center
        min-h-auto
        py-12
        lg:min-h-162.5
        lg:py-0
        lg:pt-20
        flex items-center
        relative
        -mt-1
        overflow-x-hidden
      "
    >
      <div className="container mx-auto px-4 relative z-20 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12">
          {/* LEFT SIDE CONTENT */}
          <div
            className="text-white lg:w-3/5 w-full text-left"
            data-animate="fade-right"
            data-duration="1000"
          >
            {eyebrowContent && (
              <h2 className="text-[18px] leading-tight md:text-2xl font-medium mb-2 lg:mb-1">
                {eyebrowContent}
              </h2>
            )}

            {headingContent && (
              <h1 className="text-white text-[38px] min-[390px]:text-[44px] sm:text-[48px] md:text-5xl lg:text-[42px] xl:text-[50px] font-extrabold leading-[1.1] mb-6 lg:mb-5 tracking-tight">
                {headingContent}
              </h1>
            )}

            {/* HERO STATS */}
            {counters && counters.length > 0 && (
              <div
                id="hero-stats"
                ref={statsContainerRef}
                className="grid grid-cols-2 gap-x-8 gap-y-5 sm:flex sm:flex-wrap sm:items-start sm:gap-x-12 md:gap-x-16 lg:gap-x-20 sm:gap-y-4 mb-6 max-w-3xl"
              >
                {counters.map((counter, index) => (
                  <div
                    key={`${counter.label}-${index}`}
                    data-animate="fade-up"
                    data-delay={counter.delay}
                    className="sm:shrink-0"
                  >
                    <div className="text-[26px] min-[390px]:text-[28px] md:text-3xl font-bold leading-tight">
                      {counter.prefix && <span>{counter.prefix}</span>}
                      <span
                        className="counter"
                        data-counter-target={counter.target}
                        data-counter-delay={counter.delay}
                      >
                        {counter.target.toLocaleString("en-IN")}
                      </span>
                      {counter.suffix ?? "+"}
                    </div>
                    {counter.label && (
                      <div className="text-[14px] md:text-sm text-blue-100 mt-0.5 leading-tight">
                        {counter.label}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* BULLET POINTS */}
            {bulletPoints && bulletPoints.length > 0 && (
              <ul className="space-y-3 mb-8 text-sm md:text-base font-light text-left inline-block lg:block">
                {bulletPoints.map((point, index) => (
                  <li
                    key={index}
                    className="flex items-start text-[16px] md:text-base md:items-center gap-3"
                  >
                    <span className="w-1.5 h-1.5 bg-white rounded-full mt-2 md:mt-0 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            )}

            {/* CTA BUTTON */}
            {ctaButtonText && (
              <div className="flex justify-center lg:justify-start">
                <AdmissionActionButton
                  action="enquiry"
                  pageId={pageId ?? 0}
                  revisionId={revisionId ?? 0}
                  label={ctaButtonText}
                />
              </div>
            )}
          </div>

          {/* RIGHT SIDE - ADMISSION CARD */}
          <div
            className="w-full lg:w-100 bg-white rounded-xl shadow-2xl border-2 border-brandOrange overflow-hidden mx-auto"
            data-animate="fade-left"
            data-duration="1000"
          >
            <div className="p-5 md:p-6">
              {formTitle && (
                <h3 className="text-[22px] md:text-xl font-bold text-black mb-4">
                  {formTitle}
                </h3>
              )}

              <AdmissionForm
                formId="dynamic-hero"
                pageId={pageId ?? 0}
                revisionId={revisionId ?? 0}
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
    </section>
  );
}
