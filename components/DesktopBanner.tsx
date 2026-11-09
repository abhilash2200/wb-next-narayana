import Image from "next/image";

const mobileBanners = [
  { src: "/assets/set1.png", alt: "Narayana Testimonial Feature 1" },
  { src: "/assets/set2.png", alt: "Narayana Testimonial Feature 2" },
  { src: "/assets/set3.png", alt: "Narayana Testimonial Feature 3" },
  { src: "/assets/set5.png", alt: "Narayana Testimonial Feature 4" },
];

export default function DesktopBanner() {
  return (
    <section className="bg-white py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        {/* Desktop Banner */}
        <div
          className="hidden text-center lg:block"
          data-animate="fade-up"
          data-delay="200"
        >
          <Image
            src="/assets/tetsimonial-desktop.webp"
            alt="Narayana Educational Conglomerate"
            width={1400}
            height={1759}
            className="mx-auto h-auto w-full object-contain"
            sizes="(min-width: 1024px) 1200px, 100vw"
          />
        </div>

        {/* Mobile Banners */}
        <div className="space-y-4 lg:hidden">
          {mobileBanners.map((banner, index) => (
            <div
              key={banner.src}
              className="text-center"
              data-animate="fade-up"
              data-delay={100 * (index + 1)}
            >
              <Image
                src={banner.src}
                alt={banner.alt}
                width={400}
                height={300}
                className="mx-auto h-auto w-full rounded-lg object-contain shadow-sm"
                sizes="(max-width: 1023px) 100vw, 400px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}