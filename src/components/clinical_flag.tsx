import { Badge } from "./ui/badge";

const ClinicalFlag = ({ flag }: { flag: string }) => {
  const isWarning =
    flag.toLowerCase().includes("monitor") ||
    flag.toLowerCase().includes("caution");
  const isDanger =
    flag.toLowerCase().includes("contraindicated") ||
    flag.toLowerCase().includes("allergy");
  const variant = isDanger ? "danger" : isWarning ? "warning" : "success";

  const styles = {
    neutral:
      "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
    success:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800",
    warning:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
    danger:
      "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
  };

  return <Badge className={`${styles[variant]}`}>{flag}</Badge>;
};

export default ClinicalFlag;
