"use client";

import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SiteImage } from "@/lib/images";
import { ExternalLink } from "./Actions";
import { Logo } from "./Brand";
import { ArrowUpIcon, WhatsAppIcon } from "./Icons";
import { useEffect, useState } from "react";
import { useScrolledPast } from "./hooks";

/** true, пока раздел «Контакты» на экране — там свои кнопки связи. */
function useContactsInView() {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const target = document.getElementById("contacts");
    if (!target || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);
  return inView;
}

/** Плавающая кнопка WhatsApp: появляется после главного экрана, учитывает safe-area. */
export function FloatingWhatsApp({ mobile = false }: { mobile?: boolean }) {
  const { t } = useLanguage();
  const scrolled = useScrolledPast(mobile ? 560 : 480);
  const contactsInView = useContactsInView();
  const visible = scrolled && !contactsInView;
  return (
    <ExternalLink
      href={site.whatsappUrl}
      ariaLabel={`${t.whatsappAria} ${t.newTab}`}
      className={`fixed z-40 grid place-items-center rounded-full bg-wa text-white shadow-[0_10px_24px_-8px_rgba(20,90,50,0.75)] ring-4 ring-white transition-[opacity,transform,visibility] duration-300 hover:scale-105 ${
        mobile
          ? "right-[max(16px,env(safe-area-inset-right))] bottom-[max(16px,env(safe-area-inset-bottom))] size-14"
          : "right-6 bottom-6 size-16"
      } ${visible ? "opacity-100" : "pointer-events-none invisible translate-y-4 opacity-0"}`}
    >
      <WhatsAppIcon className={mobile ? "size-7" : "size-8"} />
    </ExternalLink>
  );
}

export function Footer({ logo, year, mobile = false }: { logo: SiteImage | null; year: number; mobile?: boolean }) {
  const { t } = useLanguage();
  return (
    <footer className={`bg-ink text-milk ${mobile ? "pb-24" : ""}`}>
      <div
        className={`mx-auto flex max-w-[1180px] gap-5 ${
          mobile ? "flex-col px-5 py-9" : "items-center justify-between px-8 py-9"
        }`}
      >
        <div className="flex items-center gap-3">
          <Logo logo={logo} size={40} />
          <div>
            <p className="text-lg leading-tight font-extrabold">{t.brand.full}</p>
            <p className="text-sm text-milk/80">{t.contacts.addressValue}</p>
          </div>
        </div>
        <p className="text-sm text-milk/80">
          © {year} {site.legalName}
        </p>
        <a
          href="#home"
          className="focus-light inline-flex min-h-11 items-center gap-2 self-start rounded-full bg-white/10 px-4 text-sm font-semibold transition-colors hover:bg-white/20 sm:self-auto"
        >
          <ArrowUpIcon className="size-4" />
          {t.footer.toTop}
        </a>
      </div>
    </footer>
  );
}
