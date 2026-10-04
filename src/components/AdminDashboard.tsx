import React, { useState, useRef } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Edit, 
  Upload, 
  Image as ImageIcon, 
  Sliders, 
  ShieldCheck, 
  Phone, 
  MapPin, 
  Clock, 
  Check, 
  Save, 
  RefreshCw, 
  Eye, 
  EyeOff, 
  Github, 
  Copy, 
  ExternalLink,
  Layers,
  Sparkles,
  AlertCircle,
  FileCode,
  CheckCircle2,
  Tag
} from 'lucide-react';
import { ServiceItem, BannerItem, CompanyInfo } from '../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  company: CompanyInfo;
  services: ServiceItem[];
  banners: BannerItem[];
  onUpdateCompany: (company: CompanyInfo) => Promise<boolean>;
  onAddService: (service: Partial<ServiceItem>) => Promise<boolean>;
  onUpdateService: (id: string, service: Partial<ServiceItem>) => Promise<boolean>;
  onDeleteService: (id: string) => Promise<boolean>;
  onAddBanner: (banner: Partial<BannerItem>) => Promise<boolean>;
  onUpdateBanner: (id: string, banner: Partial<BannerItem>) => Promise<boolean>;
  onDeleteBanner: (id: string) => Promise<boolean>;
  onRefreshData: () => void;
}

