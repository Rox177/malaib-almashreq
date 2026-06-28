"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { supabase } from "@/utils/supabase";
import { formatTime12Hour } from "@/utils/timeSlots";

export default function TrackBookingPage() {
  const { lang, t } = useLanguage();
  const [bookingId, setBookingId] = useState("");
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const searchBooking = async () => {
    const code = bookingId.trim().toUpperCase();
    if (!code) return;
    setLoading(true);
    setSearchError(null);

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("booking_code", code)
      .single();

    if (!error && data) {
      setBooking(data);
    } else {
      setBooking(null);
      setSearchError(t("bookingNotFoundMsg"));
    }

    setLoading(false);
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-50 text-amber-700 border border-amber-200";
      case "confirmed":
        return "bg-sport-50 text-sport-700 border border-sport-200";
      case "cancelled":
        return "bg-red-50 text-red-600 border border-red-200";
      default:
        return "bg-surface-muted text-content-secondary border border-surface-border";
    }
  };

  return (
    <div className="min-h-screen bg-surface py-16 md:py-24 px-4">
      <div className="mx-auto max-w-lg">
        {/* Hero Area */}
        <div className="text-center mb-8 flex flex-col items-center justify-center">
          {/* Tracking Illustration */}
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-navy-50 text-navy-500 shadow-sm border border-navy-100">
            <svg className="h-8 w-8 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-content-primary tracking-tight">
            {t("trackBooking")}
          </h1>
          <p className="text-content-secondary mt-2 text-sm leading-relaxed max-w-xs">
            {t("trackSubtitle")}
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-2xl border border-surface-border shadow-md p-6">
          <div className="relative">
            {/* Leading Search Icon */}
            <div className="absolute start-4 top-1/2 -translate-y-1/2 text-content-tertiary pointer-events-none">
              <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={bookingId}
              onChange={(e) => {
                setBookingId(e.target.value);
                if (searchError) setSearchError(null);
              }}
              placeholder={t("trackPlaceholder")}
              className="w-full rounded-xl border border-surface-border bg-surface-muted ps-11 pe-4 py-3 text-sm font-mono text-content-primary tracking-wider placeholder:font-sans placeholder:tracking-normal placeholder:text-content-tertiary transition-all duration-200 focus:border-sport focus:bg-white focus:outline-none focus:ring-2 focus:ring-sport/15 focus:shadow-sm"
              onKeyDown={(e) => e.key === "Enter" && searchBooking()}
            />
          </div>

          <button
            onClick={searchBooking}
            disabled={loading}
            className="mt-4 w-full rounded-xl bg-sport py-3.5 text-sm font-semibold text-white shadow-button hover:bg-sport-700 active:scale-[0.99] transition-all disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-sport"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>{t("tracking")}</span>
              </>
            ) : (
              <span>{t("trackButton")}</span>
            )}
          </button>

          {/* Inline Error Banner */}
          {searchError && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mt-4 text-sm text-red-700 flex items-center gap-2.5 animate-fade-in" role="alert">
              <svg className="h-5 w-5 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{searchError}</span>
            </div>
          )}
        </div>

        {/* Result Card */}
        {booking && (
          <div className="mt-6 rounded-2xl border border-surface-border bg-white p-6 shadow-card animate-scale-in">
            {/* Header Row */}
            <div className="flex justify-between items-center pb-4 border-b border-surface-divider mb-4">
              <h2 className="text-base font-bold text-content-primary">
                {t("bookingDetails")}
              </h2>
              <span className={`px-3 py-0.5 rounded-full text-xs font-semibold ${getStatusBadgeStyle(booking.status)}`}>
                {t(booking.status)}
              </span>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {/* Booking Code */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-content-tertiary font-bold uppercase tracking-wider">
                  {t("bookingCode")}
                </span>
                <span className="font-mono font-bold text-navy text-base">
                  {booking.booking_code}
                </span>
              </div>

              {/* Customer Name */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-content-tertiary font-bold uppercase tracking-wider">
                  {t("name")}
                </span>
                <span className="font-semibold text-content-primary">
                  {booking.full_name}
                </span>
              </div>

              {/* Court */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-content-tertiary font-bold uppercase tracking-wider">
                  {t("court")}
                </span>
                <span className="font-semibold text-content-primary">
                  {booking.court_name}
                </span>
              </div>

              {/* Date */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-content-tertiary font-bold uppercase tracking-wider">
                  {t("date")}
                </span>
                <span className="font-semibold text-content-primary">
                  {booking.date}
                </span>
              </div>

              {/* Time */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-content-tertiary font-bold uppercase tracking-wider">
                  {t("time")}
                </span>
                <span className="font-semibold text-content-primary">
                  {formatTime12Hour(booking.time)}
                </span>
              </div>

              {/* Duration */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-content-tertiary font-bold uppercase tracking-wider">
                  {t("duration")}
                </span>
                <span className="font-semibold text-content-primary">
                  {booking.duration} {t("hours")}
                </span>
              </div>
            </div>

            {/* Status Banner */}
            {booking.status === "pending" && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-6 flex items-start gap-3 text-amber-700 animate-fade-in">
                <svg className="h-5 w-5 shrink-0 text-amber-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-xs leading-relaxed">
                  <p className="font-bold text-amber-800">{t("pending")}</p>
                  <p className="mt-0.5 text-amber-700/80">
                    {lang === "ar"
                      ? "تم استلام طلبك يرجى الانتظار لخمس دقائق لحين قبول طلبك."
                      : "Your request has been received and is being reviewed by the administration. Please wait for confirmation."}
                  </p>
                </div>
              </div>
            )}

            {booking.status === "confirmed" && (
              <div className="bg-sport-50 border border-sport-200 rounded-xl p-4 mt-6 flex items-start gap-3 text-sport animate-fade-in">
                <svg className="h-5 w-5 shrink-0 text-sport-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-xs leading-relaxed">
                  <p className="font-bold text-sport-700">{t("confirmed")}</p>
                  <p className="mt-0.5 text-sport-600/80">
                    {lang === "ar"
                      ? "تم تأكيد حجزك بنجاح! ننتظر حضورك في الموعد المحدد."
                      : "Your booking is confirmed! We look forward to seeing you at the scheduled time."}
                  </p>
                </div>
              </div>
            )}

            {booking.status === "cancelled" && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mt-6 flex items-start gap-3 text-red-600 animate-fade-in">
                <svg className="h-5 w-5 shrink-0 text-red-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-xs leading-relaxed">
                  <p className="font-bold text-red-700">{t("cancelled")}</p>
                  <p className="mt-0.5 text-red-600/80">
                    {lang === "ar"
                      ? "عذراً، تم إلغاء أو رفض طلب الحجز هذا من قبل الإدارة. يرجى مراجعة التفاصيل."
                      : "Sorry, this booking request was cancelled or rejected by the administration."}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}