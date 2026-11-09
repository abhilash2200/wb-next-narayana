import { DynamicPageData } from "@/types/dynamic-page";
import {
  findCityBySlug,
  findBranchInCity,
  findClassInBranch,
} from "@/lib/admissionData";

export const defaultClass1Data: DynamicPageData = {
  slug: "cbse-school-class-1",
  metaTitle: "Best CBSE School for Class 1 | Narayana School Admissions Open",
  metaDescription:
    "Admissions open for Class 1 at Narayana School AY 2027-28! Discover our technologically driven stress-free curriculum, holistic eChamps program, fees structure, and world-class campus.",
  hero: {
    backgroundImage: "/assets/bvanner-4.webp",
    preHeading: "Admission Open For Narayana School",
    mainHeadingPrefix: "CBSE School for",
    highlightText: "Class- I",
    counters: [
      { target: 900, label: "Campus", delay: 100 },
      { target: 250, label: "Cities", delay: 200 },
      { target: 47, label: "Legacy", delay: 300 },
      { target: 600000, label: "Learners All Over India", delay: 400 },
    ],
    bulletPoints: [
      "Technologically driven stress-free curriculum",
      "Asia’s one of the largest educational conglomerates",
      "Learning that leads to careers, not just certificates",
    ],
    ctaButtonText: "Get Admission Fees Details",
    formTitle: "Admission Open for AY 2027-28",
  },
  learningOutcomes: {
    heading: "What Your Child Will Learn?",
    subheading:
      "We shape your child futures with care – from pre-primary dreams to higher-secondary success.",
    outcomes: [
      {
        image: "/assets/1-5-std1.webp",
        title: "Language & Communication:",
        points: [
          "Strengthening attentive listening and comprehension",
          "Developing fluency in reading and writing",
          "Expressing thoughts and ideas with confidence",
        ],
      },
      {
        image: "/assets/1-5-std4.webp",
        title: "Scientific Curiosity:",
        points: [
          "Observing and questioning the world around them",
          "Exploring scientific ideas through activities and experiments",
          "Developing curiosity, discovery and scientific thinking",
        ],
      },
      {
        image: "/assets/1-5-std2.webp",
        title: "Mathematical Thinking:",
        points: [
          "Building understanding of numbers and calculations",
          "Recognising patterns and logical connections",
          "Applying reasoning to solve problems accurately",
        ],
      },
      {
        image: "/assets/1-5-std5.webp",
        title: "Social Awareness:",
        points: [
          "Understanding emotions and developing empathy",
          "Practicing sharing, collaboration and teamwork",
          "Developing respect for diversity and surroundings",
        ],
      },
      {
        image: "/assets/1-5-std3.webp",
        title: "Conceptual Understanding:",
        points: [
          "Understanding the 'how' and 'why' behind concepts",
          "Connecting classroom learning with everyday situations",
          "Applying knowledge instead of relying on memorisation",
        ],
      },
      {
        image: "/assets/1-5-std6.webp",
        title: "Creative Expression:",
        points: [
          "Exploring ideas through art, music and activities",
          "Expressing thoughts through creative projects",
          "Developing imagination, originality and confidence",
        ],
      },
    ],
  },
  whyChoose: {
    heading: "Why Parents Choose",
    highlightWord: "Narayana",
    headingSuffix: "Over Other Schools",
    subheading: "A system built for consistency, discipline, and results.",
    items: [
      {
        icon: "/assets/book-icon.png",
        title: "Integrated Curriculum",
        description:
          "The syllabus includes the foundations and advanced concepts for competitive examinations.",
      },
      {
        icon: "/assets/calender-icon.png",
        title: 'Structured "Micro Schedule"',
        description:
          "A concrete plan for consistent progress and coverage of the vast syllabus.",
      },
      {
        icon: "/assets/scarch-icon.png",
        title: "Early Start on Competitive Prep",
        description:
          "Advanced concepts start from grade 6, giving them an edge over other students.",
      },
      {
        icon: "/assets/book-icon.png",
        title: "Tech-Enabled Learning",
        description:
          "In-house digital platforms integrate technology into the learning process for more efficiency.",
      },
      {
        icon: "/assets/calender-icon.png",
        title: "Personalized Attention & Monitoring",
        description:
          'In the "Adoption Calling" program, a mentor teacher tracks the students\' holistic development.',
      },
      {
        icon: "/assets/scarch-icon.png",
        title: "Holistic Development Support",
        description:
          "Soft skills, nSports, and Disha program foster well-rounded individuals.",
      },
    ],
  },
  academicStage: {
    heading: "Academic Excellence at Every Stage",
    badgeTitle: "eChamps",
    badgeSubtitle: "(Classes 1 to 5)",
    badgeIcon: "/assets/user.png",
    imageLeft: "/assets/fun and learn.webp",
    imageRight: "/assets/safe and secure campus.webp",
    mobileImage: "/assets/mobile-champs.webp",
    pillars: [
      {
        icon: "fa-solid fa-arrow-trend-up",
        title: "Holistic Development:",
        points: [
          "Balances academic excellence with communication, creativity and social awareness.",
          "Builds confidence and supports the child's overall development.",
        ],
      },
      {
        icon: "fa-solid fa-puzzle-piece",
        title: "Concept-Based Learning:",
        points: [
          "Activity-based learning for Classes 1 & 2.",
          "Experiential learning for Classes 3-5.",
          "Develops deeper understanding beyond memorisation.",
        ],
      },
      {
        icon: "fa-solid fa-flask",
        title: "Logical & Scientific Thinking:",
        points: [
          "Strengthens mathematical reasoning and problem-solving abilities.",
          "Encourages observation, questioning, exploration and discovery.",
        ],
      },
      {
        icon: "fa-solid fa-chalkboard-user",
        title: "Structured & Supportive Learning:",
        points: [
          "Curriculum divided into daily and monthly learning modules.",
          "Implemented consistently across all branches.",
          "Provides a safe, positive and nurturing environment.",
        ],
      },
    ],
    mobilePoints: [
      "Perfect Balance of Fun and Learning",
      "Optimal Student-Teacher Ratio",
      "Individual Guidance and Support",
      "Safe and Hygienic Environment",
      "CCTV Enabled and Secure Campus",
      "Parent-Teacher Partnership",
    ],
  },
  facilities: {
    heading: "World-Class Campus & Facilities",
    subheading: "Modern infrastructure designed to inspire learning and growth",
    facilities: [
      {
        image: "/assets/digital class room.webp",
        title: "Digital Classroom",
        description:
          "Technology-enabled learning spaces with interactive boards and digital resources",
      },
      {
        image: "/assets/lab and activity.webp",
        title: "Lab & Activity Room",
        description:
          "Well-equipped Physics, Chemistry, Biology, and Computer labs for hands-on learning",
      },
      {
        image: "/assets/Champ1.webp",
        title: "Sports",
        description:
          "Unique sporting facilities that promote holistic physical and mental growth, boosting fitness and confidence.",
      },
      {
        image: "/assets/spaciouscampus.webp",
        title: "Spacious Campus",
        description:
          "Modern playgrounds, indoor sports facilities, and activity centers for holistic development",
      },
      {
        image: "/assets/safetransportation.webp",
        title: "Safe Transport",
        description: "GPS-tracked buses covering major routes across the city",
      },
      {
        image: "/assets/security.webp",
        title: "Safety & Security",
        description:
          "24/7 CCTV surveillance, trained security personnel, biometric access control",
      },
    ],
  },
  rightSchool: {
    heading: "Is Narayana the Right School for Your Child?",
    subheading: "Every child is guided based on their learning needs",
    items: [
      {
        title: "Parents seeking strong academics",
        description: "Structured learning with proven results",
      },
      {
        title: "Students Preparing For Competitive Exams",
        description: "Foundation for IIT, NEET, and Olympiads",
      },
      {
        title: "Family looking for disciplined Learning",
        description: "Character building alongside academics",
      },
      {
        title: "Parents who value long-term outcomes",
        description: "Investment in your child's future",
      },
    ],
  },
  academicResults: {
    heading: "Academic Results That Speak for Themselves",
    subheading: "Our students don't just pass CBSE - they excel nationally",
    results: [
      {
        name: "Trisha Ghosh",
        marks: "498/500",
        exam: "CBSE-X 2025",
        image: "/assets/person1.png",
      },
      {
        name: "Reyansh Devnani",
        marks: "495/500",
        exam: "CBSE-XII 2025",
        image: "/assets/person2.png",
      },
      {
        name: "S. Vakhin",
        marks: "495/500",
        exam: "CBSE-XII 2025",
        image: "/assets/person3.png",
      },
    ],
    ctaButtonText: "Get Call Back for Your Query",
  },
  testimonials: {
    heading: "What parents say about Narayana?",
    subheading: "Feedback from our happy families",
    testimonials: [
      {
        name: "Noor Alam",
        location: "Fulbari",
        quote:
          "Narayana has exceeded our expectations in every way. The emphasis on values, discipline, and academic rigor is helping shape our child into a responsible and capable young adult.",
        rating: 5,
      },
      {
        name: "Radhey Shyam Shaw",
        location: "Howrah",
        quote:
          "The supportive and encouraging atmosphere at Narayana has allowed my child to thrive. We appreciate the dedicated staff and their personalized approach to education, which is very good.",
        rating: 5,
      },
      {
        name: "Shubadip Bhiswas",
        location: "Kalyani Town",
        quote:
          "Narayana has transformed my child's learning experience. The teachers are dedicated. My child looks forward to school every day, which speaks volumes about the positive environment here.",
        rating: 5,
      },
    ],
  },
  faq: {
    heading: "Frequently Asked Questions",
    faqs: [
      {
        question:
          "Will my child struggle in Class I if my child is coming from another institution?",
        answer:
          "We ease the transition into Class I smoothly, as there is plenty of playtime in combination with academic study for your child here in Class I.",
      },
      {
        question: "How much homework will my child have in Class I?",
        answer:
          "The homework load is low in the form of games for the simple reason that we strongly believe that children should be allowed some time for play, rest and outdoor activities instead of studies alone.",
      },
      {
        question:
          "Will my child learn study habits in Class I, or is it too early?",
        answer:
          "Study habits are formed by following a structured schedule as well as the activity-based process followed by us.",
      },
      {
        question:
          "How do you ensure overall development and not just focus on academics?",
        answer:
          "Our curriculum not only includes academics but is also aimed at communication skills, social skills and emotional development.",
      },
      {
        question:
          "My child learns slowly compared to other children. How does Narayana deal with this problem?",
        answer:
          "Your child will receive personal attention along with individual guidance, which would enable us to understand his/her pace and guide him/her according to that pace.",
      },
      {
        question:
          "My child is extremely active and cannot sit in the classroom for long periods of time. How does Class I cater to such students?",
        answer:
          "The class follows activity-based learning wherein traditional teaching methodology is supplemented with activities and movement.",
      },
      {
        question:
          "How do I know what my child is doing and learning every day?",
        answer:
          "We provide daily updates via our app with photos along with daily progress, and parents can come and visit whenever they wish and attend parent-teacher meetings wherein we discuss what the child is learning.",
      },
      {
        question:
          "Why should I send my child to Narayana for Class I despite having so many options?",
        answer:
          "We don't claim to be the best CBSE school for Class I. Parents say so. The reason why you should send your child to us is that we make sure that your child develops interest in coming to school and learning things and not just scoring marks, and that is followed by us right from Class I through Class XII.",
      },
    ],
  },
};

