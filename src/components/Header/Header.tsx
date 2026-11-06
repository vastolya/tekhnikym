"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Language = "ru" | "en";

export default function Header() {
  const [language, setLanguage] = useState<Language>("ru");

  return (
    <header className="relative z-20 flex min-h-29 items-center justify-between gap-8 border-b border-brand-grey bg-white px-10 py-6 font-brand-mono text-brand-ink max-sm:min-h-32 max-sm:flex-wrap max-sm:gap-x-4 max-sm:gap-y-2 max-sm:p-4 [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-brand-red [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-4 [&_button:focus-visible]:outline-brand-red">
      <Link className="inline-flex shrink-0 py-3" href="/" aria-label="Техникум — главная">
        <Image
          src="/brand/tehnikum-logo.svg"
          alt="Техникум"
          width={232}
          height={29}
          className="block h-auto w-58 max-sm:w-42.5"
          priority
        />
      </Link>

      <div className="flex items-center gap-9 max-sm:contents">
        <button
          type="button"
          aria-label={language === "ru" ? "Язык шапки: русский. Switch to English" : "Header language: English. Переключить на русский"}
          className="inline-flex h-12 w-11 shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent px-1 text-sm leading-none text-brand-ink uppercase transition-colors hover:text-brand-red max-sm:ml-auto"
          onClick={() => setLanguage((current) => current === "ru" ? "en" : "ru")}
        >
          <span className="[text-box:trim-both_cap_alphabetic]">{language}</span>
        </button>

        <Link
          href="/map"
          lang={language}
          className="inline-grid h-12 shrink-0 items-center justify-items-center font-brand text-2xl leading-none font-light whitespace-nowrap text-brand-red underline-offset-4 hover:underline max-sm:w-full [&_span]:[text-box:trim-both_cap_alphabetic]"
        >
          <span aria-hidden={language !== "ru"} className={`col-start-1 row-start-1 ${language !== "ru" ? "invisible" : ""}`}>Выбрать бистро</span>
          <span aria-hidden={language !== "en"} className={`col-start-1 row-start-1 ${language !== "en" ? "invisible" : ""}`}>Choose a bistro</span>
        </Link>
      </div>
    </header>
  );
}
