import { Booking, BookingFormData } from "@/types";
import { supabase } from "@/utils/supabase";

const STORAGE_KEY = "malaib-bookings";

type SupabaseBookingRow = {
  id: string;
  booking_code: string;
  full_name: string;
  phone: string;
  student_id: string | null;
  court_id: string;
  court_name: string;
  date: string;
  time: string;
  duration: number;
  notes: string | null;
  status: Booking["status"];
  created_at: string;
};

function mapSupabaseBooking(row: SupabaseBookingRow): Booking {
  return {
    id: row.id,
    bookingCode: row.booking_code,
    fullName: row.full_name,
    phone: row.phone,
    studentId: row.student_id || "",
    courtId: row.court_id,
    courtName: row.court_name,
    date: row.date,
    time: row.time,
    duration: row.duration,
    notes: row.notes || "",
    status: row.status,
    createdAt: row.created_at,
  };
}

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
    bookingCode: "MS-" + Math.floor(1000 + Math.random() * 9000),
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
  const index = bookings.findIndex((booking) => booking.id === id);

  if (index !== -1) {
    bookings[index].status = status;
    saveBookings(bookings);
  }
}

export function deleteBooking(id: string): void {
  const bookings = getBookings().filter((booking) => booking.id !== id);
  saveBookings(bookings);
}

export function getBookingStats(bookings: Booking[]) {
  return {
    total: bookings.length,
    pending: bookings.filter((booking) => booking.status === "pending").length,
    confirmed: bookings.filter((booking) => booking.status === "confirmed")
      .length,
    cancelled: bookings.filter((booking) => booking.status === "cancelled")
      .length,
  };
}

export interface BookingRepository {
  getAll(): Promise<Booking[]>;
  add(booking: BookingFormData, courtName: string): Promise<Booking>;
  updateStatus(id: string, status: Booking["status"]): Promise<void>;
  delete(id: string): Promise<void>;
}

export const supabaseBookingRepository: BookingRepository = {
  async getAll() {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching bookings:", error);
      return [];
    }

    return (data || []).map((row) =>
      mapSupabaseBooking(row as SupabaseBookingRow)
    );
  },

  async add(formData, courtName) {
    const bookingCode =
  "MS-" + Math.floor(1000 + Math.random() * 9000);
    const { data, error } = await supabase
      .from("bookings")
      .insert({
        booking_code: bookingCode,
        full_name: formData.fullName,
        phone: formData.phone,
        student_id: formData.studentId || null,
        court_id: formData.courtId,
        court_name: courtName,
        date: formData.date,
        time: formData.time,
        duration: formData.duration,
        notes: formData.notes || null,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("Error adding booking:", error);
      throw error;
    }

    return mapSupabaseBooking(data as SupabaseBookingRow);
  },

  async updateStatus(id, status) {
    const { error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error("Error updating booking:", error);
      throw error;
    }
  },

  async delete(id) {
    const { error } = await supabase.from("bookings").delete().eq("id", id);

    if (error) {
      console.error("Error deleting booking:", error);
      throw error;
    }
  },
};

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

export const bookingRepository = supabaseBookingRepository;