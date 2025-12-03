import type { RecommendationItem } from "@/types";

interface RecommendationCardProps {
  item: RecommendationItem;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  item,
}) => {
  // Check if value contains numbers to determine if we should use monospace for clarity
  const hasNumbers = /\d/.test(item.value);

  return (
    <div className="flex flex-col p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm hover:border-indigo-200 dark:hover:border-indigo-900 transition-colors duration-200">
      <span className="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mb-1">
        {item.title}
      </span>
      <div
        className={`text-sm md:text-base font-medium text-slate-900 dark:text-slate-100 ${
          hasNumbers ? "font-mono" : "font-sans"
        }`}
      >
        {item.value}
      </div>
    </div>
  );
};
