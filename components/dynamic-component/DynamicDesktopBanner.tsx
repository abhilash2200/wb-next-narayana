"use client";

import Image from "next/image";
import { DynamicBannerData } from "@/types/dynamic-page";

export default function DynamicDesktopBanner({
  desktopImage,
  mobileImage,
  altText = "Narayana Educational Institution",
}: DynamicBannerData) {
  if (!desktopImage && !mobileImage) return null;

  return (
    <section className="py-6 md:py-10 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Desktop Banner */}
        {Boolean(desktopImage) && (
          <div className="hidden md:block rounded-2xl overflow-hidden shadow-md">
            <Image
              src={desktopImage!}
              alt={altText}
              width={1400}
              height={600}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        )}

        {/* Mobile Banner */}
        {Boolean(mobileImage) && (
          <div className="block md:hidden rounded-xl overflow-hidden shadow-md">
            <Image
              src={mobileImage!}
              alt={altText}
              width={400}
              height={600}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </section>
  );
}
