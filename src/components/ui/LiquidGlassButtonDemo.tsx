"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LiquidGlass, LiquidGlassButton } from "./liquid-glass-button";

export default function LiquidGlassButtonDemo() {
  const [dark, setDark] = useState(false);
  const router = useRouter();

  return (
    <section className={`relative flex min-h-[70dvh] items-center justify-center overflow-hidden rounded-3xl p-6 sm:p-12 ${dark ? "bg-brand-ink" : "bg-brand-grey"}`}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[10%] -left-12 size-72 rounded-full bg-brand-red sm:size-100" />
        <div className="absolute top-[35%] right-[-10%] h-36 w-[75%] -rotate-20 bg-white" />
        <div className={`absolute right-[12%] bottom-[-15%] size-64 rotate-12 border-[40px] sm:size-96 ${dark ? "border-brand-red" : "border-brand-ink"}`} />
      </div>

      <div className="relative flex flex-col items-center gap-8">
        <LiquidGlassButton appearance={dark ? "dark" : "light"} onClick={() => router.push("/map")}>
          <span>Выбрать бистро</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </LiquidGlassButton>

        <LiquidGlass appearance={dark ? "dark" : "light"} className="max-w-72 p-6">
          <p className="font-brand text-2xl font-light">Жидкое стекло</p>
          <p className="mt-2 font-brand-mono text-xs leading-relaxed">Преломление фона и блик, который реагирует на движение указателя.</p>
        </LiquidGlass>
      </div>

      <button
        type="button"
        aria-pressed={dark}
        onClick={() => setDark((value) => !value)}
        className={`absolute top-4 right-4 min-h-11 rounded-full px-4 py-2 font-brand-mono text-xs underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red ${dark ? "text-white" : "text-brand-ink"}`}
      >
        Сменить фон
      </button>
    </section>
  );
}
