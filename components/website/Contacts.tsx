"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { ContactButtons, ContactList, MapWidget } from "@/components/shared/ContactParts";
import { Cloud, Flower, Leaf, Sun } from "@/components/shared/Decor";

export function Contacts() {
  const { t } = useLanguage();
  const c = t.contacts;

  return (
    <section id="contacts" className="relative overflow-hidden">
      <Sun className="absolute top-12 right-[-30px] w-28 animate-spin-slow" />
      <Cloud className="absolute bottom-16 left-[-20px] w-36" color="#E7F1DD" />

      <div className="relative mx-auto max-w-[1180px] px-8 pt-16 pb-20">
        <div className="max-w-[40rem]" data-reveal>
          <p className="text-[15px] font-bold text-green">{c.eyebrow}</p>
          <h2 className="mt-2 text-[clamp(2rem,2.8vw,2.6rem)] leading-tight font-extrabold text-ink">{c.title}</h2>
          <p className="mt-3 text-lg text-ink-soft">{c.text}</p>
        </div>

        <div className="mt-10 grid grid-cols-[1fr_1.05fr] items-start gap-10">
          <div className="rounded-[40px] bg-white p-9 shadow-[0_20px_50px_-30px_rgba(36,60,48,0.35)]" data-reveal>
            <ContactList />
          </div>
          <div className="relative rounded-[40px_40px_40px_120px] bg-mint p-9" data-reveal>
            <Leaf className="absolute -top-5 right-10 w-12 rotate-12" />
            <Flower className="absolute -bottom-5 left-16 w-12" />
            <ContactButtons columns="grid-cols-2" />
          </div>
        </div>

        <MapWidget className="mt-10 h-[380px]" />
      </div>
    </section>
  );
}
