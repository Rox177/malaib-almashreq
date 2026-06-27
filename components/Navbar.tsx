"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { usePathname } from "next/navigation";
import LanguageToggle from "./LanguageToggle";
import Image from "next/image";

export default function Navbar() {
  const { t, lang } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  const links = [
    { href: "/", label: t("home") },
    { href: "/courts", label: t("courts") },
  ];

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMobileOpen(false);
      }
    };
    if (mobileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileOpen]);

  return (
    <nav
      ref={navRef}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy shadow-lg py-2.5"
          : "bg-navy/95 backdrop-blur-md border-b border-white/8 py-3 md:py-3.5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 md:px-6">
        {/* Logo + Name */}
        <Link href="/" className="flex items-center gap-3 group focus-visible:outline-white">
          <div className="relative overflow-hidden rounded-xl ring-1 ring-white/20 transition-transform group-hover:scale-105">
            <Image
              src="/almashreq-logo.png"
              alt="Al-Mashreq University Logo"
              width={44}
              height={44}
              className="h-10 w-10 object-contain p-0.5 md:h-11 md:w-11"
            />
          </div>
          <span className="hidden md:inline text-lg font-bold text-white tracking-wide">
            {t("appName")}
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-white bg-white/10 rounded-lg"
                    : "text-white/85 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="h-4 w-px bg-white/15" />
          <LanguageToggle />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 md:hidden">
          <LanguageToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-xl p-2.5 text-white hover:bg-white/10 transition-colors focus-visible:outline-white"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Backdrop Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 top-[60px] z-40 bg-black/25 backdrop-blur-sm md:hidden animate-fade-in" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile Menu Content */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 z-50 border-b border-white/8 bg-navy/95 backdrop-blur-md px-4 py-4 md:hidden animate-slide-down">
          <div className="flex flex-col gap-2">
            {links.map((link, idx) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{ animationDelay: `${(idx + 1) * 75}ms` }}
                  className={`block px-4 py-3 text-base font-medium rounded-xl transition-all animate-fade-up ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
