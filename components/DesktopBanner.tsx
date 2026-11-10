import Image from "next/image";

const mobileBanners = [
  { src: "/assets/set1.png", alt: "Set 1" },
  { src: "/assets/set2.png", alt: "Set 2" },
  { src: "/assets/set3.png", alt: "Set 3" },
  { src: "/assets/set5.png", alt: "Set 5" },
];

export default function DesktopBanner() {
  return (
    <>
      {/* Desktop Banner matching index.html line 2240 */}
      <section id="academic" className="lg:block hidden">
        <div className="container mx-auto px-4 md:px-6 py-8 md:text-center">
          <div data-animate="fade-up" data-delay="200" className="text-center">
            <Image
              src="/assets/tetsimonial-desktop.webp"
              alt="Testimonials and results"
              width={1400}
              height={1759}
              className="w-full h-full object-cover mx-auto"
              sizes="(min-width: 1024px) 1200px, 100vw"
            />
          </div>
        </div>
      </section>

      {/* Mobile Banners matching index.html line 2250 */}
      <section className="lg:hidden block">
        <div className="container mx-auto px-4 md:px-6 py-8 md:text-center space-y-4">
          {mobileBanners.map((banner) => (
            <div
              key={banner.src}
              data-animate="fade-up"
              data-delay="200"
              className="text-center"
            >
              <Image
                src={banner.src}
                alt={banner.alt}
                width={400}
                height={300}
                className="w-full h-full object-cover mx-auto"
                sizes="(max-width: 1023px) 100vw, 400px"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
