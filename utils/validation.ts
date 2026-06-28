import { BookingFormData } from "@/types";

export interface ValidationErrors {
  fullName?: string;
  phone?: string;
  date?: string;
  time?: string;
  duration?: string;
}

export function validateBookingForm(
  data: BookingFormData,
  messages: { required: string; invalidPhone: string }
): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.fullName.trim()) {
    errors.fullName = messages.required;
  }

  if (!data.phone.trim()) {
    errors.phone = messages.required;
  } else if (!/^[\d\s\-+()]{7,15}$/.test(data.phone.trim())) {
    errors.phone = messages.invalidPhone;
  }

  if (!data.date) {
    errors.date = messages.required;
  }

  if (!data.time) {
    errors.time = messages.required;
  }

  if (!data.duration || data.duration < 1) {
    errors.duration = messages.required;
  }

  return errors;
}
