"use client";

import { useState } from "react";
import { useModal } from "@/context/ModalContext";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
  anchorId?: string;
}

const faqs: FAQItem[] = [
  {
    question: "1. What curriculum does Narayana Schools follow?",
    answer:
      "A power-packed blend of CBSE, state board & competitive exam prep—IIT, NEET, UPSC, Olympiads & more!",
  },
  {
    question: "2. What facilities are available on campus?",
    answer:
      "Smart classrooms, high-tech labs, sports zones, libraries & activity hubs—learning meets fun!",
  },
  {
    question: "3. How does the school ensure student safety?",
    answer:
      "24/7 CCTV, trained security, fire safety & GPS-tracked buses—safe, secure & stress-free!",
  },
  {
    question: "4. Does the school offer hostels & daycare?",
    answer:
      "Absolutely! Comfortable hostels & nurturing daycare for a home-away-from-home experience.",
  },
  {
    question: "5. What makes Narayana School one of the best CBSE schools?",
    answer:
      "Narayana School is among the best CBSE schools offering a unique blend of board and competitive exam preparation through programmes like e-Kidz, e-Champs, and e-Techno. Our advanced microschedules, personalised mentorship, and digital learning tools set us apart.",
  },
  {
    question: "6. Is Narayana an English medium school?",
    answer:
      "Yes, Narayana School offers a comprehensive English medium education, starting from nursery to senior secondary, with a strong focus on language development and overall growth. That's why, it is one of the best secondary schools.",
  },
  {
    question:
      "7. How do I apply for admission to Narayana School under the CBSE curriculum?",
    answer:
      "Admissions at Narayana School can be done online or by visiting our nearest branch. We offer the CBSE curriculum only. So, every Narayana School admission will be a CBSE admission. We welcome students for kindergarten, primary, and secondary levels",
  },
  {
    question: "8. Does Narayana offer preschool and nursery education?",
    answer:
      "Yes, through our e-Kidz programme, we offer a well-structured preschool and nursery curriculum that focuses on play-based learning and foundational skill development. It is as good as the best nursery school.",
  },
  {
    question: "9. How do I know where the nearest Narayana School is?",
    answer:
      'It is very easy to find the nearest branch of Narayana. You can either type Narayana on Google or type "schools near me CBSE", "preschool near me", "primary schools near me", "CBSE schools near me", or "nursery school near me".',
  },
  {
    question: "10. What are the guidelines for school uniforms?",
    answer:
      "Narayana Schools follow a standardized and disciplined uniform dress code suitable for every academic stage. Complete uniform guidelines and materials are provided at the respective campus admission center upon registration.",
    anchorId: "school-uniforms",
  },
  {
    question: "11. How will I know about my child’s progress?",
    answer:
      "Use the nConnect app, phone calls every fortnight, PTM every quarter or at the end of the term, and portfolio review.",
    anchorId: "faq-question-11",
  },
  {
    question: "12. How can I find out about school discipline or policies?",
    answer:
      "Disha, a counselling and well-being service for student stress and personal issues. One mentor per 20 learners at eTechno.",
    anchorId: "faq-question-12",
  },
  {
    question: "13. How often are fees revised?",
    answer: (
      <span>
        Tuition fees at Narayana Schools are revised every year, with an annual
        increase of <strong>at least 5%</strong>. [1] Please ask the admissions
        office, since they can provide you with more information.
      </span>
    ),
    anchorId: "faq-question-13",
  },
  {
    question: "14. What is the minimum age for admission to each class?",
    answer: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Nursery: Minimum age of 3+ years</li>
        <li>Kindergarten (KG 1 / Lower KG): Minimum age of 4+ years</li>
        <li>KG 2 / Upper KG: Minimum age of 5+ years</li>
        <li>Class 1: Minimum age of 6 years</li>
      </ul>
    ),
    anchorId: "faq-question-14",
  },
  {
    question: "15. How many students are there in each classroom?",
    answer:
      "At eKidz, the teacher-student ratio is 24:2, and at eChamps, Grades 1 and 2 it's 30:2, with 35:1 for Grades 3 to 5.",
    anchorId: "faq-question-15",
  },
  {
    question:
      "16. How do teachers support children who need extra help with learning?",
    answer:
      "Teachers use practical teaching methods, individualised worksheets for each child, and individual attention; parents support home practice. If children require more assistance, they may participate in the Learner Support Programme, while the Adoption Calling Programme provides mentorship.",
    anchorId: "faq-question-16",
  },
  {
    question:
      "17. What safety measures are in place on campus and school buses?",
    answer:
      "There is surveillance in every classroom and corridor, and there are security guards manning the gates. The eChamps bus is GPS-tracked, and a woman attendant is on board.",
    anchorId: "faq-question-17",
  },
  {
    question:
      "18. How does the school make lessons interesting and easy to understand?",
    answer:
      "The lessons include activity-based learning, hands-on activities, and technology-driven instruction. The younger children have phonics-based reading, a learning station for each class, and a puzzle every fortnight in the Thinker’s Space in the nLearn application.",
    anchorId: "faq-question-18",
  },
  {
    question: "19. Can my child choose activities based on their interests?",
    answer:
      "Yes, children at Narayana Schools can choose extracurricular and co-curricular activities based on their personal interests from a structured range of options provided by the school.",
    anchorId: "faq-question-19",
  },
  {
    question: "20. Is a counsellor available for emotional support?",
    answer:
      "Yes, counselling is available under the Disha programme, and the counsellors are well-trained not to judge while helping out. You can contact them through the toll-free number 1800 419 1828.",
    anchorId: "faq-question-20",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { openModal } = useModal();

  const handleApply = (question: string) => {
    openModal("fees", `FAQ: ${question}`);
  };

  return (
    <section id="faqs" className="scroll-mt-20 py-16 md:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <h2
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 text-center mb-8 md:mb-10"
          data-animate="fade-up"
        >
          Frequently Asked Questions
        </h2>

        <div className="space-y-3 md:space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                id={faq.anchorId}
                className={`border border-gray-200 rounded-md bg-slate-50 overflow-hidden transition-all duration-300 ${
                  faq.anchorId ? "scroll-mt-24" : ""
                }`}
                data-animate="fade-up"
                data-delay="50"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-4 md:px-6 py-3 md:py-4 text-left flex justify-between items-center focus:outline-none faq-toggle cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-gray-800 text-sm md:text-lg pr-4">
                    {faq.question}
                  </span>

                  <div className="border border-gray-400 rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center shrink-0">
                    <i
                      className={`fas fa-chevron-up text-gray-500 text-[10px] md:text-xs transition-transform duration-300 faq-icon ${
                        isOpen ? "" : "rotate-180"
                      }`}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 md:px-6 pb-4 faq-content text-xs md:text-[15px] leading-relaxed text-gray-600">
                    <div className="text-gray-600">{faq.answer}</div>
                    <button
                      type="button"
                      onClick={() => handleApply(faq.question)}
                      className="open-modal-btn inline-block mt-3 text-brandOrange font-semibold text-[15px] underline underline-offset-4 hover:text-orange-600 transition-colors cursor-pointer text-left bg-transparent border-0 p-0"
                    >
                      Apply Now
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
