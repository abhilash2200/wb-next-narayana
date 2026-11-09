
"use client";

import { useState, useMemo, useEffect } from "react";
import {
  ADMISSION_DATA,
  getBranchesForCity,
  getReservationTypesForBranch,
  getClassesForSelection,
  type BranchInfo,
  slugify,
} from "@/lib/admissionData";

import {
  getAdmissionCities,
  getAdmissionBranches,
  getAdmissionBoards,
  getAdmissionReservationTypes,
  getAdmissionClasses,
  type AdmissionBoard,
  type AdmissionReservationType,
  type AdmissionClass,
} from "@/app/services/admissionOptionsService";

export interface AdmissionInitialValues {
  city?: string;
  branch?: string;
  studentClass?: string;
}

export interface UseAdmissionDropdownsReturn {
  city: string;
  branch: string;
  board: string;
  cityId: string;
  branchId: string;
  classId: string;
  reservationType: string;
  studentClass: string;
  cityList: { value: string; label: string }[];
  branchList: BranchInfo[];
  boardList: AdmissionBoard[];
  reservationTypeList: AdmissionReservationType[];
  classList: string[];
  setCity: (city: string) => void;
  setBranch: (branch: string) => void;
  setBoard: (board: string) => void;
  setReservationType: (type: string) => void;
  setStudentClass: (cls: string) => void;
  handleCityChange: (city: string) => void;
  handleBranchChange: (branch: string) => void;
  handleBoardChange: (board: string) => void;
  handleReservationChange: (type: string) => void;
  handleClassChange: (cls: string) => void;
  resetDropdowns: () => void;
  
}

