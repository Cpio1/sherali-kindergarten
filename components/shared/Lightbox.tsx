"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { SiteImage } from "@/lib/images";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ChevronIcon, CloseIcon } from "./Icons";

type LightboxProps = {
  images: SiteImage[];
  index: number;
  onClose: () => void;
  onStep: (delta: number) => void;
};

/** Полноэкранный просмотр: фото целиком, стрелки, клавиатура (←, →, Esc), свайп, ловушка фокуса. */
export function Lightbox({ images, index, onClose, onStep }: LightboxProps) {
  const { t } = useLanguage();
  const dialog = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const image = images[index];
  const many = images.length > 1;

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowRight" && many) onStep(1);
      else if (event.key === "ArrowLeft" && many) onStep(-1);
      else if (event.key === "Tab" && dialog.current) {
        const focusable = dialog.current.querySelectorAll<HTMLElement>("button");
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [many, onClose, onStep]);

  if (!image) return null;

  const arrow =
    "absolute top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-ink shadow-lg transition-transform hover:scale-105 focus-light";

  return (
    <div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label={t.gallery.dialog}
      className="fixed inset-0 z-[90] flex flex-col bg-[#13241b]/95"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onTouchStart={(event) => {
        touchX.current = event.touches[0].clientX;
      }}
      onTouchEnd={(event) => {
        if (touchX.current === null || !many) return;
        const dx = event.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) onStep(dx < 0 ? 1 : -1);
      }}
    >
      <div className="flex items-center justify-between px-4 pt-[max(12px,env(safe-area-inset-top))] pb-2 text-white">
        <p className="text-sm font-semibold tabular-nums" aria-live="polite">
          {index + 1} / {images.length}
        </p>
        <button
          ref={closeButton}
          type="button"
          onClick={onClose}
          aria-label={t.gallery.close}
          className="grid size-12 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 focus-light"
        >
          <CloseIcon className="size-6" />
        </button>
      </div>
      <div
        className="relative mx-auto w-full max-w-6xl flex-1 px-3 pb-[max(16px,env(safe-area-inset-bottom))] sm:px-20"
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <div className="relative h-full w-full">
          <Image
            key={image.src}
            src={image.src}
            alt={t.gallery.photoAlt(index + 1)}
            fill
            sizes="100vw"
            quality={85}
            className="object-contain"
          />
        </div>
        {many && (
          <>
            <button type="button" onClick={() => onStep(-1)} aria-label={t.gallery.prev} className={`${arrow} left-2 sm:left-4`}>
              <ChevronIcon dir="left" className="size-6" />
            </button>
            <button type="button" onClick={() => onStep(1)} aria-label={t.gallery.next} className={`${arrow} right-2 sm:right-4`}>
              <ChevronIcon className="size-6" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
