import { Activity } from "lucide-react";
import { ThemeModeToggle } from "./components/theme_moode_toggle";
import { RecommendationsPanel } from "./components/recommendations_panel";
import { MOCKED_CLINICAL_DATA } from "./contants/mock_data";

function App() {
  return (
    <div className="min-h-screen transition-colors duration-300 p-4 md:p-8 flex flex-col items-center">
      {/* Top Navigation Bar */}
      <nav className="w-full max-w-3xl flex justify-between items-center mb-8 px-2">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-600 text-white p-2 rounded-lg shadow-sm">
            <Activity size={20} />
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            LassiAI{" "}
            <span className="text-emerald-600 dark:text-emerald-400 font-light"></span>
          </h1>
        </div>

        <ThemeModeToggle />
      </nav>

      <main className="w-full">
        <RecommendationsPanel data={MOCKED_CLINICAL_DATA} />

        <footer className="w-full max-w-3xl mx-auto mt-8 text-center text-slate-400 dark:text-slate-400 text-xs">
          <p className="mt-1">AI Recommendation Panel</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
