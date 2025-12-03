import { useEffect, useState } from "react";
import {
  Copy,
  Check,
  Stethoscope,
  AlertCircle,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import { Textarea } from "./ui/textarea";
import RecommendationsPanelLoading from "./recommendation_panel_loading";
import ClinicalFlag from "./clinical_flag";
import { Button } from "./ui/button";
import type { ClinicalData } from "@/types";
import { useDebounce } from "@/hooks/use_debounce";
import { RecommendationCard } from "./recommendation_card";

interface RecommendationsPanelProps {
  data: ClinicalData;
}

export const RecommendationsPanel: React.FC<RecommendationsPanelProps> = ({
  data,
}) => {
  const [copied, setCopied] = useState(false);
  const [summary, setSummary] = useState(data.summary);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedValue = useDebounce(summary, 500);

  useEffect(() => {
    if (!debouncedValue) return;

    const runCheck = async () => {
      setLoading(true);
      setError(null);
      await new Promise((r) => setTimeout(r, 300)); // simulate async latency

      const normalize = (str: string) =>
        str.toLowerCase().replace(/[^a-z0-9]/g, "");

      if (normalize(debouncedValue) !== normalize(data.summary)) {
        setError(
          "The system detected inconsistencies in the case narrative and cannot generate reliable clinical insights. Please clarify the summary for accurate assessment."
        );
      } else {
        setError(null);
      }

      setLoading(false);
    };

    runCheck();
  }, [debouncedValue, data.summary]);

  const handleCopy = () => {
    const textToCopy = `Summary: ${summary}\n\nRecommendations:\n${data.recommendations
      .map((r) => `- ${r.title}: ${r.value}`)
      .join("\n")}\n\nFlags: ${data.flags.join(", ")}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors duration-300">
      {/* Header Bar */}
      <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
        <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/50 rounded-md text-indigo-600 dark:text-indigo-400">
          <Sparkles size={18} />
        </div>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 tracking-tight">
          AI Clinical Analysis
        </h2>
      </div>

      <div className="p-6 space-y-8">
        {/* Summary Section */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide flex items-center gap-2">
                <Stethoscope size={16} />
                Case Summary
              </h3>
            </div>

            {/* Tooltip Wrapper */}
            <div className="relative group/tooltip">
              <Button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-slate-200 dark:text-slate-700 dark:hover:text-slate-800 transition-colors"
                aria-label="Copy notes"
              >
                {copied ? (
                  <Check size={14} className="text-emerald-500" />
                ) : (
                  <Copy size={14} />
                )}
                <span
                  className={
                    copied ? "text-emerald-600 dark:text-emerald-500" : ""
                  }
                >
                  {copied ? "Copied" : "Copy Notes"}
                </span>
              </Button>
            </div>
          </div>

          <div
            className={`relative rounded-lg border transition-all duration-200 ${
              loading
                ? "bg-slate-50 border-slate-200 dark:bg-slate-800/50 dark:border-slate-700 opacity-70 cursor-wait"
                : error
                ? "bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-900/50"
                : "bg-indigo-50/50 border-indigo-100 dark:bg-slate-800/50 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-slate-600 focus-within:ring-2 focus-within:ring-indigo-100 dark:focus-within:ring-indigo-900/50 focus-within:border-indigo-300 dark:focus-within:border-indigo-700"
            }`}
          >
            <Textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              disabled={loading} // Optional: keep enabled if you want to allow typing while debouncing
              className={`w-full bg-transparent p-4 text-slate-700 dark:text-slate-300 leading-relaxed resize-none focus:outline-none rounded-lg ${
                loading ? "cursor-wait" : ""
              }`}
              rows={2}
              spellCheck={false}
            />
          </div>
        </section>

        {/* Content Area: Logic for Loading / Error / Data */}
        {loading ? (
          <RecommendationsPanelLoading />
        ) : error ? (
          <div className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 rounded-lg flex items-start gap-4 animate-in fade-in slide-in-from-bottom-2">
            <div className="p-2 bg-red-100 dark:bg-red-900/40 rounded-full text-red-600 dark:text-red-400 shrink-0">
              <AlertTriangle size={24} />
            </div>

            <p className="text-red-700 dark:text-red-300 text-sm leading-relaxed">
              {error}
            </p>
          </div>
        ) : (
          <>
            {/* Recommendations Grid */}
            <section className="animate-in fade-in duration-500">
              <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-4 flex items-center gap-2">
                Plan & Dosage
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.recommendations.map((rec, index) => (
                  <RecommendationCard key={index} item={rec} />
                ))}
              </div>
            </section>

            {/* Flags Section */}
            <section className="animate-in fade-in duration-500 delay-100">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle size={16} className="text-slate-400" />
                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Clinical Flags
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.flags.map((flag, index) => (
                  <ClinicalFlag key={index} flag={flag} />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};
