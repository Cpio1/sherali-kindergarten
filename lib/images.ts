import "server-only";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

/**
 * Все фотографии читаются из public/images при сборке:
 * - main-page.*   → главный экран
 * - main-page2.*  → раздел «О садике»
 * - logo.*        → логотип в шапке (если есть)
 * - image1.*, image2.*, … (и любые другие фото) → галерея, в естественном порядке номеров
 * Поддерживаются png, jpg, jpeg, webp, avif. Расширение может быть любым из списка.
 */
export type SiteImage = { src: string; width: number; height: number };
export type SiteMedia = {
  heroImage: SiteImage | null;
  aboutImage: SiteImage | null;
  logo: SiteImage | null;
  gallery: SiteImage[];
};

type ImageFile = SiteImage & { hash: string };

const IMAGES_DIR = path.join(process.cwd(), "public", "images");
const SUPPORTED = [".avif", ".webp", ".png", ".jpg", ".jpeg"];
const RESERVED = /^(main-page|main-page2|logo|favicon|icon|og|og-image|apple-touch-icon)$/i;
const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" });
const base = (file: string) => path.basename(file, path.extname(file));

function listFiles(): string[] {
  try {
    return fs
      .readdirSync(IMAGES_DIR, { withFileTypes: true })
      .filter((entry) => entry.isFile() && !entry.name.startsWith("."))
      .map((entry) => entry.name)
      .filter((name) => SUPPORTED.includes(path.extname(name).toLowerCase()))
      .sort(collator.compare);
  } catch {
    return []; // папки ещё нет — это допустимое пустое состояние
  }
}

function readImage(file: string): ImageFile | null {
  try {
    const buffer = fs.readFileSync(path.join(IMAGES_DIR, file));
    const { width, height, orientation } = imageSize(buffer);
    if (!width || !height) return null;
    // EXIF-ориентации 5–8 означают поворот на 90° при показе.
    const rotated = orientation !== undefined && orientation >= 5 && orientation <= 8;
    return {
      src: `/images/${encodeURIComponent(file)}`,
      width: rotated ? height : width,
      height: rotated ? width : height,
      hash: createHash("sha1").update(buffer).digest("hex"),
    };
  } catch {
    return null; // повреждённый файл пропускаем, чтобы не показывать сломанное изображение
  }
}

function findNamed(files: string[], name: string): ImageFile | null {
  const candidates = files
    .filter((file) => base(file).toLowerCase() === name)
    .sort((a, b) => SUPPORTED.indexOf(path.extname(a).toLowerCase()) - SUPPORTED.indexOf(path.extname(b).toLowerCase()));
  for (const file of candidates) {
    const image = readImage(file);
    if (image) return image;
  }
  return null;
}

const strip = (image: ImageFile | null): SiteImage | null =>
  image && { src: image.src, width: image.width, height: image.height };

export function getSiteMedia(): SiteMedia {
  const files = listFiles();
  const hero = findNamed(files, "main-page");
  const about = findNamed(files, "main-page2");
  const logo = findNamed(files, "logo");

  // Точные копии (в том числе копии главных фото) в галерею не попадают.
  const seen = new Set([hero, about].flatMap((image) => (image ? [image.hash] : [])));
  const gallery: SiteImage[] = [];
  for (const file of files) {
    if (RESERVED.test(base(file))) continue;
    const image = readImage(file);
    if (!image || seen.has(image.hash)) continue;
    seen.add(image.hash);
    gallery.push(strip(image)!);
  }

  return { heroImage: strip(hero), aboutImage: strip(about), logo: strip(logo), gallery };
}
