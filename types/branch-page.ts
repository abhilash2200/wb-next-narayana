export interface BranchFacility {
  title: string;
  description: string;
  image?: string;
  icon?: string;
}

export interface BranchPageData {
  branchId: string;
  branchName: string;
  cityName: string;
  metaTitle: string;
  metaDescription: string;
  address?: string;
  phone?: string;
  email?: string;
  hero: {
    title: string;
    subtitle: string;
    badge: string;
    backgroundImage?: string;
  };
  about: {
    heading: string;
    description: string;
    highlights: string[];
  };
  facilities: BranchFacility[];
  programsOffered: string[];
}
