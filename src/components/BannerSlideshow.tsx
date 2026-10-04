import React, { useState, useEffect } from 'react';
import { BannerItem, CompanyInfo } from '../types';
import { 
  ChevronLeft, 
  ChevronRight, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Flame,
  Snowflake,
  Wrench,
  Award
} from 'lucide-react';
import { getWhatsAppUrl } from '../utils/whatsapp';

interface BannerSlideshowProps {
  banners: BannerItem[];
  company: CompanyInfo;
  onOpenOrderModal?: (banner: BannerItem) => void;
}

export const BannerSlideshow: React.FC<BannerSlideshowProps> = ({
  banners,
  company,
}) => {
  const activeBanners = banners.filter(b => b.active);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (activeBanners.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [activeBanners.length, isPaused]);

  if (!activeBanners || activeBanners.length === 0) {
    return null;
  }

  const current = activeBanners[currentIndex] || activeBanners[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? activeBanners.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
  };

  const waUrl = getWhatsAppUrl(
    company.whatsappNumber || '087874417978',
    `Halo Serviceku, saya tertarik dengan informasi banner promo: "${current.title} - ${current.subtitle}". Mohon info lengkap dan jadwal teknisi.`
  );

  return (
    <div
      className="relative w-full overflow-hidden bg-slate-950 py-4 sm:py-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Banner Card with Gradient */}
        <div
          className={`relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 bg-gradient-to-br ${
            current.gradient || 'from-blue-700 via-sky-600 to-indigo-900'
          } border border-white/15`}
        >
          {/* Subtle background image overlay for texture */}
          {current.imageUrl && (
            <div className="absolute inset-0 mix-blend-overlay opacity-25 overflow-hidden pointer-events-none">
              <img
                src={current.imageUrl}
                alt={current.title}
                className="w-full h-full object-cover transform scale-105 filter brightness-110"
              />
            </div>
          )}

          {/* Decorative ambient glowing orbs */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Banner Infographic Content Grid */}
          <div className="relative z-10 p-6 sm:p-10 lg:p-12 text-white">
            <div className="max-w-3xl space-y-4 sm:space-y-6">
              {/* Badge & Highlight Pill */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black tracking-wide uppercase bg-amber-400 text-slate-950 shadow-md">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  {current.badge || "Promo Infografis"}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/20">
                  <Sparkles className="w-3 h-3 text-cyan-300" />
                  {current.highlight || "Siap Panggilan 24/7"}
                </span>
              </div>

              {/* Banner Headline Title */}
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-sm font-['Outfit',sans-serif]">
                {current.title}
              </h1>

              {/* Subtitle / Description */}
              <p className="text-sm sm:text-lg text-slate-100/90 font-medium max-w-2xl leading-relaxed">
                {current.subtitle}
              </p>

              {/* Infographic Key Highlights Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4 pt-2">
                <div className="flex items-center gap-2 bg-black/25 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="text-xs font-bold leading-tight">Garansi 1 Bulan Kerusakan Sama</span>
                </div>
                <div className="flex items-center gap-2 bg-black/25 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10">
                  <Wrench className="w-5 h-5 text-cyan-300 shrink-0" />
                  <span className="text-xs font-bold leading-tight">Teknisi Ahli Siap Datang</span>
                </div>
                <div className="col-span-2 sm:col-span-1 flex items-center gap-2 bg-black/25 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10">
                  <Award className="w-5 h-5 text-amber-300 shrink-0" />
                  <span className="text-xs font-bold leading-tight">Sparepart Asli & Berkualitas</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm sm:text-base shadow-lg shadow-emerald-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <MessageSquare className="w-5 h-5 fill-current" />
                  <span>Chat WhatsApp Sekarang</span>
                </a>

                <a
                  href="#katalog-jasa"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm sm:text-base backdrop-blur-md border border-white/20 transition-all"
                >
                  <span>Lihat Semua Jasa</span>
                </a>
              </div>
            </div>

            {/* Bottom Bar: Prominent Name of "Jasa Serviceku" as requested in prompt */}
            <div className="mt-8 pt-4 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-black/20 -mx-6 sm:-mx-10 lg:-mx-12 -mb-6 sm:-mb-10 lg:-mb-12 px-6 sm:px-10 lg:px-12 py-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-500/40 flex items-center justify-center text-cyan-300 border border-cyan-400/30">
                  <Snowflake className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-300">
                    Nama Jasa:
                  </span>
                  <p className="text-sm sm:text-base font-black text-white tracking-wide font-['Outfit',sans-serif]">
                    {current.serviceName || company.name || "Serviceku - Elektronik Terbaik"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Siap melayani panggilan rumah, kantor & tempat usaha Anda</span>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          {activeBanners.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all cursor-pointer hover:scale-110"
                aria-label="Previous banner"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all cursor-pointer hover:scale-110"
                aria-label="Next banner"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Slideshow pagination indicator dots */}
        {activeBanners.length > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4">
            {activeBanners.map((b, idx) => (
              <button
                key={b.id || idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? 'w-8 h-2.5 bg-cyan-400 shadow-sm'
                    : 'w-2.5 h-2.5 bg-slate-700 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
