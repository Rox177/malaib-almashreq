"use client";

import { Booking } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { formatTime12Hour } from "@/utils/timeSlots";

interface AdminBookingTableProps {
  bookings: Booking[];
  onConfirm: (id: string) => void;
  onCancel: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function AdminBookingTable({
  bookings,
  onConfirm,
  onCancel,
  onDelete,
}: AdminBookingTableProps) {
  const { t, lang } = useLanguage();

  const getStatusStyle = (status: Booking["status"]) => {
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

  if (bookings.length === 0) {
    return (
      <div className="py-20 text-center flex flex-col items-center justify-center animate-fade-in bg-white border border-surface-border rounded-2xl shadow-sm">
        {/* SVG illustration */}
        <svg className="h-20 w-20 text-navy-100 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
        <p className="text-lg font-bold text-content-secondary">
          {t("noBookings")}
        </p>
        <p className="text-sm text-content-tertiary mt-1">
          {lang === "ar"
            ? "ستظهر طلبات الحجز هنا عند وصولها"
            : "Booking requests will appear here when they arrive"}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Desktop Table view (md and up) */}
      <div className="hidden md:block overflow-hidden rounded-2xl border border-surface-border bg-surface-card shadow-sm">
        <table className="w-full min-w-[1000px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-surface-border bg-surface-muted">
              <th className="px-5 py-4 text-start font-semibold text-content-tertiary uppercase tracking-wider">
                {t("bookingCode")}
              </th>
              <th className="px-5 py-4 text-start font-semibold text-content-tertiary uppercase tracking-wider">
                {t("name")}
              </th>
              <th className="px-5 py-4 text-start font-semibold text-content-tertiary uppercase tracking-wider">
                {t("court")}
              </th>
              <th className="px-5 py-4 text-start font-semibold text-content-tertiary uppercase tracking-wider">
                {t("date")}
              </th>
              <th className="px-5 py-4 text-start font-semibold text-content-tertiary uppercase tracking-wider">
                {t("time")}
              </th>
              <th className="px-5 py-4 text-start font-semibold text-content-tertiary uppercase tracking-wider">
                {t("duration")}
              </th>
              <th className="px-5 py-4 text-start font-semibold text-content-tertiary uppercase tracking-wider">
                {t("status")}
              </th>
              <th className="px-5 py-4 text-start font-semibold text-content-tertiary uppercase tracking-wider">
                {t("actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="border-b border-surface-divider last:border-0 hover:bg-sport-50/20 transition-colors duration-150"
              >
                <td className="px-5 py-4 font-mono font-bold text-navy">
                  {booking.bookingCode}
                </td>
                <td className="px-5 py-4 font-medium text-content-primary">
                  {booking.fullName}
                </td>
                <td className="px-5 py-4 text-content-secondary">
                  {booking.courtName}
                </td>
                <td className="px-5 py-4 text-content-secondary">
                  {booking.date}
                </td>
                <td className="px-5 py-4 text-content-secondary">
                  {formatTime12Hour(booking.time)}
                </td>
                <td className="px-5 py-4 text-content-secondary">
                  {booking.duration} {t("hours")}
                </td>
                <td className="px-5 py-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${getStatusStyle(booking.status)}`}>
                    {t(booking.status)}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-2">
                    {booking.status === "pending" && (
                      <>
                        <button
                          onClick={() => onConfirm(booking.id)}
                          className="rounded-lg border border-sport-200 bg-sport-50 px-3 py-1.5 text-xs font-medium text-sport-700 hover:bg-sport hover:text-white transition-all cursor-pointer"
                        >
                          {t("confirm")}
                        </button>
                        <button
                          onClick={() => onCancel(booking.id)}
                          className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 hover:bg-amber-500 hover:text-white transition-all cursor-pointer"
                        >
                          {t("cancel")}
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => onDelete(booking.id)}
                      className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                    >
                      {t("delete")}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Card View (below md breakpoint) */}
      <div className="md:hidden space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="rounded-2xl border border-surface-border bg-white p-5 shadow-xs flex flex-col gap-3 animate-fade-in"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-navy text-sm">
                {booking.bookingCode}
              </span>
              <span className={`rounded-full px-3 py-0.5 text-[11px] font-semibold ${getStatusStyle(booking.status)}`}>
                {t(booking.status)}
              </span>
            </div>

            <div className="space-y-1.5 border-t border-surface-divider pt-3">
              <p className="text-sm font-semibold text-content-primary">
                {booking.fullName}
              </p>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-content-secondary">
                <p>
                  <span className="font-medium text-content-tertiary">{t("court")}:</span>{" "}
                  {booking.courtName}
                </p>
                <p>
                  <span className="font-medium text-content-tertiary">{t("duration")}:</span>{" "}
                  {booking.duration} {t("hours")}
                </p>
                <p>
                  <span className="font-medium text-content-tertiary">{t("date")}:</span>{" "}
                  {booking.date}
                </p>
                <p>
                  <span className="font-medium text-content-tertiary">{t("time")}:</span>{" "}
                  {formatTime12Hour(booking.time)}
                </p>
              </div>
            </div>

            {/* Actions row */}
            <div className="flex flex-wrap gap-2 border-t border-surface-divider pt-3 justify-end">
              {booking.status === "pending" && (
                <>
                  <button
                    onClick={() => onConfirm(booking.id)}
                    className="flex-1 rounded-lg border border-sport-200 bg-sport-50 py-2 text-center text-xs font-semibold text-sport-700 hover:bg-sport hover:text-white transition-all cursor-pointer"
                  >
                    {t("confirm")}
                  </button>
                  <button
                    onClick={() => onCancel(booking.id)}
                    className="flex-1 rounded-lg border border-amber-200 bg-amber-50 py-2 text-center text-xs font-semibold text-amber-700 hover:bg-amber-500 hover:text-white transition-all cursor-pointer"
                  >
                    {t("cancel")}
                  </button>
                </>
              )}
              <button
                onClick={() => onDelete(booking.id)}
                className={`rounded-lg border border-red-200 bg-red-50 py-2 text-center text-xs font-semibold text-red-600 hover:bg-red-500 hover:text-white transition-all cursor-pointer ${
                  booking.status === "pending" ? "px-4" : "w-full"
                }`}
              >
                {t("delete")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
