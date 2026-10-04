import React, { useState, useMemo } from 'react';
import { ServiceItem, CompanyInfo } from '../types';
import { 
  Search, 
  MessageSquare, 
  ShieldCheck, 
  MapPin, 
  SlidersHorizontal, 
  Sparkles,
  ChevronRight,
  Info,
  Edit,
  Tag
} from 'lucide-react';
import { getWhatsAppUrl, createServiceOrderMessage } from '../utils/whatsapp';

interface ServiceCatalogProps {
  services: ServiceItem[];
  company: CompanyInfo;
  isAdmin?: boolean;
  onSelectService: (service: ServiceItem) => void;
  onEditService?: (service: ServiceItem) => void;
  onAddNewService?: () => void;
}

export const ServiceCatalog: React.FC<ServiceCatalogProps> = ({
  services,
  company,
  isAdmin,
  onSelectService,
  onEditService,
  onAddNewService,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  // Extract distinct categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    services.forEach((s) => {
      if (s.category) set.add(s.category);
    });
    return ['Semua', ...Array.from(set)];
  }, [services]);

  // Filtered & sorted services
  const filteredServices = useMemo(() => {
    return services
      .filter((s) => {
        const matchesCategory =
          selectedCategory === 'Semua' || s.category === selectedCategory;
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery =
          !q ||
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          (s.tags && s.tags.some((t) => t.toLowerCase().includes(q)));
        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return 0;
      });
  }, [services, selectedCategory, searchQuery, sortBy]);

  return (
    <section id="katalog-jasa" className="py-12 sm:py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Katalog Layanan Resmi
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-['Outfit',sans-serif]">
              Daftar Jasa Service Elektronik
            </h2>
            <p className="mt-1 text-base text-slate-600 max-w-xl">
              Pilih perbaikan alat elektronik Anda. Transparan, terpercaya, dan bergaransi 1 bulan dengan teknisi siap panggilan.
            </p>
          </div>

          {isAdmin && onAddNewService && (
            <button
              onClick={onAddNewService}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              + Publikasikan Jasa Baru
            </button>
          )}
        </div>

        {/* Filter Controls: Search & Category Pills */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/80 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari jasa (misal: Cuci AC, Kulkas 2 Pintu, Mesin Cuci, Freon)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <SlidersHorizontal className="w-4 h-4 text-slate-400 hidden sm:block" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700 font-medium"
              >
                <option value="default">Urutan Default</option>
                <option value="price-asc">Harga: Terendah ke Tertinggi</option>
                <option value="price-desc">Harga: Tertinggi ke Terendah</option>
              </select>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-300 max-w-md mx-auto">
            <Info className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">Tidak ada jasa ditemukan</h3>
            <p className="text-sm text-slate-500 mt-1">
              Coba cari dengan kata kunci lain atau pilih kategori Semua.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Semua');
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredServices.map((service) => {
              const waUrl = getWhatsAppUrl(
                company.whatsappNumber || '087874417978',
                createServiceOrderMessage(
                  service.name,
                  `${service.priceFormatted} (${service.priceUnit})`,
                  service.coverageArea
                )
              );

              return (
                <div
                  key={service.id}
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1"
                >
                  {/* Card Image Banner */}
                  <div
                    className="relative h-52 w-full overflow-hidden bg-slate-900 cursor-pointer"
                    onClick={() => onSelectService(service)}
                  >
                    <img
                      src={service.imageUrl}
                      alt={service.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80';
                      }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />

                    {/* Badges on Top */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide bg-blue-600 text-white shadow-md">
                        {service.category}
                      </span>

                      {service.warranty && (
                        <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500 text-white shadow-md">
                          <ShieldCheck className="w-3 h-3" />
                          {service.warranty}
                        </span>
                      )}
                    </div>

                    {/* Tags at bottom of image */}
                    {service.tags && service.tags.length > 0 && (
                      <div className="absolute bottom-3 left-3.5 right-3.5 flex flex-wrap gap-1 pointer-events-none">
                        {service.tags.slice(0, 2).map((t, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/90 text-slate-800 backdrop-blur-xs"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3
                        onClick={() => onSelectService(service)}
                        className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 cursor-pointer font-['Outfit',sans-serif]"
                      >
                        {service.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Service Specs & Price */}
                    <div className="pt-2 border-t border-slate-100 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block">
                            Biaya Service:
                          </span>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-xl sm:text-2xl font-black text-blue-700 tracking-tight">
                              {service.priceFormatted}
                            </span>
                            <span className="text-xs font-semibold text-slate-600">
                              / {service.priceUnit}
                            </span>
                          </div>
                        </div>

                        <span className="flex items-center gap-1 text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                          <MapPin className="w-3 h-3 text-blue-500 shrink-0" />
                          <span className="truncate max-w-[120px]">{service.coverageArea}</span>
                        </span>
                      </div>

                      {/* Action Buttons: WhatsApp Chat & Detail */}
                      <div className="flex items-center gap-2 pt-1">
                        {/* Prompt requirement: Jika klik barang bisa langsung chat ke WhatsApp Nomor +62 878-7441-7978 */}
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                          title="Chat ke WhatsApp Nomor +62 878-7441-7978"
                        >
                          <MessageSquare className="w-4 h-4 fill-current shrink-0" />
                          <span>Chat WhatsApp</span>
                        </a>

                        <button
                          onClick={() => onSelectService(service)}
                          className="px-3 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
                          title="Lihat detail lengkap"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>

                        {isAdmin && onEditService && (
                          <button
                            onClick={() => onEditService(service)}
                            className="p-3 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors cursor-pointer"
                            title="Edit jasa ini (Admin)"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
