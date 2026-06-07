import { Booking, BookingFormData } from "@/types";

const STORAGE_KEY = "malaib-bookings";

export function getBookings(): Booking[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveBookings(bookings: Booking[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

export function createBooking(
  formData: BookingFormData,
  courtName: string
): Booking {
  return {
    id: `booking-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    fullName: formData.fullName,
    phone: formData.phone,
    studentId: formData.studentId,
    courtId: formData.courtId,
    courtName,
    date: formData.date,
    time: formData.time,
    duration: formData.duration,
    notes: formData.notes,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
}

export function addBooking(
  formData: BookingFormData,
  courtName: string
): Booking {
  const bookings = getBookings();
  const newBooking = createBooking(formData, courtName);
  bookings.push(newBooking);
  saveBookings(bookings);
  return newBooking;
}

export function updateBookingStatus(
  id: string,
  status: Booking["status"]
): void {
  const bookings = getBookings();
  const index = bookings.findIndex((b) => b.id === id);
  if (index !== -1) {
    bookings[index].status = status;
    saveBookings(bookings);
  }
}

export function deleteBooking(id: string): void {
  const bookings = getBookings().filter((b) => b.id !== id);
  saveBookings(bookings);
}

export function getBookingStats(bookings: Booking[]) {
  return {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };
}

// Future: replace localStorage calls with Firebase/Supabase adapter
export interface BookingRepository {
  getAll(): Promise<Booking[]>;
  add(booking: BookingFormData, courtName: string): Promise<Booking>;
  updateStatus(id: string, status: Booking["status"]): Promise<void>;
  delete(id: string): Promise<void>;
}

export const localBookingRepository: BookingRepository = {
  async getAll() {
    return getBookings();
  },
  async add(formData, courtName) {
    return addBooking(formData, courtName);
  },
  async updateStatus(id, status) {
    updateBookingStatus(id, status);
  },
  async delete(id) {
    deleteBooking(id);
  },
};
