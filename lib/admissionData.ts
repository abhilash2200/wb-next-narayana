/**
 * Narayana Schools West Bengal - Location, Branch, Reservation & Class Data
 * Derived from production form-v7.js
 */

export interface BranchInfo {
  value: string;
  label: string;
  reservationTypes: string[];
  classes: Record<string, string[]>;
}

export interface CityInfo {
  value: string;
  label: string;
  branches: BranchInfo[];
}

// Reusable class lists
const DS_UP_TO_VII = [
  "E-KIDZ-N (Nursery)",
  "E-KIDZ-PP1 (L.K.G)",
  "E-KIDZ-PP2 (U.K.G)",
  "E-CHAMPS-1",
  "E-CHAMPS-2",
  "E-CHAMPS-3",
  "E-CHAMPS-4",
  "E-CHAMPS-5",
  "VI",
  "VII",
];

const DS_UP_TO_VIII = [...DS_UP_TO_VII, "VIII"];
const DS_UP_TO_IX = [...DS_UP_TO_VIII, "IX"];
const DS_UP_TO_XI = [...DS_UP_TO_IX, "XI"];
const DS_UP_TO_XII = [...DS_UP_TO_IX, "XI", "XII"];
const DS_HOWRAH = [...DS_UP_TO_IX, "X", "XI", "XII"];

// Park Circus starts at PP2
const DS_PARK_CIRCUS = [
  "E-KIDZ-PP2 (U.K.G)",
  "E-CHAMPS-1",
  "E-CHAMPS-2",
  "E-CHAMPS-3",
  "E-CHAMPS-4",
  "E-CHAMPS-5",
  "VI",
  "VII",
  "VIII",
  "IX",
  "XI",
];

// Standard Hostel classes (Class 3 to 12)
const HOSTEL_STANDARD = [
  "E-CHAMPS-3",
  "E-CHAMPS-4",
  "E-CHAMPS-5",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
  "XI",
  "XII",
];

// Andal Hostel (no Class X in legacy record)
const HOSTEL_ANDAL = [
  "E-CHAMPS-3",
  "E-CHAMPS-4",
  "E-CHAMPS-5",
  "VI",
  "VII",
  "VIII",
  "IX",
  "XI",
  "XII",
];

