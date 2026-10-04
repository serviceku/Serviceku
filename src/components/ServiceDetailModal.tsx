import React from 'react';
import { ServiceItem, CompanyInfo } from '../types';
import { 
  X, 
  MessageSquare, 
  ShieldCheck, 
  MapPin, 
  Tag, 
  Clock, 
  CheckCircle2, 
  PhoneCall 
} from 'lucide-react';
import { getWhatsAppUrl, createServiceOrderMessage } from '../utils/whatsapp';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  company: CompanyInfo;
  onClose: () => void;
  onEditByAdmin?: (service: ServiceItem) => void;
  isAdmin?: boolean;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  company,
  onClose,
  onEditByAdmin,
  isAdmin,
}) => {
  if (!service) return null;

  const waMessage = createServiceOrderMessage(
    service.name,
    `${service.priceFormatted} (${service.priceUnit})`,
    service.coverageArea
  );

  const waUrl = getWhatsAppUrl(
    company.whatsappNumber || '087874417978',
    waMessage
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-200 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image Section */}
        <div className="relative h-64 sm:h-72 w-full bg-slate-900 overflow-hidden">
          <img
            src={service.imageUrl}
            alt={service.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Badges over image */}
          <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-center justify-between gap-2">
            <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-600 text-white shadow-md">
              {service.category}
            </span>

            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/90 text-white backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5" />
              {service.warranty || "Garansi 1 Bulan"}
            </span>
          </div>
        </div>

        {/* Body content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight font-['Outfit',sans-serif]">
              {service.name}
            </h2>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-black text-blue-700 tracking-tight">
                {service.priceFormatted}
              </span>
              <span className="text-sm font-semibold text-slate-500">
                / {service.priceUnit}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-100 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Deskripsi Pekerjaan & Penanganan:
            </h4>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Key Specs / Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-600 bg-blue-50/60 p-3 rounded-xl border border-blue-100/60">
              <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
              <div>
                <span className="font-semibold text-slate-900 block">Jangkauan Panggilan:</span>
                <span>{service.coverageArea || company.serviceArea}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-slate-600 bg-emerald-50/60 p-3 rounded-xl border border-emerald-100/60">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="font-semibold text-slate-900 block">Garansi Resmi:</span>
                <span>{service.warranty || "1 Bulan untuk kerusakan sama"}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-slate-600 bg-amber-50/60 p-3 rounded-xl border border-amber-100/60">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <div>
                <span className="font-semibold text-slate-900 block">Jam Operasional:</span>
                <span>{company.operatingHours}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-slate-600 bg-purple-50/60 p-3 rounded-xl border border-purple-100/60">
              <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
              <div>
                <span className="font-semibold text-slate-900 block">Sparepart & Alat:</span>
                <span>Original & SOP Teknisi Profesional</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          {service.tags && service.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <Tag className="w-3.5 h-3.5 text-slate-400 mr-1" />
              {service.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* WhatsApp Direct Action Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base shadow-xl shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageSquare className="w-5 h-5 fill-current" />
              <span>Chat WhatsApp: {company.phone || '0878-7441-7978'}</span>
            </a>

            <a
              href={`tel:${company.phone || '087874417978'}`}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-4 rounded-2xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-sm transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Telepon Langsung</span>
            </a>

            {isAdmin && onEditByAdmin && (
              <button
                onClick={() => {
                  onClose();
                  onEditByAdmin(service);
                }}
                className="w-full sm:w-auto px-4 py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm transition-all cursor-pointer"
              >
                Edit Jasa Ini
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
