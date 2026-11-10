"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useModal } from "@/context/ModalContext";

export interface NavbarProps {
  showHamburger?: boolean;
}

export default function Navbar({ showHamburger }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { openModal } = useModal();

  // Show hamburger only on the base home page ("/") unless explicitly overridden
  const isBasePage =
    showHamburger !== undefined ? showHamburger : pathname === "/";

  const handleNavClick = () => {
    setIsOpen(false);
  };

  const handleCallbackClick = () => {
    setIsOpen(false);
    openModal("enquiry", "Request a Callback");
  };

  return (
    <>
      <nav
        className="bg-white shadow-md py-2.5 sm:py-3 px-3 md:px-6 sticky top-0 z-50"
        data-animate="fade-down"
        data-duration="600"
      >
        <div
          className={`container mx-auto flex items-center relative ${
            isBasePage ? "justify-between md:justify-center" : "justify-center"
          }`}
        >
          {/* Logo Group */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="flex items-center gap-1 md:gap-2">
              <Image
                src="/assets/logo1.png"
                alt="Narayana Logo"
                className="h-8 md:h-12 w-auto object-contain"
                width={120}
                height={48}
                priority
              />
            </div>

            <div className="h-8 md:h-10 w-px bg-gray-300" />

            <div className="flex items-center gap-1.5 md:gap-2">
              <Image
                src="/assets/narayana-logo.png"
                alt="Narayana Logo"
                className="h-8 md:h-12 w-auto object-contain"
                width={120}
                height={48}
                priority
              />
            </div>

            <div className="h-8 md:h-10 w-px bg-gray-300" />

            <div className="flex items-center gap-1 md:gap-2">
              <Image
                src="/assets/logo2.png"
                alt="Cerdmont International School"
                className="h-8 md:h-12 w-auto object-contain"
                width={120}
                height={48}
              />
            </div>
          </div>

          {/* Mobile Offcanvas Toggle Bar with Divider - Only on Base Page */}
          {isBasePage && (
            <div className="flex items-center gap-2 sm:gap-3 shrink-0 md:absolute md:right-0">
              <div className="h-7 sm:h-8 md:h-10 w-px bg-gray-300 md:hidden" />
              <button
                id="mobile-offcanvas-toggle"
                type="button"
                onClick={() => setIsOpen(true)}
                className="flex items-center justify-center p-1.5 text-brandOrange hover:text-orange-600 active:scale-95 transition-transform duration-150 focus:outline-none cursor-pointer"
                aria-label="Open Navigation Menu"
                aria-expanded={isOpen}
                aria-controls="mobile-offcanvas"
              >
                <i className="fa-solid fa-bars text-2xl" />
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Offcanvas Drawer & Backdrop - Only on Base Page */}
      {isBasePage && (
        <>
          <div
            id="mobile-offcanvas-backdrop"
            onClick={() => setIsOpen(false)}
            className={`fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-[100000] transition-opacity duration-300 ${
              isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
            aria-hidden="true"
          />

          <aside
            id="mobile-offcanvas"
            className={`fixed top-0 right-0 h-full w-[85%] max-w-[360px] bg-white z-[100001] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
            aria-label="Navigation Drawer"
            role="dialog"
            aria-modal="true"
          >
            {/* Header with Heading & Close Button */}
            <div className="px-4 py-3.5 flex items-center justify-between border-b border-gray-200 bg-white">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                FAQ For Parents
              </h3>
              <button
                id="mobile-offcanvas-close"
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-blue-50 text-brandBlue hover:bg-orange-50 hover:text-brandOrange active:scale-95 flex items-center justify-center transition-all focus:outline-none cursor-pointer"
                aria-label="Close navigation menu"
              >
                <i className="fa-solid fa-xmark text-base" />
              </button>
            </div>

            {/* Navigation Items List (Scrollable) */}
            <div id="mobile-offcanvas-menu" className="flex-1 overflow-y-auto py-3 px-3">
              <div className="space-y-2">
                {/* 1. School timings */}
                <a
                  href="#academic-programs-target"
                  onClick={handleNavClick}
                  className="mobile-nav-link flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl border border-gray-200/80 bg-slate-50 hover:bg-orange-50/70 hover:border-brandOrange/40 active:scale-[0.99] transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-brandOrange flex items-center justify-center shrink-0 group-hover:bg-brandOrange group-hover:text-white transition-colors duration-200 shadow-xs">
                      <i className="fa-solid fa-clock text-sm" />
                    </div>
                    <span className="text-xs sm:text-[13px] font-semibold text-gray-800 group-hover:text-brandOrange transition-colors">
                      School timings
                    </span>
                  </div>
                  <i className="fa-solid fa-chevron-right text-[11px] text-gray-400 group-hover:text-brandOrange group-hover:translate-x-0.5 transition-all shrink-0" />
                </a>

                {/* 2. School fees */}
                <a
                  href="#fee"
                  onClick={handleNavClick}
                  className="mobile-nav-link flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl border border-gray-200/80 bg-slate-50 hover:bg-orange-50/70 hover:border-brandOrange/40 active:scale-[0.99] transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-brandOrange flex items-center justify-center shrink-0 group-hover:bg-brandOrange group-hover:text-white transition-colors duration-200 shadow-xs">
                      <i className="fa-solid fa-indian-rupee-sign text-sm" />
                    </div>
                    <span className="text-xs sm:text-[13px] font-semibold text-gray-800 group-hover:text-brandOrange transition-colors">
                      School fees
                    </span>
                  </div>
                  <i className="fa-solid fa-chevron-right text-[11px] text-gray-400 group-hover:text-brandOrange group-hover:translate-x-0.5 transition-all shrink-0" />
                </a>

                {/* 3. Student activities */}
                <a
                  href="#student-activities"
                  onClick={handleNavClick}
                  className="mobile-nav-link flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl border border-gray-200/80 bg-slate-50 hover:bg-orange-50/70 hover:border-brandOrange/40 active:scale-[0.99] transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-brandOrange flex items-center justify-center shrink-0 group-hover:bg-brandOrange group-hover:text-white transition-colors duration-200 shadow-xs">
                      <i className="fa-solid fa-palette text-sm" />
                    </div>
                    <span className="text-xs sm:text-[13px] font-semibold text-gray-800 group-hover:text-brandOrange transition-colors">
                      Student activities
                    </span>
                  </div>
                  <i className="fa-solid fa-chevron-right text-[11px] text-gray-400 group-hover:text-brandOrange group-hover:translate-x-0.5 transition-all shrink-0" />
                </a>

                {/* 4. Academic results */}
                <a
                  href="#academic"
                  onClick={handleNavClick}
                  className="mobile-nav-link flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl border border-gray-200/80 bg-slate-50 hover:bg-orange-50/70 hover:border-brandOrange/40 active:scale-[0.99] transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-brandOrange flex items-center justify-center shrink-0 group-hover:bg-brandOrange group-hover:text-white transition-colors duration-200 shadow-xs">
                      <i className="fa-solid fa-trophy text-sm" />
                    </div>
                    <span className="text-xs sm:text-[13px] font-semibold text-gray-800 group-hover:text-brandOrange transition-colors">
                      Academic results
                    </span>
                  </div>
                  <i className="fa-solid fa-chevron-right text-[11px] text-gray-400 group-hover:text-brandOrange group-hover:translate-x-0.5 transition-all shrink-0" />
                </a>

                {/* 5. School infrastructure */}
                <a
                  href="#campus-facilities"
                  onClick={handleNavClick}
                  className="mobile-nav-link flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl border border-gray-200/80 bg-slate-50 hover:bg-orange-50/70 hover:border-brandOrange/40 active:scale-[0.99] transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-brandOrange flex items-center justify-center shrink-0 group-hover:bg-brandOrange group-hover:text-white transition-colors duration-200 shadow-xs">
                      <i className="fa-solid fa-building-columns text-sm" />
                    </div>
                    <span className="text-xs sm:text-[13px] font-semibold text-gray-800 group-hover:text-brandOrange transition-colors">
                      School infrastructure
                    </span>
                  </div>
                  <i className="fa-solid fa-chevron-right text-[11px] text-gray-400 group-hover:text-brandOrange group-hover:translate-x-0.5 transition-all shrink-0" />
                </a>

                {/* 6. Transport with GPS */}
                <a
                  href="#school-transport"
                  onClick={handleNavClick}
                  className="mobile-nav-link flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl border border-gray-200/80 bg-slate-50 hover:bg-orange-50/70 hover:border-brandOrange/40 active:scale-[0.99] transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-brandOrange flex items-center justify-center shrink-0 group-hover:bg-brandOrange group-hover:text-white transition-colors duration-200 shadow-xs">
                      <i className="fa-solid fa-bus text-sm" />
                    </div>
                    <span className="text-xs sm:text-[13px] font-semibold text-gray-800 group-hover:text-brandOrange transition-colors">
                      Transport with GPS
                    </span>
                  </div>
                  <i className="fa-solid fa-chevron-right text-[11px] text-gray-400 group-hover:text-brandOrange group-hover:translate-x-0.5 transition-all shrink-0" />
                </a>

                {/* 7. Track child progress */}
                <a
                  href="#faq-question-11"
                  onClick={handleNavClick}
                  className="mobile-nav-link flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl border border-gray-200/80 bg-slate-50 hover:bg-orange-50/70 hover:border-brandOrange/40 active:scale-[0.99] transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-brandOrange flex items-center justify-center shrink-0 group-hover:bg-brandOrange group-hover:text-white transition-colors duration-200 shadow-xs">
                      <i className="fa-solid fa-chart-line text-sm" />
                    </div>
                    <span className="text-xs sm:text-[13px] font-semibold text-gray-800 group-hover:text-brandOrange transition-colors">
                      Track child progress
                    </span>
                  </div>
                  <i className="fa-solid fa-chevron-right text-[11px] text-gray-400 group-hover:text-brandOrange group-hover:translate-x-0.5 transition-all shrink-0" />
                </a>

                {/* 8. School discipline */}
                <a
                  href="#faq-question-12"
                  onClick={handleNavClick}
                  className="mobile-nav-link flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl border border-gray-200/80 bg-slate-50 hover:bg-orange-50/70 hover:border-brandOrange/40 active:scale-[0.99] transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-brandOrange flex items-center justify-center shrink-0 group-hover:bg-brandOrange group-hover:text-white transition-colors duration-200 shadow-xs">
                      <i className="fa-solid fa-user-shield text-sm" />
                    </div>
                    <span className="text-xs sm:text-[13px] font-semibold text-gray-800 group-hover:text-brandOrange transition-colors">
                      School discipline
                    </span>
                  </div>
                  <i className="fa-solid fa-chevron-right text-[11px] text-gray-400 group-hover:text-brandOrange group-hover:translate-x-0.5 transition-all shrink-0" />
                </a>

                {/* 9. Important FAQ */}
                <a
                  href="#faqs"
                  onClick={handleNavClick}
                  className="mobile-nav-link flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl border border-gray-200/80 bg-slate-50 hover:bg-orange-50/70 hover:border-brandOrange/40 active:scale-[0.99] transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-brandOrange flex items-center justify-center shrink-0 group-hover:bg-brandOrange group-hover:text-white transition-colors duration-200 shadow-xs">
                      <i className="fa-solid fa-circle-question text-sm" />
                    </div>
                    <span className="text-xs sm:text-[13px] font-semibold text-gray-800 group-hover:text-brandOrange transition-colors">
                      Important FAQ
                    </span>
                  </div>
                  <i className="fa-solid fa-chevron-right text-[11px] text-gray-400 group-hover:text-brandOrange group-hover:translate-x-0.5 transition-all shrink-0" />
                </a>
              </div>

              {/* Request a Callback Button */}
              <div className="mt-6 mb-3">
                <button
                  type="button"
                  onClick={handleCallbackClick}
                  className="open-modal-btn w-full bg-brandOrange hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.99] focus:outline-none cursor-pointer"
                >
                  <i className="fas fa-headset text-white text-base" />
                  <span className="text-xs sm:text-[13px] font-bold text-white">
                    Request a Callback
                  </span>
                </button>
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
