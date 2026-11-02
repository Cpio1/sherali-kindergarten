"use client";

import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ExternalLink } from "@/components/shared/Actions";
import { AppleArt, CarrotArt, CupArt, Leaf, PearArt, PlateArt, Star } from "@/components/shared/Decor";
import { WhatsAppIcon } from "@/components/shared/Icons";

export function Meals() {
  const { t } = useLanguage();
  const m = t.meals;

  return (
    <section id="meals" className="px-8 py-6">
      <div className="relative mx-auto max-w-[1180px] overflow-hidden rounded-[48px] bg-green text-white" data-reveal>
        <Leaf className="absolute top-8 right-[44%] w-12 rotate-45" color="#3f8b64" />
        <Star className="absolute right-10 bottom-10 w-8" />
        <div aria-hidden="true" className="absolute -bottom-40 -left-24 size-96 rounded-full bg-green-dark" />

        <div className="relative grid grid-cols-[0.95fr_1.05fr] items-center gap-10 px-14 py-14 xl:px-16">
          <div className="relative mx-auto w-full max-w-[400px]">
            <PlateArt className="w-full" />
            {/* «5» в центре тарелки */}
            <div className="absolute top-[52.5%] left-[51%] -translate-x-1/2 -translate-y-1/2 text-center text-green-dark">
              <span className="block text-[84px] leading-[0.9] font-extrabold">{site.mealsPerDay}</span>
              <span className="block text-sm font-bold">{m.perDayHint}</span>
            </div>
            <AppleArt className="absolute -top-6 left-[18%] w-14 animate-float" />
            <CarrotArt className="absolute -bottom-4 left-[2%] w-14 -rotate-12" />
            <PearArt className="absolute right-[4%] -bottom-6 w-12 rotate-12" />
            <CupArt className="absolute -top-4 right-[14%] w-14" />
          </div>

          <div>
            <p className="inline-block rounded-full bg-sun px-3.5 py-1 text-[15px] font-bold text-ink">{m.eyebrow}</p>
            <h2 className="mt-2 text-[clamp(2rem,2.8vw,2.6rem)] leading-tight font-extrabold">{m.title}</h2>
            <p className="mt-4 max-w-[30rem] text-lg leading-relaxed text-white/95">{m.text}</p>
            <p className="mt-5 inline-flex max-w-[30rem] items-start gap-3 rounded-3xl bg-white/12 px-5 py-4 text-[17px] leading-snug font-semibold">
              <span aria-hidden="true" className="mt-1 size-3 shrink-0 rounded-full bg-sun" />
              {m.note}
            </p>
            <div className="mt-7">
              <ExternalLink
                href={site.whatsappUrl}
                className="focus-light inline-flex min-h-12 items-center gap-2.5 rounded-full bg-sun px-6 py-3 font-bold text-ink transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-sun-deep"
              >
                <WhatsAppIcon className="size-5" />
                {m.button}
              </ExternalLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
