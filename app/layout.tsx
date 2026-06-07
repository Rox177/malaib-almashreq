import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DirectionWrapper from "@/components/DirectionWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "ملاعب المشرق | Malaib Al-Mashreq",
  description:
    "احجز ملعبك بسهولة داخل جامعة المشرق — كرة القدم، التنس، السلة، والطائرة",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" suppressHydrationWarning>
      <body className={`${inter.variable} ${cairo.variable}`}>
        <LanguageProvider>
          <DirectionWrapper>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </DirectionWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}
