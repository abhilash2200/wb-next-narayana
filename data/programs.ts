export type AcademicProgram = {
  title: string;
  mobileTitle: string;
  mobileName: string;
  className: string;
  image: string;
  mobileBg: string;
  heading: string;
  points: string[];
};

export const programs: AcademicProgram[] = [
  {
    title: "eKidz",
    mobileTitle: "Nursery to UKG",
    mobileName: "eKidz",
    className: "(Nursery to UKG)",
    image: "/assets/e-kidz.webp",
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
    title: "eChamps",
    mobileTitle: "Class 1 to 5",
    mobileName: "eChamps",
    className: "(Class 1 to 5)",
    image: "/assets/echamps.webp",
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
    title: "eTechno",
    mobileTitle: "Class 6 to 10",
    mobileName: "eTechno",
    className: "(Class 6 to 10)",
    image: "/assets/etchno.webp",
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
    title: "SR. Secondary",
    mobileTitle: "Class 11 & 12",
    mobileName: "SR. Secondary",
    className: "(Class 11 & 12)",
    image: "/assets/secondary.webp",
    mobileBg: "#F5821F",
    heading: "CBSE schooling that opens doors to top competitive exams.",
    points: [
      "Integrated coaching for competitive Exams",
      "Learning: Critical Thinking and Time Management",
      "Mentorship and Wellness Support for Growth",
    ],
  },
];