"use client";

import { groups, site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SiteImage } from "@/lib/images";
import { buttonStyles, DocumentsButton, ExternalLink, WhatsAppLink } from "@/components/shared/Actions";
import { ContactButtons, ContactList, MapWidget } from "@/components/shared/ContactParts";
import { AppleArt, Blob, CarrotArt, Cloud, CupArt, Flower, Leaf, PearArt, Star, Sun } from "@/components/shared/Decor";
import { GalleryEmpty, GalleryThumb, ShowMoreButton } from "@/components/shared/GalleryParts";
import { ArrowRightIcon, FactIconView, FolderIcon, WhatsAppIcon } from "@/components/shared/Icons";
import { Lightbox } from "@/components/shared/Lightbox";
import { FramePhoto, HERO_SIZES } from "@/components/shared/Photo";
import { useGallery } from "@/components/shared/hooks";

/** Общий контейнер мобильной версии: поля 16–20 px, ограничение ширины на планшете. */
const wrap = "mx-auto w-full max-w-[680px] px-4 min-[380px]:px-5";
const h2 = "text-[clamp(1.6rem,6.4vw,2.1rem)] leading-tight font-extrabold text-ink";
const eyebrow = "text-[15px] font-bold text-green";

export function MobileHero({ image }: { image: SiteImage | null }) {
  const { t } = useLanguage();
  const h = t.hero;
  const chipTones = ["bg-sun text-ink", "bg-mint text-green-dark", "bg-peach-soft text-ink"];

  return (
    <section id="home" className="relative overflow-hidden pt-5 pb-10">
      <Star className="absolute top-6 right-5 w-5" />
      <div className={`${wrap} relative`}>
        <p className="inline-flex items-center gap-2 rounded-full bg-mint px-3.5 py-1 text-sm font-bold text-green-dark">
          <Leaf className="w-3.5" />
          {h.eyebrow}
        </p>
        <h1 className="mt-4 text-[clamp(1.85rem,8.2vw,2.6rem)] leading-[1.12] font-extrabold text-ink">
          {h.titleBefore}
          <span className="wavy-underline text-green">{h.titleAccent}</span>
          {h.titleAfter}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">{h.text}</p>

        <div className="mt-6 grid gap-3 min-[520px]:grid-cols-2">
          <WhatsAppLink className={`${buttonStyles.primary} w-full`}>{h.primary}</WhatsAppLink>
          <a href="#about" className={`${buttonStyles.light} w-full`}>
            {h.secondary}
            <ArrowRightIcon className="size-5" />
          </a>
        </div>

        <ul className="mt-5 flex flex-wrap gap-2">
          {h.chips.map((chip, i) => (
            <li key={chip} className={`rounded-full px-3.5 py-1.5 text-sm font-bold ${chipTones[i]}`}>
              {chip}
            </li>
          ))}
        </ul>

        <div className="relative mx-auto mt-9 w-[92%] max-w-[460px]">
          <Sun className="absolute -top-7 -right-5 z-10 w-20" />
          <div aria-hidden="true" className="blob-alt absolute inset-0 translate-x-3 translate-y-3 bg-green" />
          <div className="blob relative aspect-square overflow-hidden bg-mint">
            <FramePhoto image={image} alt={h.photoAlt} sizes={HERO_SIZES} priority />
          </div>
          <Flower className="absolute -bottom-4 -left-2 z-10 w-12" />
        </div>
      </div>
    </section>
  );
}

const iconTones = ["bg-sun", "bg-white", "bg-peach-soft", "bg-white", "bg-sun", "bg-peach-soft"];

