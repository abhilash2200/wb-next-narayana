"use client";

import { useEffect, useState, useCallback } from "react";
import type { LandingPageTemplate } from "@/app/services/landingPageService";
import {
  DynamicTemplateRenderer,
  PreviewTopBanner,
} from "@/components/dynamic-component";

interface DraftPreviewClientProps {
  initialTemplate?: LandingPageTemplate | null;
  initialError?: { code: string; message: string; status: number } | null;
  pageId?: string | number;
  revisionId?: string | number;
  tokenFromUrl?: string;
}

export default function DraftPreviewClient({
  initialTemplate,
  initialError,
  pageId: propPageId,
  revisionId: propRevisionId,
  tokenFromUrl = "",
}: DraftPreviewClientProps) {
  const [template, setTemplate] = useState<LandingPageTemplate | null>(
    initialTemplate ?? null
  );
  const [error, setError] = useState<{
    code: string;
    message: string;
    status: number;
  } | null>(initialError ?? null);
  const [isClientFetching, setIsClientFetching] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Form inputs for manual entry if missing or unauthenticated
  const [inputPageId, setInputPageId] = useState<string>(
    propPageId ? String(propPageId) : ""
  );
  const [inputRevisionId, setInputRevisionId] = useState<string>(
    propRevisionId ? String(propRevisionId) : ""
  );
  const [inputToken, setInputToken] = useState<string>(() => {
    if (tokenFromUrl) return tokenFromUrl;
    if (typeof window !== "undefined") {
      try {
        return (
          localStorage.getItem("preview_token") ||
          localStorage.getItem("auth_token") ||
          ""
        );
      } catch {
        return "";
      }
    }
    return "";
  });

  const activePageId = propPageId || inputPageId;
  const activeRevisionId = propRevisionId || inputRevisionId;

  const fetchPreview = useCallback(
    async (
      targetPageId: string | number,
      targetRevisionId: string | number,
      authToken: string,
      isBackgroundRefresh = false
    ) => {
      if (!targetPageId || !targetRevisionId) {
        setError({
          code: "MISSING_IDS",
          message: "Please enter both Page ID and Draft Revision ID.",
          status: 400,
        });
        setIsClientFetching(false);
        setIsRefreshing(false);
        return;
      }

      if (isBackgroundRefresh) {
        setIsRefreshing(true);
      } else {
        setIsClientFetching(true);
      }
      setError(null);

      try {
        const cleanToken = authToken.replace(/^Bearer\s+/i, "").trim();
        const headers: Record<string, string> = {
          Accept: "application/json",
        };
        if (cleanToken) {
          headers["Authorization"] = `Bearer ${cleanToken}`;
        }

        const queryParams = new URLSearchParams({
          pageId: String(targetPageId),
          revisionId: String(targetRevisionId),
        });
        if (cleanToken) {
          queryParams.set("token", cleanToken);
        }

        const res = await fetch(`/api/preview?${queryParams.toString()}`, {
          method: "GET",
          headers,
          cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          const errCode = data?.error?.code || `HTTP_${res.status}`;
          const errMsg =
            data?.error?.message || "Failed to load draft preview revision.";
          setError({
            code: errCode,
            message: errMsg,
            status: res.status,
          });
          setTemplate(null);
        } else {
          setTemplate(data.data as LandingPageTemplate);
          setError(null);
          if (cleanToken && typeof window !== "undefined") {
            try {
              localStorage.setItem("preview_token", cleanToken);
              localStorage.setItem("auth_token", cleanToken);
            } catch {
              // Ignore localStorage write errors
            }
          }
        }
      } catch (err) {
        setError({
          code: "NETWORK_ERROR",
          message:
            err instanceof Error ? err.message : "Network error loading preview.",
          status: 500,
        });
        setTemplate(null);
      } finally {
        setIsClientFetching(false);
        setIsRefreshing(false);
      }
    },
    []
  );

  // Auto-fetch if initialTemplate was not loaded on server
  useEffect(() => {
    if (template || error) return;

    const storedToken =
      inputToken ||
      tokenFromUrl ||
      (typeof window !== "undefined"
        ? localStorage.getItem("preview_token") ||
          localStorage.getItem("auth_token") ||
          ""
        : "");

    if (!activePageId || !activeRevisionId || !storedToken) {
      return;
    }

    const timer = setTimeout(() => {
      void fetchPreview(activePageId, activeRevisionId, storedToken);
    }, 0);

    return () => clearTimeout(timer);
  }, [activePageId, activeRevisionId, error, fetchPreview, inputToken, template, tokenFromUrl]);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void fetchPreview(activePageId, activeRevisionId, inputToken);
  };

  const handleRefresh = () => {
    const token =
      inputToken ||
      tokenFromUrl ||
      (typeof window !== "undefined"
        ? localStorage.getItem("preview_token") ||
          localStorage.getItem("auth_token") ||
          ""
        : "");
    void fetchPreview(activePageId, activeRevisionId, token, true);
  };

  // If successfully loaded template, render preview with dynamic sections
  if (template) {
    return (
      <div className="min-h-screen bg-white">
        <PreviewTopBanner
          template={template}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
        />
        <DynamicTemplateRenderer template={template} isPreview={true} />
      </div>
    );
  }

  // Loading state
  if (isClientFetching) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-6">
        <div className="relative mb-4 flex items-center justify-center">
          <div className="h-14 w-14 rounded-full border-4 border-amber-500/20 border-t-amber-400 animate-spin" />
          <span className="absolute text-xs font-bold text-amber-400">AGY</span>
        </div>
        <h2 className="text-xl font-bold text-white mb-2">
          Loading Draft Preview...
        </h2>
        <p className="text-sm text-slate-400 max-w-sm text-center">
          Fetching draft sections for Page #{activePageId || "—"} · Revision #
          {activeRevisionId || "—"}
        </p>
      </div>
    );
  }

  // Unauthenticated / Error / Manual Entry View
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-4 text-white">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        {/* Header Badge */}
        <div className="mb-6 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-300">
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            DRAFT REVISION PREVIEW
          </div>
          <span className="text-xs text-slate-400">Internal Only</span>
        </div>

        <h1 className="text-2xl font-extrabold text-white mb-2">
          {error?.code === "AUTH_TOKEN_MISSING" || error?.status === 401
            ? "Authentication Required"
            : error?.code === "DRAFT_NOT_FOUND" || error?.status === 404
            ? "Draft Not Found"
            : "Preview Draft Revision"}
        </h1>

        <p className="text-sm text-slate-400 mb-6 leading-relaxed">
          {error?.code === "AUTH_TOKEN_MISSING" || error?.status === 401
            ? "Draft revisions are private and require an authenticated CMS admin token to preview before publishing."
            : error?.code === "DRAFT_NOT_FOUND"
            ? "The revision specified is either already published, does not belong to this page, or does not exist."
            : "Enter your target Page ID, Revision ID, and CMS Bearer Token to preview draft landing page sections."}
        </p>

        {/* Error Alert Box */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-500/30 bg-red-950/40 p-4 text-xs text-red-200">
            <div className="flex items-center gap-2 font-bold text-red-400 mb-1">
              <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Error: {error.code} ({error.status})</span>
            </div>
            <p className="text-red-300/90">{error.message}</p>
          </div>
        )}

        <form onSubmit={handleManualSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Page ID
              </label>
              <input
                type="number"
                required
                value={activePageId}
                onChange={(e) => setInputPageId(e.target.value)}
                placeholder="e.g. 59"
                className="w-full rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Revision ID
              </label>
              <input
                type="number"
                required
                value={activeRevisionId}
                onChange={(e) => setInputRevisionId(e.target.value)}
                placeholder="e.g. 91"
                className="w-full rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-300">
                Bearer Auth Token
              </label>
              <span className="text-[11px] text-amber-400/80">
                From Leads CMS
              </span>
            </div>
            <input
              type="password"
              required
              value={inputToken}
              onChange={(e) => setInputToken(e.target.value)}
              placeholder="Paste Bearer Token or JWT..."
              className="w-full rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
          </div>

          <button
            type="submit"
            disabled={isClientFetching}
            className="w-full rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-orange-500/20 hover:from-amber-400 hover:to-orange-400 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50 transition cursor-pointer"
          >
            {isClientFetching ? "Authenticating & Loading..." : "Load Draft Preview"}
          </button>
        </form>

        <div className="mt-6 border-t border-slate-800 pt-4 text-center">
          <p className="text-[11px] text-slate-500">
            Preview runs in non-indexed mode with form submissions safely disabled.
          </p>
        </div>
      </div>
    </div>
  );
}