// Registry of pages keyed by slug
export const pageDataRegistry: Record<string, DynamicPageData> = {};


/**
 * Helper function to retrieve page data dynamically by slug.
 * If not found in the registry, it dynamically generates clean, customized
 * template data based on the slug format (e.g. 'class-2', 'cbse-school-class-2').
 */
export function getPageData(slug: string): DynamicPageData {
  if (pageDataRegistry[slug]) {
    return pageDataRegistry[slug];
  }

  // Create friendly class title from slug (e.g. "class-2" -> "Class 2")
  const formattedClass = slug
    .replace(/^cbse-school-(for-)?/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    ...defaultClass1Data,
    slug,
    metaTitle: `Best CBSE School for ${formattedClass || "Admissions"} | Narayana School`,
    metaDescription: `Admissions open for ${formattedClass || "Classes"} at Narayana School AY 2027-28! Register now to discover our curriculum, fee structure, and world-class campus.`,
    hero: {
      ...defaultClass1Data.hero,
      highlightText: formattedClass ? formattedClass : "Class- I",
    },
  };
}

/**
 * Intelligent Data Generator for hierarchical URL segments:
 * - 1 slug: e.g. ["cbse-school-class-1"] OR ["kolkata"]
 * - 2 slugs: e.g. ["kolkata", "newtown"]
 * - 3 slugs: e.g. ["kolkata", "newtown", "class-1"]
 */
