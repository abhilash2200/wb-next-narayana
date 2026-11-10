"use client";

import Image from "next/image";
import { useModal } from "@/context/ModalContext";
import AdmissionForm from "@/components/AdmissionForm";
import { BranchLimitedSeatsData } from "@/data/branchStaticData";

interface BranchLimitedSeatsProps {
  data: BranchLimitedSeatsData;
  onOpenModal?: (action: "brochure" | "fees", title?: string) => void;
}

export default function BranchLimitedSeats({
  data,
  onOpenModal,
}: BranchLimitedSeatsProps) {
  const { openModal } = useModal();
  const handleOpenModal = onOpenModal || openModal;

  return (
    <section
      className="
        relative overflow-hidden
        bg-[url('/assets/footer-bg.webp')]
        bg-cover bg-center
        py-16 md:py-20
      "
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
                src={data.image || "/assets/footer.webp"}
                alt="Students in hallway"
                width={575}
                height={437}
                className="h-auto w-full object-cover"
              />
            </div>

            <div className="space-y-3 text-white md:space-y-4">
              <p className="px-2 text-base font-medium md:text-lg lg:px-0">
                {data.subheading || "Secure your spot today!"}
              </p>

              <p className="text-xl font-bold md:text-2xl">
                {data.heading || "Limited seats available for 2027–28 academic year."}
              </p>

              <button
                type="button"
                onClick={() => handleOpenModal("brochure", "Download Brochure")}
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
                Download Brochure
              </button>
            </div>
          </div>

          {/* RIGHT SIDE - ADMISSION FORM */}
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
              Admission Open for AY 2027-28
            </h3>

            <AdmissionForm
              formId="branch-footer"
              variant="footer"
              initialCity={data.defaultCity}
              initialBranch={data.defaultBranch}
            />
          </div>
        </div>

        {/* School Count Cards */}
        <div className="relative z-20 mt-12 flex flex-col items-center justify-center gap-4 md:mt-16 sm:flex-row md:gap-6">
          <div
            className="w-full max-w-md rounded-2xl bg-white p-5 text-center shadow-xl md:p-6 transition-transform hover:-translate-y-1 duration-200"
            data-animate="fade-up"
            data-delay="100"
          >
            <div className="mb-3 flex justify-center">
              <Image
                src="/assets/narayana-logo.png"
                alt="Narayana"
                width={120}
                height={48}
                className="h-10 max-h-12 w-auto object-contain"
              />
            </div>

            <h4 className="text-base font-bold text-gray-900 md:text-lg">
              Narayana Schools
            </h4>

            <p className="mb-2 text-sm text-gray-500 md:text-base">
              Pan India Campuses
            </p>

            <div className="text-3xl font-extrabold text-brandBlue md:text-4xl lg:text-5xl">
              900+
            </div>
          </div>

          <div
            className="w-full max-w-md rounded-2xl bg-white p-5 text-center shadow-xl md:p-6 transition-transform hover:-translate-y-1 duration-200"
            data-animate="fade-up"
            data-delay="200"
          >
            <div className="mb-3 flex justify-center">
              <Image
                src="/assets/logo1.png"
                alt="Student Body"
                width={120}
                height={48}
                className="h-10 max-h-12 w-auto object-contain"
              />
            </div>

            <h4 className="text-base font-bold text-gray-900 md:text-lg">
              Student Body
            </h4>

            <p className="mb-2 text-sm text-gray-500 md:text-base">
              Enrolled Students
            </p>

            <div className="text-3xl font-extrabold text-brandOrange md:text-4xl lg:text-5xl">
              600,000+
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
