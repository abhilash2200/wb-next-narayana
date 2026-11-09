
export interface AdmissionCity {
  id: string;
  name: string;
  slug: string;
  sort_order: string;
}

interface AdmissionCitiesResponse {
  success: boolean;
  message: string;
  data: AdmissionCity[];
}

export interface AdmissionBranch {
  id: string;
  name: string;
  slug: string;
  sort_order: string;
}

interface AdmissionBranchesResponse {
  success: boolean;
  message: string;
  data: AdmissionBranch[];
}
export interface AdmissionBoard {
  code: string;
  name: string;
}

interface AdmissionBoardsResponse {
  success: boolean;
  message: string;
  data: AdmissionBoard[];
}

export interface AdmissionReservationType {
  code: string;
  name: string;
}

interface AdmissionReservationTypesResponse {
  success: boolean;
  message: string;
  data: AdmissionReservationType[];
}

export interface AdmissionClass {
  id: string;
  name: string;
  slug: string;
  sort_order: string;
}

interface AdmissionClassesResponse {
  success: boolean;
  message: string;
  data: AdmissionClass[];
}

export interface SendAdmissionOtpPayload {
  page_id: number;
  revision_id: number;
  name: string;
  phone: string;
  parent_email: string;
  city_id: number;
  branch_id: number;
  board: string;
  reservation_type: string;
  class_id: number;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  redirect_from?: string;
  page_section?: string;
}

export interface SendAdmissionOtpResponse {
  success: boolean;
  message: string;
  data: {
    challenge_token: string;
    [key: string]: unknown;
  };
  meta?: Record<string, unknown>;
}

export interface ResendAdmissionOtpResponse {
  success: boolean;
  message: string;
  data: string;
  meta?: Record<string, unknown>;
}

export class ResendAdmissionOtpError extends Error {
  status: number;
  retryAfterSeconds?: number;

