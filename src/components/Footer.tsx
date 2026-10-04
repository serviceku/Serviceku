import React from 'react';
import { Logo } from './Logo';
import { 
  Phone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  MessageSquare, 
  Lock, 
  ArrowUp 
} from 'lucide-react';
import { CompanyInfo } from '../types';
import { getWhatsAppUrl } from '../utils/whatsapp';

interface FooterProps {
  company: CompanyInfo;
  onOpenLogin: () => void;
  isAdmin: boolean;
  onOpenDashboard: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  company,
  onOpenLogin,
  isAdmin,
  onOpenDashboard,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const waUrl = getWhatsAppUrl(
    company.whatsappNumber || '087874417978',
    'Halo Serviceku, saya ingin bertanya tentang layanan dan tarif perbaikan elektronik.'
  );

  return (
    <footer id="kontak" className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm">
      {/* Top Banner inside Footer */}
      <div className="border-b border-slate-800/80 py-10 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-white font-['Outfit',sans-serif]">
              Alat Elektronik Anda Rusak Hari Ini?
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              Jangan tunda kerusakan bertambah parah. Konsultasikan gratis sekarang juga dengan teknisi kami.
            </p>
          </div>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-xl shadow-emerald-600/25 transition-all transform hover:-translate-y-0.5"
          >
            <MessageSquare className="w-5 h-5 fill-current" />
            <span>Chat WhatsApp: {company.phone || '0878-7441-7978'}</span>
          </a>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand info */}
          <div className="space-y-4">
            <Logo size="md" light showSubtitle />
            <p className="text-xs text-slate-400 leading-relaxed">
              Jasa service spesialis pendingin dan mesin elektronik terpercaya di wilayah Indramayu, Cirebon, dan Majalengka. Cepat, bergaransi, dan sparepart original.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-800/40">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Garansi 1 Bulan Kerusakan Sama</span>
            </div>
          </div>

          {/* Layanan Utama */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Layanan Service Kami
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="hover:text-cyan-400 transition-colors cursor-pointer">
                • Service & Cuci AC (Split, Inverter, Cassette)
              </li>
              <li className="hover:text-cyan-400 transition-colors cursor-pointer">
                • Service Kulkas 1 & 2 Pintu, Side by Side
              </li>
              <li className="hover:text-cyan-400 transition-colors cursor-pointer">
                • Service Mesin Cuci Front & Top Loading
              </li>
              <li className="hover:text-cyan-400 transition-colors cursor-pointer">
                • Service Showcase Minuman & Toko
              </li>
              <li className="hover:text-cyan-400 transition-colors cursor-pointer">
                • Service Freezer Box Daging & Es
              </li>
              <li className="hover:text-cyan-400 transition-colors cursor-pointer">
                • Service Dispenser Galon Bawah / Atas
              </li>
              <li className="hover:text-cyan-400 transition-colors cursor-pointer">
                • Pengelasan Kebocoran & Pengisian Freon
              </li>
              <li className="hover:text-cyan-400 transition-colors cursor-pointer">
                • Perbaikan Modul PCB & Pasang Baru
              </li>
            </ul>
          </div>

          {/* Wilayah & Jam Kerja */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Wilayah Panggilan
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Workshop:</strong> {company.address || 'Jl. by pass Binaria-bondan'}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Cakupan Panggilan:</strong> {company.serviceArea || 'Indramayu, Cirebon, Majalengka'}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Jam Kerja:</strong> {company.operatingHours || 'Senin - Minggu: 07.30 - 21.00 WIB'}
                </span>
              </div>
            </div>
          </div>

          {/* Kontak Langsung & Admin Link */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Kontak Resmi
            </h4>
            <div className="space-y-2 text-xs">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>Telepon: <strong className="text-white">{company.phone || '0878-7441-7978'}</strong></span>
              </p>
              <p className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp: <strong className="text-white">+{company.whatsappNumber || '6287874417978'}</strong></span>
              </p>
            </div>

            {/* Admin Access Panel Link */}
            <div className="pt-4 border-t border-slate-800">
              <span className="text-[11px] text-slate-500 block mb-1.5">
                Pengelolaan Situs:
              </span>
              {isAdmin ? (
                <button
                  onClick={onOpenDashboard}
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-bold bg-amber-950/40 px-3 py-1.5 rounded-lg border border-amber-800/50 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Buka Dashboard Admin</span>
                </button>
              ) : (
                <button
                  onClick={onOpenLogin}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white font-medium bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 transition-colors cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Admin Login</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom copyright & back to top */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} <strong>{company.name || 'Serviceku'}</strong> - Elektronik Terbaik. Spesialis Pendingin dan Mesin Elektronik.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Kembali ke Atas</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
