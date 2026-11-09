import Hero from "@/components/Hero";
import SchoolFinder from "@/components/SchoolFinder";
import AcademicPrograms from "@/components/AcademicPrograms";
import WhyParentsChoose from "@/components/WhyParentsChoose";
import EKidz from "@/components/EKidz";
import EChamps from "@/components/EChamps";
import ETechno from "@/components/ETechno";
import SeniorSecondary from "@/components/SeniorSecondary";
import RightSchoolForChild from "@/components/RightSchoolForChild";
import AcademicResults from "@/components/AcademicResults";
import Testimonials from "@/components/Testimonials";
import Facilities from "@/components/Facilities";
import FAQ from "@/components/FAQ";
import DesktopBanner from "@/components/DesktopBanner";
import LimitedSeats from "@/components/LimitedSeats";


export default function Home() {
  return (
    <main>
      <Hero />
      <SchoolFinder />
      <AcademicPrograms />
      <WhyParentsChoose />
      <EKidz />
      <EChamps />
      <ETechno />
      <SeniorSecondary />
      <RightSchoolForChild />
      <AcademicResults />
      <Testimonials />
      <DesktopBanner />
      <Facilities />
      <FAQ />
      <LimitedSeats />
    </main>
  );
}