export function getPageDataForSegments(slugs: string[]): DynamicPageData {
  if (!slugs || slugs.length === 0) {
    return defaultClass1Data;
  }

  // Case 1: Single slug
  if (slugs.length === 1) {
    const singleSlug = slugs[0];

    // Check if it's a registered landing page (e.g. cbse-school-class-1)
    if (pageDataRegistry[singleSlug]) {
      return pageDataRegistry[singleSlug];
    }

    // Check if it's a City (e.g. kolkata)
    const city = findCityBySlug(singleSlug);
    if (city) {
      const cityName = city.label || city.value;
      return {
        ...defaultClass1Data,
        slug: singleSlug,
        metaTitle: `Best CBSE Schools in ${cityName} | Narayana School Admissions Open`,
        metaDescription: `Admissions open at Narayana Schools in ${cityName} AY 2027-28! Discover our CBSE curriculum, top-notch facilities, and campus locations across ${cityName}.`,
        hero: {
          ...defaultClass1Data.hero,
          preHeading: `Admission Open for Narayana Schools`,
          mainHeadingPrefix: `Top CBSE Schools in`,
          highlightText: cityName,
          formTitle: `Admission Open - ${cityName}`,
          defaultCity: city.value,
        },
        whyChoose: {
          ...defaultClass1Data.whyChoose,
          heading: `Why Parents Choose Narayana Schools in ${cityName}`,
        },
        facilities: {
          ...defaultClass1Data.facilities,
          heading: `World-Class Infrastructure Across ${cityName}`,
        },
        faq: {
          ...defaultClass1Data.faq,
          heading: `Frequently Asked Questions - Narayana Schools in ${cityName}`,
        },
      };
    }

    const fallbackData = getPageData(singleSlug);
    return {
      ...fallbackData,
      hero: {
        ...fallbackData.hero,
        defaultClass: "E-CHAMPS-1",
      },
    };
  }

  // Case 2: Two slugs: /{city}/{branch} (e.g. ["kolkata", "newtown"])
  if (slugs.length === 2) {
    const [citySlug, branchSlug] = slugs;
    const city = findCityBySlug(citySlug);
    const branch = city ? findBranchInCity(city, branchSlug) : undefined;

    const cityName = city ? city.label || city.value : citySlug;
    const branchName = branch ? branch.label || branch.value : branchSlug;

    return {
      ...defaultClass1Data,
      slug: slugs.join("/"),
      metaTitle: `Narayana School ${branchName}, ${cityName} | Best CBSE School Admissions`,
      metaDescription: `Admissions open for AY 2027-28 at Narayana School ${branchName}, ${cityName}. High quality CBSE education, smart classrooms, labs, and proven results.`,
      hero: {
        ...defaultClass1Data.hero,
        preHeading: `Admission Open for AY 2027-28 in ${cityName}`,
        mainHeadingPrefix: `Narayana School`,
        highlightText: `${branchName}`,
        formTitle: `Admissions Open - ${branchName}`,
        defaultCity: city ? city.value : citySlug,
        defaultBranch: branch ? branch.value : branchSlug,
      },
      whyChoose: {
        ...defaultClass1Data.whyChoose,
        heading: `Why Parents Choose Narayana School, ${branchName}`,
      },
      facilities: {
        ...defaultClass1Data.facilities,
        heading: `World-Class Campus & Facilities at ${branchName}`,
      },
      faq: {
        ...defaultClass1Data.faq,
        heading: `Frequently Asked Questions - ${branchName} Campus`,
      },
    };
  }

  // Case 3: Three or more slugs: /{city}/{branch}/{class} (e.g. ["kolkata", "newtown", "class-1"])
  const [citySlug, branchSlug, classSlug] = slugs;
  const city = findCityBySlug(citySlug);
  const branch = city ? findBranchInCity(city, branchSlug) : undefined;
  const matchedClass = branch ? findClassInBranch(branch, classSlug) : undefined;

  const cityName = city ? city.label || city.value : citySlug;
  const branchName = branch ? branch.label || branch.value : branchSlug;
  const className = matchedClass || classSlug.replace(/-/g, " ").toUpperCase();

  return {
    ...defaultClass1Data,
    slug: slugs.join("/"),
    metaTitle: `Best CBSE School for ${className} in ${branchName}, ${cityName} | Narayana School`,
    metaDescription: `Admissions open for ${className} at Narayana School ${branchName}, ${cityName} for AY 2027-28. Learn more about curriculum, fee details, and campus facilities.`,
    hero: {
      ...defaultClass1Data.hero,
      preHeading: `Admission Open for AY 2027-28`,
      mainHeadingPrefix: `CBSE School for ${className} at`,
      highlightText: `${branchName}`,
      formTitle: `Admission Open - ${className}`,
      defaultCity: city ? city.value : citySlug,
      defaultBranch: branch ? branch.value : branchSlug,
      defaultClass: matchedClass || className,
    },
    whyChoose: {
      ...defaultClass1Data.whyChoose,
      heading: `Why Choose Narayana for ${className} at ${branchName}`,
    },
    facilities: {
      ...defaultClass1Data.facilities,
      heading: `Modern Facilities at ${branchName}`,
    },
    faq: {
      ...defaultClass1Data.faq,
      heading: `Frequently Asked Questions - ${className} at ${branchName}`,
    },
  };
}

