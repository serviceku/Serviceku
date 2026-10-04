import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { BannerSlideshow } from './components/BannerSlideshow';
import { ServiceCatalog } from './components/ServiceCatalog';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { WhyChooseUs } from './components/WhyChooseUs';
import { CoverageArea } from './components/CoverageArea';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboard } from './components/AdminDashboard';
import { ServiceItem, BannerItem, CompanyInfo } from './types';

// Default initial fallback data in case of cold boot before server response
const DEFAULT_COMPANY: CompanyInfo = {
  name: "Serviceku",
  tagline: "Spesialis Pendingin dan Mesin Elektronik",
  subTagline: "ELEKTRONIK TERBAIK",
  phone: "0878-7441-7978",
  whatsappNumber: "6287874417978",
  address: "Jl. by pass Binaria-bondan",
  serviceArea: "Indramayu, Cirebon, Majalengka",
  operatingHours: "Senin - Minggu (07.30 - 21.00 WIB)",
  warrantyText: "Garansi service untuk kerusakan yang sama 1 Bulan",
};

export default function App() {
  const [company, setCompany] = useState<CompanyInfo>(DEFAULT_COMPANY);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [banners, setBanners] = useState<BannerItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Admin Auth state
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  // Selected Service Detail Modal
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Check login token on mount
  useEffect(() => {
    const token = localStorage.getItem('serviceku_admin_token');
    if (token) {
      setIsAdmin(true);
    }
  }, []);

  // Fetch all data from server (ensures permanent server sync across devices)
  const fetchData = async () => {
    try {
      setLoading(true);
      const [resComp, resServ, resBan] = await Promise.all([
        fetch('/api/company').then((r) => (r.ok ? r.json() : null)),
        fetch('/api/services').then((r) => (r.ok ? r.json() : null)),
        fetch('/api/banners').then((r) => (r.ok ? r.json() : null)),
      ]);

      if (resComp && resComp.company) setCompany(resComp.company);
      if (resServ && resServ.services) setServices(resServ.services);
      if (resBan && resBan.banners) setBanners(resBan.banners);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Auth actions
  const handleLoginSuccess = (_token: string, _user: string) => {
    setIsAdmin(true);
    setIsLoginModalOpen(false);
    setIsDashboardOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('serviceku_admin_token');
    localStorage.removeItem('serviceku_admin_user');
    setIsAdmin(false);
    setIsDashboardOpen(false);
  };

  // CRUD Operations on Services (Server-backed)
  const handleAddService = async (newSrv: Partial<ServiceItem>): Promise<boolean> => {
    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSrv),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setServices((prev) => [data.service, ...prev]);
        return true;
      }
    } catch (err) {
      console.error('Add service error:', err);
    }
    return false;
  };

  const handleUpdateService = async (id: string, updates: Partial<ServiceItem>): Promise<boolean> => {
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setServices((prev) => prev.map((s) => (s.id === id ? data.service : s)));
        if (selectedService?.id === id) {
          setSelectedService(data.service);
        }
        return true;
      }
    } catch (err) {
      console.error('Update service error:', err);
    }
    return false;
  };

  const handleDeleteService = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        setServices((prev) => prev.filter((s) => s.id !== id));
        if (selectedService?.id === id) {
          setSelectedService(null);
        }
        return true;
      }
    } catch (err) {
      console.error('Delete service error:', err);
    }
    return false;
  };

  // CRUD Operations on Banners (Server-backed)
  const handleAddBanner = async (newBan: Partial<BannerItem>): Promise<boolean> => {
    try {
      const res = await fetch('/api/banners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBan),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setBanners((prev) => [...prev, data.banner]);
        return true;
      }
    } catch (err) {
      console.error('Add banner error:', err);
    }
    return false;
  };

  const handleUpdateBanner = async (id: string, updates: Partial<BannerItem>): Promise<boolean> => {
    try {
      const res = await fetch(`/api/banners/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setBanners((prev) => prev.map((b) => (b.id === id ? data.banner : b)));
        return true;
      }
    } catch (err) {
      console.error('Update banner error:', err);
    }
    return false;
  };

  const handleDeleteBanner = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/banners/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        setBanners((prev) => prev.filter((b) => b.id !== id));
        return true;
      }
    } catch (err) {
      console.error('Delete banner error:', err);
    }
    return false;
  };

  // Company Profile Update
  const handleUpdateCompany = async (updates: CompanyInfo): Promise<boolean> => {
    try {
      const res = await fetch('/api/company', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCompany(data.company);
        return true;
      }
    } catch (err) {
      console.error('Update company error:', err);
    }
    return false;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Navigation Bar */}
      <Navbar
        company={company}
        isAdmin={isAdmin}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        onLogout={handleLogout}
      />

      <main className="flex-1" id="beranda">
        {/* Infographic Banner Slideshow with gradients and prominent Serviceku name */}
        <BannerSlideshow
          banners={banners}
          company={company}
        />

        {/* Modern Services Catalog */}
        <ServiceCatalog
          services={services}
          company={company}
          isAdmin={isAdmin}
          onSelectService={(srv) => setSelectedService(srv)}
          onEditService={(srv) => {
            setIsDashboardOpen(true);
          }}
          onAddNewService={() => {
            setIsDashboardOpen(true);
          }}
        />

        {/* Guarantees & Selling Points (Poster Highlights) */}
        <WhyChooseUs company={company} />

        {/* Coverage Area & Workshop Location */}
        <CoverageArea company={company} />
      </main>

      {/* Footer */}
      <Footer
        company={company}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        isAdmin={isAdmin}
        onOpenDashboard={() => setIsDashboardOpen(true)}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp company={company} />

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        company={company}
        onClose={() => setSelectedService(null)}
        isAdmin={isAdmin}
        onEditByAdmin={(_srv) => {
          setIsDashboardOpen(true);
        }}
      />

      {/* Admin Login Modal (with custom username, password & eye toggle) */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Admin Dashboard */}
      <AdminDashboard
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        company={company}
        services={services}
        banners={banners}
        onUpdateCompany={handleUpdateCompany}
        onAddService={handleAddService}
        onUpdateService={handleUpdateService}
        onDeleteService={handleDeleteService}
        onAddBanner={handleAddBanner}
        onUpdateBanner={handleUpdateBanner}
        onDeleteBanner={handleDeleteBanner}
        onRefreshData={fetchData}
      />
    </div>
  );
}
