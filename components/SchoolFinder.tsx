"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSchoolFinderCities, getSchoolFinderBranches, getSchoolFinderClasses, } from "../app/services/schoolFinderService";
import type { SchoolFinderCity, SchoolFinderBranch, SchoolFinderClass, } from "../app/services/schoolFinderService";

import { getReservationTypesForBranch } from "@/lib/admissionData";
import { useModal } from "@/context/ModalContext";

export default function SchoolFinder() {
  const router = useRouter();
  const { openModal } = useModal();

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



  // Hidden middle values (chain: city -> branchs -> boards -> reservation_types -> class)
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
  const handleCityChange = (citySlug: string) => {
    setSelectedCity(citySlug);
    setSelectedBranch("");
    setSelectedClass("");
    setBranches([]);
    setBranchesError("");

    const city = cities.find((item) => item.slug === citySlug);

    if (city) {
      void loadBranches(city.id);
    }
  };

  async function loadBranches(cityId: string | number) {
    try {
      setBranchesLoading(true);
      setBranchesError("");

      const result = await getSchoolFinderBranches(cityId);
      setBranches(result);
    } catch (error: unknown) {
      setBranchesError(
        error instanceof Error
          ? error.message
          : "Unable to load branches."
      );
    } finally {
      setBranchesLoading(false);
    }
  }

  const handleBranchChange = (branchSlug: string) => {
    setSelectedBranch(branchSlug);
    setSelectedClass("");
    setClasses([]);
    setClassesError("");

    const branch = branches.find(
      (item) => item.slug === branchSlug
    );

    if (branch) {
      void loadClasses(branch.id);
    }
  };

  async function loadClasses(branchId: string | number) {
    try {
      setClassesLoading(true);
      setClassesError("");

      const result = await getSchoolFinderClasses(branchId);
      setClasses(result);
    } catch (error: unknown) {
      setClassesError(
        error instanceof Error
          ? error.message
          : "Unable to load classes."
      );
    } finally {
      setClassesLoading(false);
    }
  }

  const handleClassChange = (cls: string) => {
    setSelectedClass(cls);
  };


  const handleFindSchool = () => {
    // 1. Class selected: open the exact class landing page
    if (selectedClass) {
      const selectedClassData = classes.find(
        (item) => String(item.id) === selectedClass
      );

      const targetPath =
        selectedClassData?.canonical_path ||
        (selectedCity && selectedBranch && selectedClassData?.slug
          ? `/${selectedCity}/${selectedBranch}/${selectedClassData.slug}`
          : "");

      if (!targetPath) {
        setClassesError("Published school page not found.");
        return;
      }

      router.push(targetPath);
      return;
    }

    // 2. Branch selected without a class: open branch page
    if (selectedBranch) {
      const selectedBranchData = branches.find(
        (item) => item.slug === selectedBranch
      );

      const targetPath =
        selectedBranchData?.canonical_path ||
        (selectedCity && selectedBranchData?.slug
          ? `/${selectedCity}/${selectedBranchData.slug}`
          : "");

      if (!targetPath) {
        setBranchesError("Published branch page not found.");
        return;
      }

      router.push(targetPath);
      return;
    }

    // 3. Only city selected: open city page
    if (selectedCity) {
      const selectedCityData = cities.find(
        (item) => item.slug === selectedCity
      );

      const targetPath =
        selectedCityData?.canonical_path ||
        (selectedCityData?.slug ? `/${selectedCityData.slug}` : "");

      if (!targetPath) {
        setCitiesError("Published city page not found.");
        return;
      }

      router.push(targetPath);
      return;
    }

    // 4. Nothing selected
    openModal("enquiry", "Find School");
  };


  useEffect(() => {
    let isMounted = true;

    async function loadCities() {
      try {
        setCitiesLoading(true);
        setCitiesError("");

        const result = await getSchoolFinderCities();

        if (isMounted) {
          setCities(result);
        }
      } catch (error: unknown) {
        if (isMounted) {
          setCitiesError(
            error instanceof Error
              ? error.message
              : "Unable to load cities."
          );
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
    <section id="school-finder" className="relative bg-linear-to-r from-[#002f56] via-[#004f8c] to-[#002f56] py-5 sm:py-6 border-b border-[#003865] shadow-md text-white scroll-mt-20">
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
              className={`w-full h-11 sm:h-12 bg-white ${selectedCity ? "text-gray-900 font-medium" : "text-gray-400"} text-[13.5px] sm:text-[14px] pl-9 pr-8 rounded-lg border border-gray-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brandOrange`}
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

          {citiesError && (
            <p role="alert" className="mt-1 text-xs text-red-200">
              {citiesError}
            </p>
          )}

          {/* 2. Branch Select */}
          <div className="relative w-full lg:w-64">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brandBlue">
              <i className="fas fa-school text-xs" />
            </div>
            <select
              value={selectedBranch}
              onChange={(e) => handleBranchChange(e.target.value)}
              disabled={!selectedCity || branchesLoading || Boolean(branchesError)}
              className={`w-full h-11 sm:h-12 bg-white ${selectedBranch ? "text-gray-900 font-medium" : "text-gray-400"} text-[13.5px] sm:text-[14px] pl-9 pr-8 rounded-lg border border-gray-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brandOrange`}
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
                !selectedBranch ||
                classesLoading ||
                Boolean(classesError)
              }
              className={`w-full h-11 sm:h-12 bg-white ${selectedClass ? "text-gray-900 font-medium" : "text-gray-400"} text-[13.5px] sm:text-[14px] pl-9 pr-8 rounded-lg border border-gray-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brandOrange`}
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

            {classesError && (
              <p role="alert" className="mt-1 text-xs text-red-200">
                {classesError}
              </p>
            )}

            {/* <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-gray-400">
              <i className="fas fa-chevron-down text-[10px]" />
            </div> */}
          </div>

          {/* 4. Find School Button */}
          <button
            type="button"
            onClick={handleFindSchool}
            className="sm:col-span-2 lg:col-span-1 w-full lg:w-auto h-11 sm:h-12 px-7 bg-brandOrange hover:bg-orange-600 text-white font-bold text-[13px] sm:text-[13.5px] tracking-wider uppercase rounded-lg shadow-md hover:shadow-orange-500/30 active:scale-95 transition-all cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <i className="fas fa-search text-xs" />
            <span>FIND SCHOOL</span>
          </button>
        </div>
      </div>
    </section>
  );
}
