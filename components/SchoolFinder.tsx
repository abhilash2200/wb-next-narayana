"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getSchoolFinderCities,
  getSchoolFinderBranches,
  getSchoolFinderClasses,
} from "../app/services/schoolFinderService";
import type {
  SchoolFinderCity,
  SchoolFinderBranch,
  SchoolFinderClass,
} from "../app/services/schoolFinderService";

import {
  ADMISSION_DATA,
  slugify,
  getReservationTypesForBranch,
} from "@/lib/admissionData";
import { useModal } from "@/context/ModalContext";
import { useToast } from "@/context/ToastContext";

export default function SchoolFinder() {
  const router = useRouter();
  const { openModal } = useModal();
  const { showToast } = useToast();

  // Visible selection states
  const [cities, setCities] = useState<SchoolFinderCity[]>([]);
  const [citiesLoading, setCitiesLoading] = useState(true);
  const [citiesError, setCitiesError] = useState("");

  const [branches, setBranches] = useState<SchoolFinderBranch[]>([]);
  const [branchesLoading, setBranchesLoading] = useState(false);
  const [branchesError, setBranchesError] = useState("");

  const [classes, setClasses] = useState<SchoolFinderClass[]>([]);
  const [classesLoading, setClassesLoading] = useState(false);
  const [classesError, setClassesError] = useState("");

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Hidden middle values (chain: city -> branches -> boards -> reservation_types -> class)
  const selectedBoard = "CBSE";

  const reservationTypes = useMemo(() => {
    if (!selectedCity || !selectedBranch) return [];
    return getReservationTypesForBranch(selectedCity, selectedBranch);
  }, [selectedCity, selectedBranch]);

  const selectedReservationType = useMemo(() => {
    if (!selectedCity || !selectedBranch || reservationTypes.length === 0) return "";
    return reservationTypes[0]; // defaults to primary type (e.g. "Day Scholar")
  }, [selectedCity, selectedBranch, reservationTypes]);

  const citiesList = useMemo(
    () =>
      cities.map((city) => ({
        value: city.slug,
        label: city.name,
      })),
    [cities]
  );

  const branchesList = useMemo(
    () =>
      branches.map((branch) => ({
        value: branch.slug,
        label: branch.name,
      })),
    [branches]
  );

  const classesList = useMemo(
    () =>
      classes.map((item) => ({
        value: String(item.id),
        label: item.name,
      })),
    [classes]
  );

  // Form is complete only when City, Branch, and Class are ALL selected
  const isFormComplete = Boolean(
    selectedCity && selectedBranch && selectedClass
  );

  const handleCityChange = (citySlug: string) => {
    setSelectedCity(citySlug);
    setSelectedBranch("");
    setSelectedClass("");
    setBranches([]);
    setBranchesError("");

    const city = cities.find((item) => item.slug === citySlug);
    if (city) {
      void loadBranches(city.id, citySlug);
    }
  };

  async function loadBranches(cityId: string | number, citySlug?: string) {
    try {
      setBranchesLoading(true);
      setBranchesError("");

      const result = await getSchoolFinderBranches(cityId);
      if (result && result.length > 0) {
        setBranches(result);
        return;
      }
    } catch {
      // Graceful fallback to ADMISSION_DATA if API fails
      const activeCitySlug = citySlug || selectedCity;
      const matchedCity = ADMISSION_DATA.find(
        (c) => slugify(c.value) === activeCitySlug
      );
      if (matchedCity) {
        const fallbackBranches: SchoolFinderBranch[] = matchedCity.branches.map(
          (b, idx) => ({
            id: String(idx + 1),
            city_id: cityId,
            name: b.label || b.value,
            slug: slugify(b.value),
            sort_order: idx,
          })
        );
        setBranches(fallbackBranches);
        return;
      }
      setBranchesError("Unable to load branches.");
    } finally {
      setBranchesLoading(false);
    }
  }

  const handleBranchChange = (branchSlug: string) => {
    setSelectedBranch(branchSlug);
    setSelectedClass("");
    setClasses([]);
    setClassesError("");

    const branch = branches.find((item) => item.slug === branchSlug);
    if (branch) {
      void loadClasses(branch.id, branchSlug);
    }
  };

  async function loadClasses(branchId: string | number, branchSlug?: string) {
    try {
      setClassesLoading(true);
      setClassesError("");

      const result = await getSchoolFinderClasses(branchId);
      if (result && result.length > 0) {
        setClasses(result);
        return;
      }
    } catch {
      // Graceful fallback to ADMISSION_DATA if API fails
      const activeBranchSlug = branchSlug || selectedBranch;
      const matchedCity = ADMISSION_DATA.find(
        (c) => slugify(c.value) === selectedCity
      );
      const matchedBranch = matchedCity?.branches.find(
        (b) => slugify(b.value) === activeBranchSlug
      );

      if (matchedBranch) {
        const allClasses = Array.from(
          new Set(Object.values(matchedBranch.classes).flatMap((cls) => cls))
        );
        const fallbackClasses: SchoolFinderClass[] = allClasses.map(
          (clsName, idx) => ({
            id: String(idx + 1),
            name: clsName,
            slug: slugify(clsName),
            sort_order: idx,
            canonical_path: "",
          })
        );
        setClasses(fallbackClasses);
        return;
      }
      setClassesError("Unable to load classes.");
    } finally {
      setClassesLoading(false);
    }
  }

  const handleClassChange = (cls: string) => {
    setSelectedClass(cls);
  };

  /**
   * Main Find School Handler
   * Verifies if the target page actually exists before routing.
   * If the page is not found: DO NOT REDIRECT ANYWHERE. Show a Toast Notification!
   */
  const handleFindSchool = async () => {
    // 1. Strict restriction: User MUST choose all three (City, Branch, and Class)
    if (!selectedCity || !selectedBranch || !selectedClass) {
      showToast({
        type: "info",
        icon: "fa-list-check text-brandOrange",
        title: "Complete Your Selection",
        message:
          "Please select City, Campus, and Class to find your school.",
        actionText: "Enquire Now",
        onAction: () => openModal("enquiry", "School Finder"),
        duration: 5000,
      });
      return;
    }

    // Extract names and determine candidate target path for the selected class
    const selectedBranchData = branches.find((item) => item.slug === selectedBranch);
    const branchName = selectedBranchData?.name || selectedBranch.replace(/-/g, " ");

    const selectedClassData = classes.find((item) => String(item.id) === selectedClass);
    const className = selectedClassData?.name || "";

    const targetPath =
      selectedClassData?.canonical_path ||
      (selectedClassData?.slug
        ? `/${selectedCity}/${selectedBranch}/${selectedClassData.slug}`
        : "");

    // If target path couldn't be resolved: Branch info coming soon, do not redirect
    if (!targetPath) {
      showToast({
        type: "warning",
        icon: "fa-school text-brandOrange",
        title: `${branchName} Campus`,
        message: `Online admissions details for ${className || "this class"} at Narayana School, ${branchName} are opening soon. Connect directly with our admissions team to reserve a seat.`,
        actionText: `Enquire for ${branchName}`,
        onAction: () =>
          openModal(
            "enquiry",
            branchName
              ? `Narayana School, ${branchName}`
              : "Admissions Enquiry"
          ),
        duration: 6000,
      });
      return;
    }

    // 3. Verify page existence with /api/page-check before any navigation
    try {
      setIsSearching(true);

      const checkUrl = `/api/page-check?path=${encodeURIComponent(
        targetPath
      )}&branch=${encodeURIComponent(selectedBranch)}&city=${encodeURIComponent(
        selectedCity
      )}&class=${encodeURIComponent(selectedClass)}`;

      const res = await fetch(checkUrl, {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`Page check returned ${res.status}`);
      }

      const result: { exists: boolean; targetPath?: string; message?: string } =
        await res.json();

      if (result.exists) {
        // Page exists! Redirect to destination
        router.push(result.targetPath || targetPath);
      } else {
        // PAGE NOT FOUND IN CMS! DO NOT REDIRECT ANYWHERE!
        const toastTitle = `${branchName} Campus`;
        const toastMsg = `Online details for ${className || "this class"} at Narayana School, ${branchName} are opening soon. You can connect directly with our admissions team for seat availability and fee details.`;
        const actionBtnText = `Enquire for ${branchName}`;

        showToast({
          type: "warning",
          icon: "fa-school text-brandOrange",
          title: toastTitle,
          message: toastMsg,
          actionText: actionBtnText,
          onAction: () =>
            openModal(
              "enquiry",
              branchName
                ? `Narayana School, ${branchName}`
                : "Admissions Enquiry"
            ),
          duration: 6000,
        });
      }
    } catch (error) {
      console.error("SchoolFinder page check error:", error);
      // On error, DO NOT REDIRECT! Show friendly campus toast
      showToast({
        type: "warning",
        icon: "fa-school text-brandOrange",
        title: branchName ? `Narayana School, ${branchName}` : "Campus Admissions",
        message: branchName
          ? `Admissions for Narayana School, ${branchName} are open for AY 2027-28. Connect directly with our campus admissions counselors.`
          : "Campus admissions are open for AY 2027-28. Please connect with our admissions team.",
        actionText: branchName ? `Enquire for ${branchName}` : "Admissions Enquiry",
        onAction: () =>
          openModal(
            "enquiry",
            branchName
              ? `Narayana School, ${branchName}`
              : "Admissions Enquiry"
          ),
        duration: 6000,
      });
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    async function loadCities() {
      try {
        setCitiesLoading(true);
        setCitiesError("");

        const result = await getSchoolFinderCities();
        if (isMounted && result && result.length > 0) {
          setCities(result);
          return;
        }
      } catch {
        // Graceful fallback to ADMISSION_DATA
        if (isMounted) {
          const fallbackCities: SchoolFinderCity[] = ADMISSION_DATA.map(
            (c, idx) => ({
              id: String(idx + 1),
              name: c.label || c.value,
              slug: slugify(c.value),
              sort_order: idx,
            })
          );
          setCities(fallbackCities);
          return;
        }
      } finally {
        if (isMounted) {
          setCitiesLoading(false);
        }
      }
    }

    void loadCities();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      id="school-finder"
      className="relative bg-gradient-to-r from-[#002f56] via-[#004f8c] to-[#002f56] py-5 sm:py-6 border-b border-[#003865] shadow-md text-white scroll-mt-20"
    >
      <div className="container mx-auto px-4">
        {/* Automatic hidden middle fields passed only when city & branch are selected */}
        {selectedCity && selectedBranch && (
          <>
            <input type="hidden" name="board" value={selectedBoard} />
            <input
              type="hidden"
              name="reservation_type"
              value={selectedReservationType}
            />
          </>
        )}

        {/* Section Header / Tag */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-3.5 sm:mb-4 text-center">
          <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-brandYellow uppercase border border-white/15">
            <i className="fas fa-map-marker-alt text-brandOrange" />
            <span>School Finder</span>
          </div>
          <p className="text-blue-100 text-xs sm:text-sm font-medium hidden sm:inline-block">
            Find the nearest Narayana School campus in West Bengal
          </p>
        </div>

        {/* Form Controls */}
        <div className="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-row lg:items-center lg:justify-center gap-2.5 sm:gap-3 max-w-4xl mx-auto">
          {/* 1. City Select */}
          <div className="relative w-full lg:w-56">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brandBlue">
              <i className="fas fa-city text-xs" />
            </div>
            <select
              value={selectedCity}
              onChange={(e) => handleCityChange(e.target.value)}
              disabled={citiesLoading || Boolean(citiesError)}
              className={`w-full h-11 sm:h-12 bg-white ${
                selectedCity ? "text-gray-900 font-medium" : "text-gray-400"
              } text-[13.5px] sm:text-[14px] pl-9 pr-8 rounded-lg border border-gray-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brandOrange`}
            >
              <option value="">
                {citiesLoading
                  ? "Loading cities..."
                  : citiesError
                  ? "Cities unavailable"
                  : "- Select City -"}
              </option>

              {citiesList.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.label}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Branch Select */}
          <div className="relative w-full lg:w-64">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brandBlue">
              <i className="fas fa-school text-xs" />
            </div>
            <select
              value={selectedBranch}
              onChange={(e) => handleBranchChange(e.target.value)}
              disabled={!selectedCity || branchesLoading || Boolean(branchesError)}
              className={`w-full h-11 sm:h-12 bg-white ${
                selectedBranch ? "text-gray-900 font-medium" : "text-gray-400"
              } text-[13.5px] sm:text-[14px] pl-9 pr-8 rounded-lg border border-gray-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brandOrange`}
            >
              <option value="">
                {branchesLoading
                  ? "Loading branches..."
                  : branchesError
                  ? "Branches unavailable"
                  : "- Select Branch -"}
              </option>

              {branchesList.map((branch) => (
                <option key={branch.value} value={branch.value}>
                  {branch.label}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Class Select */}
          <div className="relative w-full lg:w-56">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brandBlue">
              <i className="fas fa-graduation-cap text-xs" />
            </div>

            <select
              value={selectedClass}
              onChange={(e) => handleClassChange(e.target.value)}
              disabled={
                !selectedBranch || classesLoading || Boolean(classesError)
              }
              className={`w-full h-11 sm:h-12 bg-white ${
                selectedClass ? "text-gray-900 font-medium" : "text-gray-400"
              } text-[13.5px] sm:text-[14px] pl-9 pr-8 rounded-lg border border-gray-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brandOrange`}
            >
              <option value="">
                {classesLoading
                  ? "Loading classes..."
                  : classesError
                  ? "Classes unavailable"
                  : "- Select Class -"}
              </option>

              {classesList.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {/* 4. Find School Button - Disabled by default until all 3 are chosen */}
          <button
            type="button"
            onClick={handleFindSchool}
            disabled={!isFormComplete || isSearching}
            title={
              !isFormComplete
                ? "Please choose City, Campus, and Class to enable"
                : "Find School"
            }
            className={`sm:col-span-2 lg:col-span-1 w-full lg:w-auto h-11 sm:h-12 px-7 font-bold text-[13px] sm:text-[13.5px] tracking-wider uppercase rounded-lg transition-all inline-flex items-center justify-center gap-2 whitespace-nowrap ${
              !isFormComplete
                ? "bg-white/15 text-white/40 cursor-not-allowed border border-white/10 shadow-none"
                : isSearching
                ? "bg-brandOrange text-white cursor-wait opacity-80 shadow-md"
                : "bg-brandOrange hover:bg-orange-600 text-white shadow-md hover:shadow-orange-500/30 active:scale-95 cursor-pointer"
            }`}
          >
            {isSearching ? (
              <>
                <i className="fas fa-spinner fa-spin text-xs" />
                <span>SEARCHING...</span>
              </>
            ) : (
              <>
                <i className="fas fa-search text-xs" />
                <span>FIND SCHOOL</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
