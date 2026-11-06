import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import "./globals.css";

const tehnikum = localFont({
  src: "../fonts/Tehnikum-Light.otf",
  variable: "--font-tehnikum",
  weight: "300",
  style: "normal",
  display: "swap",
  adjustFontFallback: false,
  fallback: [],
});

const courierNew = localFont({
  src: [
    { path: "../fonts/Courier-New.ttf", weight: "400", style: "normal" },
    { path: "../fonts/Courier-New-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-courier-new",
  display: "swap",
  adjustFontFallback: false,
  fallback: [],
});

export const metadata: Metadata = {
  title: "Техникум — сеть бистро",
  description: "Сайт сети бистро Техникум",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className={`${tehnikum.variable} ${courierNew.variable}`}>
      <body className="m-0 bg-white font-brand-mono text-brand-ink [font-synthesis:none]">{children}</body>
    </html>
  );
}
