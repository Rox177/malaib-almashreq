"use client";

import { use } from "react";
import Link from "next/link";
import { getCourtById } from "@/data/courts";
import { useLanguage } from "@/context/LanguageContext";
import BookingForm from "@/components/BookingForm";
import { sportEmojis, sportColors } from "@/utils/sportIcons";
import { generateTimeSlots, getMinDate } from "@/utils/timeSlots";
import { getBookings } from "@/utils/bookings";
import { getUnavailableSlots } from "@/utils/timeSlots";
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
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <p className="text-4xl">❌</p>
        <h1 className="mt-4 text-2xl font-bold text-navy">
          {t("courtNotFound")}
        </h1>
        <Link
          href="/courts"
          className="mt-6 inline-block rounded-xl bg-sport px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-sport-dark"
        >
          {t("backToCourts")}
        </Link>
      </div>
    );
  }

  const name = lang === "ar" ? court.nameAr : court.nameEn;
  const description =
    lang === "ar" ? court.descriptionAr : court.descriptionEn;
  const timeSlots = generateTimeSlots(court.openingHours);
  const availableCount = timeSlots.length - unavailableCount;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link
        href="/courts"
        className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 transition hover:text-sport"
      >
        ← {t("backToCourts")}
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Court Info */}
        <div>
          <div className="relative flex h-56 items-center justify-center rounded-2xl bg-gradient-to-br from-navy/5 to-sport/10 md:h-72">
            <span className="text-8xl opacity-80">
              {sportEmojis[court.sport]}
            </span>
            <span
              className={`absolute top-4 end-4 rounded-full px-3 py-1 text-xs font-semibold ${sportColors[court.sport]}`}
            >
              {t(court.sport)}
            </span>
          </div>

          <div className="mt-6">
            <h1 className="text-3xl font-bold text-navy">{name}</h1>

            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span className="font-medium text-navy">{t("description")}:</span>
                <span>{description}</span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-bold text-navy">{t("facilities")}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {court.facilities.map((facility, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-sport/10 px-3 py-1 text-xs font-medium text-sport-dark"
                  >
                    {lang === "ar" ? facility.ar : facility.en}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-white p-4 shadow-card">
                <p className="text-xs text-gray-500">{t("openingHours")}</p>
                <p className="mt-1 text-lg font-bold text-navy">
                  {court.openingHours.start} – {court.openingHours.end}
                </p>
              </div>
              <div className="rounded-xl bg-white p-4 shadow-card">
                <p className="text-xs text-gray-500">{t("pricePerHour")}</p>
                <p className="mt-1 text-lg font-bold text-navy">
                  {court.pricePerHour.toLocaleString("en-US")} {t("currency")}
                </p>
              </div>
              <div className="rounded-xl bg-white p-4 shadow-card">
                <p className="text-xs text-gray-500">{t("capacity")}</p>
                <p className="mt-1 text-lg font-bold text-navy">
                  {court.capacity} {t("players")}
                </p>
              </div>
              <div className="rounded-xl bg-white p-4 shadow-card">
                <p className="text-xs text-gray-500">{t("availableSlots")}</p>
                <p className="mt-1 text-lg font-bold text-sport">
                  {availableCount} / {timeSlots.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="rounded-2xl bg-white p-6 shadow-card md:p-8">
          <BookingForm court={court} />
        </div>
      </div>
    </div>
  );
}
