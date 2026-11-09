import { NextRequest, NextResponse } from "next/server";
import {
  getDraftPreviewTemplate,
  PreviewApiError,
} from "@/app/services/landingPageService";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const pageId = searchParams.get("pageId") || searchParams.get("page_id");
  const revisionId =
    searchParams.get("revisionId") || searchParams.get("revision_id");

  if (!pageId || !revisionId) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INVALID_PARAMETERS",
          message: "Both pageId and revisionId query parameters are required.",
        },
      },
      { status: 400 }
    );
  }

  // Extract auth token from Header, Query, or Cookie
  const authHeader = request.headers.get("authorization");
  const bearerFromHeader = authHeader?.startsWith("Bearer ")
    ? authHeader.substring(7).trim()
    : "";

  const tokenFromQuery = (searchParams.get("token") ?? "").trim();
  const tokenFromCookie =
    request.cookies.get("preview_token")?.value ??
    request.cookies.get("auth_token")?.value ??
    "";

  const token = bearerFromHeader || tokenFromQuery || tokenFromCookie;

  if (!token) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "AUTH_TOKEN_MISSING",
          message:
            "Bearer token is required to preview draft revisions. Please supply it via Authorization header, token query parameter, or auth cookie.",
        },
      },
      { status: 401 }
    );
  }

  try {
    const template = await getDraftPreviewTemplate(pageId, revisionId, token);

    const response = NextResponse.json({
      success: true,
      message: "OK",
      data: template,
    });

    // If token was passed via query parameter, set it in an HttpOnly session cookie
    // for seamless subsequent navigation/refreshing within the browser.
    if (tokenFromQuery) {
      response.cookies.set({
        name: "preview_token",
        value: tokenFromQuery,
        path: "/",
        sameSite: "lax",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 24 hours
      });
    }

    return response;
  } catch (error) {
    if (error instanceof PreviewApiError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: error.code,
            message: error.message,
          },
        },
        { status: error.status }
      );
    }

    const message =
      error instanceof Error ? error.message : "Internal preview error";
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "PREVIEW_INTERNAL_ERROR",
          message,
        },
      },
      { status: 500 }
    );
  }
}
