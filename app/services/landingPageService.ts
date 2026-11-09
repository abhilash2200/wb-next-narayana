
const getApiBaseUrl = (): string => {
  const envUrl = (process.env.NEXT_API_BASE_URL ?? "")
    .trim()
    .replace(/\/$/, "");

  if (!envUrl) {
    throw new Error("NEXT_API_BASE_URL is not defined in environment variables");
  }

  return envUrl.endsWith("/frontend") ? envUrl : `${envUrl}/frontend`;
};

export const getBackendApiBaseUrl = (): string => {
  const customBackendUrl = (process.env.NEXT_BACKEND_API_BASE_URL ?? "").trim().replace(/\/$/, "");
  if (customBackendUrl) {
    return customBackendUrl.endsWith("/backend") ? customBackendUrl : `${customBackendUrl}/backend`;
  }

  const baseFrontendUrl = (process.env.NEXT_API_BASE_URL ?? "").trim().replace(/\/$/, "");
  if (baseFrontendUrl) {
    if (baseFrontendUrl.endsWith("/frontend")) {
      return baseFrontendUrl.replace(/\/frontend$/, "/backend");
    }
    if (baseFrontendUrl.endsWith("/backend")) {
      return baseFrontendUrl;
    }
    return `${baseFrontendUrl}/backend`;
  }

  throw new Error(
    "NEXT_BACKEND_API_BASE_URL or NEXT_API_BASE_URL is not defined in environment variables"
  );
};

export interface LandingPageMedia {
  id: string;
  public_url: string;
  mime_type: string;
  width: string;
  height: string;
}

export interface LandingPageSection {
  type: string;
  sort_order: number;
  content: Record<string, unknown>;
}

export interface LandingPageTemplate {
  page: {
    id: number;
    canonical_path: string;
    status?: string;
    is_indexed?: boolean;
    robots?: string;
    scope: {
      city: { id: number; name: string; slug: string } | null;
      branch: { id: number; name: string; slug: string } | null;
      class: { id: number; name: string; slug: string } | null;
    };
  };
  revision: {
    id: number;
    version: number;
    title: string;
    is_indexed?: boolean;
    robots?: string;
    seo: {
      title: string;
      description: string;
      is_indexed?: boolean;
      robots?: string;
      index?: boolean;
    };
    published_at: string;
  };
  sections: LandingPageSection[];
  media: Record<string, LandingPageMedia>;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta: {
    request_id?: string;
  };
}

export async function getLandingPageTemplate(
  cityOrSlugs: string | string[],
  branchSlug?: string,
  classSlug?: string
): Promise<LandingPageTemplate> {
  const slugs: string[] = Array.isArray(cityOrSlugs)
    ? cityOrSlugs
    : [cityOrSlugs, branchSlug, classSlug].filter(
        (segment): segment is string => Boolean(segment)
      );

  const path = slugs.map(encodeURIComponent).join("/");
  const apiUrl = `${getApiBaseUrl()}/pages/${path}`;

  const response = await fetch(apiUrl, {
  method: "GET",
  headers: {
    Accept: "application/json",
  },
  cache: "no-store",
});
  const result: unknown = await response.json();

  if (!response.ok) {
    let message = `Landing Page API failed: ${response.status}`;

    if (
      typeof result === "object" &&
      result !== null &&
      "error" in result
    ) {
      const error = result.error;

      if (
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof error.message === "string"
      ) {
        message = error.message;
      }
    }

    throw new Error(message);
  }

  const apiResult = result as ApiResponse<LandingPageTemplate>;

  if (!apiResult.success) {
    throw new Error(
      apiResult.message || "Unable to load landing page."
    );
  }

  return apiResult.data;
}

export interface PreviewApiErrorDetails {
  code: string;
  message: string;
  status: number;
}

export class PreviewApiError extends Error {
  code: string;
  status: number;

  constructor(message: string, code: string, status: number) {
    super(message);
    this.name = "PreviewApiError";
    this.code = code;
    this.status = status;
  }
}

export async function getDraftPreviewTemplate(
  pageId: number | string,
  revisionId: number | string,
  token?: string
): Promise<LandingPageTemplate> {
  const authToken =
    (token ?? "").trim() ||
    (process.env.PREVIEW_AUTH_TOKEN ?? "").trim() ||
    (process.env.BACKEND_API_TOKEN ?? "").trim();

  if (!authToken) {
    throw new PreviewApiError(
      "Bearer token is required to preview draft revisions.",
      "AUTH_TOKEN_MISSING",
      401
    );
  }

  const cleanToken = authToken.replace(/^Bearer\s+/i, "").trim();
  const apiUrl = `${getBackendApiBaseUrl()}/pages/${pageId}/revisions/${revisionId}/preview`;

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${cleanToken}`,
    },
    cache: "no-store",
  });

  const result: unknown = await response.json();

  if (!response.ok) {
    let errorCode = `HTTP_${response.status}`;
    let errorMessage = `Preview API failed with status ${response.status}`;

    if (
      typeof result === "object" &&
      result !== null &&
      "error" in result
    ) {
      const err = (result as { error?: { code?: string; message?: string } }).error;
      if (err?.code) errorCode = err.code;
      if (err?.message) errorMessage = err.message;
    }

    throw new PreviewApiError(errorMessage, errorCode, response.status);
  }

  const apiResult = result as ApiResponse<LandingPageTemplate>;

  if (!apiResult.success) {
    throw new PreviewApiError(
      apiResult.message || "Unable to load draft preview.",
      "PREVIEW_FETCH_FAILED",
      response.status
    );
  }

  return apiResult.data;
}
