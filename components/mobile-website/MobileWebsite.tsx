"use client";

import type { SiteMedia } from "@/lib/images";
import { FloatingWhatsApp, Footer } from "@/components/shared/Chrome";
import { useReveal } from "@/components/shared/hooks";
import { MobileHeader } from "./MobileHeader";
import {
  MobileAbout,
  MobileContacts,
  MobileDocuments,
  MobileGallery,
  MobileGroups,
  MobileHero,
  MobileMeals,
} from "./MobileSections";

/** Мобильная версия (< 1024 px): своя вертикальная компоновка, а не уменьшенная копия. */
export function MobileWebsite({ media, year }: { media: SiteMedia; year: number }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} style={{ "--header-h": "64px" } as React.CSSProperties}>
      <MobileHeader logo={media.logo} />
      <main id="main" tabIndex={-1} className="outline-none">
        <MobileHero image={media.heroImage} />
        <MobileAbout image={media.aboutImage} />
        <MobileGroups />
        <MobileMeals />
        <MobileGallery images={media.gallery} />
        <MobileDocuments />
        <MobileContacts />
      </main>
      <Footer logo={media.logo} year={year} mobile />
      <FloatingWhatsApp mobile />
    </div>
  );
}
