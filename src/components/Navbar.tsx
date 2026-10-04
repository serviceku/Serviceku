import React, { useState } from 'react';
import { Logo } from './Logo';
import { 
  PhoneCall, 
  MessageSquare, 
  ShieldCheck, 
  LogOut, 
  Menu, 
  X, 
  Sparkles,
  MapPin,
  Clock
} from 'lucide-react';
import { CompanyInfo } from '../types';
import { getWhatsAppUrl } from '../utils/whatsapp';

interface NavbarProps {
  company: CompanyInfo;
  isAdmin: boolean;
  onOpenLogin: () => void;
  onOpenDashboard: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  company,
  isAdmin,
  onOpenLogin,
  onOpenDashboard,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (anchorId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(anchorId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const directWaUrl = getWhatsAppUrl(
    company.whatsappNumber || '087874417978',
    'Halo Admin Serviceku, saya ingin konsultasi perbaikan elektronik dan panggilan teknisi.'
  );

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top micro bar for quick location, guarantee & direct contact */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6 text-slate-300">
            <span className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              Melayani Panggilan: <strong>Indramayu • Cirebon • Majalengka</strong>
            </span>
            <span className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              {company.warrantyText || "Garansi Service 1 Bulan untuk Kerusakan Sama"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              {company.operatingHours || "Senin - Minggu: 07.30 - 21.00"}
            </span>
            <a
              href={`tel:${company.phone || '087874417978'}`}
              className="flex items-center gap-1.5 bg-blue-600/30 hover:bg-blue-600/50 text-cyan-200 px-2.5 py-0.5 rounded-full border border-blue-400/30 font-semibold"
            >
              <PhoneCall className="w-3 h-3 text-cyan-400" />
              {company.phone || '0878-7441-7978'}
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand */}
          <a href="#" className="flex-shrink-0 group">
            <Logo size="md" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            <button
              onClick={() => handleNavClick('beranda')}
              className="hover:text-blue-700 transition-colors py-1 cursor-pointer"
            >
              Beranda
            </button>
            <button
              onClick={() => handleNavClick('katalog-jasa')}
              className="hover:text-blue-700 transition-colors py-1 cursor-pointer"
            >
              Katalog Jasa
            </button>
            <button
              onClick={() => handleNavClick('keunggulan')}
              className="hover:text-blue-700 transition-colors py-1 cursor-pointer"
            >
              Keunggulan & Garansi
            </button>
            <button
              onClick={() => handleNavClick('wilayah-layanan')}
              className="hover:text-blue-700 transition-colors py-1 cursor-pointer"
            >
              Wilayah Layanan
            </button>
            <button
              onClick={() => handleNavClick('kontak')}
              className="hover:text-blue-700 transition-colors py-1 cursor-pointer"
            >
              Kontak
            </button>
          </nav>

          {/* Action CTAs: Admin Login & WhatsApp Order */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Admin State Button */}
            {isAdmin ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenDashboard}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-sm transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  Dashboard Admin
                </button>
                <button
                  onClick={onLogout}
                  title="Logout Admin"
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-blue-700 hover:bg-slate-100 border border-slate-200 transition-all cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                Admin Login
              </button>
            )}

            {/* Direct WhatsApp Call/Chat */}
            <a
              href={directWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Chat WhatsApp</span>
            </a>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex sm:hidden items-center gap-2">
            {isAdmin ? (
              <button
                onClick={onOpenDashboard}
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-amber-500 text-slate-950"
              >
                Admin
              </button>
            ) : (
              <button
                onClick={onOpenLogin}
                className="p-2 text-slate-600 border border-slate-200 rounded-lg text-xs font-semibold"
              >
                Login
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="space-y-1">
            <button
              onClick={() => handleNavClick('beranda')}
              className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100 hover:text-blue-700"
            >
              Beranda
            </button>
            <button
              onClick={() => handleNavClick('katalog-jasa')}
              className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100 hover:text-blue-700"
            >
              Katalog Jasa
            </button>
            <button
              onClick={() => handleNavClick('keunggulan')}
              className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100 hover:text-blue-700"
            >
              Keunggulan & Garansi
            </button>
            <button
              onClick={() => handleNavClick('wilayah-layanan')}
              className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100 hover:text-blue-700"
            >
              Wilayah Layanan
            </button>
            <button
              onClick={() => handleNavClick('kontak')}
              className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100 hover:text-blue-700"
            >
              Kontak & Lokasi
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            <a
              href={directWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-center shadow-md shadow-emerald-600/20"
            >
              <MessageSquare className="w-5 h-5 fill-current" />
              Chat WhatsApp: 0878-7441-7978
            </a>

            {isAdmin ? (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDashboard();
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm text-center"
                >
                  Buka Dashboard Admin
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-rose-50 text-rose-600 font-bold text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="w-full py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50"
              >
                Login Akun Admin
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
