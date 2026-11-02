import { MobileWebsite } from "@/components/mobile-website/MobileWebsite";
import { SkipLink } from "@/components/shared/Brand";
import { LayoutSwitch } from "@/components/shared/LayoutSwitch";
import { Website } from "@/components/website/Website";
import { getSiteMedia } from "@/lib/images";

export default function Home() {
  // Фото читаются из public/images при сборке: добавьте файлы и пересоберите / передеплойте.
  const media = getSiteMedia();
  const year = new Date().getFullYear();

  return (
    <>
      <SkipLink />
      <LayoutSwitch website={<Website media={media} year={year} />} mobile={<MobileWebsite media={media} year={year} />} />
    </>
  );
}
