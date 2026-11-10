export interface BranchCounter {
  target: number;
  label: string;
  delay: number;
}

export interface BranchHeroData {
  preHeading: string;
  mainHeadingPrefix: string;
  branchHighlight: string;
  counters: BranchCounter[];
  bulletPoints: string[];
  ctaButtonText: string;
  formTitle: string;
  formSubtitle: string;
  defaultCity: string;
  defaultBranch: string;
}

export interface BranchAcademicProgramCard {
  id: string;
  image: string;
  alt: string;
  title: string;
  mobileTitle: string;
  desktopClass: string;
  mobileClass: string;
  mobileName: string;
  mobileSubtitle: string;
  mobileBg: string;
  heading: string;
  points: string[];
}

export interface BranchAcademicProgramsData {
  heading: string;
  subheading: string;
  programs: BranchAcademicProgramCard[];
}

export interface BranchWhyChooseItem {
  icon: string;
  title: string;
  description: string;
}

export interface BranchWhyChooseData {
  heading: string;
  highlightWord: string;
  headingSuffix: string;
  subheading: string;
  items: BranchWhyChooseItem[];
}

export interface BranchStagePillar {
  title: string;
  icon: string;
  points: string[];
}

export interface BranchStageData {
  id: string;
  heading: string;
  subHeading: string;
  badgeDesktopTitle: string;
  badgeDesktopClass: string;
  badgeMobileTitle: string;
  badgeMobileClass: string;
  h3Heading?: string;
  badgeIcon: string;
  bgColor: string;
  mobileCardBg: string;
  image1: string;
  image2?: string;
  mobileImage?: string;
  mobilePoints: string[];
  pillars: BranchStagePillar[];
  feeButtonText: string;
}

export interface BranchRightSchoolPoint {
  title: string;
  description: string;
  delay: number;
}

export interface BranchRightSchoolData {
  heading: string;
  subheading: string;
  points: BranchRightSchoolPoint[];
}

export interface BranchAcademicResultItem {
  name: string;
  score: string;
  exam: string;
  image: string;
}

export interface BranchAcademicResultsData {
  heading: string;
  subheading: string;
  results: BranchAcademicResultItem[];
}

export interface BranchTestimonialItem {
  name: string;
  location: string;
  text: string;
}

export interface BranchTestimonialsData {
  heading: string;
  subheading: string;
  testimonials: BranchTestimonialItem[];
}

export interface BranchDesktopBannerData {
  desktopImage: string;
  mobileBanners: { src: string; alt: string }[];
}

export interface BranchFacilityItem {
  title: string;
  description: string;
  image: string;
  alt: string;
  delay: number;
}

export interface BranchFacilitiesData {
  heading: string;
  subheading: string;
  facilities: BranchFacilityItem[];
}

export interface BranchFaqItem {
  question: string;
  answer: string;
}

export interface BranchFaqData {
  heading: string;
  faqs: BranchFaqItem[];
}

export interface BranchLimitedSeatsData {
  heading: string;
  subheading: string;
  image: string;
  bgImage: string;
  defaultCity: string;
  defaultBranch: string;
}

export interface BranchStaticPageData {
  branchId: string;
  branchName: string;
  cityName: string;
  metaTitle: string;
  metaDescription: string;
  hero: BranchHeroData;
  academicPrograms: BranchAcademicProgramsData;
  whyChoose: BranchWhyChooseData;
  ekidz: BranchStageData;
  echamps: BranchStageData;
  etechno: BranchStageData;
  seniorSecondary: BranchStageData;
  rightSchool: BranchRightSchoolData;
  academicResults: BranchAcademicResultsData;
  testimonials: BranchTestimonialsData;
  desktopBanner: BranchDesktopBannerData;
  facilities: BranchFacilitiesData;
  faq: BranchFaqData;
  limitedSeats: BranchLimitedSeatsData;
}