const PRESET_SERVICE_IMAGES = [
  { label: 'AC Split / Indoor', url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80' },
  { label: 'Teknisi Cuci AC', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80' },
  { label: 'Pemasangan AC', url: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80' },
  { label: 'Kulkas 2 Pintu', url: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80' },
  { label: 'Kulkas Side By Side', url: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80' },
  { label: 'Mesin Cuci Front Load', url: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80' },
  { label: 'Mesin Cuci Top Load', url: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=800&q=80' },
  { label: 'Showcase Minuman', url: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=800&q=80' },
  { label: 'Dispenser Air', url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80' },
  { label: 'Perbaikan Komponen / PCB', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80' },
];

const GRADIENT_PRESETS = [
  { name: 'Ocean Blue', value: 'from-blue-700 via-sky-600 to-indigo-900' },
  { name: 'Ice Cyan Cool', value: 'from-sky-700 via-blue-700 to-slate-900' },
  { name: 'Deep Electric', value: 'from-indigo-800 via-blue-700 to-teal-800' },
  { name: 'Emerald Tech', value: 'from-teal-700 via-cyan-800 to-blue-900' },
  { name: 'Midnight Dark', value: 'from-slate-900 via-blue-950 to-indigo-950' },
  { name: 'Solar Amber', value: 'from-amber-600 via-orange-600 to-blue-900' },
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  company,
  services,
  banners,
  onUpdateCompany,
  onAddService,
  onUpdateService,
  onDeleteService,
  onAddBanner,
  onUpdateBanner,
  onDeleteBanner,
  onRefreshData,
}) => {
  const [activeTab, setActiveTab] = useState<'services' | 'banners' | 'company' | 'security' | 'github'>('services');

  // Service form state
  const [isEditingService, setIsEditingService] = useState<string | null>(null);
  const [serviceForm, setServiceForm] = useState({
    name: '',
    category: 'AC',
    price: 75000,
    priceFormatted: 'Rp 75.000',
    priceUnit: 'per unit',
    description: '',
    coverageArea: company.serviceArea || 'Indramayu, Cirebon, Majalengka',
    warranty: 'Garansi 1 Bulan',
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    isFeatured: true,
    tags: 'Terlaris, Bergaransi',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Banner form state
  const [isEditingBanner, setIsEditingBanner] = useState<string | null>(null);
  const [bannerForm, setBannerForm] = useState({
    title: '',
    subtitle: '',
    serviceName: 'Serviceku - Spesialis Pendingin & Elektronik',
    badge: 'Promo Terkini',
    highlight: 'Garansi 1 Bulan | Panggilan Siap Datang',
    gradient: 'from-blue-700 via-sky-600 to-indigo-900',
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
    active: true,
  });

  // Company info form state
  const [companyForm, setCompanyForm] = useState({
    name: company.name || 'Serviceku',
    tagline: company.tagline || 'Spesialis Pendingin dan Mesin Elektronik',
    subTagline: company.subTagline || 'ELEKTRONIK TERBAIK',
    phone: company.phone || '0878-7441-7978',
    whatsappNumber: company.whatsappNumber || '6287874417978',
    address: company.address || 'Jl. by pass Binaria-bondan',
    serviceArea: company.serviceArea || 'Indramayu, Cirebon, Majalengka',
    operatingHours: company.operatingHours || 'Senin - Minggu (07.30 - 21.00 WIB)',
    warrantyText: company.warrantyText || 'Garansi service untuk kerusakan yang sama 1 Bulan',
  });

  // Security Credentials form state
  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newUsername: '',
    newPassword: '',
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [securityStatus, setSecurityStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Toast / feedback message
  const [feedback, setFeedback] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3500);
  };

  // Image Upload handler (Base64 file reader -> /api/upload endpoint)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('Ukuran file maksimal 10MB!');
      return;
    }

    setUploadingImage(true);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64 = reader.result as string;
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            dataUrl: base64,
            filename: file.name,
          }),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setServiceForm((prev) => ({ ...prev, imageUrl: data.url }));
          showToast('Foto berhasil diunggah & tersimpan permanen di server!');
        } else {
          // If server upload fails, fallback to direct data URL
          setServiceForm((prev) => ({ ...prev, imageUrl: base64 }));
          showToast('Foto berhasil dimuat!');
        }
      } catch (err) {
        console.error('Upload error:', err);
        // Fallback to data URL
        setServiceForm((prev) => ({ ...prev, imageUrl: reader.result as string }));
        showToast('Foto dimuat via lokal!');
      } finally {
        setUploadingImage(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Service form actions
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedPrice = `Rp ${Number(serviceForm.price || 0).toLocaleString('id-ID')}`;
    const payload = {
      ...serviceForm,
      price: Number(serviceForm.price),
      priceFormatted: formattedPrice,
      tags: serviceForm.tags.split(',').map((t) => t.trim()).filter(Boolean),
    };

    let ok = false;
    if (isEditingService) {
      ok = await onUpdateService(isEditingService, payload);
    } else {
      ok = await onAddService(payload);
    }

    if (ok) {
      showToast(isEditingService ? 'Jasa berhasil diperbarui!' : 'Jasa baru berhasil dipublikasikan!');
      resetServiceForm();
    }
  };

  const resetServiceForm = () => {
    setIsEditingService(null);
    setServiceForm({
      name: '',
      category: 'AC',
      price: 75000,
      priceFormatted: 'Rp 75.000',
      priceUnit: 'per unit',
      description: '',
      coverageArea: company.serviceArea || 'Indramayu, Cirebon, Majalengka',
      warranty: 'Garansi 1 Bulan',
      imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
      isFeatured: true,
      tags: 'Terlaris, Bergaransi',
    });
  };

  const handleEditServiceClick = (srv: ServiceItem) => {
    setIsEditingService(srv.id);
    setServiceForm({
      name: srv.name,
      category: srv.category,
      price: srv.price,
      priceFormatted: srv.priceFormatted,
      priceUnit: srv.priceUnit,
      description: srv.description,
      coverageArea: srv.coverageArea,
      warranty: srv.warranty,
      imageUrl: srv.imageUrl,
      isFeatured: !!srv.isFeatured,
      tags: srv.tags ? srv.tags.join(', ') : '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Banner form actions
  const handleSaveBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    let ok = false;
    if (isEditingBanner) {
      ok = await onUpdateBanner(isEditingBanner, bannerForm);
    } else {
      ok = await onAddBanner(bannerForm);
    }

    if (ok) {
      showToast(isEditingBanner ? 'Banner berhasil diperbarui!' : 'Banner infografis baru berhasil ditambahkan!');
      resetBannerForm();
    }
  };

  const resetBannerForm = () => {
    setIsEditingBanner(null);
    setBannerForm({
      title: '',
      subtitle: '',
      serviceName: 'Serviceku - Spesialis Pendingin & Elektronik',
      badge: 'Promo Terkini',
      highlight: 'Garansi 1 Bulan | Panggilan Siap Datang',
      gradient: 'from-blue-700 via-sky-600 to-indigo-900',
      imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
      active: true,
    });
  };

  const handleEditBannerClick = (b: BannerItem) => {
    setIsEditingBanner(b.id);
    setBannerForm({
      title: b.title,
      subtitle: b.subtitle,
      serviceName: b.serviceName,
      badge: b.badge,
      highlight: b.highlight,
      gradient: b.gradient,
      imageUrl: b.imageUrl || '',
      active: b.active,
    });
  };

  // Company info form action
  const handleSaveCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await onUpdateCompany(companyForm);
    if (ok) {
      showToast('Informasi profil & kontak Serviceku berhasil diperbarui!');
    }
  };

  // Security Credentials action
  const handleSaveSecurity = async (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityStatus(null);

    try {
      const res = await fetch('/api/auth/credentials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(securityForm),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSecurityStatus({ type: 'success', message: 'Kredensial username dan password berhasil diubah!' });
        setSecurityForm({ currentPassword: '', newUsername: '', newPassword: '' });
      } else {
        setSecurityStatus({ type: 'error', message: data.message || 'Gagal mengubah password!' });
      }
    } catch (err: any) {
      setSecurityStatus({ type: 'error', message: 'Gagal terhubung ke server!' });
    }
  };

  // Copy helper for git commands
  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div 
        className="relative bg-white rounded-3xl max-w-5xl w-full shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-tight font-['Outfit',sans-serif]">
                  Dashboard Admin Serviceku
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Online Server Storage
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Data publikasi tersimpan permanen & dapat diakses dari perangkat manapun
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onRefreshData}
              title="Refresh Data dari Server"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toast Feedback Notification */}
        {feedback && (
          <div className="bg-emerald-600 text-white px-4 py-2 text-xs font-bold text-center flex items-center justify-center gap-2 shadow-sm animate-in slide-in-from-top-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>{feedback}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="bg-slate-100/90 border-b border-slate-200 px-4 sm:px-6 flex items-center gap-2 overflow-x-auto scrollbar-none py-2">
          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'services'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Publikasikan & Kelola Jasa ({services.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('banners')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'banners'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Slide Show Banner ({banners.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('company')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'company'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>Info Bengkel & Kontak</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'security'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Akun Admin</span>
          </button>

          <button
            onClick={() => setActiveTab('github')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'github'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Github className="w-4 h-4" />
            <span>Panduan Push GitHub</span>
          </button>
        </div>

        {/* Scrollable Tab Content Container */}
        <div className="overflow-y-auto p-4 sm:p-6 flex-1 space-y-6">
          {/* ================= TAB 1: SERVICES MANAGEMENT ================= */}
          {activeTab === 'services' && (
            <div className="space-y-8">
              {/* Add / Edit Form Card */}
              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                      {isEditingService ? <Edit className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        {isEditingService ? 'Edit Layanan Jasa' : 'Mempublikasikan Jasa & Foto Baru'}
                      </h3>
                      <p className="text-xs text-slate-500">
                        Isi form di bawah, foto akan langsung tampil secara langsung dan tersimpan permanen.
                      </p>
                    </div>
                  </div>

                  {isEditingService && (
                    <button
                      type="button"
                      onClick={resetServiceForm}
                      className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
                    >
                      Batal Edit / Tambah Baru
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveService} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Nama Jasa */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Nama Jasa <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={serviceForm.name}
                        onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                        placeholder="Contoh: Cuci AC Inverter, Service Kulkas 2 Pintu"
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
                      />
                    </div>

                    {/* Kategori */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Kategori Perangkat
                      </label>
                      <select
                        value={serviceForm.category}
                        onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium text-slate-800"
                      >
                        <option value="AC">AC (Air Conditioner)</option>
                        <option value="Kulkas">Kulkas & Refrigerator</option>
                        <option value="Mesin Cuci">Mesin Cuci (Front / Top Load)</option>
                        <option value="Showcase & Freezer">Showcase & Freezer Box</option>
                        <option value="Dispenser">Dispenser Air</option>
                        <option value="Lainnya">Elektronik Lainnya</option>
                      </select>
                    </div>

                    {/* Harga (Rp) */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Estimasi Harga (Rp Angka) <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        step="5000"
                        value={serviceForm.price}
                        onChange={(e) => setServiceForm({ ...serviceForm, price: Number(e.target.value) })}
                        placeholder="75000"
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
                      />
                    </div>

                    {/* Satuan Harga */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Satuan / Keterangan Harga
                      </label>
                      <input
                        type="text"
                        value={serviceForm.priceUnit}
                        onChange={(e) => setServiceForm({ ...serviceForm, priceUnit: e.target.value })}
                        placeholder="per unit, tergantung tipe AC, jasa teknisi"
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
                      />
                    </div>
                  </div>

                  {/* Deskripsi */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Deskripsi Layanan & Pekerjaan
                    </label>
                    <textarea
                      rows={3}
                      value={serviceForm.description}
                      onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                      placeholder="Jelaskan detail perbaikan, sparepart yang diganti, serta keunggulannya..."
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
                    />
                  </div>

                  {/* Foto Jasa (Upload, Presets & Live Preview) */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                          Foto Jasa (Tampil Langsung di Katalog)
                        </label>
                        <p className="text-[11px] text-slate-500">
                          Bisa upload file dari galeri/kamera atau pilih preset foto elektronik rekomendasi
                        </p>
                      </div>

                      {/* File upload button */}
                      <div>
                        <input
                          type="file"
                          ref={fileInputRef}
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploadingImage}
                          className="inline-flex items-center gap-2 px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold border border-blue-200 transition-all cursor-pointer"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>{uploadingImage ? 'Mengunggah...' : 'Upload Foto dari Galeri / HP'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Image URL input & Live Preview Box */}
                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                      <div className="flex-1 w-full space-y-2">
                        <input
                          type="text"
                          value={serviceForm.imageUrl}
                          onChange={(e) => setServiceForm({ ...serviceForm, imageUrl: e.target.value })}
                          placeholder="Atau masukkan URL foto https://..."
                          className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />

                        {/* One-click preset photos */}
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 block mb-1">
                            Preset Foto Cepat (Klik untuk memilih):
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {PRESET_SERVICE_IMAGES.map((preset, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setServiceForm({ ...serviceForm, imageUrl: preset.url })}
                                className="px-2 py-1 text-[10px] bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 rounded-md border border-slate-200 transition-colors cursor-pointer"
                              >
                                {preset.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Live Preview Box */}
                      <div className="shrink-0 w-32 h-24 rounded-xl border border-slate-300 bg-slate-100 overflow-hidden relative shadow-inner">
                        {serviceForm.imageUrl ? (
                          <img
                            src={serviceForm.imageUrl}
                            alt="Live Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 text-[10px]">
                            <ImageIcon className="w-5 h-5 mb-1" />
                            <span>Preview</span>
                          </div>
                        )}
                        <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[8px] font-bold px-1 rounded">
                          Preview
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Coverage Area & Warranty */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Alamat & Jangkauan Layanan
                      </label>
                      <input
                        type="text"
                        value={serviceForm.coverageArea}
                        onChange={(e) => setServiceForm({ ...serviceForm, coverageArea: e.target.value })}
                        placeholder="Contoh: Indramayu, Cirebon, Majalengka"
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Ketentuan Garansi
                      </label>
                      <input
                        type="text"
                        value={serviceForm.warranty}
                        onChange={(e) => setServiceForm({ ...serviceForm, warranty: e.target.value })}
                        placeholder="Garansi 1 Bulan Kerusakan Sama"
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
                      />
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Tags / Label (Pisahkan dengan koma)
                    </label>
                    <input
                      type="text"
                      value={serviceForm.tags}
                      onChange={(e) => setServiceForm({ ...serviceForm, tags: e.target.value })}
                      placeholder="Terlaris, Deep Clean, Inverter, Sparepart Asli"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex items-center justify-end gap-3 pt-2">
                    {isEditingService && (
                      <button
                        type="button"
                        onClick={resetServiceForm}
                        className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs"
                      >
                        Batal
                      </button>
                    )}
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/25 transition-all cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>{isEditingService ? 'Simpan Perubahan' : 'Publikasikan Sekarang'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* List of Existing Published Services */}
              <div>
                <h3 className="text-base font-extrabold text-slate-900 mb-3 flex items-center justify-between">
                  <span>Daftar Jasa yang Sudah Dipublikasikan ({services.length})</span>
                </h3>

                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
                  {services.map((srv) => (
                    <div
                      key={srv.id}
                      className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3.5">
                        <img
                          src={srv.imageUrl}
                          alt={srv.name}
                          className="w-14 h-14 rounded-xl object-cover bg-slate-100 border border-slate-200 shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80';
                          }}
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                              {srv.category}
                            </span>
                            <h4 className="text-sm font-bold text-slate-900">{srv.name}</h4>
                          </div>
                          <p className="text-xs font-semibold text-blue-700 mt-0.5">
                            {srv.priceFormatted} <span className="text-slate-400 font-normal">/ {srv.priceUnit}</span>
                          </p>
                          <p className="text-[11px] text-slate-500 line-clamp-1">{srv.coverageArea} • {srv.warranty}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <button
                          onClick={() => handleEditServiceClick(srv)}
                          className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200 transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm(`Yakin ingin menghapus layanan "${srv.name}"?`)) {
                              const ok = await onDeleteService(srv.id);
                              if (ok) showToast('Layanan berhasil dihapus!');
                            }
                          }}
                          className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200 transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Hapus</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 2: BANNERS MANAGEMENT ================= */}
          {activeTab === 'banners' && (
            <div className="space-y-8">
              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        {isEditingBanner ? 'Edit Banner Infografis' : 'Tambah Slide Show Banner Baru'}
                      </h3>
                      <p className="text-xs text-slate-500">
                        Atur tampilan gradasi, judul infografis, dan nama jasa Serviceku di bawah banner.
                      </p>
                    </div>
                  </div>

                  {isEditingBanner && (
                    <button
                      type="button"
                      onClick={resetBannerForm}
                      className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
                    >
                      Batal Edit / Tambah Baru
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveBanner} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Judul Banner */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Judul Promo / Headline <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={bannerForm.title}
                        onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                        placeholder="Contoh: PROMO SERVICE AC CUCI RP 75.000"
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
                      />
                    </div>

                    {/* Subjudul */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Subjudul / Keterangan
                      </label>
                      <input
                        type="text"
                        value={bannerForm.subtitle}
                        onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
                        placeholder="Contoh: AC Dingin Maksimal, Blower Bersih & Bebas Bakteri"
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
                      />
                    </div>

                    {/* Requirement: nama Jasa Serviceku nya yang bisa di tambahkan kan atau di hapus oleh admin */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Nama Jasa Serviceku di Bawah Banner <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={bannerForm.serviceName}
                        onChange={(e) => setBannerForm({ ...bannerForm, serviceName: e.target.value })}
                        placeholder="Contoh: Serviceku - Spesialis Pendingin & Elektronik"
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
                      />
                    </div>

                    {/* Badge Teks */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Label Badge (Pojok Atas)
                      </label>
                      <input
                        type="text"
                        value={bannerForm.badge}
                        onChange={(e) => setBannerForm({ ...bannerForm, badge: e.target.value })}
                        placeholder="Promo Terlaris, Bergaransi, dll"
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
                      />
                    </div>

                    {/* Highlight Teks */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Highlight Teks
                      </label>
                      <input
                        type="text"
                        value={bannerForm.highlight}
                        onChange={(e) => setBannerForm({ ...bannerForm, highlight: e.target.value })}
                        placeholder="Panggilan Indramayu - Cirebon - Majalengka"
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
                      />
                    </div>

                    {/* URL Gambar Latar Belakang */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Gambar Latar (URL Opsional)
                      </label>
                      <input
                        type="text"
                        value={bannerForm.imageUrl}
                        onChange={(e) => setBannerForm({ ...bannerForm, imageUrl: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
                      />
                    </div>
                  </div>

                  {/* Gradient Style Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Pilih Tampilan Gradasi Warna:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {GRADIENT_PRESETS.map((g, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setBannerForm({ ...bannerForm, gradient: g.value })}
                          className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all cursor-pointer ${
                            bannerForm.gradient === g.value
                              ? 'border-blue-600 ring-2 ring-blue-500/30 bg-blue-50/50'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${g.value} shadow-xs`} />
                          <span className="text-xs font-bold text-slate-700">{g.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Preview Banner Mini */}
                  <div className="p-4 rounded-2xl border border-slate-200 bg-slate-900 text-white">
                    <span className="text-[10px] uppercase font-bold text-cyan-400 block mb-2">
                      Live Preview Banner:
                    </span>
                    <div className={`p-5 rounded-xl bg-gradient-to-r ${bannerForm.gradient} border border-white/20`}>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950 inline-block mb-1">
                        {bannerForm.badge || 'PROMO'}
                      </span>
                      <h4 className="text-lg font-black text-white">{bannerForm.title || 'Judul Banner Anda'}</h4>
                      <p className="text-xs text-slate-100 opacity-90">{bannerForm.subtitle || 'Keterangan banner promo'}</p>
                      <div className="mt-3 pt-2 border-t border-white/20 flex items-center justify-between text-xs text-cyan-200">
                        <span>Nama Jasa: <strong>{bannerForm.serviceName || 'Serviceku'}</strong></span>
                        <span>{bannerForm.highlight}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    {isEditingBanner && (
                      <button
                        type="button"
                        onClick={resetBannerForm}
                        className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs"
                      >
                        Batal
                      </button>
                    )}
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/25 transition-all cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>{isEditingBanner ? 'Simpan Banner' : 'Tambahkan Banner'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Existing Banners */}
              <div>
                <h3 className="text-base font-extrabold text-slate-900 mb-3">
                  Daftar Banner Aktif ({banners.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {banners.map((b) => (
                    <div
                      key={b.id}
                      className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between space-y-3"
                    >
                      <div className={`p-4 rounded-xl bg-gradient-to-r ${b.gradient} text-white space-y-1`}>
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="px-2 py-0.5 rounded bg-black/30 font-bold uppercase">{b.badge}</span>
                          <span className="opacity-90">{b.highlight}</span>
                        </div>
                        <h4 className="font-bold text-sm line-clamp-1">{b.title}</h4>
                        <p className="text-xs opacity-90 line-clamp-1">{b.subtitle}</p>
                        <div className="pt-2 text-[11px] text-cyan-300 font-semibold border-t border-white/20">
                          Nama Jasa: {b.serviceName}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={b.active}
                            onChange={async (e) => {
                              await onUpdateBanner(b.id, { active: e.target.checked });
                              showToast(`Banner ${e.target.checked ? 'diaktifkan' : 'dinonaktifkan'}`);
                            }}
                            className="rounded text-blue-600 focus:ring-blue-500"
                          />
                          <span>{b.active ? 'Aktif di Beranda' : 'Nonaktif'}</span>
                        </label>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleEditBannerClick(b)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                            title="Edit banner"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={async () => {
                              if (confirm(`Hapus banner "${b.title}"?`)) {
                                const ok = await onDeleteBanner(b.id);
                                if (ok) showToast('Banner berhasil dihapus!');
                              }
                            }}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors cursor-pointer"
                            title="Hapus banner"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 3: COMPANY INFO & CONTACT ================= */}
          {activeTab === 'company' && (
            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm">
              <div className="flex items-center gap-2 pb-4 border-b border-slate-200 mb-5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Pengaturan Profil Usaha & WhatsApp
                  </h3>
                  <p className="text-xs text-slate-500">
                    Informasi nomor kontak WhatsApp, alamat workshop, dan wilayah operasional panggilan teknisi.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveCompany} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Nama Bengkel */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Nama Usaha
                    </label>
                    <input
                      type="text"
                      required
                      value={companyForm.name}
                      onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
                    />
                  </div>

                  {/* Tagline */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Tagline Spesialis
                    </label>
                    <input
                      type="text"
                      value={companyForm.tagline}
                      onChange={(e) => setCompanyForm({ ...companyForm, tagline: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
                    />
                  </div>

                  {/* Nomor WhatsApp */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Nomor WhatsApp Tujuan Klik Order (+62...)
                    </label>
                    <input
                      type="text"
                      required
                      value={companyForm.whatsappNumber}
                      onChange={(e) => setCompanyForm({ ...companyForm, whatsappNumber: e.target.value })}
                      placeholder="6287874417978"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      Gunakan format 6287874417978 agar link wa.me bekerja otomatis di semua perangkat.
                    </span>
                  </div>

                  {/* Telepon Tampilan */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Nomor Telepon Tampilan
                    </label>
                    <input
                      type="text"
                      required
                      value={companyForm.phone}
                      onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })}
                      placeholder="0878-7441-7978"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
                    />
                  </div>

                  {/* Alamat Workshop */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Alamat Workshop / Kantor
                    </label>
                    <input
                      type="text"
                      required
                      value={companyForm.address}
                      onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })}
                      placeholder="Jl. by pass Binaria-bondan"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
                    />
                  </div>

                  {/* Wilayah Layanan Panggilan */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Wilayah Jangkauan Panggilan
                    </label>
                    <input
                      type="text"
                      required
                      value={companyForm.serviceArea}
                      onChange={(e) => setCompanyForm({ ...companyForm, serviceArea: e.target.value })}
                      placeholder="Indramayu, Cirebon, Majalengka"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
                    />
                  </div>
                </div>

                {/* Ketentuan Garansi */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Ketentuan Garansi Servis
                  </label>
                  <input
                    type="text"
                    value={companyForm.warrantyText}
                    onChange={(e) => setCompanyForm({ ...companyForm, warrantyText: e.target.value })}
                    placeholder="Garansi service untuk kerusakan yang sama 1 Bulan"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
                  />
                </div>

                <div className="flex justify-end pt-3">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan Pengaturan Profil</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ================= TAB 4: SECURITY & CREDENTIALS ================= */}
          {activeTab === 'security' && (
            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm max-w-xl">
              <div className="flex items-center gap-2 pb-4 border-b border-slate-200 mb-5">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Ubah Akun & Password Admin
                  </h3>
                  <p className="text-xs text-slate-500">
                    Ganti username dan password kustom admin dengan fitur mata lihat password.
                  </p>
                </div>
              </div>

              {securityStatus && (
                <div
                  className={`p-3 rounded-xl mb-4 text-xs font-bold flex items-center gap-2 ${
                    securityStatus.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{securityStatus.message}</span>
                </div>
              )}

              <form onSubmit={handleSaveSecurity} className="space-y-4">
                {/* Current Password */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Password Saat Ini <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      required
                      value={securityForm.currentPassword}
                      onChange={(e) => setSecurityForm({ ...securityForm, currentPassword: e.target.value })}
                      placeholder="Masukkan password saat ini"
                      className="w-full pl-3.5 pr-10 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* New Username */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Username Baru (Opsional)
                  </label>
                  <input
                    type="text"
                    value={securityForm.newUsername}
                    onChange={(e) => setSecurityForm({ ...securityForm, newUsername: e.target.value })}
                    placeholder="Username baru jika ingin diubah"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                {/* New Password with Eye Icon */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Password Baru
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={securityForm.newPassword}
                      onChange={(e) => setSecurityForm({ ...securityForm, newPassword: e.target.value })}
                      placeholder="Password baru Anda"
                      className="w-full pl-3.5 pr-10 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                  >
                    Update Kredensial Admin
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ================= TAB 5: GITHUB PUSH GUIDE ================= */}
          {activeTab === 'github' && (
            <div className="space-y-6">
              <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Github className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black tracking-tight font-['Outfit',sans-serif]">
                      Panduan Push Proyek Serviceku ke GitHub
                    </h3>
                    <p className="text-xs text-slate-300">
                      Instruksi lengkap langkah demi langkah untuk mengunggah source code ini ke akun GitHub Anda
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-xs sm:text-sm">
                  {/* Step 1 */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-cyan-400">1. Buat Repository Baru di GitHub</span>
                      <a
                        href="https://github.com/new"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-blue-400 hover:underline flex items-center gap-1"
                      >
                        Buka github.com/new <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <p className="text-slate-400 text-xs">
                      Beri nama repository misalnya <code className="text-cyan-300 font-mono">serviceku-website</code>, pilih <strong>Public</strong> atau <strong>Private</strong>, lalu klik <em>Create repository</em>.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-cyan-400">2. Jalankan Perintah Git di Terminal</span>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            `git init\ngit add .\ngit commit -m "Initial commit - Website Promosi Jasa Serviceku Elektronik"\ngit branch -M main\ngit remote add origin https://github.com/USERNAME_ANDA/serviceku-website.git\ngit push -u origin main`,
                            2
                          )
                        }
                        className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer font-bold"
                      >
                        {copiedIndex === 2 ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedIndex === 2 ? 'Tersalin!' : 'Salin Semua Perintah'}</span>
                      </button>
                    </div>

                    <pre className="bg-black/80 text-emerald-400 p-3.5 rounded-lg font-mono text-xs overflow-x-auto whitespace-pre leading-relaxed border border-slate-800">
{`# 1. Inisialisasi git jika belum ada
git init

# 2. Tambahkan semua file proyek
git add .

# 3. Buat commit pertama
git commit -m "Website Promosi Jasa Serviceku Elektronik"

# 4. Arahkan branch ke main
git branch -M main

# 5. Hubungkan ke repository GitHub Anda (ganti USERNAME_ANDA)
git remote add origin https://github.com/USERNAME_ANDA/serviceku-website.git

# 6. Push kode ke GitHub
git push -u origin main`}
                    </pre>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="font-bold text-cyan-400 block">3. Opsi Deploy / Hosting Gratis:</span>
                    <ul className="list-disc list-inside text-slate-300 space-y-1 text-xs">
                      <li><strong>Vercel:</strong> Hubungkan akun GitHub Anda di <a href="https://vercel.com" target="_blank" className="text-blue-400 underline">vercel.com</a>, pilih repo Serviceku, otomatis langsung online dengan SSL gratis.</li>
                      <li><strong>Netlify:</strong> Buka <a href="https://netlify.com" target="_blank" className="text-blue-400 underline">netlify.com</a>, import dari GitHub, build command: <code>npm run build</code>, publish directory: <code>dist</code>.</li>
                      <li><strong>Railway / Render:</strong> Untuk menjalankan full-stack Express server dengan database permanen.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Bar */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Server Express & Database Terhubung Aktif (Port 3000)</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold transition-colors cursor-pointer"
          >
            Tutup Panel
          </button>
        </div>
      </div>
    </div>
  );
};
