import type { Metadata, Viewport } from "next";
import { Noto_Sans } from "next/font/google";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import "./globals.css";

// cyrillic-ext содержит казахские буквы ә ғ қ ң ө ұ ү һ і.
const noto = Noto_Sans({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-noto",
});

const description =
  "Детский сад «Шерали» в Алматы для детей от 1 до 6 лет: воспитание и обучение на казахском языке, 5-разовое питание. Адрес: г. Алматы, ул. Каракулова, 24/1.";

export const metadata: Metadata = {
  title: "Шерали — детский сад в Алматы",
  description,
  openGraph: {
    title: "Шерали — детский сад в Алматы",
    description,
    type: "website",
    locale: "kk_KZ",
    alternateLocale: ["ru_RU"],
    siteName: "Детский сад «Шерали»",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#FFF9EE",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Анимации появления включаются до первой отрисовки и только без prefers-reduced-motion.
const motionScript = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')}catch(e){}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ChildCare",
  name: "ТОО детский сад «Шерали»",
  alternateName: ["«Шерали» балабақшасы", "Детский сад «Шерали»"],
  telephone: "+77027415121",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Каракулова, 24/1",
    addressLocality: "Алматы",
    addressCountry: "KZ",
  },
  sameAs: ["https://www.instagram.com/Sherali_balabaqshasy/"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kk" className={noto.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
