import React from 'react';
import { MapPin, Navigation, Clock, Phone, MessageSquare, CheckCircle2, Shield } from 'lucide-react';
import { CompanyInfo } from '../types';
import { getWhatsAppUrl } from '../utils/whatsapp';

interface CoverageAreaProps {
  company: CompanyInfo;
}

export const CoverageArea: React.FC<CoverageAreaProps> = ({ company }) => {
  const areas = [
    {
      city: 'INDRAMAYU',
      desc: 'Melayani area Jatibarang, Patrol, Haurgeulis, Karangampel, Sukra, Kandanghaur, Losarang, dan seluruh kecamatan sekitarnya.',
      badge: 'Area Utama',
      color: 'border-blue-500 bg-blue-50/50',
    },
    {
      city: 'CIREBON',
      desc: 'Melayani Kota Cirebon, Sumber, Weru, Plered, Kedawung, Arjawinangun, Palimanan, Kanci, Lemahwungkuk, dan sekitarnya.',
      badge: 'Siap Panggilan',
      color: 'border-cyan-500 bg-cyan-50/50',
    },
    {
      city: 'MAJALENGKA',
      desc: 'Melayani Kadipaten, Kertajati, Jatiwangi, Majalengka Kota, Cigasong, Dawuan, Kasokandel, dan wilayah sekitarnya.',
      badge: 'Jangkauan Penuh',
      color: 'border-indigo-500 bg-indigo-50/50',
    },
  ];

  const waUrl = getWhatsAppUrl(
    company.whatsappNumber || '087874417978',
    `Halo Serviceku, saya ingin panggil teknisi ke rumah/kantor di wilayah: (Sebutkan kota/kecamatan Anda). Mohon info jadwal kunjungan.`
  );

  return (
    <section id="wilayah-layanan" className="py-14 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 mb-3">
            <Navigation className="w-3.5 h-3.5 text-cyan-400" />
            Jangkauan Panggilan Teknisi
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
            Melayani Panggilan Wilayah Ciayumajakuning
          </h2>
          <p className="mt-2 text-base text-slate-300">
            Teknisi kami siap datang langsung ke rumah, kontrakan, kantor, ruko, toko, minimarket, pabrik, atau instansi Anda.
          </p>
        </div>

        {/* 3 Regional Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {areas.map((area, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-6 sm:p-7 border bg-slate-800/80 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 shadow-xl`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-blue-600/30 text-cyan-300 flex items-center justify-center border border-cyan-400/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-black text-white tracking-wider font-['Outfit',sans-serif]">
                    {area.city}
                  </h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-cyan-200 border border-white/10">
                  {area.badge}
                </span>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {area.desc}
              </p>

              <div className="pt-3 border-t border-slate-700/60 flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Teknisi Siap Datang Setiap Hari</span>
              </div>
            </div>
          ))}
        </div>

        {/* Workshop Address Card */}
        <div className="rounded-3xl bg-slate-800/90 border border-slate-700 p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-3 text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950">
                LOKASI WORKSHOP SERVICEKU
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-300">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                {company.operatingHours}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white font-['Outfit',sans-serif]">
              {company.address || 'Jl. by pass Binaria-bondan'}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Anda bisa memesan teknisi untuk datang ke lokasi Anda, atau membawa perangkat elektronik Anda langsung ke bengkel resmi kami di alamat di atas.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full lg:w-auto">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Pesan Teknisi ke Lokasi Anda</span>
            </a>

            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(company.address || 'Jl. by pass Binaria-bondan Indramayu')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-sm transition-all"
            >
              <Navigation className="w-4 h-4" />
              <span>Petunjuk Arah Maps</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
