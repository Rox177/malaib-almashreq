"use client";

import { useState, useEffect, useCallback } from "react";
import { Booking } from "@/types";
import { bookingRepository, getBookingStats } from "@/utils/bookings";
import { useLanguage } from "@/context/LanguageContext";
import AdminBookingTable from "@/components/AdminBookingTable";

// Future: wrap with auth guard
// export default withAuth(AdminPage);

export default function AdminPage() {
  const { t } = useLanguage();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const allBookings = await bookingRepository.getAll();
    setBookings(allBookings);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const stats = getBookingStats(bookings);

  const handleConfirm = async (id: string) => {
    await bookingRepository.updateStatus(id, "confirmed");
    refresh();
  };

  const handleCancel = async (id: string) => {
    await bookingRepository.updateStatus(id, "cancelled");
    refresh();
  };

  const handleDelete = async (id: string) => {
    await bookingRepository.delete(id);
    refresh();
  };

  const statCards = [
    {
      label: t("totalBookings"),
      value: stats.total,
      color: "bg-navy text-white",
    },
    {
      label: t("pendingBookings"),
      value: stats.pending,
      color: "bg-yellow-500 text-white",
    },
    {
      label: t("confirmedBookings"),
      value: stats.confirmed,
      color: "bg-sport text-white",
    },
    {
      label: t("cancelledBookings"),
      value: stats.cancelled,
      color: "bg-red-500 text-white",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-navy">{t("adminDashboard")}</h1>
        <p className="mt-2 text-gray-600">{t("adminDesc")}</p>
      </div>

      <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className={`rounded-2xl p-5 shadow-card ${card.color}`}
          >
            <p className="text-sm opacity-80">{card.label}</p>
            <p className="mt-1 text-3xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      <h2 className="mb-4 text-xl font-bold text-navy">
        {t("bookingRequests")}
      </h2>

      {loading ? (
        <div className="rounded-2xl bg-white p-8 text-center text-gray-500 shadow-card">
          Loading bookings...
        </div>
      ) : (
        <AdminBookingTable
          bookings={bookings}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
