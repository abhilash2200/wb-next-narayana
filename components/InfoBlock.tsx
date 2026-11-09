interface InfoBlockProps {
  title: string;
  icon: string;
  points: string[];
  largeMargin?: boolean;
}

export default function InfoBlock({
  title,
  icon,
  points,
  largeMargin = false,
}: InfoBlockProps) {
  return (
    <div className={largeMargin ? "mb-16" : "mb-8 md:mb-10"}>
      <div className="mb-3 flex items-center gap-3">
        {icon.startsWith("fa-") ? (
          <i className={`fas ${icon} text-xl text-gray-700 md:text-2xl`} />
        ) : (
          <span className="text-xl text-gray-700">{icon}</span>
        )}

        <h3 className="text-lg font-bold text-gray-800 md:text-[20px]">
          {title}
        </h3>
      </div>

      <ul className="space-y-2 pl-1 text-sm text-gray-600">
        {points.map((point) => (
          <li key={point} className="flex items-start">
            <i className="far fa-check-circle mr-2 mt-1 shrink-0 text-gray-400" />
            <span className="text-sm font-medium md:text-[18px]">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
