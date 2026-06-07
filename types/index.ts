export type Sport = "soccer" | "tennis" | "basketball" | "volleyball";

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export type Language = "ar" | "en";

export interface Court {
  id: string;
  nameAr: string;
  nameEn: string;
  sport: Sport;
  descriptionAr: string;
  descriptionEn: string;
  capacity: number;
  pricePerHour: number;
  location: string;
  openingHours: { start: string; end: string };
  image: string;
  facilities: { ar: string; en: string }[];
}

export interface Booking {
  id: string;
  fullName: string;
  phone: string;
  studentId?: string;
  courtId: string;
  courtName: string;
  date: string;
  time: string;
  duration: number;
  notes?: string;
  status: BookingStatus;
  createdAt: string;
}

export interface BookingFormData {
  fullName: string;
  phone: string;
  studentId?: string;
  courtId: string;
  date: string;
  time: string;
  duration: number;
  notes?: string;
}
