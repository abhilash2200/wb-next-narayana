"use client";

import { useModal } from "@/context/ModalContext";

type FooterProps = {
  onOpenModal?: (action: "brochure" | "fees", title?: string) => void;
};

export default function Footer({ onOpenModal }: FooterProps) {
  const { openModal } = useModal();
  const handleOpenModal = onOpenModal || openModal;

  const privacyPolicyUrl =
    process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL ??
    "https://www.narayanaschools.in/privacy-policy";
  const whatsappPhone =
    process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "919147415932";
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappPhone}`;

  return (
    <>
      {/* Copyright Footer */}
      <footer className="bg-[#073263] pb-36 pt-6 text-white lg:pb-8 lg:pt-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <p className="text-sm text-gray-300 md:text-base">
              © 2027 Narayana Schools. All Rights Reserved.
            </p>

            <div className="flex gap-4 text-sm md:gap-6 md:text-base">
              <a
                href={privacyPolicyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-brandOrange"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Desktop Side CTA - Fees */}
      <section className="fixed -right-10 top-[35%] hidden lg:block">
        <button
          type="button"
          onClick={() => handleOpenModal("fees", "Get Fees Structure")}
          style={{
            boxShadow: "0 0 8px 1px rgba(255, 255, 255, 0.5), -1px 2px 6px rgba(0, 0, 0, 0.18)",
          }}
          className="
            inline-block rotate-90
            rounded-lg bg-brandOrange
            p-4 text-center
          "
        >
          <span className="font-medium text-white">Get Fees Structure</span>
        </button>
      </section>

      {/* Desktop Call + WhatsApp */}
      <section className="fixed right-4 top-[50%] hidden lg:flex lg:flex-col">
        <a
          href="tel:9073339933"
          className="mb-1 inline-block rounded-lg bg-brandOrange p-4 text-center shadow-lg"
          aria-label="Call Narayana"
        >
          <i className="fas fa-phone text-2xl text-white" />
        </a>

        <a
          href={whatsappUrl}
          className="inline-block rounded-lg bg-[#25D366] p-4 text-center shadow-lg"
          aria-label="WhatsApp Narayana"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-whatsapp text-2xl text-white" />
        </a>
      </section>

      {/* Desktop Side CTA - Brochure */}
      <section className="fixed -left-10 top-[50%] z-99999 hidden lg:block">
        <button
          type="button"
          onClick={() => handleOpenModal("brochure", "Download Brochure")}
          style={{
            boxShadow: "0 0 8px 1px rgba(255, 255, 255, 0.5), 1px 2px 6px rgba(0, 0, 0, 0.18)",
          }}
          className="
            inline-block -rotate-90
            rounded-lg bg-[#034da2]
            p-4 text-center
          "
        >
          <span className="font-medium text-white">Download Brochure</span>
        </button>
      </section>

      {/* Mobile Right Side CTAs */}
      <section className="fixed right-0 top-[35%] z-990 flex flex-col items-center gap-2 block lg:hidden">
        {/* 1. Get Fee Structure (Orange) */}
        <div className="w-9.5 h-36.5 relative flex items-center justify-center overflow-visible">
          <button
            type="button"
            onClick={() => handleOpenModal("fees", "Get Fee Structure")}
            style={{
              boxShadow: "0 0 8px 1px rgba(255, 255, 255, 0.5), -1px 2px 6px rgba(0, 0, 0, 0.18)",
            }}
            className="
              absolute
              w-36.5 h-9.5
              -rotate-90
              rounded-lg bg-brandOrange
              flex items-center justify-center
              text-center
              active:scale-95 transition-transform
              cursor-pointer
            "
            aria-label="Get Fee Structure"
          >
            <span className="font-medium text-white text-[13px] tracking-wide whitespace-nowrap">
              Get Fee Structure
            </span>
          </button>
        </div>

        {/* 2. Download Brochure (Blue) */}
        <div className="w-9.5 h-39 relative flex items-center justify-center overflow-visible">
          <button
            type="button"
            onClick={() => handleOpenModal("brochure", "Download Brochure")}
            style={{
              boxShadow: "0 0 8px 1px rgba(255, 255, 255, 0.5), -1px 2px 6px rgba(0, 0, 0, 0.18)",
            }}
            className="
              absolute
              w-39 h-9.5
              -rotate-90
              rounded-lg bg-[#034da2]
              flex items-center justify-center
              text-center
              active:scale-95 transition-transform
              cursor-pointer
            "
            aria-label="Download Brochure"
          >
            <span className="font-medium text-white text-[13px] tracking-wide whitespace-nowrap">
              Download Brochure
            </span>
          </button>
        </div>
      </section>

      {/* Mobile Floating Admission Bar */}
      <section className="block lg:hidden">
        <div className="fixed bottom-17 left-1/2 z-998 w-[95%] max-w-120 -translate-x-1/2">
          <div className="flex items-center justify-between gap-2.5 rounded-2xl border-2 border-white bg-[#FFB800] px-3 py-2 shadow-[0_6px_25px_rgba(0,0,0,0.18)]">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#002B49] text-white shadow-inner">
                <i className="fas fa-graduation-cap text-xl" />
              </div>

              <div className="min-w-0">
                <h4 className="text-[15px] font-black uppercase leading-tight tracking-tight text-[#002B49] truncate">
                  Class Nursery-XI
                </h4>
                <p className="text-[10px] font-bold uppercase leading-tight text-[#002B49] opacity-90">
                  Admission Ongoing
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleOpenModal("fees", "Apply Now")}
              className="
                flex items-center gap-1.5 shrink-0
                whitespace-nowrap rounded-xl
                bg-[#002B49] px-4 py-2.5
                text-[12px] font-extrabold text-white
                shadow-sm transition-transform
                active:scale-95
              "
            >
              <span>APPLY NOW</span>
              <i className="fas fa-chevron-right text-[10px]" />
            </button>
          </div>
        </div>

        {/* Mobile Sticky Footer Bar */}
        <div className="fixed bottom-0 left-0 z-999 w-full bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.06)]">
          <div className="grid grid-cols-4 items-stretch h-15">
            {/* 1. WHATSAPP */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex flex-col items-center justify-center
                border-r border-gray-200
                h-full py-1.5
                transition-colors
                active:bg-gray-50
              "
            >
              <i className="fab fa-whatsapp text-[25px] text-[#25D366] leading-none" />
              <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[#4b5563]">
                WhatsApp
              </span>
            </a>

            {/* 2. CALL NOW */}
            <a
              href="tel:9073339933"
              className="
                flex flex-col items-center justify-center
                border-r border-gray-200
                h-full py-1.5
                transition-colors
                active:bg-gray-50
              "
            >
              <i className="fas fa-phone text-[20px] text-[#004884] leading-none" />
              <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[#4b5563]">
                Call Now
              </span>
            </a>

            {/* 3. BROCHURE */}
            <button
              type="button"
              onClick={() => handleOpenModal("brochure", "Download Brochure")}
              className="
                flex flex-col items-center justify-center
                border-r border-gray-200
                h-full py-1.5
                transition-colors
                active:bg-gray-50
              "
            >
              <i className="fa-solid fa-file-arrow-down text-[21px] text-[#334155] leading-none" />
              <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[#4b5563]">
                Brochure
              </span>
            </button>

            {/* 4. FEES */}
            <button
              type="button"
              onClick={() => handleOpenModal("fees", "Get Fee Structure")}
              className="
                flex flex-col items-center justify-center
                h-full py-1.5
                bg-[#FA5B00] text-white
                transition-colors
                active:bg-[#e05200]
              "
            >
              <i className="fas fa-receipt text-[22px] text-white leading-none" />
              <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-white">
                Fees
              </span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