export const ADMISSION_DATA: CityInfo[] = [
  {
    value: "BARDHAMAN",
    label: "Bardhaman",
    branches: [
      {
        value: "Andal",
        label: "Andal",
        reservationTypes: ["Day Scholar", "Hostel"],
        classes: {
          "Day Scholar": DS_UP_TO_XII,
          Hostel: HOSTEL_ANDAL,
        },
      },
      {
        value: "Asansol",
        label: "Asansol",
        reservationTypes: ["Day Scholar"],
        classes: { "Day Scholar": DS_UP_TO_XI },
      },
      {
        value: "BARDHAMAN",
        label: "Bardhaman",
        reservationTypes: ["Day Scholar"],
        classes: { "Day Scholar": DS_UP_TO_XI },
      },
      {
        value: "Durgapur",
        label: "Durgapur",
        reservationTypes: ["Day Scholar"],
        classes: { "Day Scholar": DS_UP_TO_XI },
      },
    ],
  },
  {
    value: "Contai",
    label: "Contai",
    branches: [
      {
        value: "Contai",
        label: "Contai",
        reservationTypes: ["Day Scholar"],
        classes: { "Day Scholar": DS_UP_TO_XII },
      },
    ],
  },
  {
    value: "Coochbehar",
    label: "Cooch Behar",
    branches: [
      {
        value: "Coochbehar",
        label: "Coochbehar",
        reservationTypes: ["Day Scholar"],
        classes: { "Day Scholar": DS_UP_TO_VII },
      },
    ],
  },
  {
    value: "DARJEELING",
    label: "Darjeeling",
    branches: [
      {
        value: "Dagapur",
        label: "Siliguri - Dagapur",
        reservationTypes: ["Day Scholar"],
        classes: { "Day Scholar": DS_UP_TO_VII },
      },
      {
        value: "Siliguri",
        label: "Siliguri - Salugara",
        reservationTypes: ["Day Scholar", "Hostel (Only Girls)"],
        classes: {
          "Day Scholar": DS_UP_TO_XII,
          "Hostel (Only Girls)": HOSTEL_STANDARD,
        },
      },
      {
        value: "Darjeeling",
        label: "Darjeeling",
        reservationTypes: ["Day Scholar"],
        classes: { "Day Scholar": DS_UP_TO_XI },
      },
      {
        value: "Fulbari",
        label: "Fulbari",
        reservationTypes: ["Day Scholar", "Hostel (Only Boys)"],
        classes: {
          "Day Scholar": DS_UP_TO_XI,
          "Hostel (Only Boys)": HOSTEL_STANDARD,
        },
      },
    ],
  },
  {
    value: "EAST MIDNAPORE",
    label: "East Midnapore",
    branches: [
      {
        value: "Midnapore",
        label: "Midnapore",
        reservationTypes: ["Day Scholar"],
        classes: { "Day Scholar": DS_UP_TO_VII },
      },
      {
        value: "Haldia",
        label: "Haldia",
        reservationTypes: ["Day Scholar"],
        classes: { "Day Scholar": DS_UP_TO_XI },
      },
    ],
  },
  {
    value: "HOOGHLY",
    label: "Hooghly",
    branches: [
      {
        value: "Bally",
        label: "Bally",
        reservationTypes: ["Day Scholar"],
        classes: { "Day Scholar": DS_UP_TO_XI },
      },
      {
        value: "Rishra",
        label: "Rishra",
        reservationTypes: ["Day Scholar"],
        classes: { "Day Scholar": DS_UP_TO_XI },
      },
    ],
  },
  {
    value: "Howrah",
    label: "Howrah",
    branches: [
      {
        value: "Howrah",
        label: "Howrah",
        reservationTypes: ["Day Scholar", "Hostel"],
        classes: {
          "Day Scholar": DS_HOWRAH,
          Hostel: HOSTEL_STANDARD,
        },
      },
      {
        value: "Andul",
        label: "Andul",
        reservationTypes: ["Day Scholar"],
        classes: { "Day Scholar": DS_UP_TO_XI },
      },
      {
        value: "Credmont International School",
        label: "Credmont International School",
        reservationTypes: ["Day Scholar"],
        classes: { "Day Scholar": DS_UP_TO_VIII },
      },
      {
        value: "Ulluberia",
        label: "Ulluberia",
        reservationTypes: ["Day Scholar"],
        classes: { "Day Scholar": DS_UP_TO_XI },
      },
    ],
  },
  {
    value: "KALIMPONG",
    label: "Kalimpong",
    branches: [
      {
        value: "Kalimpong",
        label: "Kalimpong",
        reservationTypes: ["Day Scholar", "Hostel (Only Boys)"],
        classes: {
          "Day Scholar": DS_UP_TO_XI,
          "Hostel (Only Boys)": HOSTEL_STANDARD,
        },
      },
      {
        value: "Kalimpong 12th mile",
        label: "Kalimpong 12th mile",
        reservationTypes: ["Day Scholar"],
        classes: { "Day Scholar": DS_UP_TO_XII },
      },
    ],
  },
  {
    value: "Kolkata",
    label: "Kolkata",
    branches: [
      {
        value: "saltlake",
        label: "Salt Lake",
        reservationTypes: ["Day Scholar"],
        classes: { "Day Scholar": DS_UP_TO_XII },
      },
      {
        value: "Bhawanipur",
        label: "Bhawanipur",
        reservationTypes: ["Day Scholar"],
        classes: { "Day Scholar": DS_UP_TO_VIII },
      },
      {
        value: "Joka",
        label: "Joka",
        reservationTypes: ["Day Scholar", "Hostel"],
        classes: {
          "Day Scholar": DS_UP_TO_XI,
          Hostel: HOSTEL_STANDARD,
        },
      },
      {
        value: "Khidderpore",
        label: "Khidderpore",
        reservationTypes: ["Day Scholar"],
        classes: { "Day Scholar": DS_UP_TO_IX },
      },
      {
        value: "Maheshtala",
        label: "Maheshtala",
        reservationTypes: ["Day Scholar"],
        classes: { "Day Scholar": DS_UP_TO_XI },
      },
      {
        value: "New Town",
        label: "New Town",
        reservationTypes: ["Day Scholar", "Hostel"],
        classes: {
          "Day Scholar": DS_UP_TO_XI,
          Hostel: HOSTEL_STANDARD,
        },
      },
      {
        value: "Esplanade (New Market)",
        label: "Esplanade (New Market)",
        reservationTypes: ["Day Scholar"],
        classes: { "Day Scholar": DS_UP_TO_XII },
      },
      {
        value: "Sonarpur (Ramchandrapur)",
        label: "Sonarpur (Ramchandrapur)",
        reservationTypes: ["Day Scholar", "Hostel (Only Boys)"],
        classes: {
          "Day Scholar": DS_UP_TO_XI,
          "Hostel (Only Boys)": HOSTEL_STANDARD,
        },
      },
      {
        value: "Behala (Silpara)",
        label: "Behala (Silpara)",
        reservationTypes: ["Day Scholar"],
        classes: { "Day Scholar": DS_UP_TO_XI },
      },
      {
        value: "Sonarpur",
        label: "Sonarpur",
        reservationTypes: ["Day Scholar", "Hostel"],
        classes: {
          "Day Scholar": DS_UP_TO_XI,
          Hostel: HOSTEL_STANDARD,
        },
      },
      {
        value: "Park Circus",
        label: "Park Circus",
        reservationTypes: ["Day Scholar"],
        classes: { "Day Scholar": DS_PARK_CIRCUS },
      },
    ],
  },
  {
    value: "Murshidabad",
    label: "Murshidabad",
    branches: [
      {
        value: "Murshidabad-berhampore",
        label: "Murshidabad-berhampore",
        reservationTypes: ["Day Scholar"],
        classes: { "Day Scholar": DS_UP_TO_VII },
      },
      {
        value: "Jiaganj",
        label: "Jiaganj",
        reservationTypes: ["Day Scholar"],
        classes: { "Day Scholar": DS_UP_TO_VII },
      },
    ],
  },
  {
    value: "Nadia",
    label: "Nadia",
    branches: [
      {
        value: "Nadia-ranaghat",
        label: "Nadia-ranaghat",
        reservationTypes: ["Day Scholar"],
        classes: { "Day Scholar": DS_UP_TO_XI },
      },
      {
        value: "Kalyani-town",
        label: "Kalyani-town",
        reservationTypes: ["Day Scholar", "Hostel (Only Girls)"],
        classes: {
          "Day Scholar": DS_UP_TO_XI,
          "Hostel (Only Girls)": HOSTEL_STANDARD,
        },
      },
      {
        value: "Krishnanagar City",
        label: "Krishnanagar City",
        reservationTypes: ["Day Scholar"],
        classes: { "Day Scholar": DS_UP_TO_XI },
      },
    ],
  },
  {
    value: "NORTH 24 PARGANAS",
    label: "North 24 Parganas",
    branches: [
      {
        value: "Basirhat",
        label: "Basirhat",
        reservationTypes: ["Day Scholar"],
        classes: { "Day Scholar": DS_UP_TO_VIII },
      },
      {
        value: "Barasat",
        label: "Barasat",
        reservationTypes: ["Day Scholar", "Hostel (Only Boys)"],
        classes: {
          "Day Scholar": DS_UP_TO_XI,
          "Hostel (Only Boys)": HOSTEL_STANDARD,
        },
      },
      {
        value: "Kalyani Express (Sodepur)",
        label: "Kalyani Express (Sodepur)",
        reservationTypes: ["Day Scholar"],
        classes: { "Day Scholar": DS_UP_TO_XI },
      },
    ],
  },
  {
    value: "NORTH DINAJPUR",
    label: "North Dinajpur",
    branches: [
      {
        value: "Uttar dinajpur raiganj",
        label: "Uttar dinajpur raiganj",
        reservationTypes: ["Day Scholar"],
        classes: { "Day Scholar": DS_UP_TO_XII },
      },
    ],
  },
  {
    value: "PURULIA",
    label: "Purulia",
    branches: [
      {
        value: "Raghunathpur",
        label: "Raghunathpur",
        reservationTypes: ["Day Scholar"],
        classes: { "Day Scholar": DS_UP_TO_IX },
      },
    ],
  },
];

