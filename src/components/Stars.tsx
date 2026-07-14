import { Star } from 'lucide-react';

export function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < full;
        const isHalf = i === full && half;
        return (
          <Star
            key={i}
            size={size}
            className={
              filled || isHalf ? 'text-gold-300' : 'text-cream-300/30'
            }
            fill={filled ? 'currentColor' : isHalf ? 'url(#half)' : 'none'}
            strokeWidth={1.5}
          />
        );
      })}
    </div>
  );
}
