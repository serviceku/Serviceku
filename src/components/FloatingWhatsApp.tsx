import React, { useState } from 'react';
import { MessageSquare, PhoneCall, X, ShieldCheck } from 'lucide-react';
import { CompanyInfo } from '../types';
import { getWhatsAppUrl } from '../utils/whatsapp';

interface FloatingWhatsAppProps {
  company: CompanyInfo;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ company }) => {
  const [isOpen, setIsOpen] = useState(false);

  const waUrl = getWhatsAppUrl(
    company.whatsappNumber || '087874417978',
    'Halo Serviceku, saya mau konsultasi perbaikan elektronik dan panggil teknisi ke rumah.'
  );

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Quick Popup card */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-3xl shadow-2xl border border-slate-200 p-5 animate-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-start justify-between pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-black uppercase text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Customer Service Online
              </div>
              <h4 className="text-base font-extrabold text-slate-900 mt-0.5 font-['Outfit',sans-serif]">
                Chat Teknisi Serviceku
              </h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-full cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3 text-xs text-slate-600 space-y-1.5">
            <p>Butuh perbaikan cepat untuk AC, Kulkas, Mesin Cuci, atau Freezer?</p>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-xl border border-emerald-100">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>Garansi 1 Bulan Kerusakan Sama</span>
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Chat WhatsApp: {company.phone || '0878-7441-7978'}</span>
            </a>

            <a
              href={`tel:${company.phone || '087874417978'}`}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Telepon Langsung</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-600/40 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
        aria-label="Hubungi WhatsApp Serviceku"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400 border-2 border-white" />
        </span>

        <MessageSquare className="w-6 h-6 fill-current" />
        <span className="hidden sm:inline font-black text-sm tracking-wide">
          {isOpen ? 'Tutup' : 'Chat WhatsApp'}
        </span>
      </button>
    </div>
  );
};