export function MobileAbout({ image }: { image: SiteImage | null }) {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <section id="about" className="relative rounded-t-[40px] bg-mint py-12">
      <Cloud className="absolute top-6 right-4 w-16" />
      <div className={wrap}>
        <p className={eyebrow} data-reveal>
          {a.eyebrow}
        </p>
        <h2 className={`${h2} mt-1.5`} data-reveal>
          {a.title}
        </h2>

        <div className="relative mt-6" data-reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[32px_32px_32px_96px] bg-white ring-[6px] ring-white">
            <FramePhoto image={image} alt={a.photoAlt} sizes="(min-width: 640px) 640px, 92vw" variant="garden" />
          </div>
          <div className="absolute -bottom-4 right-3 rotate-2 rounded-2xl bg-sun px-3.5 py-2 shadow-md">
            <p className="text-xs font-bold text-ink/80">{a.hoursSticker}</p>
            <p className="text-lg leading-tight font-extrabold text-ink tabular-nums">{site.hours}</p>
          </div>
        </div>

        <div className="mt-9 space-y-3 text-base leading-relaxed text-ink-soft" data-reveal>
          <p>{a.text}</p>
          <p>{a.text2}</p>
        </div>

        <ul className="mt-6 grid gap-2.5 min-[520px]:grid-cols-2">
          {a.facts.map((fact, i) => (
            <li key={fact.icon} className="flex items-center gap-3 rounded-2xl bg-white/70 p-2.5 pr-3" data-reveal>
              <span className={`grid size-11 shrink-0 place-items-center rounded-xl text-green-dark ${iconTones[i]}`}>
                <FactIconView icon={fact.icon} className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-[13px] font-semibold text-ink-soft">{fact.label}</span>
                <span className="block leading-snug font-bold text-ink">{fact.value}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function MobileGroups() {
  const { t, lang } = useLanguage();
  const g = t.groups;

  return (
    <section id="groups" className="relative overflow-hidden bg-mint pb-12">
      <div className={wrap}>
        <div className="relative overflow-hidden rounded-[36px] bg-milk px-5 pt-7 pb-6" data-reveal>
          <Star className="absolute top-5 right-5 w-6" color="#F4B89F" />
          <p className={eyebrow}>{g.eyebrow}</p>
          <h2 className={`${h2} mt-1.5 pr-6`}>{g.title}</h2>

          <div className="mt-6 flex items-center justify-center gap-3 sm:gap-8">
            <div className="relative grid h-32 max-w-[230px] flex-1 place-items-center">
              <Blob className="absolute inset-0 h-full w-full" color="#FFD56A" />
              <span className="relative text-center text-ink">
                <span className="block text-[64px] leading-none font-extrabold">{site.groupsCount}</span>
                <span className="text-lg font-extrabold">{g.countLabel}</span>
              </span>
            </div>
            <div className="grid size-28 shrink-0 -rotate-6 place-items-center rounded-full bg-green text-center text-white">
              <span>
                <span className="block text-3xl leading-none font-extrabold">{g.ageValue}</span>
                <span className="font-bold">{g.ageLabel}</span>
              </span>
            </div>
          </div>

          <p className="mt-6 text-base leading-relaxed text-ink-soft">{g.text}</p>

          {groups.length > 0 && (
            <ul className="mt-5 grid gap-2.5">
              {groups.map((group) => (
                <li key={group.name.ru} className="rounded-2xl bg-mint px-4 py-3">
                  <p className="font-extrabold text-ink">{group.name[lang]}</p>
                  {group.age && <p className="text-sm font-semibold text-green">{group.age[lang]}</p>}
                  {group.description && <p className="mt-1 text-sm text-ink-soft">{group.description[lang]}</p>}
                </li>
              ))}
            </ul>
          )}

          <WhatsAppLink className={`${buttonStyles.primary} mt-6 w-full`}>{g.button}</WhatsAppLink>
        </div>
      </div>
    </section>
  );
}

export function MobileMeals() {
  const { t } = useLanguage();
  const m = t.meals;

  return (
    <section id="meals" className="relative overflow-hidden bg-green py-12 text-white">
      <Leaf className="absolute -top-3 -right-3 w-16 rotate-45" color="#3f8b64" />
      <div className={wrap}>
        <div className="flex items-center gap-4" data-reveal>
          <div className="relative grid size-28 shrink-0 place-items-center rounded-full bg-milk text-green-dark ring-8 ring-white/15">
            <span className="text-center">
              <span className="block text-[52px] leading-[0.9] font-extrabold">{site.mealsPerDay}</span>
              <span className="block text-xs font-bold">{m.perDayHint}</span>
            </span>
            <AppleArt className="absolute -top-3 -right-3 w-10" />
          </div>
          <div className="min-w-0">
            <p className="inline-block rounded-full bg-sun px-3 py-0.5 text-sm font-bold text-ink">{m.eyebrow}</p>
            <h2 className="mt-2 text-[clamp(1.45rem,6vw,2rem)] leading-tight font-extrabold">{m.title}</h2>
          </div>
        </div>

        <p className="mt-6 text-base leading-relaxed text-white/95" data-reveal>
          {m.text}
        </p>
        <p className="mt-4 flex items-start gap-3 rounded-3xl bg-white/12 px-4 py-3.5 font-semibold" data-reveal>
          <span aria-hidden="true" className="mt-1.5 size-2.5 shrink-0 rounded-full bg-sun" />
          {m.note}
        </p>

        <div aria-hidden="true" className="mt-6 flex items-end justify-center gap-5">
          <CarrotArt className="w-10 -rotate-12" />
          <CupArt className="w-11" />
          <PearArt className="w-9 rotate-6" />
        </div>

        <ExternalLink
          href={site.whatsappUrl}
          className="focus-light mt-6 flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-sun px-6 py-3 font-bold text-ink"
        >
          <WhatsAppIcon className="size-5" />
          {m.button}
        </ExternalLink>
      </div>
    </section>
  );
}

export function MobileGallery({ images }: { images: SiteImage[] }) {
  const { t } = useLanguage();
  const g = useGallery(images.length, 4);

  return (
    <section id="gallery" className="py-12">
      <div className={wrap}>
        <div className="mb-6 flex items-end justify-between gap-3" data-reveal>
          <div>
            <p className={eyebrow}>{t.gallery.eyebrow}</p>
            <h2 className={`${h2} mt-1.5`}>{t.gallery.title}</h2>
          </div>
          <Sun className="w-12 shrink-0" />
        </div>

        {images.length === 0 ? (
          <GalleryEmpty compact />
        ) : (
          <>
            <ul className="grid grid-cols-2 gap-3">
              {images.slice(0, g.visible).map((image, i) => (
                <li key={image.src}>
                  <GalleryThumb
                    image={image}
                    index={i}
                    onOpen={g.setOpen}
                    sizes="(min-width: 680px) 320px, 46vw"
                    rounded="rounded-[22px]"
                  />
                </li>
              ))}
            </ul>
            {g.hasMore && (
              <div className="mt-6 text-center">
                <ShowMoreButton expanded={g.expanded} onClick={() => g.setExpanded(!g.expanded)} />
              </div>
            )}
          </>
        )}
      </div>
      {g.open !== null && <Lightbox images={images} index={g.open} onClose={g.close} onStep={g.step} />}
    </section>
  );
}

export function MobileDocuments() {
  const { t } = useLanguage();
  const d = t.documents;

  return (
    <section id="documents" className="pb-4">
      <div className={wrap}>
        <div className="rounded-[32px] bg-cream p-5" data-reveal>
          <div className="flex items-center gap-4">
            <span className="grid size-14 shrink-0 -rotate-6 place-items-center rounded-2xl bg-sun text-green-dark">
              <FolderIcon className="size-7" />
            </span>
            <div className="min-w-0">
              <h2 className="text-2xl leading-tight font-extrabold text-ink">{d.title}</h2>
              <p className="text-[15px] leading-snug text-ink-soft">{d.text}</p>
            </div>
          </div>
          {!site.documentsUrl && <p className="mt-4 font-semibold text-green-dark">{d.soon}</p>}
          <DocumentsButton className="mt-4 w-full" />
        </div>
      </div>
    </section>
  );
}

export function MobileContacts() {
  const { t } = useLanguage();
  const c = t.contacts;

  return (
    <section id="contacts" className="relative overflow-hidden pt-10 pb-12">
      <Cloud className="absolute top-8 -right-6 w-24" color="#E7F1DD" />
      <div className={`${wrap} relative`}>
        <div data-reveal>
          <p className={eyebrow}>{c.eyebrow}</p>
          <h2 className={`${h2} mt-1.5`}>{c.title}</h2>
          <p className="mt-2 text-base text-ink-soft">{c.text}</p>
        </div>

        <div className="mt-6" data-reveal>
          <ContactButtons columns="grid-cols-1 min-[520px]:grid-cols-2" />
        </div>

        <div className="mt-6 rounded-[32px] bg-white p-5 shadow-[0_16px_40px_-28px_rgba(36,60,48,0.4)]" data-reveal>
          <ContactList dense />
        </div>

        <MapWidget className="mt-6 h-[300px]" />
      </div>
    </section>
  );
}
