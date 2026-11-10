"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";

export type ToastType = "warning" | "error" | "info" | "success";

export interface ToastOptions {
  id?: string;
  type?: ToastType;
  icon?: string;
  title: string;
  message?: string;
  actionText?: string;
  onAction?: () => void;
  duration?: number; // Duration in milliseconds, default 5000
}

export interface ToastItem extends ToastOptions {
  id: string;
  type: ToastType;
  duration: number;
  createdAt: number;
}

interface ToastContextType {
  toasts: ToastItem[];
  showToast: (options: ToastOptions) => string;
  dismissToast: (id: string) => void;
  clearAllToasts: () => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timersRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const dismissToast = useCallback((id: string) => {
    // Clear timer if active
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }

    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current.clear();
    setToasts([]);
  }, []);

  const showToast = useCallback(
    (options: ToastOptions): string => {
      const id = options.id || `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const type: ToastType = options.type || "warning";
      const duration = options.duration ?? 5000;

      const newToast: ToastItem = {
        ...options,
        id,
        type,
        duration,
        createdAt: Date.now(),
      };

      setToasts((prev) => {
        // Keep at most 3 toasts on screen at once
        const filtered = prev.filter((t) => t.id !== id);
        return [...filtered, newToast].slice(-3);
      });

      // Auto dismiss timer
      if (duration > 0) {
        if (timersRef.current.has(id)) {
          clearTimeout(timersRef.current.get(id));
        }

        const timer = setTimeout(() => {
          dismissToast(id);
        }, duration);

        timersRef.current.set(id, timer);
      }

      return id;
    },
    [dismissToast]
  );

  // Clean up timers on unmount
  useEffect(() => {
    const currentTimers = timersRef.current;
    return () => {
      currentTimers.forEach((timer) => clearTimeout(timer));
      currentTimers.clear();
    };
  }, []);

  return (
    <ToastContext.Provider
      value={{
        toasts,
        showToast,
        dismissToast,
        clearAllToasts,
      }}
    >
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextType {
  const context = useContext(ToastContext);
  if (!context) {
    // Graceful fallback for components used outside ToastProvider
    return {
      toasts: [],
      showToast: () => "",
      dismissToast: () => {},
      clearAllToasts: () => {},
    };
  }
  return context;
}

function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[99999] flex flex-col gap-3 max-w-[calc(100vw-2rem)] sm:max-w-md w-full pointer-events-none"
      aria-live="assertive"
    >
      {toasts.map((toast) => (
        <ToastCard key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function ToastCard({
  toast,
  onDismiss,
}: {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}) {
  const isWarning = toast.type === "warning";
  const isError = toast.type === "error";
  const isSuccess = toast.type === "success";

  const iconClasses = toast.icon
    ? `${toast.icon}`
    : isError
    ? "fa-circle-exclamation text-red-600"
    : isWarning
    ? "fa-school text-brandOrange"
    : isSuccess
    ? "fa-circle-check text-green-600"
    : "fa-circle-info text-brandBlue";

  const iconBg = isError
    ? "bg-red-50 border-red-200"
    : isWarning
    ? "bg-orange-50 border-orange-200"
    : isSuccess
    ? "bg-green-50 border-green-200"
    : "bg-blue-50 border-blue-200";

  const topStripe = isError
    ? "bg-gradient-to-r from-red-600 via-rose-500 to-red-600"
    : isWarning
    ? "bg-gradient-to-r from-brandOrange via-amber-400 to-brandYellow"
    : isSuccess
    ? "bg-gradient-to-r from-green-600 via-emerald-400 to-teal-500"
    : "bg-gradient-to-r from-brandBlue via-blue-400 to-cyan-500";

  return (
    <div
      role="alert"
      className="pointer-events-auto w-full bg-white text-gray-900 rounded-2xl shadow-2xl border border-gray-200/90 overflow-hidden relative transition-all duration-300 transform translate-y-0 opacity-100"
    >
      {/* Top accent gradient bar */}
      <div className={`h-1.5 w-full ${topStripe}`} />

      <div className="p-4 sm:p-4.5 flex items-start gap-3.5">
        {/* Status Icon */}
        <div
          className={`w-10 h-10 rounded-xl border ${iconBg} flex items-center justify-center shrink-0 shadow-xs mt-0.5`}
        >
          <i className={`fas ${iconClasses} text-base`} />
        </div>

        {/* Text Details */}
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-bold text-[14px] sm:text-[15px] text-gray-900 leading-tight">
              {toast.title}
            </h4>
          </div>

          {toast.message && (
            <p className="text-[12.5px] sm:text-[13px] text-gray-600 mt-1 leading-snug">
              {toast.message}
            </p>
          )}

          {/* Action Button */}
          {toast.actionText && (
            <div className="mt-2.5 flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  toast.onAction?.();
                  onDismiss(toast.id);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brandOrange hover:bg-orange-600 text-white font-bold text-xs tracking-wide rounded-lg shadow-xs hover:shadow-orange-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <span>{toast.actionText}</span>
                <i className="fas fa-arrow-right text-[10px]" />
              </button>
            </div>
          )}
        </div>

        {/* Dismiss (X) Button */}
        <button
          type="button"
          onClick={() => onDismiss(toast.id)}
          aria-label="Close notification"
          className="text-gray-400 hover:text-gray-700 w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer shrink-0 -mr-1 -mt-1"
        >
          <i className="fas fa-times text-xs" />
        </button>
      </div>

      {/* Auto-dismiss progress bar */}
      {toast.duration > 0 && (
        <div className="h-1 w-full bg-gray-100 overflow-hidden">
          <div
            className={`h-full ${
              isError ? "bg-red-500" : isWarning ? "bg-brandOrange" : isSuccess ? "bg-green-500" : "bg-brandBlue"
            }`}
            style={{
              animation: `shrinkWidth ${toast.duration}ms linear forwards`,
            }}
          />
        </div>
      )}
    </div>
  );
}
