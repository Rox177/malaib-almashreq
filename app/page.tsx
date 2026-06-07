"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { sportEmojis } from "@/utils/sportIcons";
import { Sport } from "@/types";

const INSTAGRAM_URL = "https://www.instagram.com/stadium.almashreq";

const sports: Sport[] = ["soccer", "tennis", "basketball", "volleyball"];

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center md:py-28">
          <div className="mb-6 text-5xl">🏟️</div>
          <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            {t("appName")}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/70 md:text-xl">
            {t("appSubtitle")}
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-white/50">
            {t("heroDesc")}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/courts"
              className="w-full rounded-xl bg-sport px-8 py-3.5 text-base font-semibold text-white shadow-lg transition hover:bg-sport-dark sm:w-auto"
            >
              {t("bookNow")}
            </Link>
            <Link
              href="/courts"
              className="w-full rounded-xl border-2 border-white/30 px-8 py-3.5 text-base font-semibold text-white transition hover:bg-white/10 sm:w-auto"
            >
              {t("viewCourts")}
            </Link>
          </div>
        </div>
      </section>

      {/* Sports Categories */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-2xl font-bold text-navy md:text-3xl">
          {t("sports")}
        </h2>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {sports.map((sport) => (
            <Link
              key={sport}
              href="/courts"
              className="group rounded-2xl bg-white p-6 text-center shadow-card transition hover:shadow-card-hover"
            >
              <span className="text-4xl">{sportEmojis[sport]}</span>
              <p className="mt-3 text-sm font-semibold text-navy group-hover:text-sport md:text-base">
                {t(sport)}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Book */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl font-bold text-navy md:text-3xl">
            {t("whyBook")}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: "📱",
                title: t("easyBooking"),
                desc: t("easyBookingDesc"),
              },
              {
                icon: "🏫",
                title: t("universityCourts"),
                desc: t("universityCourtsDesc"),
              },
              {
                icon: "💰",
                title: t("affordable"),
                desc: t("affordableDesc"),
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-100 p-6 text-center"
              >
                <span className="text-3xl">{item.icon}</span>
                <h3 className="mt-3 text-lg font-bold text-navy">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-2xl bg-gradient-to-br from-navy to-navy-light p-8 text-center text-white md:p-12">
          <h2 className="text-2xl font-bold md:text-3xl">{t("followUs")}</h2>
          <p className="mx-auto mt-3 max-w-md text-white/70">
            {t("instagramDesc")}
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-navy transition hover:bg-gray-100"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.226-.149-4.771-1.694-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            @stadium.almashreq
          </a>
        </div>
      </section>
    </>
  );
}
