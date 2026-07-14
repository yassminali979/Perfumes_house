import { useState } from 'react';
import { Phone, MessageCircle, Mail, Instagram, Facebook, Send, Check } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { CONTACT, BRAND } from '../lib/supabase';

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hello ${BRAND},\n\nName: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    );
    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${text}`, '_blank');
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="min-h-screen bg-ink-950">
      {/* Hero */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            alt="Luxury perfume"
            className="h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 to-ink-950" />
        </div>
        <div className="relative z-10 text-center px-5">
          <Reveal>
            <p className="eyebrow mb-5">Get In Touch</p>
            <h1 className="font-serif text-5xl md:text-6xl text-cream-50 tracking-wide">
              Contact <span className="italic text-gold-300">Us</span>
            </h1>
            <div className="mt-6 h-px w-16 bg-gold-500/50 mx-auto" />
            <p className="mt-8 text-cream-200/60 max-w-xl mx-auto">
              We are here to assist you. Whether you have a question about a fragrance,
              an order, or simply wish to say hello — reach out.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact cards */}
      <section className="py-20 bg-ink-900 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <Reveal delay={200}>
              <ContactCard
                icon={<Mail size={20} strokeWidth={1.5} />}
                title="Email"
                value={CONTACT.email}
                href={`mailto:${CONTACT.email}`}
              />
            </Reveal>
          </div>

          {/* Social */}
          <div className="mt-10 flex items-center justify-center gap-6">
            <span className="eyebrow">Follow Us</span>
            <a href={CONTACT.instagram} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-300 hover:bg-gold-400 hover:text-ink-950 transition-all duration-300">
              <Instagram size={18} strokeWidth={1.5} />
            </a>
            <a href={CONTACT.facebook} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-300 hover:bg-gold-400 hover:text-ink-950 transition-all duration-300">
              <Facebook size={18} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

function ContactCard({ icon, title, value, href }: { icon: React.ReactNode; title: string; value: string; href: string }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      className="block bg-ink-800 border border-white/5 p-7 text-center hover:border-gold-500/30 transition-colors duration-500 group"
    >
      <div className="w-14 h-14 mx-auto rounded-full border border-gold-500/30 flex items-center justify-center mb-4 text-gold-300 group-hover:bg-gold-400 group-hover:text-ink-950 transition-all duration-300">
        {icon}
      </div>
      <p className="eyebrow mb-1.5">{title}</p>
      <p className="text-cream-100 text-sm">{value}</p>
    </a>
  );
}

