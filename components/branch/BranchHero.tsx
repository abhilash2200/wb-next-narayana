"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useModal } from "@/context/ModalContext";
import AdmissionForm from "@/components/AdmissionForm";
import { BranchHeroData } from "@/data/branchStaticData";

interface BranchHeroProps {
  data: BranchHeroData;
  onOpenModal?: (action: "brochure" | "fees", title?: string) => void;
}

export default function BranchHero({ data, onOpenModal }: BranchHeroProps) {
  const { openModal } = useModal();
  const handleOpenModal = onOpenModal || openModal;
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
  }, []);

  return (
    <section
      className="
        md:bg-[url('/assets/bvanner-4.webp')]
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
          {/* LEFT SIDE */}
          <div
            className="text-white lg:w-3/5 w-full text-left"
            data-animate="fade-right"
            data-duration="1000"
          >
            <h2 className="text-[18px] leading-tight md:text-2xl font-medium mb-2 lg:mb-1">
              {data.preHeading}
            </h2>

            <h1 className="text-[32px] md:text-4xl lg:text-5xl font-bold text-brandYellow mb-6 lg:mb-8 leading-tight">
              {data.mainHeadingPrefix}{" "}
              <span className="text-white">{data.branchHighlight}</span>
            </h1>

            {/* STATS */}
            <div
              id="branch-hero-stats"
              ref={statsContainerRef}
              className="grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-6 mb-6 lg:mb-8"
            >
              {data.counters.map((counter) => (
                <div
                  key={counter.label}
                  data-animate="fade-up"
                  data-delay={counter.delay}
                >
                  <div className="text-[25px] md:text-3xl font-bold">
                    <span
                      className="counter"
                      data-counter-target={counter.target}
                      data-counter-delay={counter.delay}
                    >
                      {counter.target.toLocaleString("en-IN")}
                    </span>
                    +
                  </div>

                  <div className="text-[15px] md:text-sm text-blue-100">
                    {counter.label}
                  </div>
                </div>
              ))}
            </div>

            {/* BULLET POINTS */}
            <ul className="space-y-3 mb-8 text-sm md:text-base font-light text-left inline-block lg:block">
              {data.bulletPoints.map((point, index) => (
                <li
                  key={index}
                  className={`flex items-start text-[16px] md:text-base md:items-center gap-3 ${
                    index >= 2 ? "hidden md:flex" : ""
                  }`}
                >
                  <span className="w-1.5 h-1.5 bg-white rounded-full mt-2 md:mt-0 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="flex justify-center lg:justify-start">
              <button
                type="button"
                onClick={() => handleOpenModal("fees", "Get Admission Fees Details")}
                className="bg-brandOrange hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-md flex items-center gap-2 transition shadow-lg w-full md:w-auto justify-center cursor-pointer"
              >
                {data.ctaButtonText || "Get Admission Fees Details"}
              </button>
            </div>
          </div>

          {/* ADMISSION CARD */}
          <div
            className="w-full lg:w-100 bg-white rounded-xl shadow-2xl border-2 border-brandOrange overflow-hidden mx-auto"
            data-animate="fade-left"
            data-duration="1000"
          >
            <div className="p-5 md:p-6">
              <h3 className="text-[22px] md:text-xl font-bold text-black mb-4">
                {data.formTitle || "Admission Open for AY 2027-28"}
              </h3>

              <AdmissionForm
                formId="branch-hero"
                variant="card"
                initialCity={data.defaultCity}
                initialBranch={data.defaultBranch}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
