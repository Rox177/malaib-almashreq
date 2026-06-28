"use client";

import { useState, useEffect, useCallback } from "react";
import { Booking } from "@/types";
import { bookingRepository, getBookingStats } from "@/utils/bookings";
import { useLanguage } from "@/context/LanguageContext";
import AdminBookingTable from "@/components/AdminBookingTable";

export default function AdminPage() {
  const { t, lang } = useLanguage();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [adminError, setAdminError] = useState<string | null>(null);

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
    setAdminError(null);
    try {
      await bookingRepository.updateStatus(id, "confirmed");
      refresh();
    } catch (error: any) {
      console.error(error);
      setAdminError(error?.message || (lang === "ar" ? "فشلت عملية التأكيد" : "Confirm failed"));
    }
  };

  const handleCancel = async (id: string) => {
    setAdminError(null);
    try {
      await bookingRepository.updateStatus(id, "cancelled");
      refresh();
    } catch (error: any) {
      console.error(error);
      setAdminError(error?.message || (lang === "ar" ? "فشلت عملية الإلغاء" : "Cancel failed"));
    }
  };

  const handleDelete = async (id: string) => {
    setAdminError(null);
    try {
      await bookingRepository.delete(id);
      refresh();
    } catch (error: any) {
      console.error(error);
      setAdminError(error?.message || (lang === "ar" ? "فشلت عملية الحذف" : "Delete failed"));
    }
  };

  return (
    <div className="min-h-screen bg-surface py-10 px-4 md:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-content-primary tracking-tight">
              {t("adminDashboard")}
            </h1>
            <p className="mt-1.5 text-sm text-content-secondary leading-relaxed">
              {t("adminDesc")}
            </p>
          </div>
          <button
            onClick={refresh}
            className="inline-flex items-center gap-2 rounded-xl border border-surface-border bg-white px-4.5 py-2 text-sm font-semibold text-content-primary shadow-xs hover:shadow-sm hover:border-sport/30 transition-all cursor-pointer focus-visible:outline-sport"
          >
            <svg className="h-4 w-4 text-content-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H17" />
            </svg>
            <span>{lang === "ar" ? "تحديث" : "Refresh"}</span>
          </button>
        </div>

        {/* Admin Error Banner */}
        {adminError && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700 flex items-center justify-between gap-2.5 mb-6 animate-fade-in" role="alert">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{adminError}</span>
            </div>
            <button onClick={() => setAdminError(null)} className="text-red-500 hover:text-red-700 font-bold p-1 rounded-lg cursor-pointer">
              ✕
            </button>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10">
          {/* Total Bookings Card */}
          <div className="bg-white rounded-2xl border border-surface-border border-s-2 border-s-navy shadow-card p-5 relative overflow-hidden h-[180px] flex flex-col justify-between group hover:shadow-md transition-all duration-300">
            <div>
              <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-content-tertiary">
                {t("totalBookings")}
              </span>
              <p className="mt-3 text-3xl md:text-5xl font-extrabold text-content-primary tracking-tight leading-none">
                {stats.total}
              </p>
            </div>
            {/* Watermark Icon */}
            <div className="absolute bottom-3 end-3 text-navy opacity-[0.06] pointer-events-none transform translate-y-2 translate-x-2 transition-transform duration-300 group-hover:scale-110 group-hover:translate-y-1 group-hover:translate-x-1">
              <svg className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" />
              </svg>
            </div>
          </div>

          {/* Pending Bookings Card */}
          <div className="bg-white rounded-2xl border border-surface-border border-s-2 border-s-amber-400 shadow-card p-5 relative overflow-hidden h-[180px] flex flex-col justify-between group hover:shadow-md transition-all duration-300">
            <div>
              <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-content-tertiary">
                {t("pendingBookings")}
              </span>
              <p className="mt-3 text-3xl md:text-5xl font-extrabold text-content-primary tracking-tight leading-none">
                {stats.pending}
              </p>
            </div>
            {/* Watermark Icon */}
            <div className="absolute bottom-3 end-3 text-amber-500 opacity-[0.06] pointer-events-none transform translate-y-2 translate-x-2 transition-transform duration-300 group-hover:scale-110 group-hover:translate-y-1 group-hover:translate-x-1">
              <svg className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          {/* Confirmed Bookings Card */}
          <div className="bg-white rounded-2xl border border-surface-border border-s-2 border-s-sport shadow-card p-5 relative overflow-hidden h-[180px] flex flex-col justify-between group hover:shadow-md transition-all duration-300">
            <div>
              <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-content-tertiary">
                {t("confirmedBookings")}
              </span>
              <p className="mt-3 text-3xl md:text-5xl font-extrabold text-content-primary tracking-tight leading-none">
                {stats.confirmed}
              </p>
            </div>
            {/* Watermark Icon */}
            <div className="absolute bottom-3 end-3 text-sport opacity-[0.06] pointer-events-none transform translate-y-2 translate-x-2 transition-transform duration-300 group-hover:scale-110 group-hover:translate-y-1 group-hover:translate-x-1">
              <svg className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          {/* Cancelled Bookings Card */}
          <div className="bg-white rounded-2xl border border-surface-border border-s-2 border-s-red-400 shadow-card p-5 relative overflow-hidden h-[180px] flex flex-col justify-between group hover:shadow-md transition-all duration-300">
            <div>
              <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-content-tertiary">
                {t("cancelledBookings")}
              </span>
              <p className="mt-3 text-3xl md:text-5xl font-extrabold text-content-primary tracking-tight leading-none">
                {stats.cancelled}
              </p>
            </div>
            {/* Watermark Icon */}
            <div className="absolute bottom-3 end-3 text-red-500 opacity-[0.06] pointer-events-none transform translate-y-2 translate-x-2 transition-transform duration-300 group-hover:scale-110 group-hover:translate-y-1 group-hover:translate-x-1">
              <svg className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Section Heading with Count Badge */}
        <div className="flex items-center gap-2.5 mb-6">
          <h2 className="text-xl font-extrabold text-content-primary tracking-tight">
            {t("bookingRequests")}
          </h2>
          <span className="inline-flex items-center justify-center rounded-full bg-navy/8 px-2.5 py-0.5 text-xs font-bold text-navy">
            {bookings.length}
          </span>
        </div>

        {/* Bookings Table / Loading Skeletons */}
        {loading ? (
          <div className="space-y-4">
            <div className="bg-surface-muted rounded-xl h-14 animate-pulse w-full" />
            <div className="bg-surface-muted rounded-xl h-14 animate-pulse w-[80%]" />
            <div className="bg-surface-muted rounded-xl h-14 animate-pulse w-[90%]" />
            <div className="bg-surface-muted rounded-xl h-14 animate-pulse w-[70%]" />
          </div>
        ) : (
          <div className="animate-fade-in">
            <AdminBookingTable
              bookings={bookings}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
              onDelete={handleDelete}
            />
          </div>
        )}
      </div>
    </div>
  );
}
