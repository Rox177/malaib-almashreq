export function formatTime12Hour(time: string) {
      const [hourString, minute] = time.split(":");
      const hour = Number(hourString);
      const period = hour >= 12 ? "PM" : "AM";
      const hour12 = hour % 12 || 12;
      return `${hour12}:${minute} ${period}`;
}