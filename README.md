# Детский сад «Шерали» — лендинг

Next.js (App Router) + TypeScript + Tailwind CSS. Языки: казахский (по умолчанию) и русский.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # проверка сборки
```

Деплой: импортировать папку в Vercel, настройки по умолчанию.

## Где что менять
- `config/site.ts` — контакты, часы, `documentsUrl`, ссылки 2ГИС / виджет карты, данные групп.
- `i18n/translations.ts` — все тексты на двух языках.
- `public/images/` — фотографии (читаются при сборке, после добавления нужен передеплой):
  - `main-page.*` — главный экран, `main-page2.*` — «О садике»;
  - `image1.*`, `image2.*`, … — галерея; `logo.*` — логотип в шапке.
  - Форматы: jpg, jpeg, png, webp, avif.
- `components/website/` — компьютерная версия (≥ 1024 px), `components/mobile-website/` — мобильная.
