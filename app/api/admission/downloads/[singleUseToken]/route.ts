
import { NextResponse } from "next/server";

const API_BASE_URL = (process.env.NEXT_API_BASE_URL ?? "")
  .trim()
  .replace(/\/$/, "");

type RouteContext = {
  params: Promise<{
    singleUseToken: string;
  }>;
};

export async function GET(
  _request: Request,
  { params }: RouteContext,
) {
  try {
    const { singleUseToken } = await params;

    if (!singleUseToken) {
      return NextResponse.json(
        { success: false, message: "Download token is missing." },
        { status: 400 },
      );
    }

    const response = await fetch(
      `${API_BASE_URL}/downloads/${encodeURIComponent(singleUseToken)}`,
      {
        method: "GET",
        headers: {
          Accept: "application/pdf",
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      const errorText = await response.text();

      console.error(
        "Backend brochure download failed:",
        response.status,
        errorText,
      );

      return NextResponse.json(
        {
          success: false,
          message: "Brochure download failed.",
          backendStatus: response.status,
        },
        { status: response.status },
      );
    }

    const headers = new Headers();
    headers.set(
      "Content-Type",
      response.headers.get("content-type") ||
        "application/pdf",
    );
    headers.set(
      "Content-Disposition",
      response.headers.get("content-disposition") ||
        'attachment; filename="brochure.pdf"',
    );
    headers.set("Cache-Control", "no-store");

    return new Response(response.body, {
      status: 200,
      headers,
    });
  } catch (error: unknown) {
    console.error("Brochure download route error:", error);

    

    return NextResponse.json(
      {
        success: false,
        message: "Unable to download the brochure.",
      },
      { status: 500 },
    );
  }

  
}
