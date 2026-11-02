"use client";

import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SiteImage } from "@/lib/images";
import { Cloud, Flower, Leaf, Star } from "@/components/shared/Decor";
import { FactIconView } from "@/components/shared/Icons";
import { FramePhoto } from "@/components/shared/Photo";

const iconTones = ["bg-sun", "bg-white", "bg-peach-soft", "bg-white", "bg-sun", "bg-peach-soft"];

export function About({ image }: { image: SiteImage | null }) {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <section id="about" className="relative bg-mint">
      {/* волнистый край сверху */}
      <svg aria-hidden="true" viewBox="0 0 1440 60" preserveAspectRatio="none" className="absolute -top-px left-0 h-10 w-full">
        <path d="M0 0h1440v20c-160 30-320 40-480 20S640 0 480 20 160 60 0 30Z" fill="#FFF9EE" />
      </svg>
      <Cloud className="absolute top-16 right-[6%] w-32 animate-drift" />
      <Star className="absolute bottom-16 left-[4%] w-6" color="#2F7653" />

      <div className="relative mx-auto grid max-w-[1180px] grid-cols-[0.85fr_1.15fr] items-center gap-14 px-8 pt-24 pb-20 xl:gap-20">
        <div className="relative mx-auto w-full max-w-[440px]" data-reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[48px] bg-white ring-[10px] ring-white">
            <FramePhoto image={image} alt={a.photoAlt} sizes="(min-width: 1024px) 440px, 90vw" variant="garden" />
          </div>
          <div className="absolute -right-6 bottom-10 rotate-3 rounded-[28px] bg-sun px-5 py-3 shadow-lg">
            <p className="text-[13px] font-bold text-ink/80">{a.hoursSticker}</p>
            <p className="text-2xl font-extrabold text-ink tabular-nums">{site.hours}</p>
          </div>
          <Flower className="absolute -top-4 -left-6 w-16" color="#FFFFFF" />
          <Leaf className="absolute -bottom-6 left-8 w-12 -rotate-12" />
        </div>

        <div>
          <p className="text-[15px] font-bold text-green" data-reveal>
            {a.eyebrow}
          </p>
          <h2 className="mt-2 text-[clamp(2rem,2.8vw,2.6rem)] leading-tight font-extrabold text-ink" data-reveal>
            {a.title}
          </h2>
          <div className="mt-4 max-w-[36rem] space-y-3 text-lg leading-relaxed text-ink-soft" data-reveal>
            <p>{a.text}</p>
            <p>{a.text2}</p>
          </div>

          <ul className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5">
            {a.facts.map((fact, i) => (
              <li
                key={fact.icon}
                className="flex items-start gap-3.5"
                data-reveal
                style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
              >
                <span className={`grid size-12 shrink-0 place-items-center rounded-2xl text-green-dark ${iconTones[i]}`}>
                  <FactIconView icon={fact.icon} className="size-6" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink-soft">{fact.label}</span>
                  <span className="block text-[17px] leading-snug font-bold text-ink">{fact.value}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
