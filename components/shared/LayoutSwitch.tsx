"use client";

import { useEffect, useLayoutEffect, useRef, useSyncExternalStore } from "react";

/** Единственная точка переключения: ≥ 1024 px — components/website, меньше — components/mobile-website. */
export const DESKTOP_QUERY = "(min-width: 64rem)";
type Snapshot = "desktop" | "mobile" | "both";

let lastSection: string | null = null;
let anchor: string | null = null;

function sectionOnScreen() {
  let id: string | null = null;
  for (const section of document.querySelectorAll<HTMLElement>("main section[id]")) {
    if (section.getClientRects().length && section.getBoundingClientRect().top <= window.innerHeight * 0.3) id = section.id;
  }
  return id;
}

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(DESKTOP_QUERY);
  const handler = () => {
    anchor = lastSection;
    onChange();
  };
  mql.addEventListener("change", handler);
  return () => mql.removeEventListener("change", handler);
}

const getSnapshot = (): Snapshot => (window.matchMedia(DESKTOP_QUERY).matches ? "desktop" : "mobile");
// Сервер не знает ширину экрана: отдаёт обе компоновки, CSS показывает нужную.
const getServerSnapshot = (): Snapshot => "both";

/**
 * Выбирает компоновку по ширине экрана (не по user agent):
 * - в HTML с сервера есть обе, медиазапрос в globals.css скрывает лишнюю — нет ошибок гидратации и скачка;
 *   скрытые фото не загружаются (lazy в display:none), а главное фото имеет одинаковый srcset в обеих;
 * - сразу после гидратации скрытая компоновка удаляется из DOM — один набор id, H1 и наблюдателей;
 * - при изменении ширины через границу компоновки меняются, посетитель остаётся в том же разделе.
 */
export function LayoutSwitch({ website, mobile }: { website: React.ReactNode; mobile: React.ReactNode }) {
  const layout = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const first = useRef(true);

  useEffect(() => {
    let width = window.innerWidth;
    let frame = 0;
    let settle = 0;
    const measure = () => {
      if (window.innerWidth === width) lastSection = sectionOnScreen();
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    const onResize = () => {
      clearTimeout(settle);
      settle = window.setTimeout(() => {
        width = window.innerWidth;
        measure();
      }, 250);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(settle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useLayoutEffect(() => {
    if (layout === "both") return;
    document.documentElement.dataset.layout = layout;
    let target = anchor;
    anchor = null;
    // При первой загрузке браузер мог искать якорь в скрытой компоновке.
    if (first.current && !target && window.location.hash.length > 1) target = decodeURIComponent(window.location.hash.slice(1));
    first.current = false;
    if (target) document.getElementById(target)?.scrollIntoView({ block: "start", behavior: "instant" });
  }, [layout]);

  return (
    <>
      {layout !== "mobile" && <div className="website-root">{website}</div>}
      {layout !== "desktop" && <div className="mobile-root">{mobile}</div>}
    </>
  );
}
