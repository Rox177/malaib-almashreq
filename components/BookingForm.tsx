"use client";

import { useState, useEffect, FormEvent } from "react";
import { Court, Booking, BookingFormData } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { bookingRepository } from "@/utils/bookings";
import { validateBookingForm, ValidationErrors } from "@/utils/validation";
import {
  generateTimeSlots,
  getUnavailableSlots,
  isSlotBooked,
  getMinDate,
  formatTime12Hour,
} from "@/utils/timeSlots";
import TimeSlotPicker from "./TimeSlotPicker";
import Link from "next/link";

interface BookingFormProps {
  court: Court;
}

const DURATION_OPTIONS = [1, 2, 3];

export default function BookingForm({ court }: BookingFormProps) {
  const { lang, t } = useLanguage();
  const courtName = lang === "ar" ? court.nameAr : court.nameEn;

  const [formData, setFormData] = useState<BookingFormData>({
    fullName: "",
    phone: "",
    studentId: "",
    courtId: court.id,
    date: getMinDate(),
    time: "",
    duration: 1,
    notes: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [bookingId, setBookingId] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const timeSlots = generateTimeSlots(court.openingHours);
  const unavailableSlots = formData.date
    ? getUnavailableSlots(bookings, court, formData.date)
    : [];

  useEffect(() => {
    async function loadBookings() {
      const allBookings = await bookingRepository.getAll();
      setBookings(allBookings);
    }
    loadBookings();
  }, [submitted]);

  const handleCopyCode = async () => {
    if (!bookingId) return;
    try {
      await navigator.clipboard.writeText(bookingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const validationErrors = validateBookingForm(formData, {
      required: t("required"),
      invalidPhone: t("invalidPhone"),
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (
      isSlotBooked(
        bookings,
        court.id,
        formData.date,
        formData.time,
        formData.duration
      )
    ) {
      setErrors({ time: t("slotUnavailable") });
      return;
    }

    setIsSubmitting(true);
    let savedBooking: Booking;

    try {
      savedBooking = await bookingRepository.add(formData, courtName);
    } catch (error: any) {
      console.error("Booking failed:", error);
      setFormError(error?.message || (lang === "ar" ? "حدث خطأ أثناء إرسال طلب الحجز" : "Failed to submit booking request"));
      setIsSubmitting(false);
      return;
    }

    const whatsappMessage = `طلب حجز جديد - ملاعب المشرق

رقم الحجز: ${savedBooking.bookingCode}
الاسم: ${formData.fullName}
رقم الهاتف: ${formData.phone}
الرقم الجامعي: ${formData.studentId || "غير مذكور"}
الملعب: ${courtName}
التاريخ: ${formData.date}
الوقت: ${formatTime12Hour(formData.time)}
المدة: ${formData.duration} ساعة
الملاحظات: ${formData.notes || "لا توجد ملاحظات"}

يرجى تأكيد الحجز.`;

    try {
      await fetch("/api/telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: whatsappMessage,
        }),
      });
    } catch (error) {
      console.error("Telegram notification failed:", error);
    }

    setBookingId(savedBooking.bookingCode);
    setSubmitted(true);
    setErrors({});
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-sport-200/50 bg-gradient-to-b from-sport-50 to-white p-8 md:p-10 text-center animate-scale-in">
        {/* Top Checkmark Icon */}
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-sport shadow-md">
          <svg className="h-7 w-7 text-white stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h3 className="text-xl font-bold text-content-primary mt-0">
          {t("bookingSuccess")}
        </h3>

        {/* Booking Code Display */}
        <div className="mt-5 inline-flex items-center gap-3 bg-white border border-sport-200 rounded-xl px-5 py-3 shadow-xs">
          <div className="text-start">
            <p className="text-[10px] text-content-tertiary font-bold uppercase tracking-wider">
              {t("bookingCode")}
            </p>
            <p className="text-lg font-mono font-bold text-navy leading-none mt-0.5">
              {bookingId}
            </p>
          </div>
          <button
            onClick={handleCopyCode}
            aria-label={t("copyCode")}
            className="text-sport hover:text-sport-700 p-1.5 rounded-lg hover:bg-sport-50 transition-colors cursor-pointer"
          >
            {copied ? (
              <svg className="h-4.5 w-4.5 text-sport" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
            )}
          </button>
        </div>

        <p className="mt-4 text-sm text-content-secondary max-w-xs mx-auto leading-relaxed">
          {t("keepCode")}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/track"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-navy/15 bg-navy/5 px-6 py-3 text-sm font-semibold text-navy hover:bg-navy/10 transition-all"
          >
            <span>{t("goToTrack")}</span>
            <svg className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                fullName: "",
                phone: "",
                studentId: "",
                courtId: court.id,
                date: getMinDate(),
                time: "",
                duration: 1,
                notes: "",
              });
              setFormError(null);
            }}
            className="rounded-xl bg-sport px-8 py-3 text-sm font-semibold text-white shadow-button hover:bg-sport-700 transition-all cursor-pointer"
          >
            {t("bookAnother")}
          </button>
        </div>
      </div>
    );
  }

  const inputClass = (hasError: boolean) =>
    `w-full rounded-xl border bg-surface-muted px-4 py-3 text-sm text-content-primary placeholder:text-content-tertiary transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sport/15 focus:shadow-sm ${
      hasError
        ? "border-red-400 bg-red-50/30 focus:border-red-400 focus:ring-red-200/40"
        : "border-surface-border focus:border-sport"
    }`;

  const labelClass = "block text-sm font-medium text-content-secondary mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h3 className="text-xl font-bold text-content-primary mb-6">{t("bookingForm")}</h3>

      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className={labelClass}>
          {t("fullName")}
        </label>
        <input
          id="fullName"
          type="text"
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
          className={inputClass(!!errors.fullName)}
          placeholder={lang === "ar" ? "أدخل اسمك الكامل" : "Enter your full name"}
        />
        {errors.fullName && (
          <p role="alert" className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
            <svg className="h-3 w-3 shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{errors.fullName}</span>
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className={labelClass}>
          {t("phone")}
        </label>
        <input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className={inputClass(!!errors.phone)}
          dir="ltr"
          placeholder="07XXXXXXXXX"
        />
        {errors.phone && (
          <p role="alert" className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
            <svg className="h-3 w-3 shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{errors.phone}</span>
          </p>
        )}
      </div>

      {/* Student ID */}
      <div>
        <label htmlFor="studentId" className={labelClass}>
          {t("studentId")}
        </label>
        <input
          id="studentId"
          type="text"
          value={formData.studentId}
          onChange={(e) =>
            setFormData({ ...formData, studentId: e.target.value })
          }
          className={inputClass(false)}
          placeholder={lang === "ar" ? "مثال: 202410123" : "Example: 202410123"}
        />
      </div>

      {/* Court Name (Readonly) */}
      <div>
        <label htmlFor="courtName" className={labelClass}>
          {t("court")}
        </label>
        <input
          id="courtName"
          type="text"
          value={courtName}
          readOnly
          className="w-full rounded-xl border border-surface-border bg-surface-muted px-4 py-3 text-sm text-content-tertiary cursor-not-allowed"
        />
      </div>

      {/* Date */}
      <div>
        <label htmlFor="date" className={labelClass}>
          {t("date")}
        </label>
        <input
          id="date"
          type="date"
          value={formData.date}
          min={getMinDate()}
          onChange={(e) =>
            setFormData({ ...formData, date: e.target.value, time: "" })
          }
          className={inputClass(!!errors.date)}
        />
        {errors.date && (
          <p role="alert" className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
            <svg className="h-3 w-3 shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{errors.date}</span>
          </p>
        )}
      </div>

      {/* Time Slots */}
      <div>
        <label className={labelClass}>{t("time")}</label>
        <TimeSlotPicker
          slots={timeSlots}
          unavailableSlots={unavailableSlots}
          selectedTime={formData.time}
          onSelect={(time) => {
            setFormData({ ...formData, time });
            if (errors.time) {
              const nextErrors = { ...errors };
              delete nextErrors.time;
              setErrors(nextErrors);
            }
          }}
        />
        {errors.time && (
          <p role="alert" className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
            <svg className="h-3 w-3 shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{errors.time}</span>
          </p>
        )}
      </div>

      {/* Duration */}
      <div>
        <label className={labelClass}>{t("duration")}</label>
        <div className="flex gap-2 bg-surface-muted rounded-xl p-1 border border-surface-border">
          {DURATION_OPTIONS.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setFormData({ ...formData, duration: d })}
              className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                formData.duration === d
                  ? "bg-white text-navy shadow-xs"
                  : "text-content-secondary hover:text-content-primary"
              }`}
            >
              {d} {t("hours")}
            </button>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className={labelClass}>
          {t("notes")}
        </label>
        <textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={3}
          className={`${inputClass(false)} resize-none`}
          placeholder={lang === "ar" ? "أدخل أي ملاحظات إضافية..." : "Any additional notes..."}
        />
      </div>

      {/* Form Error Banner */}
      {formError && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700 flex items-center gap-2.5 animate-fade-in" role="alert">
          <svg className="h-5 w-5 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{formError}</span>
        </div>
      )}

      {/* Slot Unavailable Banner */}
      {errors.time === t("slotUnavailable") && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700 flex items-center gap-2.5 animate-fade-in" role="alert">
          <svg className="h-5 w-5 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{t("slotUnavailable")}</span>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-sport py-3.5 text-sm font-semibold text-white shadow-button hover:bg-sport-700 active:scale-[0.99] transition-all disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-sport"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>{lang === "ar" ? "جاري إرسال الحجز..." : "Submitting..."}</span>
          </>
        ) : (
          <span>{t("submit")}</span>
        )}
      </button>
    </form>
  );
}