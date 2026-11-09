"use client";

import { useState } from "react";
import type { LandingPageTemplate } from "@/app/services/landingPageService";

interface PreviewTopBannerProps {
  template: LandingPageTemplate;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export default function PreviewTopBanner({
  template,
  onRefresh,
  isRefreshing = false,
}: PreviewTopBannerProps) {
  const [copied, setCopied] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const page = template.page;
  const revision = template.revision;
  const scope = page?.scope;

  const scopeParts = [
    scope?.city?.name,
    scope?.branch?.name,
    scope?.class?.name,
  ].filter(Boolean);

  const scopeText = scopeParts.length > 0 ? scopeParts.join(" › ") : "General";

  const handleCopyLink = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Ignore clipboard write failure
    }
  };

  if (collapsed) {
    return (
      <aside aria-label="Draft preview bar" className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full border border-amber-400/40 bg-slate-900/95 px-4 py-2 text-xs text-white shadow-2xl backdrop-blur-md">
        <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
        <span className="font-semibold text-amber-300">Draft Preview</span>
        <span className="text-slate-400">
          Page #{page?.id} · Rev #{revision?.id}
        </span>
        <button
          type="button"
          onClick={() => setCollapsed(false)}
          className="ml-2 rounded bg-slate-800 px-2 py-0.5 text-[11px] font-medium text-amber-300 hover:bg-slate-700 transition"
        >
          Expand
        </button>
      </aside>
    );
  }

  return (
    <aside aria-label="Draft preview banner" className="sticky top-0 z-50 border-b border-amber-400/30 bg-slate-900/95 px-3 py-2.5 text-xs text-white shadow-lg backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
        {/* Left: Badges & Identifiers */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 px-2.5 py-0.5 font-bold text-amber-300 text-[11px] tracking-wide uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
            Draft Preview
          </span>

          <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-[11px] text-slate-300">
            Page <strong className="text-white">#{page?.id}</strong>
          </span>

          <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-[11px] text-slate-300">
            Revision <strong className="text-white">#{revision?.id}</strong> (v{revision?.version})
          </span>

          {scopeParts.length > 0 && (
            <span className="hidden sm:inline-flex items-center gap-1 rounded bg-slate-800/80 px-2 py-0.5 text-slate-300">
              <span className="text-slate-400 font-medium">Scope:</span>
              <span className="font-semibold text-white">{scopeText}</span>
            </span>
          )}

          <span className="inline-flex items-center gap-1 rounded bg-amber-950/60 border border-amber-700/50 px-2 py-0.5 text-[11px] text-amber-200">
            <svg
              className="h-3 w-3 text-amber-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            Submissions Disabled
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {page?.canonical_path && (
            <a
              href={page.canonical_path}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 px-2.5 py-1 text-slate-300 hover:text-white transition"
              title="Open public live page URL"
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>Live Page</span>
            </a>
          )}

          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 px-2.5 py-1 text-slate-300 hover:text-white transition cursor-pointer"
            title="Copy preview link"
          >
            {copied ? (
              <>
                <svg className="h-3.5 w-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-emerald-400 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                <span>Copy Link</span>
              </>
            )}
          </button>

          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1 rounded bg-brandBlue hover:bg-brandBlueDark disabled:opacity-60 px-2.5 py-1 text-white font-medium transition cursor-pointer"
              title="Refresh draft data from backend"
            >
              <svg
                className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setCollapsed(true)}
            className="rounded p-1 text-slate-400 hover:text-white transition"
            title="Minimize preview banner"
            aria-label="Minimize preview banner"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}
