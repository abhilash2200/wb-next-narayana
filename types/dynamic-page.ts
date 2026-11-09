export interface CounterItem {
  target: number;
  label: string;
  delay?: number;
  prefix?: string;
  suffix?: string;
}

export interface DynamicHeroData {
  backgroundImage?: string;
  preHeading?: string;
  eyebrowHighlight?: string;
  heading?: string;
  headingOverride?: string;
  highlightText?: string;
  mainHeadingPrefix?: string;
  mainHeadingSuffix?: string;
  counters?: CounterItem[];
  bulletPoints?: string[];
  ctaButtonText?: string;
  formTitle?: string;
  defaultCity?: string;
  defaultBranch?: string;
  defaultClass?: string;
}

export interface LearningOutcomeItem {
  image: string;
  title: string;
  points: string[];
}

export interface DynamicLearningOutcomesData {
  heading?: string;
  subheading?: string;
  outcomes: LearningOutcomeItem[];
}

export interface WhyChooseItem {
  icon: string;
  title: string;
  description: string;
}

export interface DynamicWhyChooseData {
  heading?: string;
  highlightWord?: string;
  headingSuffix?: string;
  subheading?: string;
  items: WhyChooseItem[];
}

export interface StagePillar {
  icon: string; // FontAwesome icon class
  title: string;
  points: string[];
}

export interface DynamicAcademicStageData {
  heading?: string;
  badgeTitle: string; // e.g. "eChamps"
  badgeSubtitle?: string; // e.g. "(Classes 1 to 5)"
  badgeIcon?: string;
  imageLeft?: string;
  imageRight?: string;
  mobileImage?: string;
  pillars: StagePillar[];
  mobilePoints?: string[];
  feesButtonText?: string;
  feesButtonUrl?: string | null;
  brochureButtonText?: string;
  brochureButtonUrl?: string | null;
  callbackButtonText?: string;
  callbackButtonUrl?: string | null;
}

export interface FacilityItem {
  image: string;
  title: string;
  description: string;
}

export interface DynamicFacilitiesData {
  heading?: string;
  subheading?: string;
  facilities: FacilityItem[];
}

export interface RightSchoolItem {
  title: string;
  description: string;
}

export interface DynamicRightSchoolData {
  heading?: string;
  subheading?: string;
  items: RightSchoolItem[];
}

export interface AcademicResultItem {
  name: string;
  marks: string;
  exam: string;
  image: string;
}

export interface DynamicAcademicResultsData {
  heading?: string;
  subheading?: string;
  results: AcademicResultItem[];
  ctaButtonText?: string;
}

export interface TestimonialItem {
  name: string;
  location: string;
  quote: string;
  rating?: number;
}

export interface DynamicTestimonialsData {
  heading?: string;
  subheading?: string;
  testimonials: TestimonialItem[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface DynamicFAQData {
  heading?: string;
  subheading?: string;
  faqs: FAQItem[];
}

export interface DynamicBannerData {
  desktopImage?: string;
  mobileImage?: string;
  altText?: string;
}

export interface DynamicPageData {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  hero: DynamicHeroData;
  learningOutcomes: DynamicLearningOutcomesData;
  whyChoose: DynamicWhyChooseData;
  academicStage: DynamicAcademicStageData;
  facilities: DynamicFacilitiesData;
  rightSchool: DynamicRightSchoolData;
  academicResults: DynamicAcademicResultsData;
  testimonials: DynamicTestimonialsData;
  faq: DynamicFAQData;
  banner?: DynamicBannerData;
}