// Helper Functions
export function getCityList(): { value: string; label: string }[] {
  return ADMISSION_DATA.map((c) => ({ value: c.value, label: c.label }));
}

export function getBranchesForCity(cityValue: string): BranchInfo[] {
  const city = ADMISSION_DATA.find((c) => c.value === cityValue);
  return city ? city.branches : [];
}

export function getReservationTypesForBranch(
  cityValue: string,
  branchValue: string
): string[] {
  const branches = getBranchesForCity(cityValue);
  const branch = branches.find((b) => b.value === branchValue);
  return branch ? branch.reservationTypes : ["Day Scholar"];
}

export function getClassesForSelection(
  cityValue: string,
  branchValue: string,
  reservationType: string
): string[] {
  const branches = getBranchesForCity(cityValue);
  const branch = branches.find((b) => b.value === branchValue);
  if (!branch) return [];

  const classList = branch.classes[reservationType];
  return classList || branch.classes["Day Scholar"] || [];
}

/**
 * Normalizes strings into SEO-friendly URL slugs.
 * E.g.: "Park Circus" -> "park-circus", "E-CHAMPS-1" -> "e-champs-1", "E-KIDZ-PP1 (L.K.G)" -> "e-kidz-pp1-lkg"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function findCityBySlug(slug: string): CityInfo | undefined {
  const norm = slugify(slug);
  return ADMISSION_DATA.find(
    (c) => slugify(c.value) === norm || slugify(c.label) === norm
  );
}

export function findBranchInCity(
  city: CityInfo,
  branchSlug: string
): BranchInfo | undefined {
  const norm = slugify(branchSlug);
  return city.branches.find(
    (b) => slugify(b.value) === norm || slugify(b.label) === norm
  );
}

export function findClassInBranch(
  branch: BranchInfo,
  classSlug: string
): string | undefined {
  const norm = slugify(classSlug);
  for (const classes of Object.values(branch.classes)) {
    for (const cls of classes) {
      if (slugify(cls) === norm) {
        return cls;
      }
    }
  }
  return undefined;
}

export function findBranchGlobally(
  branchSlug: string
): { city: CityInfo; branch: BranchInfo } | undefined {
  const norm = slugify(branchSlug);
  for (const city of ADMISSION_DATA) {
    for (const branch of city.branches) {
      if (
        slugify(branch.value) === norm ||
        slugify(branch.label) === norm ||
        branch.value.toLowerCase() === branchSlug.toLowerCase()
      ) {
        return { city, branch };
      }
    }
  }
  return undefined;
}

export function getAllBranchList(): {
  slug: string;
  city: CityInfo;
  branch: BranchInfo;
}[] {
  const list: { slug: string; city: CityInfo; branch: BranchInfo }[] = [];
  const seen = new Set<string>();

  for (const city of ADMISSION_DATA) {
    for (const branch of city.branches) {
      const slug = slugify(branch.value);
      if (slug && !seen.has(slug)) {
        seen.add(slug);
        list.push({ slug, city, branch });
      }
    }
  }

  return list;
}


