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
  const { t } = useLanguage();

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
                ? "cursor-not-allowed bg-gray-100 text-gray-400 line-through"
                : isSelected
                  ? "bg-sport text-white shadow-md"
                  : "border border-gray-200 bg-white text-navy hover:border-sport hover:bg-sport/5"
            }`}
          >
            {formatTime12Hour(slot)}
          </button>
        );
      })}
    </div>
  );
}
