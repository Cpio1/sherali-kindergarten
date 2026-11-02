import Image from "next/image";
import type { SiteImage } from "@/lib/images";
import { Cloud, Flower, Leaf, Sun } from "./Decor";

/**
 * Декоративная композиция вместо фотографии, пока файл не добавлен в public/images.
 * Не выдаёт себя за фото садика и скрыта от экранных чтецов.
 */
export function PhotoPlaceholder({ variant = "sky" }: { variant?: "sky" | "garden" }) {
  const sky = variant === "sky";
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden ${sky ? "bg-[#cfe9f5]" : "bg-mint"}`}
    >
      <Sun className={`absolute w-[26%] ${sky ? "top-[12%] left-[14%]" : "top-[8%] left-[10%]"}`} />
      <Cloud className="absolute top-[26%] left-[30%] w-[34%]" />
      <Cloud className="absolute top-[38%] right-[4%] w-[24%]" color="#FFF9EE" />
      <div className="absolute inset-x-[-10%] bottom-[-6%] h-[38%] rounded-[50%] bg-[#8cc58f]" />
      <div className="absolute right-[-20%] bottom-[-12%] h-[34%] w-[80%] rounded-[50%] bg-green" />
      <Flower className="absolute bottom-[14%] left-[14%] w-[13%]" />
      <Flower className="absolute bottom-[8%] left-[34%] w-[9%]" color="#FFFFFF" />
      <Flower className="absolute right-[18%] bottom-[12%] w-[11%]" color="#FFD56A" center="#F4B89F" />
      <Leaf className="absolute bottom-[22%] left-[52%] w-[8%]" color="#5BAA6E" />
    </div>
  );
}

type FramePhotoProps = {
  image: SiteImage | null;
  alt: string;
  sizes: string;
  priority?: boolean;
  variant?: "sky" | "garden";
  position?: string;
};

/** Фотография, заполняющая фигурную рамку; без файла — иллюстрация. */
export function FramePhoto({ image, alt, sizes, priority, variant, position = "50% 35%" }: FramePhotoProps) {
  if (!image) return <PhotoPlaceholder variant={variant} />;
  return (
    <Image
      src={image.src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={80}
      className="object-cover"
      style={{ objectPosition: position }}
    />
  );
}

/**
 * Одинаковое значение sizes для обеих версий: до гидратации в HTML есть обе,
 * и браузер загружает главное фото один раз (один и тот же srcset).
 */
export const HERO_SIZES = "(min-width: 1024px) 520px, (min-width: 640px) 560px, 92vw";
