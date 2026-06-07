import { Sport } from "@/types";

export const sportEmojis: Record<Sport, string> = {
  soccer: "⚽",
  tennis: "🎾",
  basketball: "🏀",
  volleyball: "🏐",
};

export const sportColors: Record<Sport, string> = {
  soccer: "bg-green-100 text-green-700",
  tennis: "bg-yellow-100 text-yellow-700",
  basketball: "bg-orange-100 text-orange-700",
  volleyball: "bg-blue-100 text-blue-700",
};
