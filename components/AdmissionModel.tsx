"use client";

import { useEffect, useState } from "react";
import AdmissionForm from "@/components/AdmissionForm";

type AdmissionModalProps = {
  open: boolean;
  onClose: () => void;
  action?: "brochure" | "fees" | "enquiry" | null;
  title?: string;
  pageId: number;
  revisionId: number;
  isPreview?: boolean;
};

function computeHeading(
  title?: string,
  action?: "brochure" | "fees" | "enquiry" | null
) {
  // Any brochure action or brochure trigger should always display "Download Brochure"
  if (action === "brochure" || title?.trim().toLowerCase() === "brochure") {
    return "Download Brochure";
  }

  // Generic "Fees" trigger should display "Get Fee Structure"
  if (title?.trim().toLowerCase() === "fees") {
    return "Get Fee Structure";
  }

  if (title && title.trim()) {
    return title.trim();
  }

  switch (action) {
    case "fees":
      return "Get Fee Structure";
    case "enquiry":
      return "Admission Enquiry";
    default:
      return "Admission Open for AY 2027-28";
  }
}

export default function AdmissionModal({
  open,
  onClose,
  action = null,
  title,
  pageId,
  revisionId,
  isPreview = false,
}: AdmissionModalProps) {
  const [content, setContent] = useState(() => ({
    heading: computeHeading(title, action),
    action,
  }));

  // Freeze heading and action during close animation; only update while open
  if (open) {
    const nextHeading = computeHeading(title, action);
    if (content.heading !== nextHeading || content.action !== action) {
      setContent({
        heading: nextHeading,
        action,
      });
    }
  }
  // Lock body scroll when modal is open
  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Handle ESC key to dismiss modal cleanly
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return (
    <div
      id="admission-modal"
      className={`fixed inset-0 z-99999 flex items-center justify-center p-4 sm:p-6 overflow-y-auto transition-all duration-300 ${
        open
          ? "visible opacity-100 pointer-events-auto delay-0"
          : "invisible opacity-0 pointer-events-none delay-300"
      }`}
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop with smooth blur and fade transition */}
      <div
        id="modal-backdrop"
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer transition-opacity duration-300 ease-out ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal dialog with cubic-bezier scale and opacity transitions */}
      <div
        id="modal-content"
        onClick={(e) => e.stopPropagation()}
        className={`relative z-10 my-auto w-full max-w-lg rounded-2xl border-[3px] border-brandBlue bg-white shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-3"
        }`}
      >
        {/* Close Button with micro-interaction */}
        <button
          id="close-modal-btn"
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-all duration-200 hover:bg-red-50 hover:text-red-500 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-brandBlue/30"
          aria-label="Close modal"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-6 sm:p-8">
          <h3 className="mb-6 text-2xl font-bold text-gray-900 tracking-tight">
            {content.heading}
          </h3>

          <AdmissionForm
            formId={3}
            pageId={pageId}
            revisionId={revisionId}
            variant="modal"
            action={content.action}
            onSuccess={onClose}
            isPreview={isPreview}
          />
        </div>
      </div>
    </div>
  );
}