/** Декоративные элементы. Все скрыты от экранных чтецов и не перехватывают нажатия. */

type DecorProps = { className?: string; style?: React.CSSProperties };
const base = { "aria-hidden": true, focusable: false } as const;
const cls = (className?: string) => `pointer-events-none select-none ${className ?? ""}`;

export function Sun({ className, style }: DecorProps) {
  return (
    <svg {...base} viewBox="0 0 120 120" className={cls(className)} style={style}>
      <g fill="#FFD56A">
        {Array.from({ length: 12 }, (_, i) => (
          <rect key={i} x="56" y="4" width="8" height="20" rx="4" transform={`rotate(${i * 30} 60 60)`} />
        ))}
      </g>
      <circle cx="60" cy="60" r="30" fill="#FFD56A" />
      <circle cx="52" cy="52" r="14" fill="#FFE59A" />
    </svg>
  );
}

export function Cloud({ className, style, color = "#FFFFFF" }: DecorProps & { color?: string }) {
  return (
    <svg {...base} viewBox="0 0 160 80" className={cls(className)} style={style}>
      <path
        fill={color}
        d="M38 74h88a26 26 0 0 0 2-52 34 34 0 0 0-62-6 24 24 0 0 0-36 22A18 18 0 0 0 38 74Z"
      />
    </svg>
  );
}

export function Leaf({ className, style, color = "#2F7653" }: DecorProps & { color?: string }) {
  return (
    <svg {...base} viewBox="0 0 60 60" className={cls(className)} style={style}>
      <path fill={color} d="M8 52C6 26 22 8 54 6c2 30-16 48-46 46Z" />
      <path d="M12 48C22 36 32 26 46 14" stroke="#FFF9EE" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7" />
    </svg>
  );
}

export function Star({ className, style, color = "#FFD56A" }: DecorProps & { color?: string }) {
  return (
    <svg {...base} viewBox="0 0 40 40" className={cls(className)} style={style}>
      <path
        fill={color}
        d="M20 3c1.6 0 2.4 9.8 4.2 12 2 2.3 12.8 3.4 12.8 5s-10.8 2.7-12.8 5C22.4 27.2 21.6 37 20 37s-2.4-9.8-4.2-12C13.8 22.7 3 21.6 3 20s10.8-2.7 12.8-5C17.6 12.8 18.4 3 20 3Z"
      />
    </svg>
  );
}

export function Flower({
  className,
  style,
  color = "#F4B89F",
  center = "#FFD56A",
}: DecorProps & { color?: string; center?: string }) {
  return (
    <svg {...base} viewBox="0 0 60 60" className={cls(className)} style={style}>
      <g fill={color}>
        {Array.from({ length: 6 }, (_, i) => (
          <ellipse key={i} cx="30" cy="15" rx="9" ry="12" transform={`rotate(${i * 60} 30 30)`} />
        ))}
      </g>
      <circle cx="30" cy="30" r="8" fill={center} />
    </svg>
  );
}

/** Мягкое органическое пятно для подложек. */
export function Blob({ className, style, color = "#E7F1DD" }: DecorProps & { color?: string }) {
  return (
    <svg {...base} viewBox="0 0 200 200" className={cls(className)} style={style} preserveAspectRatio="none">
      <path
        fill={color}
        d="M163 41c22 24 30 62 16 94s-52 58-90 56S16 160 9 124 17 46 45 25s96-8 118 16Z"
      />
    </svg>
  );
}

