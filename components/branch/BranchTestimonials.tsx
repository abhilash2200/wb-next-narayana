"use client";

interface BranchTestimonialsProps {
  branchName: string;
}

const reviews = [
  {
    parent: "Siddharth Roy",
    student: "Class 8 Parent",
    rating: 5,
    quote:
      "The academic discipline and focus on conceptual clarity have transformed my daughter's confidence. Teachers provide individual attention to every doubt.",
  },
  {
    parent: "Maitreyi Sen",
    student: "Class 10 Parent",
    rating: 5,
    quote:
      "Narayana's integrated curriculum eliminated the need for outside tuition. Both board prep and competitive foundation are handled meticulously inside the classroom.",
  },
  {
    parent: "Debashis Banerjee",
    student: "Class 5 Parent",
    rating: 5,
    quote:
      "Safe campus environment, excellent digital classrooms, and approachable teachers. We are extremely satisfied with our child's all-round development.",
  },
];

export default function BranchTestimonials({ branchName }: BranchTestimonialsProps) {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-brandBlue font-bold text-xs uppercase tracking-wider mb-2">
            Parent Trust
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#003865]">
            What Parents Say About {branchName} Campus
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            Hear firsthand experiences from parents who entrust their children to our care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-brandYellow text-sm mb-3">
                  {[...Array(r.rating)].map((_, i) => (
                    <i key={i} className="fas fa-star" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm italic leading-relaxed mb-4">
                  &ldquo;{r.quote}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-[#003865] text-sm">
                    {r.parent}
                  </h4>
                  <p className="text-xs text-gray-500">{r.student}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-brandOrange/10 text-brandOrange flex items-center justify-center font-bold text-xs">
                  <i className="fas fa-quote-right" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
