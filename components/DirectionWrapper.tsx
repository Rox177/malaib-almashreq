"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function DirectionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { dir, lang } = useLanguage();

  return (
    <div
      dir={dir}
      lang={lang}
      className={lang === "ar" ? "font-arabic" : "font-sans"}
    >
      {children}
    </div>
  );
}
