import { Metadata } from "next";
import { cookies } from "next/headers";
import {
  getDraftPreviewTemplate,
  PreviewApiError,
} from "@/app/services/landingPageService";
import DraftPreviewClient from "@/app/preview/DraftPreviewClient";

interface PreviewPageProps {
  params: Promise<{
    slug?: string[];
  }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
  searchParams,
}: PreviewPageProps): Promise<Metadata> {
  const { slug } = await params;
  const sParams = await searchParams;

  const pageId = slug?.[0] || sParams.pageId || sParams.page_id;
  const revisionId = slug?.[1] || sParams.revisionId || sParams.revision_id;

  const pageTitle =
    pageId && revisionId
      ? `[Draft Preview] Page #${pageId} · Rev #${revisionId} | Narayana Schools`
      : `[Draft Preview] Draft Revision | Narayana Schools`;

  return {
    title: pageTitle,
    description: "Internal Draft Revision Preview",
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  };
}

export default async function PreviewPage({
  params,
  searchParams,
}: PreviewPageProps) {
  const { slug } = await params;
  const sParams = await searchParams;

  const pageId =
    slug?.[0] ||
    (typeof sParams.pageId === "string" ? sParams.pageId : "") ||
    (typeof sParams.page_id === "string" ? sParams.page_id : "");

  const revisionId =
    slug?.[1] ||
    (typeof sParams.revisionId === "string" ? sParams.revisionId : "") ||
    (typeof sParams.revision_id === "string" ? sParams.revision_id : "") ||
    (typeof sParams.revision === "string" ? sParams.revision : "");

  const tokenFromQuery =
    typeof sParams.token === "string"
      ? sParams.token.trim()
      : typeof sParams.auth_token === "string"
      ? sParams.auth_token.trim()
      : "";

  const cookieStore = await cookies();
  const tokenFromCookie =
    cookieStore.get("preview_token")?.value ||
    cookieStore.get("auth_token")?.value ||
    "";

  const effectiveToken =
    tokenFromQuery ||
    tokenFromCookie ||
    (process.env.PREVIEW_AUTH_TOKEN ?? "").trim() ||
    (process.env.BACKEND_API_TOKEN ?? "").trim();

  let initialTemplate = null;
  let initialError: { code: string; message: string; status: number } | null =
    null;

  if (pageId && revisionId && effectiveToken) {
    try {
      initialTemplate = await getDraftPreviewTemplate(
        pageId,
        revisionId,
        effectiveToken
      );
    } catch (err) {
      if (err instanceof PreviewApiError) {
        initialError = {
          code: err.code,
          message: err.message,
          status: err.status,
        };
      } else {
        initialError = {
          code: "PREVIEW_ERROR",
          message:
            err instanceof Error ? err.message : "Failed to load draft preview.",
          status: 500,
        };
      }
    }
  }

  return (
    <DraftPreviewClient
      initialTemplate={initialTemplate}
      initialError={initialError}
      pageId={pageId}
      revisionId={revisionId}
      tokenFromUrl={tokenFromQuery}
    />
  );
}
