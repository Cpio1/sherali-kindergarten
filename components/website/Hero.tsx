"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import type { SiteImage } from "@/lib/images";
import { buttonStyles, WhatsAppLink } from "@/components/shared/Actions";
import { Cloud, Dots, Flower, Leaf, Star, Sun } from "@/components/shared/Decor";
import { FramePhoto, HERO_SIZES } from "@/components/shared/Photo";
import { ArrowRightIcon } from "@/components/shared/Icons";

const chipTones = ["bg-sun text-ink", "bg-mint text-green-dark", "bg-peach-soft text-ink"];

export function Hero({ image }: { image: SiteImage | null }) {
  const { t } = useLanguage();
  const h = t.hero;

  return (
    <section id="home" className="relative overflow-hidden">
      {/* фон */}
      <div aria-hidden="true" className="absolute top-[-120px] right-[-140px] size-[620px] rounded-full bg-cream" />
      <Cloud className="absolute top-10 left-[42%] w-28 animate-drift" color="#E7F1DD" />
      <Star className="absolute top-[22%] left-[3%] w-7" />
      <Star className="absolute bottom-[14%] left-[46%] w-5" color="#F4B89F" />

      <div className="relative mx-auto grid max-w-[1180px] grid-cols-[1.05fr_0.95fr] items-center gap-12 px-8 pt-12 pb-16 xl:gap-16 xl:pt-14 xl:pb-20">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-mint px-4 py-1.5 text-[15px] font-bold text-green-dark">
            <Leaf className="w-4" />
            {h.eyebrow}
          </p>
          <h1 className="mt-5 text-[clamp(2.4rem,3.6vw,3.4rem)] leading-[1.1] font-extrabold tracking-[-0.01em] text-ink">
            {h.titleBefore}
            <span className="wavy-underline text-green">{h.titleAccent}</span>
            {h.titleAfter}
          </h1>
          <p className="mt-5 max-w-[34rem] text-lg leading-relaxed text-ink-soft xl:text-[19px]">{h.text}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppLink className={buttonStyles.primary}>{h.primary}</WhatsAppLink>
            <a href="#about" className={buttonStyles.light}>
              {h.secondary}
              <ArrowRightIcon className="size-5" />
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2.5">
            {h.chips.map((chip, i) => (
              <li
                key={chip}
                className={`rounded-full px-4 py-2 text-[15px] font-bold ${chipTones[i]} ${i === 1 ? "-rotate-2" : i === 2 ? "rotate-1" : ""}`}
              >
                {chip}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[520px]">
          <Sun className="absolute -top-10 -right-8 z-10 w-32 animate-spin-slow" />
          <div aria-hidden="true" className="blob-alt absolute inset-0 translate-x-5 translate-y-5 bg-green" />
          <div className="blob relative aspect-[1/1.02] overflow-hidden bg-mint shadow-[0_30px_60px_-30px_rgba(36,60,48,0.5)]">
            <FramePhoto image={image} alt={h.photoAlt} sizes={HERO_SIZES} priority />
          </div>
          <Flower className="absolute -bottom-6 left-2 z-10 w-20 animate-float" />
          <Dots className="absolute top-[18%] -left-10 w-16" color="#FFD56A" />
          <Leaf className="absolute right-6 -bottom-8 z-10 w-14 rotate-12" color="#5BAA6E" />
        </div>
      </div>
    </section>
  );
}
