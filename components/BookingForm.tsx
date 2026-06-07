"use client";

import { useState, useEffect, FormEvent } from "react";
import { Court, BookingFormData } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { addBooking, getBookings } from "@/utils/bookings";
import { validateBookingForm, ValidationErrors } from "@/utils/validation";
import {
  generateTimeSlots,
  getUnavailableSlots,
  isSlotBooked,
  getMinDate,
  formatTime12Hour,
} from "@/utils/timeSlots";
import TimeSlotPicker from "./TimeSlotPicker";

interface BookingFormProps {
  court: Court;
}

const DURATION_OPTIONS = [1, 2, 3];
const OWNER_WHATSAPP_NUMBER = "9647732077551";

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
  const [submitted, setSubmitted] = useState(false);
  const [bookings, setBookings] = useState(getBookings());

  const timeSlots = generateTimeSlots(court.openingHours);
  const unavailableSlots = formData.date
    ? getUnavailableSlots(bookings, court, formData.date)
    : [];

  useEffect(() => {
    setBookings(getBookings());
  }, [submitted]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

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

    addBooking(formData, courtName);

    const whatsappMessage = `طلب حجز جديد - ملاعب المشرق

الاسم: ${formData.fullName}
رقم الهاتف: ${formData.phone}
الرقم الجامعي: ${formData.studentId || "غير مذكور"}
الملعب: ${courtName}
التاريخ: ${formData.date}
الوقت: ${formatTime12Hour(formData.time)}
المدة: ${formData.duration} ساعة
الملاحظات: ${formData.notes || "لا توجد ملاحظات"}

يرجى تأكيد الحجز.`;

    const whatsappUrl = `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappUrl, "_blank");

    setSubmitted(true);
    setErrors({});
  };

  if (submitted) {
    return (
      <div className="rounded-2xl bg-green-50 p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sport text-3xl text-white">
          ✓
        </div>
        <p className="text-lg font-semibold text-navy">{t("bookingSuccess")}</p>
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
            setBookings(getBookings());
          }}
          className="mt-6 rounded-xl bg-navy px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-light"
        >
          {t("bookNow")}
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-navy transition focus:border-sport focus:outline-none focus:ring-2 focus:ring-sport/20";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h3 className="text-xl font-bold text-navy">{t("bookingForm")}</h3>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          {t("fullName")}
        </label>
        <input
          type="text"
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
          className={inputClass}
        />
        {errors.fullName && (
          <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          {t("phone")}
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className={inputClass}
          dir="ltr"
        />
        {errors.phone && (
          <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          {t("studentId")}
        </label>
        <input
          type="text"
          value={formData.studentId}
          onChange={(e) =>
            setFormData({ ...formData, studentId: e.target.value })
          }
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          {t("sport")}
        </label>
        <input
          type="text"
          value={courtName}
          readOnly
          className={`${inputClass} bg-gray-50`}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          {t("date")}
        </label>
        <input
          type="date"
          value={formData.date}
          min={getMinDate()}
          onChange={(e) =>
            setFormData({ ...formData, date: e.target.value, time: "" })
          }
          className={inputClass}
        />
        {errors.date && (
          <p className="mt-1 text-xs text-red-500">{errors.date}</p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          {t("time")}
        </label>
        <TimeSlotPicker
          slots={timeSlots}
          unavailableSlots={unavailableSlots}
          selectedTime={formData.time}
          onSelect={(time) => setFormData({ ...formData, time })}
        />
        {errors.time && (
          <p className="mt-1 text-xs text-red-500">{errors.time}</p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          {t("duration")}
        </label>
        <div className="flex gap-2">
          {DURATION_OPTIONS.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setFormData({ ...formData, duration: d })}
              className={`flex-1 rounded-xl py-2.5 text-sm font-medium transition ${
                formData.duration === d
                  ? "bg-sport text-white"
                  : "border border-gray-200 bg-white text-navy hover:border-sport"
              }`}
            >
              {d} {t("hours")}
            </button>
          ))}
        </div>
        {errors.duration && (
          <p className="mt-1 text-xs text-red-500">{errors.duration}</p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          {t("notes")}
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={3}
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-sport py-3 text-sm font-semibold text-white transition hover:bg-sport-dark"
      >
        {t("submit")}
      </button>
    </form>
  );
}
