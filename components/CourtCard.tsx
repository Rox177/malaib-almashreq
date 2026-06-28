"use client";

import Link from "next/link";
import { Court, Sport } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { formatPrice, formatTime12Hour } from "@/utils/format";

interface CourtCardProps {
  court: Court;
}

export function getSportGradient(sport: Sport): string {
  switch (sport) {
    case "soccer":
      return "bg-gradient-to-br from-emerald-950 via-emerald-900 to-navy-800";
    case "tennis":
      return "bg-gradient-to-br from-yellow-950 via-amber-900 to-navy-800";
    case "basketball":
      return "bg-gradient-to-br from-orange-950 via-orange-900 to-navy-800";
    case "volleyball":
      return "bg-gradient-to-br from-blue-950 via-blue-900 to-navy-800";
    default:
      return "bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800";
  }
}

export function getSportSVG(sport: Sport, className: string = "h-12 w-12") {
  switch (sport) {
    case "soccer":
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="3"/>
      <polygon
        points="32,18 24,24 27,34 37,34 40,24"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M32 2v16M6 20l18 10M14 52l13-12M50 52L37 40M58 20L40 30M32 62V46"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"/>
    </svg>
  );
    case "tennis":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <ellipse cx="14.5" cy="9.5" rx="5" ry="5.5" transform="rotate(-30 14 9)" fill="currentColor" fillOpacity={0.15} />
          <path d="M10 8.5l7 4.5M12.7 5.7l6 4M10.8 10.7l5-6M12 12.4l7-6" strokeWidth={0.8} opacity={0.6} />
          <path d="M10.5 13L5 18.5M9.5 14L4 19.5" />
          <path d="M6 17.5l-2 2a1 1 0 001 1.3l2-2" />
          <circle cx="6" cy="7" r="2.2" fill="currentColor" fillOpacity={0.2} />
          <path d="M4.5 7a1.5 1.5 0 011.5-1.5M7.5 7a1.5 1.5 0 01-1.5 1.5" />
        </svg>
      );
    case "basketball":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2v20M2 12h20" />
          <path d="M6.2 6.2c3 2.5 3 9.1 0 11.6M17.8 6.2c-3 2.5-3 9.1 0 11.6" />
        </svg>
      );
    case "volleyball":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 1a14 20 1  0 0112 " />
          <path d="M11 12L4.5 7.5M12 12l7.5-4.5M12 12v9" />
          <path d="M6 18c3-3 3-6 0-9M18 9c-3 3-3 6 0 9" />
        </svg>
      );
    default:
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
}

export default function CourtCard({ court }: CourtCardProps) {
  const { lang, t } = useLanguage();

  const name = lang === "ar" ? court.nameAr : court.nameEn;
  const sportLabel = t(court.sport);

  return (
    <div className="group overflow-hidden rounded-2xl bg-surface-card border border-surface-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      {/* Visual Gradient Panel (replacing images) */}
      <div className={`relative h-52 ${getSportGradient(court.sport)} flex items-center justify-center overflow-hidden shrink-0`}>
        {/* Large faint background icon */}
        <div className="absolute transform scale-150 rotate-12 opacity-15 text-white transition-transform duration-500 group-hover:scale-[1.7] group-hover:rotate-45">
          {getSportSVG(court.sport, "h-32 w-32")}
        </div>

        {/* Centered sharp icon */}
        <div className="relative z-10 text-white drop-shadow-md transition-transform duration-300 group-hover:scale-110">
          {getSportSVG(court.sport, "h-16 w-16")}
        </div>

        {/* Frosted Glass Sport Badge */}
        <span className="absolute top-3 end-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 px-3.5 py-1 text-xs font-semibold text-white tracking-wide shadow-xs">
          {sportLabel}
        </span>
      </div>

      {/* Card Contents */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-content-primary tracking-tight transition-colors group-hover:text-sport">
          {name}
        </h3>

        {/* Description snapshot */}
        <p className="text-sm text-content-secondary line-clamp-2 mt-2 leading-relaxed flex-1">
          {lang === "ar" ? court.descriptionAr : court.descriptionEn}
        </p>

        {/* Info Rows */}
        <div className="mt-5 space-y-3 text-sm text-content-secondary border-t border-surface-divider pt-4">
          <div className="flex items-center gap-2.5">
            <svg className="h-4 w-4 shrink-0 text-sport" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{t("location")}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <svg className="h-4 w-4 shrink-0 text-sport" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>
              {t("capacity")}: {court.capacity} {t("players")}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <svg className="h-4 w-4 shrink-0 text-sport" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              {t("pricePerHour")}: {formatPrice(court.pricePerHour, lang)}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <svg className="h-4 w-4 shrink-0 text-sport" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              {formatTime12Hour(court.openingHours.start)} – {formatTime12Hour(court.openingHours.end)}
            </span>
          </div>
        </div>

        {/* CTA Link */}
        <Link
          href={`/courts/${court.id}`}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-sport py-3 text-center text-sm font-semibold text-white shadow-button hover:bg-sport-700 hover:-translate-y-px active:translate-y-0 transition-all focus-visible:outline-sport"
        >
          <span>{t("bookThisCourt")}</span>
          <svg className="h-4 w-4 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
