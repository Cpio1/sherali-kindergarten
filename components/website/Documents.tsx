"use client";

import { site } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { DocumentsButton } from "@/components/shared/Actions";
import { Star } from "@/components/shared/Decor";
import { FolderIcon } from "@/components/shared/Icons";

export function Documents() {
  const { t } = useLanguage();
  const d = t.documents;

  return (
    <section id="documents" className="px-8 py-6">
      <div
        className="relative mx-auto flex max-w-[1180px] items-center gap-8 overflow-hidden rounded-[40px] bg-cream px-12 py-9"
        data-reveal
      >
        <Star className="absolute top-5 right-[30%] w-6" color="#F4B89F" />
        <span className="grid size-20 shrink-0 -rotate-6 place-items-center rounded-[28px] bg-sun text-green-dark">
          <FolderIcon className="size-10" />
        </span>
        <div className="flex-1">
          <h2 className="text-[28px] leading-tight font-extrabold text-ink">{d.title}</h2>
          <p className="mt-1 text-lg text-ink-soft">{d.text}</p>
          {!site.documentsUrl && <p className="mt-1 font-semibold text-green-dark">{d.soon}</p>}
        </div>
        <DocumentsButton className="shrink-0" />
      </div>
    </section>
  );
}
