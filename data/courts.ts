import { Court } from "@/types";

export const courts: Court[] = [
  {
    id: "soccer-1",
    nameAr: "ملعب كرة القدم",
    nameEn: "Soccer Court",
    sport: "soccer",
    descriptionAr:
      "ملعب كرة قدم احترافي بعشب صناعي عالي الجودة، مناسب للمباريات والتدريبات الجامعية.",
    descriptionEn:
      "Professional soccer court with high-quality artificial turf, ideal for matches and university training sessions.",
    capacity: 22,
    pricePerHour: 20000,
    location: "Al-Mashreq University",
    openingHours: { start: "08:00", end: "22:00" },
    image: "/images/soccer.jpg",
    facilities: [
      { ar: "عشب صناعي", en: "Artificial turf" },
      { ar: "إضاءة ليلية", en: "Night lighting" },
    ],
  },
  {
    id: "tennis-1",
    nameAr: "ملعب التنس",
    nameEn: "Tennis Court",
    sport: "tennis",
    descriptionAr:
      "ملعب تنس معياري بسطح أكريليك، مثالي للمبتدئين والمحترفين على حد سواء.",
    descriptionEn:
      "Standard tennis court with acrylic surface, perfect for both beginners and advanced players.",
    capacity: 4,
    pricePerHour: 25000,
    location: "Al-Mashreq University",
    openingHours: { start: "08:00", end: "21:00" },
    image: "/images/tennis.jpg",
    facilities: [
      { ar: "سطح أكريليك", en: "Acrylic surface" },
      { ar: "شبكة احترافية", en: "Professional net" },
      { ar: "إضاءة", en: "Lighting" },
    ],
  },
  {
    id: "basketball-1",
    nameAr: "ملعب كرة السلة",
    nameEn: "Basketball Court",
    sport: "basketball",
    descriptionAr:
      "ملعب كرة سلة داخلي/خارجي بمعايير دولية، مجهز بلوحات زجاجية وخطوط واضحة.",
    descriptionEn:
      "Indoor/outdoor basketball court with international standards, glass backboards and clear markings.",
    capacity: 10,
    pricePerHour: 25000,
    location: "Al-Mashreq University",
    openingHours: { start: "08:00", end: "22:00" },
    image: "/images/basketball.jpg",
    facilities: [
      { ar: "لوحات زجاجية", en: "Glass backboards" },
      { ar: "أرضية مطاطية", en: "Rubber flooring" },
      { ar: "إضاءة LED", en: "LED lighting" }
    ]
  },
  {
    id: "volleyball-1",
    nameAr: "ملعب الطائرة",
    nameEn: "Volleyball Court",
    sport: "volleyball",
    descriptionAr:
      "ملعب كرة طائرة بمعايير رسمية، مناسب للفرق الجامعية والتدريبات.",
    descriptionEn:
      "Official standard volleyball court, suitable for university teams and training sessions.",
    capacity: 12,
    pricePerHour: 25000,
    location: "Al-Mashreq University",
    openingHours: { start: "08:00", end: "21:00" },
    image: "/images/volleyball.jpg",
    facilities: [
      { ar: "شبكة رسمية", en: "Official net" },
      { ar: "أرضية خشبية", en: "Wooden floor" },
      { ar: "إضاءة", en: "Lighting" },
      { ar: "منطقة جلوس", en: "Seating area" },
    ],
  },
];

export function getCourtById(id: string): Court | undefined {
  return courts.find((court) => court.id === id);
}
