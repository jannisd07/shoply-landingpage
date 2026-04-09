'use client';

import {
  Apple,
  ShoppingBasket,
  Salad,
  Carrot,
  CakeSlice,
  Beef,
  Fish,
  Wheat,
  Milk,
  Egg,
} from 'lucide-react';
import Marquee from '@/components/ui/Marquee';

/**
 * Scrolling marquee strip between sections. Two rows of tokens drift in
 * opposite directions. The wrapper is `pointer-events-none` so cursor
 * movement can NEVER interrupt the animation or re-trigger any hover
 * state on the child tokens. No scroll-linked rotate — it was causing
 * visible jitter on scroll.
 */
const tokens: { label: string; icon: React.ElementType }[] = [
  { label: 'Auto-sorted', icon: ShoppingBasket },
  { label: 'Fresh picks', icon: Apple },
  { label: 'Family sync', icon: Salad },
  { label: 'Recipe-ready', icon: Carrot },
  { label: 'Smart lists', icon: CakeSlice },
  { label: 'Deal alerts', icon: Beef },
  { label: 'Aisle-smart', icon: Fish },
  { label: 'Meal plans', icon: Wheat },
  { label: 'Pantry pulse', icon: Milk },
  { label: 'Zero waste', icon: Egg },
];

export default function MarqueeStrip() {
  return (
    <section
      aria-hidden="true"
      className="relative py-10 md:py-14 bg-[#fafaf7] overflow-hidden pointer-events-none select-none"
    >
      {/* Top and bottom hairlines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0b1a0f]/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0b1a0f]/10 to-transparent" />

      <div className="flex flex-col gap-5">
        {/* Row 1 — left */}
        <Marquee speed={55} direction="left">
          {tokens.map((token, i) => {
            const Icon = token.icon;
            return (
              <div
                key={`a-${i}`}
                className="flex items-center gap-4 text-3xl md:text-5xl lg:text-6xl font-bold text-[#0b1a0f] tracking-tight whitespace-nowrap"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <span>{token.label}</span>
                <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-2xl bg-[#e7f4ec] border border-[#3e8e5a]/20 flex items-center justify-center flex-shrink-0">
                  <Icon
                    className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-[#2d6f45]"
                    strokeWidth={2}
                  />
                </div>
              </div>
            );
          })}
        </Marquee>

        {/* Row 2 — right, muted */}
        <Marquee speed={70} direction="right">
          {tokens
            .slice()
            .reverse()
            .map((token, i) => (
              <div
                key={`b-${i}`}
                className="flex items-center gap-4 text-2xl md:text-4xl lg:text-5xl font-bold text-[#0b1a0f]/30 tracking-tight whitespace-nowrap"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <span>{token.label}</span>
                <span className="text-[#3e8e5a]/40 text-2xl md:text-4xl lg:text-5xl">
                  ·
                </span>
              </div>
            ))}
        </Marquee>
      </div>
    </section>
  );
}
