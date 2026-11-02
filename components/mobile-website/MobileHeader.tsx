"use client";

import { useEffect, useRef, useState } from "react";
import { sectionIds } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SiteImage } from "@/lib/images";
import { WhatsAppLink } from "@/components/shared/Actions";
import { LanguageSwitch, Logo } from "@/components/shared/Brand";
import { CloseIcon, MenuIcon } from "@/components/shared/Icons";
import { useScrolledPast } from "@/components/shared/hooks";

const dotTones = ["bg-sun", "bg-green", "bg-peach", "bg-sun", "bg-green", "bg-peach", "bg-sun"];

export function MobileHeader({ logo }: { logo: SiteImage | null }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const scrolled = useScrolledPast(4);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  // Escape и нажатие вне меню закрывают его; фокус возвращается на кнопку.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!panel.current?.contains(target) && !toggle.current?.contains(target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 bg-milk pt-[env(safe-area-inset-top)] transition-shadow ${
        scrolled || open ? "shadow-[0_6px_20px_-12px_rgba(36,60,48,0.45)]" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[720px] items-center gap-2 px-4 sm:px-5">
        <a href="#home" aria-label={t.brand.homeLink} className="mr-auto flex min-h-11 items-center gap-2" onClick={() => setOpen(false)}>
          <Logo logo={logo} size={36} />
          <span className="text-xl font-extrabold text-green">{t.brand.short}</span>
        </a>
        <LanguageSwitch compact />
        <button
          ref={toggle}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t.menuClose : t.menuOpen}
          onClick={() => setOpen((value) => !value)}
          className={`grid size-12 place-items-center rounded-full transition-colors ${open ? "bg-green text-white" : "bg-sun text-ink"}`}
        >
          {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
        </button>
      </div>

      <div
        ref={panel}
        id="mobile-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-64px)] overflow-y-auto border-t border-green/10 bg-milk shadow-[0_20px_30px_-20px_rgba(36,60,48,0.5)]"
      >
        <nav aria-label={t.navLabel} className="mx-auto max-w-[720px] px-4 pt-2 pb-5 sm:px-5">
          <ul className="grid gap-1 sm:grid-cols-2 sm:gap-x-3">
            {sectionIds.map((id, i) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center gap-3 rounded-2xl px-3 text-[17px] font-bold text-ink transition-colors hover:bg-mint active:bg-mint"
                >
                  <span aria-hidden="true" className={`size-2.5 rounded-full ${dotTones[i]}`} />
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
          <WhatsAppLink className="mt-4 flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-green px-5 font-bold text-white">
            {t.hero.primary}
          </WhatsAppLink>
        </nav>
      </div>
    </header>
  );
}
