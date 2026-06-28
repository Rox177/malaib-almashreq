"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className="flex items-center gap-0.5 rounded-full border border-white/15 bg-white/10 p-0.5"
      role="group"
      aria-label="Toggle language"
    >
      <button
        onClick={() => setLang("ar")}
        className={`cursor-pointer rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-200 focus-visible:outline-white ${
          lang === "ar"
            ? "bg-white/20 text-white shadow-xs"
            : "text-white/60 hover:text-white/80"
        }`}
      >
        عربي
      </button>
      <span className="text-[10px] text-white/20 select-none">|</span>
      <button
        onClick={() => setLang("en")}
        className={`cursor-pointer rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-200 focus-visible:outline-white ${
          lang === "en"
            ? "bg-white/20 text-white shadow-xs"
            : "text-white/60 hover:text-white/80"
        }`}
      >
        EN
      </button>
    </div>
  );
}
