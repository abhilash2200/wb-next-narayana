"use client";

import Image from "next/image";
import { useModal } from "@/context/ModalContext";

export interface ActivityItem {
  title: string;
  description: string;
  image: string;
  buttonText?: string;
}

export interface StudentActivitiesProps {
  heading?: string;
  subheading?: string;
  activities?: ActivityItem[];
}

export const defaultStudentActivities: ActivityItem[] = [
  {
    title: "Dance",
    description:
      "Students move, express themselves, and find confidence on the floor",
    image: "/assets/dance.webp",
    buttonText: "Apply Now",
  },
  {
    title: "Music",
    description: "Every child gets a chance to sing, play, and enjoy rhythm",
    image: "/assets/singing.webp",
    buttonText: "Apply Now",
  },
  {
    title: "Karate",
    description:
      "A discipline-building activity that also keeps children active and focused",
    image: "/assets/karate.webp",
    buttonText: "Apply Now",
  },
  {
    title: "Theatre",
    description:
      "Children step onto the stage, speak up, and grow in confidence",
    image: "/assets/theatre.webp",
    buttonText: "Apply Now",
  },
  {
    title: "Coding And Robotics",
    description:
      "Children experiement and solve problems, turning curiosity into real skills",
    image: "/assets/robotix.webp",
    buttonText: "Apply Now",
  },
  {
    title: "Olympiad Preparation",
    description:
      "Children get ready for national-level challenges while sharpening their thinking",
    image: "/assets/Olympiad preparation.webp",
    buttonText: "Apply Now",
  },
];

export default function StudentActivities({
  heading = "Student Activities",
  subheading = "Children can enjoy and explore what they love.",
  activities = defaultStudentActivities,
}: StudentActivitiesProps) {
  const { openModal } = useModal();

  const handleApply = (activityTitle: string) => {
    openModal("enquiry", `Student Activity: ${activityTitle}`);
  };

  return (
    <section
      id="student-activities"
      className="scroll-mt-20 py-16 md:py-20 bg-gray-50 overflow-hidden"
    >
      <div id="school-infrastructure" className="scroll-mt-24" />
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          className="md:text-center text-left mb-10 md:mb-12"
          data-animate="fade-up"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
            {heading}
          </h2>
          <p className="text-gray-500 text-md md:text-base">{subheading}</p>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <div
              key={activity.title}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              data-animate="fade-up"
              data-delay={100 * ((index % 3) + 1)}
            >
              <div className="relative w-full h-[220px] sm:h-[235px] overflow-hidden">
                <Image
                  src={activity.image}
                  alt={activity.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="text-brandBlue font-bold text-[18px] md:text-[22px] mb-2 md:mb-4">
                  {activity.title}
                </h3>
                <p className="text-gray-500 text-[15px] font-medium leading-relaxed">
                  {activity.description}
                </p>
                <button
                  type="button"
                  onClick={() => handleApply(activity.title)}
                  className="inline-block mt-3 text-brandOrange font-semibold text-[15px] underline underline-offset-4 hover:text-brandOrangeDark transition-colors cursor-pointer text-left bg-transparent border-0 p-0"
                >
                  {activity.buttonText || "Apply Now"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