export function useAdmissionDropdowns(
  initialValues?: AdmissionInitialValues,
): UseAdmissionDropdownsReturn {
  const initialCity = initialValues?.city;
  const initialBranch = initialValues?.branch;
  const initialStudentClass = initialValues?.studentClass;

  const canonicalCity = useMemo(() => {
    if (!initialCity) return "";

    const found = ADMISSION_DATA.find(
      (item) =>
        item.value.toLowerCase() === initialCity.toLowerCase() ||
        item.label.toLowerCase() === initialCity.toLowerCase(),
    );

    return found?.value ?? initialCity;
  }, [initialCity]);

  const canonicalBranch = useMemo(() => {
    if (!initialBranch || !canonicalCity) return "";

    const branches = getBranchesForCity(canonicalCity);

    const found = branches.find(
      (item) =>
        item.value.toLowerCase() === initialBranch.toLowerCase() ||
        item.label.toLowerCase() === initialBranch.toLowerCase() ||
        slugify(item.value) === slugify(initialBranch) ||
        slugify(item.label) === slugify(initialBranch) ||
        item.value.toLowerCase().replace(/[-_\s]/g, "") === initialBranch.toLowerCase().replace(/[-_\s]/g, "")
    );

    return found?.value ?? initialBranch;
  }, [canonicalCity, initialBranch]);

  const initialReservationType = useMemo(() => {
    if (!canonicalCity || !canonicalBranch) return "";

    const types = getReservationTypesForBranch(
      canonicalCity,
      canonicalBranch,
    );

    return types.length > 0 ? types[0] : "Day Scholar";
  }, [canonicalCity, canonicalBranch]);

  const canonicalClass = useMemo(() => {
    if (
      !initialStudentClass ||
      !canonicalCity ||
      !canonicalBranch
    ) {
      return "";
    }

    const available = getClassesForSelection(
      canonicalCity,
      canonicalBranch,
      initialReservationType || "Day Scholar",
    );

    return (
      available.find(
        (item) =>
          item.toLowerCase() === initialStudentClass.toLowerCase() ||
          slugify(item) === slugify(initialStudentClass),
      ) ?? initialStudentClass
    );
  }, [
    canonicalCity,
    canonicalBranch,
    initialReservationType,
    initialStudentClass,
  ]);

  const [city, setCity] = useState(canonicalCity);
  const [branch, setBranch] = useState(canonicalBranch);
  const [board, setBoard] = useState("");
  const [reservationType, setReservationType] = useState(
    initialReservationType,
  );
  const [classOptions, setClassOptions] = useState<AdmissionClass[]>([]);
  const [studentClass, setStudentClass] = useState(canonicalClass);

  const [cityList, setCityList] = useState<
    { value: string; label: string }[]
  >(() =>
    ADMISSION_DATA.map((item) => ({
      value: item.value,
      label: item.label,
    })),
  );

  const [cityIdMap, setCityIdMap] = useState<Record<string, string>>({});
  const [branchIdMap, setBranchIdMap] = useState<Record<string, string>>({});
  const [branchList, setBranchList] = useState<BranchInfo[]>(() =>
    canonicalCity ? getBranchesForCity(canonicalCity) : [],
  );
  const [boardList, setBoardList] = useState<AdmissionBoard[]>([]);

  const [reservationTypeList, setReservationTypeList] = useState<
    AdmissionReservationType[]
  >([]);

  const [prevCanonicalCity, setPrevCanonicalCity] = useState(canonicalCity);
  if (prevCanonicalCity !== canonicalCity) {
    setPrevCanonicalCity(canonicalCity);
    setCity(canonicalCity);
    setBranchList(canonicalCity ? getBranchesForCity(canonicalCity) : []);
    setBranchIdMap({});
  }

  const [prevCanonicalBranch, setPrevCanonicalBranch] = useState(canonicalBranch);
  if (prevCanonicalBranch !== canonicalBranch) {
    setPrevCanonicalBranch(canonicalBranch);
    setBranch(canonicalBranch);
    setReservationType("");
    setBoardList([]);
    setReservationTypeList([]);
  }

  const [prevCanonicalClass, setPrevCanonicalClass] = useState(canonicalClass);
  if (prevCanonicalClass !== canonicalClass) {
    setPrevCanonicalClass(canonicalClass);
    setStudentClass(canonicalClass);
  }

  // Load cities and map their frontend values to backend IDs.
  useEffect(() => {
    let cancelled = false;

    getAdmissionCities()
      .then((cities) => {
        if (cancelled) return;

        const nextCityIdMap: Record<string, string> = {};

        const options = cities.map((apiCity) => {
          const existingCity = ADMISSION_DATA.find(
            (localCity) =>
              slugify(localCity.label) === slugify(apiCity.name) ||
              slugify(localCity.value) === slugify(apiCity.slug),
          );

          const value = existingCity?.value ?? apiCity.id;
          nextCityIdMap[value] = apiCity.id;
          nextCityIdMap[apiCity.slug] = apiCity.id;
          nextCityIdMap[slugify(apiCity.name)] = apiCity.id;
          nextCityIdMap[apiCity.id] = apiCity.id;

          return {
            value,
            label: apiCity.name,
          };
        });

        setCityIdMap(nextCityIdMap);
        if (options.length > 0) {
          setCityList(options);
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          console.error("Unable to load admission cities:", error);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Load branches whenever the selected city changes.
  useEffect(() => {
    const cityId = cityIdMap[city];

    if (!city || !cityId) {
      return;
    }

    let cancelled = false;

    getAdmissionBranches(cityId)
      .then((apiBranches) => {
        if (cancelled) return;

        const localBranches = getBranchesForCity(city);
        const nextBranchIdMap: Record<string, string> = {};

        const options: BranchInfo[] = apiBranches.map((apiBranch) => {
          const localBranch = localBranches.find(
            (item) =>
              slugify(item.label) === slugify(apiBranch.name) ||
              slugify(item.value) === slugify(apiBranch.slug),
          );

          const value = localBranch?.value ?? slugify(apiBranch.slug);
          nextBranchIdMap[value] = apiBranch.id;
          nextBranchIdMap[apiBranch.slug] = apiBranch.id;
          nextBranchIdMap[slugify(apiBranch.name)] = apiBranch.id;
          nextBranchIdMap[apiBranch.id] = apiBranch.id;

          return {
            value,
            label: apiBranch.name,
            reservationTypes: localBranch?.reservationTypes ?? [],
            classes: localBranch?.classes ?? {},
          };
        });

        setBranchIdMap(nextBranchIdMap);
        if (options.length > 0) {
          setBranchList(options);
        }
      })
      .catch((error: unknown) => {
        if (cancelled) return;

        console.error("Unable to load admission branches:", error);
      });

    return () => {
      cancelled = true;
    };
  }, [city, cityIdMap]);

  // Load boards using the actual backend branch ID.
  useEffect(() => {
    const branchId = branchIdMap[branch];

    if (!branch || !branchId) {
      return;
    }

    let cancelled = false;

    getAdmissionBoards(branchId)
      .then((boards) => {
        if (cancelled) return;

        setBoardList(boards);

        // Preserve the existing/default board if the API provides it.
        setBoard((currentBoard) => {
          const matchedBoard = boards.find(
            (item) =>
              item.code.toLowerCase() === currentBoard.toLowerCase() ||
              item.name.toLowerCase() === currentBoard.toLowerCase(),
          );

          return matchedBoard?.code ?? "";
        });
      })
      .catch((error: unknown) => {
        if (cancelled) return;

        console.error("Unable to load admission boards:", error);
        setBoardList([]);
        setBoard("");
      });

    return () => {
      cancelled = true;
    };
  }, [branch, branchIdMap]);

  useEffect(() => {
    const branchId = branchIdMap[branch];

    if (!branchId || !board) {
      return;
    }

    let cancelled = false;

    getAdmissionReservationTypes(branchId, board)
      .then((types) => {
        if (cancelled) return;

        setReservationTypeList(types);
      })
      .catch((error: unknown) => {
        if (cancelled) return;

        console.error(
          "Unable to load admission reservation types:",
          error,
        );

        setReservationTypeList([]);
      });

    return () => {
      cancelled = true;
    };
  }, [branch, board, branchIdMap]);

  useEffect(() => {
    const branchId = branchIdMap[branch];

    if (!branchId || !board || !reservationType) {
      return;
    }

    let cancelled = false;

    getAdmissionClasses(branchId, board, reservationType)
      .then((classes) => {
        if (cancelled) return;
        setClassOptions(classes);
      })
      .catch((error: unknown) => {
        if (cancelled) return;

        console.error("Unable to load admission classes:", error);
        setClassOptions([]);
      });

    return () => {
      cancelled = true;
    };
  }, [branch, branchIdMap, board, reservationType]);
  

  const classList = useMemo(
  () => classOptions.map((item) => item.name),
  [classOptions],
);

const cityId = cityIdMap[city] ?? "";
const branchId = branchIdMap[branch] ?? "";

const classId =
  classOptions.find((item) => item.name === studentClass)?.id ?? "";

  const handleCityChange = (newCity: string) => {
    setCity(newCity);
    setBranch("");
    setBoard("");
    setBoardList([]);
    setReservationType("");
    setReservationTypeList([]);
    setStudentClass("");
    setClassOptions([]);
    setBranchList(newCity ? getBranchesForCity(newCity) : []);
    setBranchIdMap({});
  };

  const handleBranchChange = (newBranch: string) => {
    setBranch(newBranch);
    setBoard("");
    setBoardList([]);
    setReservationType("");
    setReservationTypeList([]);
    setStudentClass("");
    setClassOptions([]);
  };

  const handleBoardChange = (newBoard: string) => {
    setBoard(newBoard);
    setReservationType("");
    setReservationTypeList([]);
    setStudentClass("");
    setClassOptions([]);
  };

  const handleReservationChange = (newType: string) => {
    setReservationType(newType);
    setStudentClass("");
    setClassOptions([]);
  };

  const handleClassChange = (newClass: string) => {
    setStudentClass(newClass);
  };

  const resetDropdowns = () => {
    setCity("");
    setBranch("");
    setBoard("");
    setReservationType("");
    setStudentClass("");
    setBranchList([]);
    setBranchIdMap({});
    setBoardList([]);
    setReservationTypeList([]);
    setClassOptions([]);
  };

  return {
    city,
    branch,
    board,
    cityId,
    branchId,
    classId,
    reservationType,
    studentClass,
    cityList,
    branchList,
    boardList,
    reservationTypeList,
    classList,
    setCity,
    setBranch,
    setBoard,
    setReservationType,
    setStudentClass,
    handleCityChange,
    handleBranchChange,
    handleBoardChange,
    handleReservationChange,
    handleClassChange,
    resetDropdowns,
  };
}
