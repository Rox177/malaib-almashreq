"use client";

import Link from "next/link";
import { Court } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { sportEmojis, sportColors } from "@/utils/sportIcons";

interface CourtCardProps {
  court: Court;
}

export default function CourtCard({ court }: CourtCardProps) {
  const { lang, t } = useLanguage();

  const name = lang === "ar" ? court.nameAr : court.nameEn;
  const sportLabel = t(court.sport);

  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-card transition hover:shadow-card-hover">
      <div className="relative flex h-44 items-center justify-center bg-gradient-to-br from-navy/5 to-sport/10">
        <span className="text-6xl opacity-80">{sportEmojis[court.sport]}</span>
        <span
          className={`absolute top-3 end-3 rounded-full px-3 py-1 text-xs font-semibold ${sportColors[court.sport]}`}
        >
          {sportLabel}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-navy">{name}</h3>

        <div className="mt-3 space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 shrink-0 text-sport" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{t("location")}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 shrink-0 text-sport" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>
              {t("capacity")}: {court.capacity} {t("players")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 shrink-0 text-sport" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              {t("pricePerHour")}: {court.pricePerHour} {t("currency")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 shrink-0 text-sport" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              {court.openingHours.start} – {court.openingHours.end}
            </span>
          </div>
        </div>

        <Link
          href={`/courts/${court.id}`}
          className="mt-5 block w-full rounded-xl bg-sport py-2.5 text-center text-sm font-semibold text-white transition hover:bg-sport-dark"
        >
          {t("bookThisCourt")}
        </Link>
      </div>
    </div>
  );
}
