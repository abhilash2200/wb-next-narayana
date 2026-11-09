"use client";

import Image from "next/image";
import { DynamicWhyChooseData } from "@/types/dynamic-page";

function renderWhyChooseHeading(
  heading?: string,
  highlightWord?: string,
  headingSuffix?: string
) {
  const fullHeading = (heading || "").trim();
  const explicitHighlight = (highlightWord || "").trim();
  const explicitSuffix = (headingSuffix || "").trim();

  if (!fullHeading && !explicitHighlight && !explicitSuffix) {
    return null;
  }

  // 1. Bracket notation support e.g. "Why Parents Choose [Narayana] Over Other Schools"
  const bracketMatch = fullHeading.match(/^(.*?)[\[\{](.*?)[\]\}](.*?)$/);
  if (bracketMatch) {
    const before = bracketMatch[1];
    const highlight = bracketMatch[2];
    const after = bracketMatch[3];
    return (
      <>
        {before}
        <span className="bg-[linear-gradient(transparent_55%,#fde047_55%)] px-1 text-gray-900">
          {highlight}
        </span>
        {after}
        {explicitSuffix && !after.toLowerCase().includes(explicitSuffix.toLowerCase()) && ` ${explicitSuffix}`}
      </>
    );
  }

  // 2. Identify target highlight: explicitHighlight or search for "Narayana" in fullHeading
  let targetHighlight = explicitHighlight;
  if (!targetHighlight) {
    const match = fullHeading.match(/\bNarayana\b/i);
    if (match) {
      targetHighlight = match[0];
    }
  }

  // 3. If fullHeading contains the highlight word, split and highlight it in place
  if (fullHeading && targetHighlight) {
    const lowerHeading = fullHeading.toLowerCase();
    const lowerHighlight = targetHighlight.toLowerCase();
    const matchIndex = lowerHeading.indexOf(lowerHighlight);

    if (matchIndex !== -1) {
      const before = fullHeading.slice(0, matchIndex);
      const matched = fullHeading.slice(matchIndex, matchIndex + targetHighlight.length);
      const after = fullHeading.slice(matchIndex + targetHighlight.length);

      return (
        <>
          {before}
          <span className="bg-[linear-gradient(transparent_55%,#fde047_55%)] px-1 text-gray-900">
            {matched}
          </span>
          {after}
          {explicitSuffix && !after.toLowerCase().includes(explicitSuffix.toLowerCase()) && ` ${explicitSuffix}`}
        </>
      );
    }
  }

  // 4. If heading and highlightWord are distinct pieces
  if (targetHighlight) {
    return (
      <>
        {fullHeading && `${fullHeading} `}
        <span className="bg-[linear-gradient(transparent_55%,#fde047_55%)] px-1 text-gray-900">
          {targetHighlight}
        </span>
        {explicitSuffix && ` ${explicitSuffix}`}
      </>
    );
  }

  // 5. Fallback plain heading
  return (
    <>
      {fullHeading}
      {explicitSuffix && ` ${explicitSuffix}`}
    </>
  );
}

export default function DynamicWhyChoose({
  heading,
  highlightWord,
  headingSuffix,
  subheading,
  items = [],
}: DynamicWhyChooseData) {
  if (!items || items.length === 0) return null;

  const headingContent = renderWhyChooseHeading(heading, highlightWord, headingSuffix);
  const hasHeading = Boolean(headingContent);

  return (
    <section className="overflow-hidden bg-gray-50 py-12 md:py-20">
      <div className="mx-auto container px-4">
        {(hasHeading || (subheading && subheading.trim())) && (
          <div className="mb-10 text-center" data-animate="fade-up">
            {hasHeading && (
              <h2 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl lg:text-4xl">
                {headingContent}
              </h2>
            )}
            {subheading && subheading.trim() && (
              <p className="text-sm text-gray-500 md:text-base">{subheading.trim()}</p>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {items.map((item, index) => {
            const iconSrc = item.icon && item.icon.trim() ? item.icon.trim() : null;

            return (
              <div
                key={index}
                className="flex flex-col items-center text-center rounded-xl bg-white p-3.5 sm:p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                data-animate="fade-up"
                data-delay={((index % 3) + 1) * 100}
              >
                <div className="mb-3 sm:mb-4 flex items-center justify-center">
                  {iconSrc ? (
                    <Image
                      src={iconSrc}
                      alt={item.title || "Icon"}
                      width={80}
                      height={80}
                      className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 object-contain"
                      loading="lazy"
                      unoptimized={iconSrc.startsWith("http")}
                    />
                  ) : (
                    <div className="flex h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-brandOrangeLight">
                      <i className="fas fa-check text-brandOrange text-xl md:text-2xl" />
                    </div>
                  )}
                </div>

                <h3 className="mb-1.5 sm:mb-2 text-sm sm:text-base font-bold leading-tight text-gray-800 md:text-lg">
                  {item.title}
                </h3>

                <p className="hidden max-w-xs text-xs md:leading-tight text-gray-500 md:block md:text-base">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
