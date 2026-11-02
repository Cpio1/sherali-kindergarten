"use client";

import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ExternalLink, useContactActions } from "./Actions";
import { BuildingIcon, ClockIcon, InstagramIcon, PhoneIcon, PinIcon } from "./Icons";

/** Список контактных данных (одинаковый по содержанию в обеих версиях). */
export function ContactList({ dense = false }: { dense?: boolean }) {
  const { t } = useLanguage();
  const c = t.contacts;
  const rows = [
    { icon: BuildingIcon, label: c.org, value: <span>{site.legalName}</span> },
    { icon: PinIcon, label: c.address, value: <span>{c.addressValue}</span> },
    {
      icon: PhoneIcon,
      label: c.phone,
      value: (
        <a href={site.phoneHref} className="underline decoration-sun decoration-2 underline-offset-4 hover:text-green">
          {site.phoneDisplay}
        </a>
      ),
    },
    { icon: ClockIcon, label: c.hours, value: <span className="tabular-nums">{site.hours}</span> },
    {
      icon: InstagramIcon,
      label: c.instagram,
      value: (
        <ExternalLink
          href={site.instagramUrl}
          className="break-all underline decoration-peach decoration-2 underline-offset-4 hover:text-green"
        >
          {site.instagramHandle}
        </ExternalLink>
      ),
    },
  ];

  return (
    <dl className={dense ? "space-y-4" : "space-y-5"}>
      {rows.map(({ icon: Icon, label, value }) => (
        <div key={label} className="flex items-start gap-3.5">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-mint text-green">
            <Icon className="size-5" />
          </span>
          <div className="min-w-0">
            <dt className="text-sm font-semibold text-ink-soft">{label}</dt>
            <dd className="text-[17px] leading-snug font-bold text-ink">{value}</dd>
          </div>
        </div>
      ))}
    </dl>
  );
}

/** Кнопки: позвонить, WhatsApp, Instagram, 2ГИС. */
export function ContactButtons({ columns }: { columns: string }) {
  const { t } = useLanguage();
  const actions = useContactActions();
  const cls = (tone: string) =>
    `flex min-h-14 items-center gap-3 rounded-[22px] px-5 py-3 text-left font-bold leading-snug transition-[transform,background-color] duration-200 hover:-translate-y-0.5 ${tone}`;

  return (
    <div>
      <ul className={`grid gap-3 ${columns}`}>
        {actions.map(({ key, href, label, icon: Icon, external, tone }) => (
          <li key={key}>
            {external ? (
              <ExternalLink href={href} className={cls(tone)}>
                <Icon className="size-6 shrink-0" />
                {label}
              </ExternalLink>
            ) : (
              <a href={href} className={cls(tone)}>
                <Icon className="size-6 shrink-0" />
                {label}
              </a>
            )}
          </li>
        ))}
      </ul>
      {!site.map.twoGisFirmUrl && <p className="mt-3 text-sm text-ink-soft">{t.contacts.twoGisSearchNote}</p>}
    </div>
  );
}

/** Официальный виджет карты — только если его URL указан в config/site.ts. */
export function MapWidget({ className }: { className?: string }) {
  const { t } = useLanguage();
  if (!site.map.widgetUrl) return null;
  return (
    <div className={`overflow-hidden rounded-[32px] bg-mint ring-4 ring-white ${className ?? ""}`}>
      <iframe
        src={site.map.widgetUrl}
        title={t.contacts.mapTitle}
        loading="lazy"
        className="block h-full min-h-[320px] w-full border-0"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
