export interface ServiceItem {
  id: string;
  name: string;
  category: 'AC' | 'Kulkas' | 'Mesin Cuci' | 'Showcase & Freezer' | 'Dispenser' | 'Lainnya' | string;
  price: number;
  priceFormatted: string;
  priceUnit: string;
  description: string;
  coverageArea: string;
  warranty: string;
  imageUrl: string;
  isFeatured?: boolean;
  tags?: string[];
}

export interface BannerItem {
  id: string;
  title: string;
  subtitle: string;
  serviceName: string;
  badge: string;
  highlight: string;
  gradient: string;
  accentColor?: string;
  imageUrl?: string;
  active: boolean;
  order: number;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  subTagline: string;
  phone: string;
  whatsappNumber: string;
  address: string;
  serviceArea: string;
  operatingHours: string;
  warrantyText: string;
  adminUser?: string;
}
