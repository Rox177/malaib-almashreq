"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <button
      onClick={() => setLang(lang === "ar" ? "en" : "ar")}
      className="flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-white/20"
      aria-label="Toggle language"
    >
      <span className="text-base">{lang === "ar" ? "🇬🇧" : "🇸🇦"}</span>
      <span>{lang === "ar" ? "EN" : "عربي"}</span>
    </button>
  );
}
