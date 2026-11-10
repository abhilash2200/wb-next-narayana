import { BranchStaticPageData } from "./types";

export const newtownBranchData: BranchStaticPageData = {
  branchId: "newtown",
  branchName: "New Town",
  cityName: "Kolkata",
  metaTitle:
    "Narayana School New Town, Kolkata | Best CBSE School Admissions Open",
  metaDescription:
    "Admissions open for AY 2027-28 at Narayana School New Town campus, Kolkata. Technologically driven CBSE curriculum, smart digital classrooms, advanced labs, and top competitive ranks.",

  // 1. Hero
  hero: {
    preHeading: "One Of Largest CBSE School Network",
    mainHeadingPrefix: "Narayana School",
    branchHighlight: "New Town",
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
    formSubtitle: "Connect directly with the New Town campus counselor.",
    defaultCity: "KOLKATA",
    defaultBranch: "New Town",
  },

  // 2. Academic Programs
  academicPrograms: {
    heading: "Where do you want to start from?",
    subheading:
      "We shape your child futures with care at New Town – from pre-primary dreams to higher-secondary success.",
    programs: [
      {
        id: "ekidz",
        image: "/assets/e-kidz.webp",
        alt: "Kid",
        title: "eKidz",
        mobileTitle: "Ekidz",
        desktopClass: "(Nursery to UKG)",
        mobileClass: "Nursery to UKG",
        mobileName: "(eKidz)",
        mobileSubtitle: "Nursery to UKG",
        mobileBg: "#15539B",
        heading: "We Know Your Concern",
        points: [
          "Holistic Curriculum",
          "Personal Attention & safety",
          "Personalized safety and Hygiene",
          "Holistic Development Activities",
        ],
      },
      {
        id: "echamps",
        image: "/assets/echamps.webp",
        alt: "eChamps",
        title: "eChamps",
        mobileTitle: "eChamps",
        desktopClass: "(Class 1 to 5)",
        mobileClass: "Class 1 to 5",
        mobileName: "(eChamps)",
        mobileSubtitle: "Class 1 to 5",
        mobileBg: "#F5821F",
        heading: "Emphasises the overall development",
        points: [
          "Communication Skills",
          "Social Skills",
          "Emotional Skills",
          "Focus On Overall Development",
        ],
      },
      {
        id: "etechno",
        image: "/assets/etchno.webp",
        alt: "eTechno",
        title: "eTechno",
        mobileTitle: "eTechno",
        desktopClass: "(Class 6 to 10)",
        mobileClass: "Class 6 to 10",
        mobileName: "(eTechno)",
        mobileSubtitle: "Class 6 to 10",
        mobileBg: "#15539B",
        heading: "Preparing for careers, not just certificates.",
        points: [
          "Integrated Competitive Exam Prep",
          "Structured Learning Approach",
          "Technology-Enabled Framework",
          "Personalized Mentorship and Support",
        ],
      },
      {
        id: "secondary",
        image: "/assets/secondary.webp",
        alt: "SR. Secondary",
        title: "SR. Secondary",
        mobileTitle: "SR. Secondary",
        desktopClass: "(Class 11 & 12)",
        mobileClass: "Class 11 & 12",
        mobileName: "(SR. Secondary)",
        mobileSubtitle: "Class 11 & 12",
        mobileBg: "#F5821F",
        heading: "CBSE schooling that opens doors to top competitive exams.",
        points: [
          "Integrated coaching for competitive Exams",
          "Learning: Critical Thinking and Time Management",
          "Mentorship and Wellness Support for Growth",
        ],
      },
    ],
  },

  // 3. Why Parents Choose
  whyChoose: {
    heading: "Why Parents Choose Narayana Over Other Schools",
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
          "Soft skills, Sports, and Disha program foster well-rounded individuals.",
      },
    ],
  },

  // 4. eKidz
  ekidz: {
    id: "ekidz",
    heading: "eKidz",
    subHeading: "(Nursery to UKG)",
    badgeDesktopTitle: "eKidz",
    badgeDesktopClass: " (Nursery to UKG)",
    badgeMobileTitle: "Ekidz",
    badgeMobileClass: "Nursery to UKG",
    badgeIcon: "/assets/user.png",
    bgColor: "#fbfbfb",
    mobileCardBg: "#15539B",
    h3Heading: "We Know Your Concern",
    image1: "/assets/kidz1.webp",
    mobileImage: "/assets/kidz1.webp",
    feeButtonText: "Get Fee Structure For eKidz",
    mobilePoints: [
      "Perfect Balance of Fun and Learning",
      "Optimal Student-Teacher Ratio",
      "Individual Guidance and Support",
      "Safe and Hygienic Environment",
      "CCTV Enabled and Secure Campus",
      "Advanced Apps for Parent-School Connectivity",
      "Our facilities include well-structured play areas",
      "Dedicated management team to overseeing both safety and learning",
      "An activity and Experience based Learning Approach",
    ],
    pillars: [
      {
        title: "Age appropriate curriculum:",
        icon: "fa-book-open",
        points: [
          "The curriculum focuses on the early stages of a child's development.",
          "A perfect balance of fun and learning.",
          "A range of activities to keep them engaged.",
        ],
      },
      {
        title: "Comprehensive care:",
        icon: "fa-shield-alt",
        points: [
          "We are committed to providing a safe and secure learning environment.",
          "CCTV-enabled, high-standard infrastructure, and fully child-safe spaces.",
          "Our facilities include well-structured play areas.",
        ],
      },
      {
        title: "Beyond the classroom:",
        icon: "fa-city",
        points: [
          "Children's development goes beyond just academic skills.",
          "A space where students feel motivated and supported.",
          "Our activities foster creative and social skills from a young age.",
        ],
      },
      {
        title: "Active learning:",
        icon: "fa-shapes",
        points: [
          "Our activity-based and experiential learning approaches.",
          "Help develop curiosity and problem-solving abilities.",
          "Instill confidence to achieve success in the future.",
        ],
      },
    ],
  },

  // 5. eChamps
  echamps: {
    id: "echamps",
    heading: "eChamps",
    subHeading: "(Class 1 to 5)",
    badgeDesktopTitle: "eChamps",
    badgeDesktopClass: " (Class 1 to 5)",
    badgeMobileTitle: "Class 1 to 5",
    badgeMobileClass: " (eChamps)",
    badgeIcon: "/assets/big-book-icon.png",
    bgColor: "#f1f9ff",
    mobileCardBg: "#FF7600",
    image1: "/assets/Champ1.webp",
    image2: "/assets/Champ2.webp",
    mobileImage: "/assets/mobile-champs.webp",
    feeButtonText: "Get Fee Structure For eChamps",
    mobilePoints: [
      "Focus on overall development of the child",
      "Academic excellence blends with other skills",
      "Curriculum broken down into daily & Monthly Module",
      "Implemented Uniformly Across All Our Branches Nationwide",
      "An activity and Experience based Learning Approach",
      "Digital Classroom & Specious Playground",
      "Foster A Deeper Understanding of Concept",
      "Convenient and Safe Transportation",
    ],
    pillars: [
      {
        title: "Our Unique Approach to Learning",
        icon: "fa-lightbulb",
        points: [
          "Focus on overall development of the child",
          "Academic excellence blends with other skills",
          "Creating a safe and nurturing learning environment",
        ],
      },
      {
        title: "Common Micro Schedule",
        icon: "fa-calendar-alt",
        points: [
          "Curriculum broken down into daily and monthly modules.",
          "IImplemented uniformly across all our branches nationwide.",
        ],
      },
      {
        title: "Conceptual Understanding",
        icon: "fa-brain",
        points: [
          "An activity-based learning approach (Classes 1-2).",
          "Older students benefit from experiential learning (Classes 3-5).",
          "Fosters a deeper understanding of concepts.",
        ],
      },
      {
        title: "Safe & Positive Learning Environment",
        icon: "fa-shield-alt",
        points: [
          "A space where students feel motivated and supported.",
          "Spacious play areas and convenient transport facilities.",
        ],
      },
    ],
  },

  // 6. eTechno
  etechno: {
    id: "etechno",
    heading: "eTechno",
    subHeading: "(Class 6 to 10)",
    badgeDesktopTitle: "eTechno",
    badgeDesktopClass: " (Class 6 to 10)",
    badgeMobileTitle: "Class 6 to 10",
    badgeMobileClass: " (eTechno)",
    badgeIcon: "/assets/microscop.png",
    bgColor: "#fbfbfb",
    mobileCardBg: "#15539B",
    image1: "/assets/techno1.webp",
    image2: "/assets/techno2.webp",
    mobileImage: "/assets/mobile-champs.webp",
    feeButtonText: "Get Fee Structure For eTechno",
    mobilePoints: [
      "A Customized, Integrated Curriculum.",
      "Microschedule for detailed breakdown of daily activities.",
      "Dedicated mentorship for each student.",
      "Implemented Uniformly Across All Our Branches Nationwide",
      "An activity and Experience based Learning Approach",
      "Digital Classroom & Specious Playground",
      "Foster A Deeper Understanding of Concept",
      "Convenient and Safe Transportation",
    ],
    pillars: [
      {
        title: "Comprehensive Curriculum",
        icon: "fa-book-open",
        points: [
          "A customised, integrated curriculum.",
          "Drawing the best of all boards for deeper conceptual understanding.",
        ],
      },
      {
        title: "Common Micro Schedule",
        icon: "fa-calendar-alt",
        points: [
          "Our expertly organised curriculum is distributed across all branches nationwide, monthly and daily",
          "The microschedule provides a detailed breakdown of daily activities",
        ],
      },
      {
        title: "Adoption Calling Programme",
        icon: "fa-user-graduate",
        points: [
          "A dedicated mentor for each student.",
          "A regular parents Engagements.",
          "Each student can realise their full potential.",
        ],
      },
      {
        title: "Personalized Error Analysis and Correction",
        icon: "fa-clipboard-check",
        points: [
          "A detailed documented Error list for re-learning.",
          "Categorised both by question and subject in each test.",
        ],
      },
    ],
  },

  // 7. Senior Secondary
  seniorSecondary: {
    id: "secondary",
    heading: "SR. Secondary",
    subHeading: "(Class 11 & 12)",
    badgeDesktopTitle: "SR. Secondary",
    badgeDesktopClass: " (Class 11 & 12)",
    badgeMobileTitle: "Class 11 & 12",
    badgeMobileClass: " (SR. Secondary)",
    badgeIcon: "/assets/hat.png",
    bgColor: "#f1f9ff",
    mobileCardBg: "#FF7600",
    image1: "/assets/secondary1.webp",
    image2: "/assets/secondary2.webp",
    mobileImage: "/assets/mobile-champs.webp",
    feeButtonText: "Get Fee Structure For Senior Secondary",
    mobilePoints: [
      "Additional teaching for IIT, NEET, CA-CPT, And UPSC",
      "We prepare students for more than just subject knowledge.",
      "Teach them to Maintain a disciplined for their passions along with Study.",
      "Teach them to Stay Calm under pressure of Study and life",
      "Teach them a Self-study and research to succeed in Competitive exams",
      "Our Aim is to help Students to become independent Learners.",
      "A customised, integrated curriculum drawing best of CBSE, and others boards.",
    ],
    pillars: [
      {
        title: "Comprehensive Curriculum",
        icon: "fa-book-open",
        points: [
          "Additional teaching for IIT, NEET, CA-CPT, and UPSC.",
          "Students need more than just subject knowledge",
          "They require a comprehensive set of life skills.",
        ],
      },
      {
        title: "Time Management",
        icon: "fa-clock",
        points: [
          "Essential to balancing academic responsibilities with other activities.",
          "Balancing competitive exam preparations and extracurricular activities.",
          "Maintain a disciplined study routine while pursuing their passions.",
        ],
      },
      {
        title: "Stress Management",
        icon: "fa-heart",
        points: [
          "Senior secondary education can be stressful.",
          "Stress management techniques help to stay calm under pressure.",
          "Focus on their goals, and perform at their best during exams.",
        ],
      },
      {
        title: "Research and self-study skills",
        icon: "fa-search",
        points: [
          "Success in competitive exams is important.",
          "Self-study and research are essential for critical thinking.",
          "Our aim is to help students become independent learners.",
        ],
      },
    ],
  },

  // 8. Right School For Child
  rightSchool: {
    heading: "Is Narayana the Right School for Your Child?",
    subheading: "Every child at New Town is guided based on their learning needs",
    points: [
      {
        title: "Parents seeking strong academics",
        description: "Structured learning with proven results",
        delay: 100,
      },
      {
        title: "Students Preparing For Competitive Exams",
        description: "Foundation for IIT, NEET, and Olympiads",
        delay: 200,
      },
      {
        title: "Family looking for disciplined Learning",
        description: "Character building alongside academics",
        delay: 300,
      },
      {
        title: "Parents who value long-term outcomes",
        description: "Investment is your child's future",
        delay: 400,
      },
    ],
  },

  // 9. Academic Results
  academicResults: {
    heading: "Academic Results That Speak for Themselves",
    subheading: "Our students don't just pass CBSE - they excel nationally",
    results: [
      {
        name: "Trisha Ghosh",
        score: "498/500",
        exam: "CBSE-X 2025",
        image: "/assets/person1.png",
      },
      {
        name: "Reyansh Devnani",
        score: "495/500",
        exam: "CBSE-XII 2025",
        image: "/assets/person2.png",
      },
      {
        name: "S. Vakhin",
        score: "495/500",
        exam: "CBSE-XII 2025",
        image: "/assets/person3.png",
      },
    ],
  },

  // 10. Testimonials
  testimonials: {
    heading: "What parents say about Narayana?",
    subheading:
      "Real experiences from families enrolled in our campuses across Kolkata",
    testimonials: [
      {
        name: "Shubadip Bhiswas",
        location: "Kolkata",
        text: "Narayana New Town has transformed my child's learning experience. The teachers are dedicated. My child looks forward to school every day, which speaks volumes about the positive environment.",
      },
      {
        name: "Noor Alam",
        location: "Fulbari",
        text: "Narayana has exceeded our expectations in every way. The emphasis on values, discipline, and academic rigor is helping shape our child into a responsible and capable young adult.",
      },
      {
        name: "Radhey Shyam Shaw",
        location: "Howrah",
        text: "The supportive and encouraging atmosphere at Narayana has allowed my child to thrive. We appreciate the dedicated staff and their personalized approach to education.",
      },
    ],
  },

  // 11. Desktop Banner
  desktopBanner: {
    desktopImage: "/assets/tetsimonial-desktop.webp",
    mobileBanners: [
      { src: "/assets/set1.png", alt: "Narayana Testimonial Feature 1" },
      { src: "/assets/set2.png", alt: "Narayana Testimonial Feature 2" },
      { src: "/assets/set3.png", alt: "Narayana Testimonial Feature 3" },
      { src: "/assets/set5.png", alt: "Narayana Testimonial Feature 4" },
    ],
  },

  // 12. Facilities
  facilities: {
    heading: "World-Class Campus & Facilities at New Town",
    subheading: "Modern infrastructure designed to inspire learning and growth",
    facilities: [
      {
        title: "Digital Classroom",
        description:
          "Technology-enabled learning spaces with interactive boards and digital resources",
        image: "/assets/digital-classroom.webp",
        alt: "Digital Classroom",
        delay: 100,
      },
      {
        title: "Lab & Activity Room",
        description:
          "Well-equipped Physics, Chemistry, Biology, and Computer labs for hands-on learning",
        image: "/assets/lab-activity.webp",
        alt: "Lab & Activity Room",
        delay: 200,
      },
      {
        title: "Hostel",
        description: "Comfortable and secure hostel facilities for students",
        image: "/assets/hostel.webp",
        alt: "Hostel",
        delay: 300,
      },
      {
        title: "Spacious Campus",
        description:
          "Modern playgrounds, indoor sports facilities, and activity centers for holistic development",
        image: "/assets/spaciouscampus.webp",
        alt: "Spacious Campus",
        delay: 100,
      },
      {
        title: "Safe Transport",
        description: "GPS-tracked buses covering major routes across the city",
        image: "/assets/safetransportation.webp",
        alt: "Safe Transport",
        delay: 200,
      },
      {
        title: "Safety & Security",
        description:
          "24/7 CCTV surveillance, trained security personnel, biometric access control",
        image: "/assets/safe.webp",
        alt: "Safety & Security",
        delay: 300,
      },
    ],
  },

  // 13. FAQ
  faq: {
    heading: "Frequently Asked Questions - New Town Campus",
    faqs: [
      {
        question: "What curriculum does Narayana Schools follow?",
        answer:
          "A power-packed blend of CBSE, state board & competitive exam prep—IIT, NEET, UPSC, Olympiads & more!",
      },
      {
        question: "What facilities are available on campus?",
        answer:
          "Smart classrooms, high-tech labs, sports zones, libraries & activity hubs—learning meets fun!",
      },
      {
        question: "How does the school ensure student safety?",
        answer:
          "24/7 CCTV, trained security, fire safety & GPS-tracked buses—safe, secure & stress-free!",
      },
      {
        question: "Does the school offer hostels & daycare?",
        answer:
          "Absolutely! Comfortable hostels & nurturing daycare for a home-away-from-home experience.",
      },
      {
        question: "What makes Narayana School one of the best CBSE schools in New Town?",
        answer:
          "Narayana School New Town is among the premier CBSE schools offering a unique blend of board and competitive exam preparation through programmes like e-Kidz, e-Champs, and e-Techno. Our advanced microschedules, personalised mentorship, and digital learning tools set us apart.",
      },
      {
        question: "Is Narayana an English medium school?",
        answer:
          "Yes, Narayana School offers a comprehensive English medium education, starting from nursery to senior secondary, with a strong focus on language development and overall growth.",
      },
      {
        question:
          "How do I apply for admission to Narayana School New Town under CBSE?",
        answer:
          "Admissions at Narayana School can be done online or by visiting our New Town campus. We offer the CBSE curriculum only. Every Narayana School admission will be a CBSE admission.",
      },
      {
        question: "Does Narayana offer preschool and nursery education?",
        answer:
          "Yes, through our e-Kidz programme, we offer a well-structured preschool and nursery curriculum that focuses on play-based learning and foundational skill development.",
      },
      {
        question: "How do I know where the nearest Narayana School is?",
        answer:
          "You can visit our New Town campus or contact our branch admission counselor directly for admission-related information.",
      },
    ],
  },

  // 14. Limited Seats
  limitedSeats: {
    heading: "Limited seats available for 2027–28 academic year.",
    subheading: "Secure your spot at Narayana School, New Town today!",
    image: "/assets/footer.webp",
    bgImage: "/assets/footer-bg.webp",
    defaultCity: "KOLKATA",
    defaultBranch: "New Town",
  },
};
