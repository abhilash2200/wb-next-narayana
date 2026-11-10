import { NextRequest, NextResponse } from "next/server";
import { pageDataRegistry } from "@/data/dynamicPages";
import { getLandingPageTemplate } from "@/app/services/landingPageService";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  return handleCheck(request);
}

export async function POST(request: NextRequest) {
  return handleCheck(request);
}

async function handleCheck(request: NextRequest) {
  let targetPath = "";
  let branch = "";
  let city = "";
  let classSlug = "";

  if (request.method === "POST") {
    try {
      const body = await request.json();
      targetPath = (body.path || "").trim();
      branch = (body.branch || "").trim();
      city = (body.city || "").trim();
      classSlug = (body.class || body.classSlug || "").trim();
    } catch {
      // Body not JSON, fallback to URL search params
    }
  }

  if (!targetPath) {
    const { searchParams } = new URL(request.url);
    targetPath = (searchParams.get("path") || "").trim();
    branch = branch || (searchParams.get("branch") || "").trim();
    city = city || (searchParams.get("city") || "").trim();
    classSlug = classSlug || (searchParams.get("class") || "").trim();

    if (!targetPath && city) {
      targetPath = branch
        ? classSlug
          ? `/${city}/${branch}/${classSlug}`
          : `/${city}/${branch}`
        : `/${city}`;
    }
  }

  // Parse target path segments
  const cleanPath = targetPath.replace(/^\/+|\/+$/g, "");
  const slugs = cleanPath ? cleanPath.split("/").map((s) => s.trim()).filter(Boolean) : [];

  if (slugs.length === 0) {
    return NextResponse.json({
      exists: false,
      message: "No path provided.",
    });
  }

  // 1. Registered dynamic pages from pageDataRegistry
  if (slugs.length === 1 && Boolean(pageDataRegistry[slugs[0]])) {
    return NextResponse.json({
      exists: true,
      targetPath: `/${slugs[0]}`,
      type: "static_registered",
    });
  }

  // 2. CMS API dynamic landing page template lookup (1 to 3 slugs)
  if (slugs.length >= 1 && slugs.length <= 3) {
    try {
      const template = await getLandingPageTemplate(slugs);
      if (template?.page || template?.revision) {
        const canonical = template.page?.canonical_path || `/${slugs.join("/")}`;
        return NextResponse.json({
          exists: true,
          targetPath: canonical,
          type: "cms_template",
        });
      }
    } catch {
      // API error, 404, or template not published
    }
  }

  // Not found in dynamic CMS landing pages
  return NextResponse.json({
    exists: false,
    message: "Campus details coming soon for this selection.",
  });
}
