import Hero from "@/components/Hero";
import SchoolFinder from "@/components/SchoolFinder";
import AcademicPrograms from "@/components/AcademicPrograms";
import WhyParentsChoose from "@/components/WhyParentsChoose";
import FeeStructure from "@/components/FeeStructure";
import EKidz from "@/components/EKidz";
import EChamps from "@/components/EChamps";
import ETechno from "@/components/ETechno";
import SeniorSecondary from "@/components/SeniorSecondary";
import StudentActivities from "@/components/StudentActivities";
import RightSchoolForChild from "@/components/RightSchoolForChild";
import AcademicResults from "@/components/AcademicResults";
import DesktopBanner from "@/components/DesktopBanner";
import Testimonials from "@/components/Testimonials";
import Facilities from "@/components/Facilities";
import FAQ from "@/components/FAQ";
import LimitedSeats from "@/components/LimitedSeats";

export default function Home() {
  return (
    <main>
      <Hero />
      <SchoolFinder />
      <AcademicPrograms />
      <WhyParentsChoose />
      <FeeStructure />
      <EKidz />
      <EChamps />
      <ETechno />
      <SeniorSecondary />
      <StudentActivities />
      <RightSchoolForChild />
      <AcademicResults />
      <DesktopBanner />
      <Testimonials />
      <Facilities />
      <FAQ />
      <LimitedSeats />
    </main>
  );
}