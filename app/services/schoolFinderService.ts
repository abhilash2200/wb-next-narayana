
const API_URL = "/api/school-finder/cities";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface SchoolFinderCity {
  id: string;
  name: string;
  slug: string;
  sort_order: string | number;
  canonical_path?: string;
}

export async function getSchoolFinderCities(): Promise<
  SchoolFinderCity[]
> {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Cities API failed: ${response.status}`);
  }

  const result: ApiResponse<SchoolFinderCity[]> =
    await response.json();

  if (!result.success) {
    throw new Error("Failed to load cities.");
  }

  return result.data;
}

export interface SchoolFinderBranch {
  id: string | number;
  city_id: string | number;
  name: string;
  slug: string;
  sort_order: string | number;
  canonical_path?: string;
}

export async function getSchoolFinderBranches(
  cityId: string | number
): Promise<SchoolFinderBranch[]> {
  const response = await fetch(
    `/api/school-finder/branches?city_id=${encodeURIComponent(String(cityId))}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`Branches API failed: ${response.status}`);
  }

  const result: ApiResponse<SchoolFinderBranch[]> =
    await response.json();

  if (!result.success) {
    throw new Error("Failed to load branches.");
  }

  return result.data;
}

export interface SchoolFinderClass {
  id: string | number;
  name: string;
  slug: string;
  sort_order: string | number;
  canonical_path: string;
}

export async function getSchoolFinderClasses(
  branchId: string | number
): Promise<SchoolFinderClass[]> {
  const response = await fetch(
    `/api/school-finder/classes?branch_id=${encodeURIComponent(String(branchId))}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`Classes API failed: ${response.status}`);
  }

  const result: ApiResponse<SchoolFinderClass[]> =
    await response.json();

  if (!result.success) {
    throw new Error("Failed to load classes.");
  }

  return result.data;
}