  constructor(
    message: string,
    status: number,
    retryAfterSeconds?: number,
  ) {
    super(message);
    this.name = "ResendAdmissionOtpError";
    this.status = status;
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

export interface VerifyAdmissionOtpPayload {
  challenge_token: string;
  otp: string;
}

export interface VerifyAdmissionOtpResponse {
  success: boolean;
  message: string;
  data: {
    verification_token: string;
    expires_in: number;
  };
  meta?: Record<string, unknown>;
}

export interface CompleteAdmissionPayload {
  verification_token: string;
  intent: "ENQUIRY" | "BROCHURE" | "FEES";
}

export interface CompleteAdmissionResponse {
  success: boolean;
  message: string;
  data: {
    lead_id: number;
    intent: string;
    next_action: {
      redirect_url: string | null;
      download_url: string | null;
      download_filename: string | null;
      download_expires_at: string | null;
    };
  };
  meta?: {
    request_id?: string;
  };
}

let citiesPromise: Promise<AdmissionCity[]> | null = null;

export function getAdmissionCities(): Promise<AdmissionCity[]> {
  if (!citiesPromise) {
    citiesPromise = fetch("/api/admission/options/cities", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Cities API failed: ${response.status}`);
        }

        const result =
          (await response.json()) as AdmissionCitiesResponse;

        if (!result.success || !Array.isArray(result.data)) {
          throw new Error("Invalid cities API response");
        }

        return [...result.data].sort(
          (a, b) => Number(a.sort_order) - Number(b.sort_order)
        );
      })
      .catch((error: unknown) => {
        citiesPromise = null;
        throw error;
      });
  }

  return citiesPromise;
}

export async function getAdmissionBranches(
  cityId: string,
): Promise<AdmissionBranch[]> {
  const response = await fetch(
    `/api/admission/options/branches?city_id=${encodeURIComponent(cityId)}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Branches API failed: ${response.status}`);
  }

  const result = (await response.json()) as AdmissionBranchesResponse;

  if (!result.success || !Array.isArray(result.data)) {
    throw new Error("Invalid branches API response");
  }

  return [...result.data].sort(
    (a, b) => Number(a.sort_order) - Number(b.sort_order),
  );
}

export async function getAdmissionBoards(
  branchId: string,
): Promise<AdmissionBoard[]> {
  const response = await fetch(
    `/api/admission/options/boards?branch_id=${encodeURIComponent(branchId)}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Boards API failed: ${response.status}`);
  }

  const result = (await response.json()) as AdmissionBoardsResponse;

  if (!result.success || !Array.isArray(result.data)) {
    throw new Error("Invalid boards API response");
  }

  return result.data;
}

export async function getAdmissionReservationTypes(
  branchId: string,
  board: string,
): Promise<AdmissionReservationType[]> {
  const params = new URLSearchParams({
    branch_id: branchId,
    board,
  });

  const response = await fetch(
    `/api/admission/options/reservation-types?${params.toString()}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Reservation Types API failed: ${response.status}`,
    );
  }

  const result =
    (await response.json()) as AdmissionReservationTypesResponse;

  if (!result.success || !Array.isArray(result.data)) {
    throw new Error("Invalid reservation types API response");
  }

  return result.data;
}

export async function getAdmissionClasses(
  branchId: string,
  board: string,
  reservationType: string,
): Promise<AdmissionClass[]> {
  const params = new URLSearchParams({
    branch_id: branchId,
    board,
    reservation_type: reservationType,
  });

  const response = await fetch(
    `/api/admission/options/classes?${params.toString()}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Classes API failed: ${response.status}`);
  }

  const result =
    (await response.json()) as AdmissionClassesResponse;

  if (!result.success || !Array.isArray(result.data)) {
    throw new Error("Invalid classes API response");
  }

  return [...result.data].sort(
    (a, b) => Number(a.sort_order) - Number(b.sort_order),
  );
}

export async function sendAdmissionOtp(
  payload: SendAdmissionOtpPayload,
): Promise<SendAdmissionOtpResponse> {
  const response = await fetch("/api/admission/otp/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result: unknown = await response.json();

  if (!response.ok) {
    throw new Error(
      `Send OTP API failed (${response.status}): ${JSON.stringify(result)}`,
    );
  }

  if (
    typeof result !== "object" ||
    result === null ||
    !("success" in result) ||
    result.success !== true ||
    !("data" in result) ||
    typeof result.data !== "object" ||
    result.data === null ||
    !("challenge_token" in result.data) ||
    typeof result.data.challenge_token !== "string"
  ) {
    throw new Error("Invalid Send OTP API response");
  }

  return result as SendAdmissionOtpResponse;
}

export async function resendAdmissionOtp(
  challengeToken: string,
): Promise<ResendAdmissionOtpResponse> {
  const response = await fetch("/api/admission/otp/resend", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      challenge_token: challengeToken,
    }),
  });

  const result: unknown = await response.json();

  if (!response.ok) {
    const body =
      typeof result === "object" && result !== null
        ? result as Record<string, unknown>
        : {};

    const error =
      typeof body.error === "object" && body.error !== null
        ? body.error as Record<string, unknown>
        : {};

    const message =
      typeof error.message === "string"
        ? error.message
        : typeof body.message === "string"
          ? body.message
          : `Resend OTP failed (${response.status}).`;

    throw new Error(message);
  }

  const body = result as Partial<ResendAdmissionOtpResponse>;

  if (body.success !== true) {
    throw new Error(body.message || "Unable to resend OTP.");
  }

  return body as ResendAdmissionOtpResponse;
}


export async function verifyAdmissionOtp(
  payload: VerifyAdmissionOtpPayload,
): Promise<VerifyAdmissionOtpResponse> {
  const response = await fetch("/api/admission/otp/verify", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result: unknown = await response.json();

  if (typeof result !== "object" || result === null) {
    throw new Error("Invalid Verify OTP API response.");
  }

  const body = result as Record<string, unknown>;

  if (!response.ok || body.success !== true) {
    const error =
      typeof body.error === "object" && body.error !== null
        ? body.error as Record<string, unknown>
        : {};

    const message =
      typeof error.message === "string"
        ? error.message
        : typeof body.message === "string"
          ? body.message
          : `Verify OTP failed (${response.status}).`;

    throw new Error(message);
  }

  if (typeof body.message !== "string" || !("data" in body)) {
    throw new Error("Verify OTP response is missing required fields.");
  }

  return body as unknown as VerifyAdmissionOtpResponse;
}

export async function completeAdmissionRequest(
  payload: CompleteAdmissionPayload,
): Promise<CompleteAdmissionResponse> {
  const response = await fetch("/api/admission/complete", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result: unknown = await response.json();

  if (typeof result !== "object" || result === null) {
    throw new Error("Invalid Complete Admission API response.");
  }

  const body = result as Record<string, unknown>;

  if (!response.ok || body.success !== true) {
    const error =
      typeof body.error === "object" && body.error !== null
        ? body.error as Record<string, unknown>
        : {};

    const message =
      typeof error.message === "string"
        ? error.message
        : typeof body.message === "string"
          ? body.message
          : `Complete Admission API failed (${response.status}).`;

    throw new Error(message);
  }

  if (!("data" in body)) {
    throw new Error("Complete Admission API response is missing data.");
  }

  return body as unknown as CompleteAdmissionResponse;
}

export async function downloadAuthorizedDocument(
  singleUseToken: string,
  filename?: string | null,
): Promise<void> {
  if (!singleUseToken.trim()) {
    throw new Error("Download token is missing.");
  }

  const response = await fetch(
    `/api/admission/downloads/${encodeURIComponent(singleUseToken)}`,
    {
      method: "GET",
      headers: {
        Accept: "application/pdf",
      },
    },
  );

  if (!response.ok) {
    const message =
      response.status === 429
        ? "Download rate limit reached. Please try again later."
        : `Document download failed (${response.status}).`;

    throw new Error(message);
  }

  const blob = await response.blob();

  if (blob.size === 0) {
    throw new Error("The downloaded document is empty.");
  }

  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = objectUrl;
  link.download = filename || "admission-document.pdf";
  document.body.appendChild(link);
  link.click();
  link.remove();

  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
}
