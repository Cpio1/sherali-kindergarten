"use client";

import { sectionIds } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SiteImage } from "@/lib/images";
import { WhatsAppLink } from "@/components/shared/Actions";
import { LanguageSwitch, Logo } from "@/components/shared/Brand";
import { useScrolledPast } from "@/components/shared/hooks";

export function Header({ logo }: { logo: SiteImage | null }) {
  const { t } = useLanguage();
  const scrolled = useScrolledPast(8);

  return (
    <header
      className={`sticky top-0 z-50 bg-milk transition-shadow duration-300 ${
        scrolled ? "shadow-[0_6px_24px_-14px_rgba(36,60,48,0.45)]" : ""
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1180px] items-center gap-4 px-6 xl:px-8">
        <a href="#home" aria-label={t.brand.homeLink} className="flex shrink-0 items-center gap-2.5">
          <Logo logo={logo} size={42} />
          <span className="flex flex-col leading-none">
            <span className="text-[22px] font-extrabold text-green">{t.brand.short}</span>
            <span className="mt-1 text-[12px] font-semibold text-ink-soft">{t.brand.tagline}</span>
          </span>
        </a>

        <nav aria-label={t.navLabel} className="mx-auto">
          <ul className="flex items-center gap-0.5 xl:gap-1">
            {sectionIds.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="relative block rounded-full px-2.5 py-2 text-[15px] font-semibold whitespace-nowrap text-ink transition-colors hover:bg-mint hover:text-green xl:px-3"
                >
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <LanguageSwitch />
          <WhatsAppLink
            className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full bg-green px-3 text-[15px] font-bold text-white shadow-[0_8px_20px_-8px_rgba(47,118,83,0.7)] transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-green-dark xl:px-5"
            ariaLabel={`${t.whatsappAria} ${t.newTab}`}
          >
            <span className="hidden xl:inline">{t.whatsappShort}</span>
          </WhatsAppLink>
        </div>
      </div>
    </header>
  );
}
