"use client";

import { useModal } from "@/context/ModalContext";

type AdmissionAction = "enquiry" | "brochure" | "fees";

interface AdmissionActionButtonProps {
  action: AdmissionAction;
  pageId: number;
  revisionId: number;
  label?: string;
  className?: string;
}

export default function AdmissionActionButton({
  action,
  pageId,
  revisionId,
  label,
  className = "",
}: AdmissionActionButtonProps) {
  const { openModal } = useModal();

  const defaultLabels: Record<AdmissionAction, string> = {
    enquiry: "Enquiry Now",
    brochure: "Download Brochure",
    fees: "Fee Structure",
  };

  const buttonLabel = label ?? defaultLabels[action];

  return (
    <button
      type="button"
      onClick={() => openModal(action, pageId, revisionId, buttonLabel)}
      className={`bg-brandOrange hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-md flex items-center gap-2 transition shadow-lg w-full md:w-auto justify-center cursor-pointer ${className}`.trim()}
    >
      {buttonLabel}
    </button>
  );
}