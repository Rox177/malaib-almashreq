"use client";

import { Booking } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

interface AdminBookingTableProps {
  bookings: Booking[];
  onConfirm: (id: string) => void;
  onCancel: (id: string) => void;
  onDelete: (id: string) => void;
}

const statusStyles: Record<Booking["status"], string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function AdminBookingTable({
  bookings,
  onConfirm,
  onCancel,
  onDelete,
}: AdminBookingTableProps) {
  const { t } = useLanguage();

  if (bookings.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-12 text-center shadow-card">
        <p className="text-4xl">📋</p>
        <p className="mt-4 text-gray-500">{t("noBookings")}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl bg-white shadow-card">
      <table className="w-full min-w-[800px] text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50">
            <th className="px-4 py-3 text-start font-semibold text-navy">
              {t("name")}
            </th>
            <th className="px-4 py-3 text-start font-semibold text-navy">
              {t("phone")}
            </th>
            <th className="px-4 py-3 text-start font-semibold text-navy">
              {t("court")}
            </th>
            <th className="px-4 py-3 text-start font-semibold text-navy">
              {t("date")}
            </th>
            <th className="px-4 py-3 text-start font-semibold text-navy">
              {t("time")}
            </th>
            <th className="px-4 py-3 text-start font-semibold text-navy">
              {t("duration")}
            </th>
            <th className="px-4 py-3 text-start font-semibold text-navy">
              {t("status")}
            </th>
            <th className="px-4 py-3 text-start font-semibold text-navy">
              {t("actions")}
            </th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr
              key={booking.id}
              className="border-b border-gray-50 transition hover:bg-gray-50/50"
            >
              <td className="px-4 py-3 font-medium text-navy">
                {booking.fullName}
              </td>
              <td className="px-4 py-3 text-gray-600" dir="ltr">
                {booking.phone}
              </td>
              <td className="px-4 py-3 text-gray-600">{booking.courtName}</td>
              <td className="px-4 py-3 text-gray-600">{booking.date}</td>
              <td className="px-4 py-3 text-gray-600">{booking.time}</td>
              <td className="px-4 py-3 text-gray-600">
                {booking.duration} {t("hours")}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyles[booking.status]}`}
                >
                  {t(booking.status)}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-1.5">
                  {booking.status === "pending" && (
                    <button
                      onClick={() => onConfirm(booking.id)}
                      className="rounded-lg bg-sport px-2.5 py-1 text-xs font-medium text-white transition hover:bg-sport-dark"
                    >
                      {t("confirm")}
                    </button>
                  )}
                  {booking.status !== "cancelled" && (
                    <button
                      onClick={() => onCancel(booking.id)}
                      className="rounded-lg bg-yellow-500 px-2.5 py-1 text-xs font-medium text-white transition hover:bg-yellow-600"
                    >
                      {t("cancel")}
                    </button>
                  )}
                  <button
                    onClick={() => onDelete(booking.id)}
                    className="rounded-lg bg-red-500 px-2.5 py-1 text-xs font-medium text-white transition hover:bg-red-600"
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
  );
}
