import React from 'react';
import { 
  ShieldCheck, 
  Users, 
  Zap, 
  CheckCircle, 
  Clock, 
  Sparkles, 
  MapPin, 
  PhoneCall, 
  HeartHandshake 
} from 'lucide-react';
import { CompanyInfo } from '../types';

interface WhyChooseUsProps {
  company: CompanyInfo;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ company }) => {
  const highlights = [
    {
      icon: ShieldCheck,
      color: 'text-emerald-500 bg-emerald-50 border-emerald-200',
      title: 'BERGARANSI 1 BULAN',
      subtitle: 'Garansi service untuk kerusakan yang sama selama 1 bulan penuh demi ketenangan Anda.',
    },
    {
      icon: Users,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      title: 'TEKNISI BERPENGALAMAN',
      subtitle: 'Teknisi handal, ramah, jujur, dan amanah siap datang langsung ke tempat Anda.',
    },
    {
      icon: Zap,
      color: 'text-amber-500 bg-amber-50 border-amber-200',
      title: 'SERVICE CEPAT, TEPAT & PROFESIONAL',
      subtitle: 'Datang tepat waktu, pengerjaan cepat dan terarah dengan SOP kerja elektronik.',
    },
    {
      icon: CheckCircle,
      color: 'text-cyan-600 bg-cyan-50 border-cyan-200',
      title: 'SPAREPART ORIGINAL & BERKUALITAS',
      subtitle: 'Penggantian modul, kompresor, freon, dan suku cadang asli berstandar pabrik.',
    },
    {
      icon: HeartHandshake,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
      title: 'HARGA BERSAHABAT & TRANSPARAN',
      subtitle: 'Kualitas terbaik dengan harga bersahabat tanpa biaya tersembunyi atau mark-up.',
    },
    {
      icon: Clock,
      color: 'text-rose-500 bg-rose-50 border-rose-200',
      title: 'SIAP PANGGILAN SETIAP HARI',
      subtitle: 'Buka setiap hari termasuk akhir pekan (07.30 - 21.00 WIB) untuk darurat AC/kulkas.',
    },
  ];

  return (
    <section id="keunggulan" className="py-14 sm:py-20 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Mengapa Memilih Serviceku?
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-['Outfit',sans-serif]">
            Percayakan Service Anda Kepada Kami
          </h2>
          <p className="mt-2 text-base text-slate-600">
            Kami siap memberikan yang terbaik dengan komitmen kualitas, integritas, dan jaminan kepuasan pelanggan.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50/80 rounded-3xl p-6 sm:p-7 border border-slate-200/80 hover:border-blue-400 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border transition-transform group-hover:scale-110 ${item.color}`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight mb-2 font-['Outfit',sans-serif]">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.subtitle}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner matching user poster */}
        <div className="mt-12 rounded-3xl bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 text-white p-6 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-blue-700/50">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950">
              <ShieldCheck className="w-3.5 h-3.5" />
              JAMINAN SERVICE RESMI
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-['Outfit',sans-serif]">
              {company.warrantyText || "Garansi Service untuk Kerusakan yang Sama 1 Bulan"}
            </h3>
            <p className="text-xs sm:text-sm text-blue-200 max-w-xl">
              Alat elektronik Anda bermasalah kembali setelah diservice? Tenang! Teknisi kami akan datang melakukan perbaikan ulang gratis sesuai masa garansi.
            </p>
          </div>

          <a
            href={`https://wa.me/${company.whatsappNumber || '6287874417978'}?text=${encodeURIComponent(
              'Halo Serviceku, saya ingin menanyakan klaim garansi / jadwal teknisi.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-lg shadow-amber-400/25 transition-all transform hover:-translate-y-0.5"
          >
            <PhoneCall className="w-4 h-4 fill-current" />
            <span>Hubungi Serviceku Sekarang</span>
          </a>
        </div>
      </div>
    </section>
  );
};
