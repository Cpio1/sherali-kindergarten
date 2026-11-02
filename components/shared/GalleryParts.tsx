"use client";

import Image from "next/image";
import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SiteImage } from "@/lib/images";
import { ExternalLink } from "./Actions";
import { Cloud, Flower, Star } from "./Decor";
import { ChevronIcon, InstagramIcon } from "./Icons";

/** Миниатюра с единым соотношением сторон 4:3. */
export function GalleryThumb({
  image,
  index,
  sizes,
  onOpen,
  rounded,
}: {
  image: SiteImage;
  index: number;
  sizes: string;
  onOpen: (index: number) => void;
  rounded: string;
}) {
  const { t } = useLanguage();
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={t.gallery.open(index + 1)}
      className={`group relative block aspect-[4/3] w-full overflow-hidden bg-mint ${rounded}`}
    >
      <Image
        src={image.src}
        alt={t.gallery.photoAlt(index + 1)}
        fill
        sizes={sizes}
        loading="lazy"
        quality={75}
        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
    </button>
  );
}

/** Состояние «Фотографии скоро появятся» — без сломанных изображений. */
export function GalleryEmpty({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage();
  return (
    <div
      className={`relative overflow-hidden rounded-[36px] border-2 border-dashed border-green/25 bg-white text-center ${
        compact ? "px-5 py-10" : "px-10 py-14"
      }`}
    >
      <Cloud className="absolute top-5 left-[8%] w-20" color="#E7F1DD" />
      <Star className="absolute top-8 right-[10%] w-7" />
      <Flower className="absolute right-[6%] bottom-5 w-10" />
      <div className="relative">
        <p className={`font-extrabold text-ink ${compact ? "text-xl" : "text-2xl"}`}>{t.gallery.empty}</p>
        <p className="mx-auto mt-2 max-w-md text-ink-soft">{t.gallery.emptyText}</p>
        <ExternalLink
          href={site.instagramUrl}
          className="mt-5 inline-flex min-h-12 items-center gap-2.5 rounded-full bg-peach-soft px-6 py-3 font-bold text-ink transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-peach"
        >
          <InstagramIcon className="size-5" />
          {t.gallery.instagram}
        </ExternalLink>
      </div>
    </div>
  );
}

export function ShowMoreButton({ expanded, onClick }: { expanded: boolean; onClick: () => void }) {
  const { t } = useLanguage();
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={expanded}
      className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-green ring-2 ring-green/25 transition-[transform,box-shadow] hover:-translate-y-0.5 hover:ring-green/60"
    >
      {expanded ? t.gallery.less : t.gallery.more}
      <ChevronIcon dir="down" className={`size-5 transition-transform ${expanded ? "rotate-180" : ""}`} />
    </button>
  );
}
