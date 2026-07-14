import { Reveal } from './Reveal';

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? 'text-center' : ''}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="section-title">{title}</h2>
      {subtitle && (
        <p className={`mt-4 text-cream-300/60 text-sm md:text-base max-w-xl ${center ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
      <div className={`mt-5 h-px w-16 bg-gold-500/50 ${center ? 'mx-auto' : ''}`} />
    </Reveal>
  );
}
