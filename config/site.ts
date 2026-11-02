/**
 * Все подтверждённые данные детского сада и внешние ссылки — в одном месте.
 * Тексты интерфейса на двух языках лежат в i18n/translations.ts.
 */

export const site = {
  legalName: "ТОО детский сад «Шерали»",
  city: "Алматы",
  phoneDisplay: "+7 702 741 5121",
  phoneHref: "tel:+77027415121",
  whatsappUrl: "https://wa.me/77027415121",
  instagramUrl: "https://www.instagram.com/Sherali_balabaqshasy/",
  instagramHandle: "@Sherali_balabaqshasy",
  hours: "07:45–18:00",
  groupsCount: 3,
  ageRange: "1–6",
  mealsPerDay: 5,

  /**
   * Ссылка на папку с документами (Google Drive, Яндекс Диск и т. п.).
   * Пока `null` — кнопка неактивна и подписана «Скоро / Жақында».
   * Вставьте URL строкой — кнопка станет активной и будет открываться в новой вкладке.
   */
  documentsUrl: null as string | null,

  map: {
    /** Поиск адреса в 2ГИС (используется, пока нет точной карточки организации). */
    twoGisSearchUrl: `https://2gis.kz/almaty/search/${encodeURIComponent("Каракулова 24/1")}`,
    /**
     * Точная ссылка на карточку организации в 2ГИС, например "https://2gis.kz/almaty/firm/…".
     * Если указана — кнопка ведёт на неё вместо поиска.
     */
    twoGisFirmUrl: null as string | null,
    /**
     * URL официального виджета карты для iframe (конструктор 2ГИС: https://dev.2gis.ru/widgets,
     * или конструктор Яндекс Карт). Если `null` — блок карты не показывается.
     */
    widgetUrl: null as string | null,
  },
} as const;

/** Якоря разделов — одинаковые в компьютерной и мобильной версиях. */
export const sectionIds = ["home", "about", "groups", "meals", "gallery", "documents", "contacts"] as const;
export type SectionId = (typeof sectionIds)[number];

export type Localized = { kk: string; ru: string };

/**
 * Группы. Названия и возраст отдельных групп пока не предоставлены — список пуст,
 * и раздел показывает только общий блок «3 группы, 1–6 лет».
 * Когда данные появятся, добавьте сюда объекты — карточки групп отобразятся автоматически:
 *
 *   { name: { kk: "…", ru: "…" }, age: { kk: "1–2 жас", ru: "1–2 года" }, description: { kk: "…", ru: "…" } },
 */
export type GroupInfo = { name: Localized; age?: Localized; description?: Localized };
export const groups: GroupInfo[] = [];
