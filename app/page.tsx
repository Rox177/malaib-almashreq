"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Sport } from "@/types";
import { getSportGradient, getSportSVG } from "@/components/CourtCard";

const INSTAGRAM_URL = "https://www.instagram.com/stadium.almashreq";

const sports: Sport[] = ["soccer", "tennis", "basketball", "volleyball"];

const sportCourtLinks: Record<Sport, string> = {
  soccer: "/courts/soccer-1",
  tennis: "/courts/tennis-1",
  basketball: "/courts/basketball-1",
  volleyball: "/courts/volleyball-1",
};

export default function HomePage() {
  const { t, lang } = useLanguage();
  const [showNavDropdown, setShowNavDropdown] = useState(false);
  const navDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navDropdownRef.current && !navDropdownRef.current.contains(event.target as Node)) {
        setShowNavDropdown(false);
      }
    };
    if (showNavDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showNavDropdown]);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-[#0d2138] py-28 md:py-36">
        {/* Radial Glow Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_40%,rgba(22,163,74,0.15),transparent)] z-0 pointer-events-none" />

        {/* Mesh Dot Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:32px_32px] z-0 pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center md:px-6">
          {/* Pretitle Badge */}
          <div className="mb-6 bg-sport/15 border border-sport/25 text-sport text-xs font-bold rounded-full px-5 py-2 inline-flex items-center gap-2 animate-fade-in shadow-xs">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>
              {lang === "ar" ? "جامعة المشرق" : "Al-Mashreq University"}
            </span>
          </div>

          <h1 className="text-4xl font-extrabold text-white md:text-5xl lg:text-7xl tracking-tight leading-tight md:leading-tight lg:leading-tight animate-fade-up">
            {t("appName")}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base md:text-xl text-white/70 leading-relaxed animate-fade-up animation-delay-100">
            {t("appSubtitle")}
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-xs md:text-sm text-white/50 leading-relaxed animate-fade-up animation-delay-200">
            {t("heroDesc")}
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-up animation-delay-300">
            <Link
              href="/courts"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-sport px-8 py-3.5 text-base font-semibold text-white shadow-button hover:bg-sport-700 hover:shadow-lg hover:-translate-y-px transition-all cursor-pointer"
            >
              <span>{t("bookNow")}</span>
              <svg className="h-5 w-5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link
              href="/courts"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/8 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/15 hover:border-white/30 transition-all cursor-pointer"
            >
              <span>{t("viewCourts")}</span>
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="mt-20 pt-10 border-t border-white/10 flex justify-center gap-8 md:gap-20 animate-fade-up animation-delay-400">
            <div className="text-center">
              <p className="text-xl md:text-3xl font-extrabold text-white">4</p>
              <p className="text-xs md:text-sm text-white/40 mt-1 font-medium tracking-wide">
                {lang === "ar" ? "ملاعب" : "Courts"}
              </p>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <p className="text-xl md:text-3xl font-extrabold text-white">4</p>
              <p className="text-xs md:text-sm text-white/40 mt-1 font-medium tracking-wide">
                {lang === "ar" ? "رياضات متميزة" : "Sports"}
              </p>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <p className="text-xl md:text-3xl font-extrabold text-white">
                {lang === "ar" ? "4:00  م - 12:00ص " : "4:00 PM - 12:00 AM"}
              </p>
              <p className="text-xs md:text-sm text-white/40 mt-1 font-medium tracking-wide">
                {lang === "ar" ? "ساعات الحجز" : "Hours"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sports Categories Section */}
      <section className="bg-surface py-20 md:py-24 px-4">
        <div className="mx-auto max-w-6xl md:px-6 text-center">
          <span className="text-sport-600 text-xs font-bold uppercase tracking-widest bg-sport/10 rounded-full px-4 py-1.5 inline-block">
            {lang === "ar" ? "الرياضات المتاحة" : "Sports Available"}
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-content-primary mt-4 tracking-tight">
            {t("sports")}
          </h2>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {sports.map((sport) => (
              <Link
                key={sport}
                href={sportCourtLinks[sport]}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 py-8 px-4 text-center border border-surface-border ${getSportGradient(sport)}`}
              >
                {/* SVG sport icon */}
                <div className="mx-auto text-white/80 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                  {getSportSVG(sport, "h-14 w-14")}
                </div>
                <p className="mt-4 text-base font-bold text-white tracking-wide">
                  {t(sport)}
                </p>
                <div className="mt-2 text-[10px] text-white/40 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-1">
                  <span>{lang === "ar" ? "احجز الآن" : "Book now"}</span>
                  <svg className="h-3 w-3 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Book Section */}
      <section className="bg-white py-20 px-4">
        <div className="mx-auto max-w-6xl md:px-6">
          <div className="text-center mb-12">
            <span className="text-sport-600 text-xs font-bold uppercase tracking-widest bg-sport/10 rounded-full px-4 py-1.5 inline-block">
              {lang === "ar" ? "خدماتنا" : "Our Services"}
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-content-primary mt-4 tracking-tight">
              {t("whyBook")}
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: (
                  <svg className="h-6 w-6 text-sport" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                ),
                title: t("easyBooking"),
                desc: t("easyBookingDesc"),
              },
              {
                icon: (
                  <svg className="h-6 w-6 text-sport" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
                title: t("universityCourts"),
                desc: t("universityCourtsDesc"),
              },
              {
                icon: (
                  <svg className="h-6 w-6 text-sport" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: t("affordable"),
                desc: t("affordableDesc"),
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-surface-muted p-8 border border-surface-border hover:border-sport/30 hover:bg-sport-50/30 transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div className="h-12 w-12 rounded-xl bg-sport/10 flex items-center justify-center mb-5 group-hover:scale-115 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-content-primary">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-content-secondary leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-surface py-20 px-4">
        <div className="mx-auto max-w-6xl md:px-6">
          <div className="text-center mb-12">
            <span className="text-sport-600 text-xs font-bold uppercase tracking-widest bg-sport/10 rounded-full px-4 py-1.5 inline-block">
              {lang === "ar" ? "آلية الحجز" : "Booking Flow"}
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-content-primary mt-4 tracking-tight">
              {t("howItWorks")}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-content-secondary leading-relaxed">
              {t("howItWorksDesc")}
            </p>
          </div>

          <div className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Connecting line on desktop */}
            <div className="absolute top-[52px] inset-x-12 h-0.5 bg-surface-border hidden lg:block z-0" />

            {[
              {
                step: "1",
                icon: (
                  <svg className="h-8 w-8 text-sport" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
                title: t("chooseCourt"),
                desc: t("chooseCourtDesc"),
              },
              {
                icon: (
                  <svg className="h-8 w-8 text-sport" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                step: "2",
                title: t("selectDateTime"),
                desc: t("selectDateTimeDesc"),
              },
              {
                icon: (
                  <svg className="h-8 w-8 text-sport" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                step: "3",
                title: t("sendRequest"),
                desc: t("sendRequestDesc"),
              },
              {
                icon: (
                  <svg className="h-8 w-8 text-sport" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                step: "4",
                title: t("waitConfirmation"),
                desc: t("waitConfirmationDesc"),
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative rounded-2xl border border-surface-border bg-white p-6 pt-10 text-center shadow-card z-10"
              >
                {/* Step Number Badge */}
                <div className="absolute -top-4.5 left-1/2 -translate-x-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-navy text-sm font-bold text-white ring-4 ring-surface shadow-md">
                  {item.step}
                </div>
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-base font-bold text-content-primary">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-content-secondary leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location / Navigation Section */}
      <section className="bg-surface py-16 px-4 border-t border-surface-border text-center relative overflow-hidden">
        {/* Spot light overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_100%,rgba(22,163,74,0.03),transparent)] pointer-events-none" />

        <div className="max-w-2xl mx-auto relative z-10 flex flex-col items-center">
          {/* Location Badge */}
          <span className="text-sport-600 text-xs font-bold uppercase tracking-widest bg-sport/10 rounded-full px-4 py-1.5 inline-block">
            {lang === "ar" ? "الاتجاهات والموقع" : "Location & Directions"}
          </span>

          <h2 className="text-2xl md:text-3xl font-extrabold text-content-primary mt-4 tracking-tight">
            {lang === "ar" ? "أين تجدنا؟" : "How to Find Us"}
          </h2>

          <p className="text-content-secondary mt-3 text-sm md:text-base leading-relaxed max-w-lg">
            {lang === "ar"
              ? "ملاعب ملاعب المشرق تقع داخل الحرم الجامعي لجامعة المشرق في بغداد. يمكنك الوصول إلينا بسهولة عبر تطبيقات الملاحة."
              : "Malaib Al-Mashreq courts are located inside the main campus of Al-Mashreq University in Baghdad. Easily navigate to us using your preferred maps app."}
          </p>

          <div className="mt-8 relative inline-block text-start" ref={navDropdownRef}>
            <button
              type="button"
              onClick={() => setShowNavDropdown(true)}
              className="inline-flex items-center gap-2.5 rounded-xl bg-sport hover:bg-sport-700 px-6 py-3.5 text-sm font-bold text-white shadow-button hover:-translate-y-px transition-all active:translate-y-0 cursor-pointer"
            >
              <svg className="h-5 w-5 text-white shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{t("navigate")}</span>
            </button>

            {showNavDropdown && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs animate-fade-in cursor-pointer"
                  onClick={() => setShowNavDropdown(false)}
                />

                {/* Popup / Sheet Container */}
                <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center pointer-events-none p-0 md:p-6">
                  <div
                    className={`bg-white border-t md:border border-surface-border shadow-xl w-full md:max-w-[340px] pointer-events-auto overflow-hidden animate-scale-in p-5 relative rounded-t-3xl md:rounded-3xl pb-8 md:pb-5 ${
                      lang === "ar" ? "font-arabic" : "font-sans"
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-content-primary">
                        {t("navigate")}
                      </h3>
                      <button
                        type="button"
                        onClick={() => setShowNavDropdown(false)}
                        className="text-content-tertiary hover:text-content-primary p-1 rounded-lg hover:bg-surface-muted transition-colors cursor-pointer"
                      >
                        <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {/* Cards Stack */}
                    <div className="flex flex-col gap-2.5">
                      {/* Google Maps Card */}
                      <a
                        href="https://maps.app.goo.gl/qq5fiTnwWWmNuMDcA?g_st=ic"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setShowNavDropdown(false)}
                        className="flex items-center gap-3.5 h-[68px] bg-surface-muted hover:bg-sport-50/50 border border-surface-border hover:border-sport/30 rounded-2xl p-3.5 transition-all duration-200 group cursor-pointer"
                      >
                        {/* Logo */}
                        <div className="h-9 w-9 shrink-0 flex items-center justify-center bg-white rounded-xl shadow-xs border border-surface-divider p-0.5">
                          <svg className="h-7.5 w-7.5" viewBox="0 0 24 24">
                            <path d="M12.5 3C9.46 3 7 5.46 7 8.5c0 3.32 3.6 8.52 4.93 10.25a.7.7 0 001.14 0c1.33-1.73 4.93-6.93 4.93-10.25C18 5.46 15.54 3 12.5 3zm0 8.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#ea4335" />
                            <path d="M7 8.5c0-1 .27-1.93.73-2.73L12.5 13l4.77-7.23c.46.8.73 1.73.73 2.73 0 2.21-1.93 5.9-4.25 8.9L12.5 19 7 8.5z" fill="#4285f4" opacity="0.15" />
                            <path d="M12.5 3C9.46 3 7 5.46 7 8.5c0 .72.16 1.4.45 2.02l4.98-7.53C12.45 3 12.48 3 12.5 3z" fill="#fbbc05" />
                            <path d="M12.5 18.75a.7.7 0 01-.57-.29l-3.23-4.52L12.5 8.5l3.8 5.44-3.23 4.52c-.15.2-.38.29-.57.29z" fill="#34a853" />
                            <circle cx="12.5" cy="8.5" r="2" fill="#4285f4" />
                          </svg>
                        </div>
                        <div className="text-start">
                          <p className="text-sm font-bold text-content-primary leading-none">
                            {t("googleMaps")}
                          </p>
                          <p className="text-[10px] text-content-tertiary mt-1 font-medium leading-none">
                            {lang === "ar" ? "فتح في خرائط Google" : "Open in Google Maps"}
                          </p>
                        </div>
                        <svg className="h-4 w-4 text-content-tertiary group-hover:text-sport ms-auto shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>

                      {/* Waze Card */}
                      <a
                        href="https://waze.com/ul/hsvzmr37f0"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setShowNavDropdown(false)}
                        className="flex items-center gap-3.5 h-[68px] bg-surface-muted hover:bg-sport-50/50 border border-surface-border hover:border-sport/30 rounded-2xl p-3.5 transition-all duration-200 group cursor-pointer"
                      >
                        {/* Logo */}
                        <div className="h-9 w-9 shrink-0 flex items-center justify-center bg-white rounded-xl shadow-xs border border-surface-divider p-0.5">
                          <svg className="h-7.5 w-7.5" viewBox="0 0 30 30" fill="none">
                            <path d="M15 2.5C8.1 2.5 2.5 8.1 2.5 15c0 2.8 1 5.4 2.7 7.5l-.9 3.3a1 1 0 001.2 1.2l3.3-.9c2.1 1.7 4.7 2.7 7.5 2.7 6.9 0 12.5-5.6 12.5-12.5S21.9 2.5 15 2.5z" fill="#33CCFF" />
                            <path d="M21 16.5c0-1.9-1.6-3.5-3.5-3.5S14 14.6 14 16.5s1.6 3.5 3.5 3.5 3.5-1.6 3.5-3.5z" fill="#FFFFFF" />
                            <path d="M11 16.5c0-1.9-1.6-3.5-3.5-3.5S4 14.6 4 16.5s1.6 3.5 3.5 3.5 3.5-1.6 3.5-3.5z" fill="#FFFFFF" />
                            <circle cx="17.5" cy="16.5" r="1" fill="#333333" />
                            <circle cx="7.5" cy="16.5" r="1" fill="#333333" />
                            <path d="M23 20c.5 0 1-.5 1-1v-2c0-.5-.5-1-1-1s-1 .5-1 1v2c0 .5.5 1 1 1z" fill="#FF5C5C" />
                          </svg>
                        </div>
                        <div className="text-start">
                          <p className="text-sm font-bold text-content-primary leading-none">
                            {t("waze")}
                          </p>
                          <p className="text-[10px] text-content-tertiary mt-1 font-medium leading-none">
                            {lang === "ar" ? "فتح في تطبيق Waze" : "Open in Waze"}
                          </p>
                        </div>
                        <svg className="h-4 w-4 text-content-tertiary group-hover:text-sport ms-auto shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Instagram CTA Section */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 via-navy-800 to-[#0d2c1e] p-10 md:p-16 text-center text-white shadow-xl">
          {/* Dot Pattern Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:32px_32px] pointer-events-none" />

          {/* Decorative Blurred Accent Circles */}
          <div className="absolute -top-20 -end-20 h-48 w-48 rounded-full bg-sport/15 blur-3xl z-0" />
          <div className="absolute -bottom-30 -start-30 h-72 w-72 rounded-full bg-sport/10 blur-3xl z-0" />

          <h2 className="text-2xl font-bold md:text-4xl relative z-10 tracking-tight">
            {t("followUs")}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/60 text-sm md:text-base relative z-10 leading-relaxed">
            {t("instagramDesc")}
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2.5 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-navy shadow-lg hover:bg-sport-50 hover:-translate-y-px active:translate-y-0 transition-all relative z-10 cursor-pointer"
          >
            <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.226-.149-4.771-1.694-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <span>@stadium.almashreq</span>
          </a>
        </div>
      </section>
    </div>
  );
}
