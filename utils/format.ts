export function formatTime12Hour(time: string) {
      const [hourString, minute] = time.split(":");
      const hour = Number(hourString);
      const period = hour >= 12 ? "PM" : "AM";
      const hour12 = hour % 12 || 12;
      return `${hour12}:${minute} ${period}`;
}

export function formatPrice(price: number, lang: string): string {
  if (lang === "ar") {
    return `${price.toLocaleString("ar-EG")} د.ع`;
  }
  return `${price.toLocaleString("en-US")} IQD`;
}