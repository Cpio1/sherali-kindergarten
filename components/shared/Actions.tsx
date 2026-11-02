"use client";

import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { FolderIcon, InstagramIcon, PhoneIcon, SearchIcon, PinIcon, WhatsAppIcon } from "./Icons";

const btn =
  "inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 py-3 text-base font-bold leading-tight transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 active:translate-y-0";

export const buttonStyles = {
  primary: `${btn} bg-green text-white shadow-[0_8px_20px_-8px_rgba(47,118,83,0.7)] hover:bg-green-dark`,
  sun: `${btn} bg-sun text-ink shadow-[0_8px_20px_-10px_rgba(200,140,0,0.8)] hover:bg-sun-deep`,
  light: `${btn} bg-white text-ink ring-2 ring-green/20 hover:ring-green/50`,
  onGreen: `${btn} bg-white text-green hover:bg-milk`,
};

type LinkProps = { className?: string; children: React.ReactNode; ariaLabel?: string };

/** Внешняя ссылка в новой вкладке с подсказкой для экранных чтецов. */
export function ExternalLink({ href, className, children, ariaLabel }: LinkProps & { href: string }) {
  const { t } = useLanguage();
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} aria-label={ariaLabel}>
      {children}
      {!ariaLabel && <span className="sr-only"> {t.newTab}</span>}
    </a>
  );
}

export function WhatsAppLink({ className, children, ariaLabel }: LinkProps) {
  return (
    <ExternalLink href={site.whatsappUrl} className={className} ariaLabel={ariaLabel}>
      <WhatsAppIcon className="size-5 shrink-0" />
      {children}
    </ExternalLink>
  );
}

/** Кнопка папки с документами: неактивна, пока в config/site.ts documentsUrl = null. */
export function DocumentsButton({ className }: { className?: string }) {
  const { t } = useLanguage();
  if (site.documentsUrl) {
    return (
      <ExternalLink href={site.documentsUrl} className={`${buttonStyles.primary} ${className ?? ""}`}>
        <FolderIcon className="size-5" />
        {t.documents.open}
      </ExternalLink>
    );
  }
  return (
    <button
      type="button"
      disabled
      aria-disabled="true"
      className={`${btn} cursor-not-allowed bg-white text-ink-soft border-2 border-dashed border-green/30 hover:translate-y-0 ${className ?? ""}`}
    >
      {t.documents.disabled}
    </button>
  );
}

/** Четыре действия раздела «Контакты». */
export function useContactActions() {
  const { t } = useLanguage();
  const twoGisUrl = site.map.twoGisFirmUrl ?? site.map.twoGisSearchUrl;
  return [
    { key: "call", href: site.phoneHref, label: t.contacts.call, icon: PhoneIcon, external: false, tone: "bg-green text-white hover:bg-green-dark" },
    { key: "wa", href: site.whatsappUrl, label: t.contacts.whatsapp, icon: WhatsAppIcon, external: true, tone: "bg-wa text-white hover:bg-[#0b5f30]" },
    { key: "ig", href: site.instagramUrl, label: t.contacts.openInstagram, icon: InstagramIcon, external: true, tone: "bg-peach-soft text-ink hover:bg-peach" },
    {
      key: "2gis",
      href: twoGisUrl,
      label: site.map.twoGisFirmUrl ? t.contacts.twoGisFirm : t.contacts.twoGisSearch,
      icon: site.map.twoGisFirmUrl ? PinIcon : SearchIcon,
      external: true,
      tone: "bg-sun text-ink hover:bg-sun-deep",
    },
  ] as const;
}
