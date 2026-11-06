import type { Metadata } from "next";
import Link from "next/link";
import LiquidGlassButtonDemo from "@/components/ui/LiquidGlassButtonDemo";

export const metadata: Metadata = {
  title: "Кнопка — пример компонента",
  robots: { index: false, follow: false },
};

export default function ButtonPreviewPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-10">
      <Link href="/" className="inline-flex min-h-11 items-center font-brand-mono text-sm text-brand-red underline-offset-4 hover:underline">← На главную</Link>
      <h1 className="mt-4 mb-8 font-brand text-4xl font-light">Кнопка Liquid Glass</h1>
      <LiquidGlassButtonDemo />
    </main>
  );
}
