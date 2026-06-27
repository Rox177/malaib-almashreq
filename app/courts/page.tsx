"use client";

import { useLanguage } from "@/context/LanguageContext";
import { courts } from "@/data/courts";
import CourtCard from "@/components/CourtCard";

export default function CourtsPage() {
  const { lang, t } = useLanguage();

  return (
    <div className="min-h-screen bg-surface py-14 md:py-20 px-4">
      <div className="mx-auto max-w-6xl md:px-6">
        <div className="text-center mb-12">
          <span className="text-sport-600 text-xs font-bold uppercase tracking-widest bg-sport/10 rounded-full px-4 py-1.5 inline-block">
            {lang === "ar" ? "الملاعب المتوفرة" : "Available Arenas"}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-content-primary mt-4 tracking-tight">
            {t("allCourts")}
          </h1>
          <p className="text-content-secondary mt-2 max-w-lg mx-auto text-sm leading-relaxed">
            {t("allCourtsDesc")}
          </p>
        </div>

        {courts.length === 0 ? (
          <div className="rounded-2xl border border-surface-border bg-white p-16 text-center shadow-sm flex flex-col items-center justify-center animate-fade-in max-w-xl mx-auto">
            <svg className="h-16 w-16 text-content-tertiary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <p className="text-lg font-bold text-content-secondary">
              {t("noCourts")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
            {courts.map((court) => (
              <div key={court.id} className="animate-fade-up">
                <CourtCard court={court} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
