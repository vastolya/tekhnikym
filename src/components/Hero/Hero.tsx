"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative flex min-h-[calc(100svh-116px)] items-center justify-center bg-brand-ink px-6 py-16 max-sm:min-h-[calc(100svh-144px)]">
      <Image
        src="/images/hero-kitchen.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <h1 className="sr-only">Техникум — сеть бистро</h1>
      <LiquidGlassButton
        appearance="dark"
        className="relative z-10"
        onClick={() => router.push("/map")}
      >
        Выбрать бистро
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </LiquidGlassButton>
    </section>
  );
}
