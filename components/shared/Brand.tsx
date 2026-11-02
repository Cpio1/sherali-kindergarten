"use client";

import Image from "next/image";
import type { SiteImage } from "@/lib/images";
import { useLanguage } from "@/i18n/LanguageProvider";
import { languages } from "@/i18n/translations";

/** Временный графический знак (солнышко с листочком), пока нет настоящего логотипа. */
export function BrandMark({ className, size = 40 }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden="true" focusable="false" className={className}>
      <circle cx="24" cy="24" r="24" fill="#2F7653" />
      <g fill="#FFD56A">
        {Array.from({ length: 8 }, (_, i) => (
          <rect key={i} x="22.5" y="7" width="3" height="6" rx="1.5" transform={`rotate(${i * 45} 24 24)`} />
        ))}
      </g>
      <circle cx="24" cy="24" r="8.5" fill="#FFD56A" />
      <path d="M26 34c0-6 4-9 10-9 0 6-4 9-10 9Z" fill="#E7F1DD" />
      <path d="M14 33c1-4 4-6 8-5-1 4-4 6-8 5Z" fill="#F4B89F" />
    </svg>
  );
}

/** Логотип: настоящий файл public/images/logo.* или временный знак. */
export function Logo({ logo, size }: { logo: SiteImage | null; size: number }) {
  if (logo) {
    const width = Math.round((logo.width / logo.height) * size);
    return <Image src={logo.src} alt="" width={width} height={size} className="shrink-0 object-contain" style={{ height: size, width: "auto" }} />;
  }
  return <BrandMark className="shrink-0" size={size} />;
}

/** Переключатель ҚАЗ / РУС. */
export function LanguageSwitch({ compact = false }: { compact?: boolean }) {
  const { lang, setLang, t } = useLanguage();
  return (
    <div role="group" aria-label={t.langSwitchLabel} className="flex rounded-full bg-mint p-1 ring-1 ring-green/15">
      {languages.map((code) => {
        const active = code === lang;
        const label = code === "kk" ? "ҚАЗ" : "РУС";
        return (
          <button
            key={code}
            type="button"
            lang={code}
            aria-pressed={active}
            onClick={() => setLang(code)}
            className={`rounded-full font-bold tracking-wide transition-colors ${
              compact ? "min-h-11 min-w-12 px-2 text-[13px]" : "min-h-9 min-w-12 px-3 text-sm"
            } ${active ? "bg-green text-white shadow-sm" : "text-ink hover:bg-white"}`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export function SkipLink() {
  const { t } = useLanguage();
  return (
    <a
      href="#main"
      className="fixed top-2 left-2 z-[100] -translate-y-24 rounded-xl bg-green px-4 py-3 font-semibold text-white transition-transform focus:translate-y-0"
    >
      {t.skipLink}
    </a>
  );
}
