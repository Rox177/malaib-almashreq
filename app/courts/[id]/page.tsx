"use client";

import { use } from "react";
import Link from "next/link";
import { getCourtById } from "@/data/courts";
import { useLanguage } from "@/context/LanguageContext";
import BookingForm from "@/components/BookingForm";
import { getSportGradient, getSportSVG } from "@/components/CourtCard";
import { generateTimeSlots, getMinDate, getUnavailableSlots } from "@/utils/timeSlots";
import { getBookings } from "@/utils/bookings";
import { formatPrice, formatTime12Hour } from "@/utils/format";
import { useState, useEffect } from "react";

export default function CourtDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const court = getCourtById(id);
  const { lang, t } = useLanguage();
  const [unavailableCount, setUnavailableCount] = useState(0);
  useEffect(() => {
    if (court) {
      const bookings = getBookings();
      const unavailable = getUnavailableSlots(bookings, court, getMinDate());
      setUnavailableCount(unavailable.length);
    }
  }, [court]);

  if (!court) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface py-20 px-4">
        <div className="text-center max-w-sm mx-auto p-8 bg-white rounded-2xl border border-surface-border shadow-sm animate-scale-in">
          {/* SVG 404/Search Illustration */}
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-content-primary">
            {t("courtNotFound")}
          </h1>
          <p className="text-content-secondary mt-2 text-sm leading-relaxed">
            {t("courtNotFoundDesc")}
          </p>
          <Link
            href="/courts"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-sport px-6 py-3 text-sm font-semibold text-white shadow-button hover:bg-sport-700 transition-all cursor-pointer"
          >
            <svg className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>{t("backToCourts")}</span>
          </Link>
        </div>
      </div>
    );
  }

  const name = lang === "ar" ? court.nameAr : court.nameEn;
  const description = lang === "ar" ? court.descriptionAr : court.descriptionEn;
  const timeSlots = generateTimeSlots(court.openingHours);
  const availableCount = timeSlots.length - unavailableCount;

  return (
    <div className="min-h-screen bg-surface py-10 px-4 md:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Back Link with RTL arrow fix */}
        <Link
          href="/courts"
          className="inline-flex items-center gap-1.5 text-sm text-content-tertiary hover:text-sport transition-colors font-semibold mb-6 group focus-visible:outline-sport"
        >
          <svg className="h-4 w-4 rtl:rotate-180 transition-transform group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>{t("backToCourts")}</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Court Info */}
          <div className="space-y-6">
            {/* Court Image Panel */}
            <div className={`relative h-72 md:h-80 rounded-3xl ${getSportGradient(court.sport)} flex items-center justify-center overflow-hidden shadow-md`}>
              {/* Large faint background icon */}
              <div className="absolute transform scale-150 rotate-12 opacity-15 text-white">
                {getSportSVG(court.sport, "h-40 w-40")}
              </div>

              {/* Centered sharp icon */}
              <div className="relative z-10 text-white drop-shadow-lg">
                {getSportSVG(court.sport, "h-20 w-20")}
              </div>

              {/* Inner shadow at bottom */}
              <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/45 to-transparent pointer-events-none" />

              {/* Frosted Glass Sport Badge */}
              <span className="absolute top-4 end-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 px-3.5 py-1.5 text-xs font-semibold text-white tracking-wide shadow-sm">
                {t(court.sport)}
              </span>
            </div>

            {/* Title & Desc */}
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-content-primary tracking-tight leading-tight">
                  {name}
                </h1>
                <p className="text-content-secondary mt-3 leading-relaxed text-sm md:text-base">
                  {description}
                </p>
              </div>
            </div>

            {/* Facilities Tags */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-content-tertiary">
                {t("facilities")}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {court.facilities.map((f, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-sport-50 border border-sport-200 text-sport-700 px-3.5 py-1 text-xs font-semibold shadow-xs"
                  >
                    {lang === "ar" ? f.ar : f.en}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats Cards (2x2 grid) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white border border-surface-border shadow-card p-5">
                <p className="text-xs text-content-tertiary uppercase font-bold tracking-wider">
                  {t("openingHours")}
                </p>
                <p className="mt-1.5 text-xl font-extrabold text-content-primary">
                  {formatTime12Hour(court.openingHours.start)} – {formatTime12Hour(court.openingHours.end)}
                </p>
              </div>

              <div className="rounded-2xl bg-white border border-surface-border shadow-card p-5">
                <p className="text-xs text-content-tertiary uppercase font-bold tracking-wider">
                  {t("pricePerHour")}
                </p>
                <p className="mt-1.5 text-xl font-extrabold text-content-primary">
                  {formatPrice(court.pricePerHour, lang)}
                </p>
              </div>

              <div className="rounded-2xl bg-white border border-surface-border shadow-card p-5">
                <p className="text-xs text-content-tertiary uppercase font-bold tracking-wider">
                  {t("capacity")}
                </p>
                <p className="mt-1.5 text-xl font-extrabold text-content-primary">
                  {court.capacity} {t("players")}
                </p>
              </div>

              <div className="rounded-2xl bg-white border border-surface-border shadow-card p-5">
                <p className="text-xs text-content-tertiary uppercase font-bold tracking-wider">
                  {t("availableSlots")}
                </p>
                <p
                  className={`mt-1.5 text-xl font-extrabold transition-colors ${
                    availableCount > 5
                      ? "text-sport"
                      : availableCount > 0
                      ? "text-amber-600"
                      : "text-red-500"
                  }`}
                >
                  {availableCount} / {timeSlots.length}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Booking Form Panel */}
          <div className="bg-white rounded-3xl shadow-card border border-surface-border p-6 md:p-8 lg:sticky lg:top-24">
            <BookingForm court={court} />
          </div>
        </div>
      </div>
    </div>
  );
}
