"use client";

import type { SiteMedia } from "@/lib/images";
import { FloatingWhatsApp, Footer } from "@/components/shared/Chrome";
import { useReveal } from "@/components/shared/hooks";
import { About } from "./About";
import { Contacts } from "./Contacts";
import { Documents } from "./Documents";
import { Gallery } from "./Gallery";
import { Groups } from "./Groups";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Meals } from "./Meals";

/** Компьютерная версия (≥ 1024 px). */
export function Website({ media, year }: { media: SiteMedia; year: number }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} style={{ "--header-h": "72px" } as React.CSSProperties}>
      <Header logo={media.logo} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero image={media.heroImage} />
        <About image={media.aboutImage} />
        <Groups />
        <Meals />
        <Gallery images={media.gallery} />
        <Documents />
        <Contacts />
      </main>
      <Footer logo={media.logo} year={year} />
      <FloatingWhatsApp />
    </div>
  );
}
