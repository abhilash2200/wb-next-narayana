
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import dynamic from "next/dynamic";

const AdmissionModal = dynamic(() => import("@/components/AdmissionModel"), {
  ssr: false,
});

export type ModalAction = "brochure" | "fees" | "enquiry" | null;

interface ModalContextType {
  isOpen: boolean;
  action: ModalAction;
  modalTitle: string | null;
  pageId: number;
  revisionId: number;
  isPreview?: boolean;
  setIsPreview: (isPreview: boolean) => void;
  setPageContext: (pageId: number, revisionId: number, isPreview?: boolean) => void;
  openModal: (
    action?: ModalAction,
    pageIdOrTitle?: number | string,
    revisionId?: number,
    title?: string
  ) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

interface ModalProviderProps {
  children: React.ReactNode;
  autoOpenDelayMs?: number;
}

export function ModalProvider({
  children,
  autoOpenDelayMs = 0,
}: ModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState<ModalAction>(null);
  const [modalTitle, setModalTitle] = useState<string | null>(null);
  const [pageId, setPageId] = useState(0);
  const [revisionId, setRevisionId] = useState(0);
  const [isPreview, setIsPreview] = useState(false);
  const [hasEverOpened, setHasEverOpened] = useState(false);

  // Register the current landing page IDs.
  const setPageContext = useCallback(
    (nextPageId: number, nextRevisionId: number, nextIsPreview?: boolean) => {
      if (nextPageId > 0) {
        setPageId(nextPageId);
      }
      if (nextRevisionId > 0) {
        setRevisionId(nextRevisionId);
      }
      if (typeof nextIsPreview === "boolean") {
        setIsPreview(nextIsPreview);
      }
    },
    []
  );

  const openModal = useCallback(
    (
      actionType?: ModalAction,
      pageIdOrTitle?: number | string,
      nextRevisionId?: number,
      customTitle?: string
    ) => {
      let nextTitle: string | null = null;

      if (typeof pageIdOrTitle === "string") {
        nextTitle = pageIdOrTitle;
      } else if (typeof customTitle === "string") {
        nextTitle = customTitle;
      }

      if (typeof pageIdOrTitle === "number" && pageIdOrTitle > 0) {
        setPageId(pageIdOrTitle);
      }
      if (typeof nextRevisionId === "number" && nextRevisionId > 0) {
        setRevisionId(nextRevisionId);
      }

      setModalTitle(nextTitle);
      setAction(actionType ?? null);
      setHasEverOpened(true);
      setIsOpen(true);
    },
    []
  );

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Optional auto-open. Only open if valid page IDs are available.
  useEffect(() => {
    if (autoOpenDelayMs <= 0 || isPreview || pageId <= 0 || revisionId <= 0) {
      return;
    }

    try {
      if (sessionStorage.getItem("admission_modal_auto_opened")) {
        return;
      }

      const timer = window.setTimeout(() => {
        sessionStorage.setItem("admission_modal_auto_opened", "true");
        openModal("fees", pageId, revisionId);
      }, autoOpenDelayMs);

      return () => window.clearTimeout(timer);
    } catch {
      // Ignore sessionStorage errors.
    }
  }, [autoOpenDelayMs, isPreview, pageId, revisionId, openModal]);

  // Close modal on Escape.
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeModal]);

  const value = useMemo(
    () => ({
      isOpen,
      action,
      modalTitle,
      pageId,
      revisionId,
      isPreview,
      setIsPreview,
      setPageContext,
      openModal,
      closeModal,
    }),
    [
      isOpen,
      action,
      modalTitle,
      pageId,
      revisionId,
      isPreview,
      setIsPreview,
      setPageContext,
      openModal,
      closeModal,
    ]
  );

  return (
    <ModalContext.Provider value={value}>
      {children}

      {hasEverOpened && (
        <AdmissionModal
          open={isOpen}
          onClose={closeModal}
          action={action}
          title={modalTitle ?? undefined}
          pageId={pageId}
          revisionId={revisionId}
          isPreview={isPreview}
        />
      )}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
}
