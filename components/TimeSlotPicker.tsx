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
    return <p className="text-sm text-content-tertiary">{t("noCourts")}</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
      {slots.map((slot) => {
        const isUnavailable = unavailableSlots.includes(slot);
        const isSelected = selectedTime === slot;
        const timeFormatted = formatTime12Hour(slot);

        // Accessibility label
        const statusText = isUnavailable
          ? lang === "ar"
            ? "محجوز وغير متاح"
            : "booked and unavailable"
          : lang === "ar"
          ? "متاح للاختيار"
          : "available for selection";
        const ariaLabel = `${timeFormatted} — ${statusText}`;

        return (
          <button
            key={slot}
            type="button"
            disabled={isUnavailable}
            onClick={() => onSelect(slot)}
            aria-label={ariaLabel}
            className={`min-h-[52px] rounded-xl text-sm font-semibold transition-all duration-150 flex flex-col items-center justify-center gap-1 focus-visible:outline-sport ${
              isUnavailable
                ? "bg-surface-muted border border-surface-divider text-content-tertiary cursor-not-allowed opacity-60"
                : isSelected
                ? "bg-sport border border-sport text-white shadow-button scale-[1.02] z-10"
                : "border border-surface-border bg-white text-content-secondary hover:border-sport hover:bg-sport-50 hover:text-sport-700 hover:scale-[1.02]"
            }`}
          >
            <span>{timeFormatted}</span>

            {isUnavailable && (
              <svg className="h-3 w-3 shrink-0 text-content-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            )}
          </button>
        );
      })}
    </div>
  );
}
