"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import type { SiteImage } from "@/lib/images";
import { GalleryEmpty, GalleryThumb, ShowMoreButton } from "@/components/shared/GalleryParts";
import { Lightbox } from "@/components/shared/Lightbox";
import { Sun } from "@/components/shared/Decor";
import { useGallery } from "@/components/shared/hooks";

const INITIAL = 6;
const corners = ["rounded-[32px_32px_32px_8px]", "rounded-[32px]", "rounded-[8px_32px_32px_32px]"];

export function Gallery({ images }: { images: SiteImage[] }) {
  const { t } = useLanguage();
  const g = useGallery(images.length, INITIAL);

  return (
    <section id="gallery" className="relative">
      <div className="mx-auto max-w-[1180px] px-8 py-20">
        <div className="mb-10 flex items-end justify-between gap-6" data-reveal>
          <div>
            <p className="text-[15px] font-bold text-green">{t.gallery.eyebrow}</p>
            <h2 className="mt-2 text-[clamp(2rem,2.8vw,2.6rem)] leading-tight font-extrabold text-ink">{t.gallery.title}</h2>
          </div>
          <Sun className="w-20 shrink-0 animate-spin-slow" />
        </div>

        {images.length === 0 ? (
          <GalleryEmpty />
        ) : (
          <>
            <ul className="grid grid-cols-3 gap-5">
              {images.slice(0, g.visible).map((image, i) => (
                <li key={image.src}>
                  <GalleryThumb
                    image={image}
                    index={i}
                    onOpen={g.setOpen}
                    sizes="(min-width: 1200px) 370px, 31vw"
                    rounded={corners[i % 3]}
                  />
                </li>
              ))}
            </ul>
            {g.hasMore && (
              <div className="mt-10 text-center">
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
