"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Плавное появление элементов с атрибутом data-reveal внутри контейнера. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-in"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
  return ref;
}

/** Показ ограниченного числа фото и индекс открытого в просмотре. */
export function useGallery(total: number, initial: number) {
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const visible = expanded ? total : Math.min(total, initial);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((delta: number) => setOpen((i) => (i === null ? i : (i + delta + total) % total)), [total]);
  return { expanded, setExpanded, visible, open, setOpen, close, step, hasMore: total > initial };
}

/** true, когда страница прокручена ниже порога (для тени шапки и плавающей кнопки). */
export function useScrolledPast(threshold: number) {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const update = () => setPast(window.scrollY > threshold);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [threshold]);
  return past;
}