export function Squiggle({ className, style, color = "#F4B89F" }: DecorProps & { color?: string }) {
  return (
    <svg {...base} viewBox="0 0 120 24" className={cls(className)} style={style}>
      <path
        d="M4 14c10-10 18-10 28 0s18 10 28 0 18-10 28 0 18 10 28 0"
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Dots({ className, style, color = "#2F7653" }: DecorProps & { color?: string }) {
  return (
    <svg {...base} viewBox="0 0 64 64" className={cls(className)} style={style}>
      <g fill={color}>
        {Array.from({ length: 16 }, (_, i) => (
          <circle key={i} cx={8 + (i % 4) * 16} cy={8 + Math.floor(i / 4) * 16} r="3" />
        ))}
      </g>
    </svg>
  );
}

/* ——— Иллюстрации для раздела «Питание» (без конкретного меню) ——— */

export function PlateArt({ className }: DecorProps) {
  return (
    <svg {...base} viewBox="0 0 220 160" className={cls(className)}>
      {/* вилка */}
      <g fill="#FFF9EE">
        <rect x="18" y="24" width="6" height="40" rx="3" />
        <rect x="30" y="24" width="6" height="40" rx="3" />
        <rect x="42" y="24" width="6" height="40" rx="3" />
        <path d="M18 60h30v6a15 15 0 0 1-12 14v58a3 3 0 0 1-6 0V80a15 15 0 0 1-12-14Z" />
      </g>
      {/* тарелка */}
      <circle cx="112" cy="84" r="64" fill="#FFF9EE" />
      <circle cx="112" cy="84" r="48" fill="#E7F1DD" />
      <circle cx="112" cy="84" r="48" fill="none" stroke="#FFD56A" strokeWidth="4" strokeDasharray="2 10" strokeLinecap="round" />
      {/* ложка */}
      <ellipse cx="196" cy="44" rx="13" ry="18" fill="#FFF9EE" />
      <rect x="192" y="58" width="8" height="84" rx="4" fill="#FFF9EE" />
    </svg>
  );
}

export function AppleArt({ className, style }: DecorProps) {
  return (
    <svg {...base} viewBox="0 0 60 64" className={cls(className)} style={style}>
      <path fill="#F08A6B" d="M30 18c-6-5-22-4-22 14 0 14 9 28 16 28 3 0 4-2 6-2s3 2 6 2c7 0 16-14 16-28 0-18-16-19-22-14Z" />
      <path fill="#FFFFFF" opacity="0.45" d="M16 28c1-5 4-7 8-7-3 2-5 5-5 9Z" />
      <path d="M30 18c0-6 2-10 5-12" stroke="#7A4A2A" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path fill="#5BAA6E" d="M33 12c4-7 12-8 16-6-3 6-10 8-16 6Z" />
    </svg>
  );
}

export function CarrotArt({ className, style }: DecorProps) {
  return (
    <svg {...base} viewBox="0 0 60 64" className={cls(className)} style={style}>
      <path fill="#5BAA6E" d="M34 18c-2-8 0-14 4-16 1 5 0 10-1 15ZM36 19c4-6 10-8 15-7-3 5-8 8-14 8ZM33 18c-5-5-11-6-15-4 4 4 9 6 14 6Z" />
      <path fill="#F59A3E" d="M26 18c6-3 14 0 14 7 0 4-18 33-24 36-3 1-4-1-3-4 3-8 6-32 13-39Z" />
      <path d="M22 30h6M19 40h6M17 50h5" stroke="#D97A1F" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function CupArt({ className, style }: DecorProps) {
  return (
    <svg {...base} viewBox="0 0 64 60" className={cls(className)} style={style}>
      <path d="M22 10c-3 3 3 5 0 8M32 8c-3 3 3 5 0 8" stroke="#FFF9EE" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path fill="#FFD56A" d="M10 22h40v14a18 18 0 0 1-18 18h-4a18 18 0 0 1-18-18Z" />
      <path d="M50 26h4a7 7 0 0 1 0 14h-5" stroke="#FFD56A" strokeWidth="5" fill="none" />
      <circle cx="24" cy="36" r="3" fill="#F4B89F" />
      <circle cx="34" cy="40" r="2.5" fill="#F4B89F" />
    </svg>
  );
}

export function PearArt({ className, style }: DecorProps) {
  return (
    <svg {...base} viewBox="0 0 60 64" className={cls(className)} style={style}>
      <path fill="#B9D86A" d="M30 12c-6 0-8 8-8 14-8 5-12 12-12 20 0 10 9 16 20 16s20-6 20-16c0-8-4-15-12-20 0-6-2-14-8-14Z" />
      <path fill="#FFFFFF" opacity="0.4" d="M18 44c0-5 3-9 7-11-2 4-3 8-3 12Z" />
      <path d="M30 12c0-4 1-7 3-9" stroke="#7A4A2A" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}
