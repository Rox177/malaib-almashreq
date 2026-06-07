import { Court, Booking } from "@/types";

export function generateTimeSlots(
  openingHours: { start: string; end: string },
  intervalMinutes = 60
): string[] {
  const slots: string[] = [];

  const [startH, startM] = openingHours.start.split(":").map(Number);
  const [endH, endM] = openingHours.end.split(":").map(Number);

  let current = startH * 60 + startM;
  let end = endH * 60 + endM;

  if (end <= current) {
    end += 24 * 60;
  }

  while (current < end) {
    const minutesInDay = current % (24 * 60);
    const h = Math.floor(minutesInDay / 60);
    const m = minutesInDay % 60;

    slots.push(
      `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`
    );

    current += intervalMinutes;
  }

  return slots;
}

export function isSlotBooked(
  bookings: Booking[],
  courtId: string,
  date: string,
  time: string,
  duration: number
): boolean {
  const requestedStart = timeToMinutes(time);
  const requestedEnd = requestedStart + duration * 60;

  return bookings.some((booking) => {
    if (booking.courtId !== courtId || booking.date !== date) return false;
    if (booking.status === "cancelled") return false;

    const bookingStart = timeToMinutes(booking.time);
    const bookingEnd = bookingStart + booking.duration * 60;

    return requestedStart < bookingEnd && requestedEnd > bookingStart;
  });
}

export function getUnavailableSlots(
  bookings: Booking[],
  court: Court,
  date: string
): string[] {
  const allSlots = generateTimeSlots(court.openingHours);

  return allSlots.filter((slot) =>
    isSlotBooked(bookings, court.id, date, slot, 1)
  );
}

function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);

  if (h === 0) {
    return 24 * 60 + m;
  }

  return h * 60 + m;
}

export function getMinDate(): string {
  return new Date().toISOString().split("T")[0];
}

export function formatTime12Hour(time: string): string {
  const [hourString, minute] = time.split(":");
  const hour = Number(hourString);

  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;

  return `${hour12}:${minute} ${period}`;
}
