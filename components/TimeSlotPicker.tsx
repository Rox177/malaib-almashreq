"use client";

import { useLanguage } from "@/context/LanguageContext";
import { formatTime12Hour } from "@/utils/timeSlots";

interface TimeSlotPickerProps {
  slots: string[];
  unavailableSlots: string[];
  selectedTime: string;
  onSelect: (time: string) => void;
}

export default function TimeSlotPicker({
  slots,
  unavailableSlots,
  selectedTime,
  onSelect,
}: TimeSlotPickerProps) {
  const { lang, t } = useLanguage();

  if (slots.length === 0) {
    return <p className="text-sm text-gray-500">{t("noCourts")}</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
      {slots.map((slot) => {
        const isUnavailable = unavailableSlots.includes(slot);
        const isSelected = selectedTime === slot;

        return (
          <button
            key={slot}
            type="button"
            disabled={isUnavailable}
            onClick={() => onSelect(slot)}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
              isUnavailable
                ? "cursor-not-allowed border border-red-200 bg-red-50 text-red-500"
                : isSelected
                  ? "bg-sport text-white shadow-md"
                  : "border border-gray-200 bg-white text-navy hover:border-sport hover:bg-sport/5"
            }`}
          >
            <span className={isUnavailable ? "line-through" : ""}>
              {formatTime12Hour(slot)}
            </span>

            {isUnavailable && (
              <span className="mt-1 block text-[10px] font-semibold no-underline">
                {lang === "ar" ? "محجوز" : "Booked"}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
