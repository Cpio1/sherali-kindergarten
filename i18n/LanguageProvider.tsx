"use client";

import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { defaultLang, languages, translations, type Dict, type Lang } from "./translations";

const STORAGE_KEY = "sherali-lang";

type LanguageContextValue = { lang: Lang; t: Dict; setLang: (lang: Lang) => void };
const LanguageContext = createContext<LanguageContextValue | null>(null);

/** Раздел, который сейчас читает посетитель, и его положение относительно верха окна. */
function captureAnchor() {
  const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]")).filter(
    (section) => section.getClientRects().length > 0,
  );
  const line = window.innerHeight * 0.3;
  let current: HTMLElement | null = null;
  for (const section of sections) if (section.getBoundingClientRect().top <= line) current = section;
  if (!current || window.scrollY < 4) return null;
  return { id: current.id, top: current.getBoundingClientRect().top };
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Сервер и первая отрисовка всегда на казахском — без ошибок гидратации.
  const [lang, setLangState] = useState<Lang>(defaultLang);
  const anchor = useRef<{ id: string; top: number } | null>(null);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      /* localStorage недоступен (приватный режим) — остаёмся на языке по умолчанию */
    }
    if (stored && (languages as string[]).includes(stored) && stored !== defaultLang) {
      anchor.current = captureAnchor();
      setLangState(stored as Lang);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // После смены языка высота текстов меняется — возвращаем тот же раздел на то же место экрана.
  useLayoutEffect(() => {
    const saved = anchor.current;
    anchor.current = null;
    if (!saved) return;
    const element = document.getElementById(saved.id);
    if (!element) return;
    const delta = element.getBoundingClientRect().top - saved.top;
    if (Math.abs(delta) > 1) window.scrollTo({ top: window.scrollY + delta, behavior: "instant" });
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    anchor.current = captureAnchor();
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* без сохранения — выбор действует до перезагрузки */
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], setLang }}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLanguage must be used inside LanguageProvider");
  return value;
}
