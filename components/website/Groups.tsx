"use client";

import { groups, site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { buttonStyles, WhatsAppLink } from "@/components/shared/Actions";
import { Blob, Flower, Squiggle, Star } from "@/components/shared/Decor";

export function Groups() {
  const { t, lang } = useLanguage();
  const g = t.groups;

  return (
    <section id="groups" className="relative overflow-hidden">
      <div className="relative mx-auto grid max-w-[1180px] grid-cols-[0.9fr_1.1fr] items-center gap-14 px-8 py-20">
        {/* крупный акцент «3 группы · 1–6 лет» */}
        <div className="relative mx-auto h-[340px] w-full max-w-[440px]" data-reveal>
          <Blob className="absolute inset-0 h-full w-full" color="#FFD56A" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-ink">
            <span className="text-[120px] leading-none font-extrabold tracking-tight">{site.groupsCount}</span>
            <span className="text-3xl font-extrabold">{g.countLabel}</span>
          </div>
          <div className="absolute -right-2 bottom-2 grid size-36 -rotate-6 place-items-center rounded-full bg-green text-center text-white shadow-xl">
            <span>
              <span className="block text-4xl leading-none font-extrabold">{g.ageValue}</span>
              <span className="text-lg font-bold">{g.ageLabel}</span>
            </span>
          </div>
          <Star className="absolute top-4 left-6 w-9" color="#2F7653" />
          <Flower className="absolute bottom-6 left-0 w-14" />
        </div>

        <div>
          <p className="text-[15px] font-bold text-green" data-reveal>
            {g.eyebrow}
          </p>
          <h2 className="mt-2 max-w-[30rem] text-[clamp(2rem,2.8vw,2.6rem)] leading-tight font-extrabold text-ink" data-reveal>
            {g.title}
          </h2>
          <div data-reveal>
            <Squiggle className="mt-4 w-28" />
          </div>
          <p className="mt-4 max-w-[32rem] text-lg leading-relaxed text-ink-soft" data-reveal>
            {g.text}
          </p>

          {groups.length > 0 && (
            <ul className="mt-6 grid grid-cols-3 gap-3" data-reveal>
              {groups.map((group) => (
                <li key={group.name.ru} className="rounded-3xl bg-mint p-4">
                  <p className="font-extrabold text-ink">{group.name[lang]}</p>
                  {group.age && <p className="text-sm font-semibold text-green">{group.age[lang]}</p>}
                  {group.description && <p className="mt-1 text-sm text-ink-soft">{group.description[lang]}</p>}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8" data-reveal>
            <WhatsAppLink className={buttonStyles.primary}>{g.button}</WhatsAppLink>
          </div>
        </div>
      </div>
    </section>
  );
}
