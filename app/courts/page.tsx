"use client";

import { courts } from "@/data/courts";
import CourtCard from "@/components/CourtCard";
import { useLanguage } from "@/context/LanguageContext";

export default function CourtsPage() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-navy md:text-4xl">
          {t("allCourts")}
        </h1>
        <p className="mt-3 text-gray-600">{t("allCourtsDesc")}</p>
      </div>

      {courts.length === 0 ? (
        <div className="rounded-2xl bg-white p-12 text-center shadow-card">
          <p className="text-4xl">🏟️</p>
          <p className="mt-4 text-gray-500">{t("noCourts")}</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {courts.map((court) => (
            <CourtCard key={court.id} court={court} />
          ))}
        </div>
      )}
    </div>
  );
}
