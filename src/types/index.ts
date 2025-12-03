export type Theme = "dark" | "light" | "system";

export type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export interface RecommendationItem {
  title: string;
  value: string;
}

export interface ClinicalData {
  summary: string;
  recommendations: RecommendationItem[];
  flags: string[];
}
