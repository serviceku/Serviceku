import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = parseInt(process.env.PORT || '3000', 10);
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');
const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');

// Ensure data folders exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Initial Database Seeds matching the user's poster & pricelist
const initialData = {
  company: {
    name: "Serviceku",
    tagline: "Spesialis Pendingin dan Mesin Elektronik",
    subTagline: "ELEKTRONIK TERBAIK",
    phone: "0878-7441-7978",
    whatsappNumber: "6287874417978",
    address: "Jl. by pass Binaria-bondan",
    serviceArea: "Indramayu, Cirebon, Majalengka",
    operatingHours: "Senin - Minggu (07.30 - 21.00 WIB)",
    warrantyText: "Garansi service untuk kerusakan yang sama 1 Bulan",
    adminUser: "admin",
    adminPassword: "serviceku123",
  },
  banners: [
    {
      id: "b1",
      title: "JASA SERVICE ELEKTRONIK TERPERCAYA",
      subtitle: "AC, Kulkas, Mesin Cuci, Showcase, Freezer Box, Dispenser",
      serviceName: "Serviceku - Elektronik Terbaik",
      badge: "Panggilan Cepat & Bergaransi",
      highlight: "Melayani Indramayu, Cirebon & Majalengka",
      gradient: "from-blue-700 via-sky-600 to-indigo-900",
      accentColor: "#0284c7",
      imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
      active: true,
      order: 1
    },
    {
      id: "b2",
      title: "PROMO CUCI AC MULAI RP 75.000",
      subtitle: "AC Dingin Maksimal, Blower Bersih Bebas Bakteri & Hemat Listrik",
      serviceName: "Serviceku - Spesialis AC & Pendingin",
      badge: "Promo Terlaris",
      highlight: "Teknisi Berpengalaman & Siap Datang Langsung",
      gradient: "from-sky-700 via-blue-700 to-slate-900",
      accentColor: "#0369a1",
      imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
      active: true,
      order: 2
    },
    {
      id: "b3",
      title: "SERVICE KULKAS, SHOWCASE & FREEZER",
      subtitle: "Atasi Kulkas Tidak Dingin, Kompresor Mati, Bocor Freon & Pergantian Sparepart",
      serviceName: "Serviceku - Solusi Mesin Pendingin",
      badge: "Sparepart Original",
      highlight: "Garansi 1 Bulan untuk Kerusakan yang Sama",
      gradient: "from-indigo-800 via-blue-700 to-teal-800",
      accentColor: "#2563eb",
      imageUrl: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=1200&q=80",
      active: true,
      order: 3
    },
    {
      id: "b4",
      title: "SERVICE MESIN CUCI & DISPENSER DI TEMPAT",
      subtitle: "Front Loading, Top Loading, 2 Tabung & Dispenser Galon Bawah/Atas",
      serviceName: "Serviceku - Teknisi Handal, Ramah, Jujur & Amanah",
      badge: "Dikerjakan Langsung",
      highlight: "Hubungi WA: 0878-7441-7978",
      gradient: "from-teal-700 via-cyan-800 to-blue-900",
      accentColor: "#0f766e",
      imageUrl: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=1200&q=80",
      active: true,
      order: 4
    }
  ],
  services: [
    {
      id: "srv-ac-1",
      name: "Cuci AC Standar Berkala",
      category: "AC",
      price: 75000,
      priceFormatted: "Rp 75.000",
      priceUnit: "per unit",
      description: "Pembersihan total evaporator, filter udara, saluran pembuangan air (drainage), dan unit outdoor kondensor. Menghilangkan bau, jamur, serta membuat AC dingin sejuk maksimal dan hemat konsumsi listrik.",
      coverageArea: "Indramayu, Cirebon, Majalengka",
      warranty: "Garansi dingin & cuci bersih",
      imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
      isFeatured: true,
      tags: ["Terlaris", "Perawatan Rutin", "Cuci Bersih"]
    },
    {
      id: "srv-ac-2",
      name: "Cuci Overhaul Turun Unit AC",
      category: "AC",
      price: 350000,
      priceFormatted: "Rp 350.000",
      priceUnit: "per unit",
      description: "Pembersihan mendalam dengan mencopot / menurunkan seluruh unit indoor AC untuk dibersihkan hingga ke celah tersulit dari lendir, lumut, kerak membandel, serta pengecekan menyeluruh kompresor.",
      coverageArea: "Indramayu, Cirebon, Majalengka",
      warranty: "1 Bulan Garansi Pengerjaan",
      imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
      isFeatured: true,
      tags: ["Deep Clean", "Overhaul Total", "AC Bebas Lendir"]
    },
    {
      id: "srv-ac-3",
      name: "Pasang AC Baru / Bekas",
      category: "AC",
      price: 350000,
      priceFormatted: "Rp 350.000",
      priceUnit: "per unit",
      description: "Jasa pemasangan unit AC indoor dan outdoor dengan standar SOP teknisi berpengalaman, instalasi pipa rapi, vakum jalur freon untuk mencegah udara terjebak, dan pengujian ampere arus listrik.",
      coverageArea: "Indramayu, Cirebon, Majalengka",
      warranty: "1 Bulan Garansi Instalasi",
      imageUrl: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80",
      isFeatured: true,
      tags: ["Instalasi Standar", "Vakum Pipa", "Rapi & Aman"]
    },
    {
      id: "srv-ac-4",
      name: "Bongkar AC",
      category: "AC",
      price: 250000,
      priceFormatted: "Rp 250.000",
      priceUnit: "per unit",
      description: "Pencopotan unit AC indoor dan outdoor yang aman dengan teknik pump down untuk mengunci freon di dalam kompresor agar gas tidak terbuang sia-sia saat renovasi atau pindah rumah.",
      coverageArea: "Indramayu, Cirebon, Majalengka",
      warranty: "Pump Down Freon Aman",
      imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      isFeatured: false,
      tags: ["Pump Down", "Bongkar Aman"]
    },
    {
      id: "srv-ac-5",
      name: "Perbaikan Kebocoran Freon & Isi Ulang AC",
      category: "AC",
      price: 750000,
      priceFormatted: "Rp 750.000*",
      priceUnit: "tergantung kapasitas & kesulitan",
      description: "Pengecekan dan pendeteksian titik kebocoran pada nepel, sambungan las evaporator atau kondensor, pengelasan perbaikan pipa, proses pemvakuman sistem kompresor, dan pengisian full freon (R32 / R410 / R22).",
      coverageArea: "Indramayu, Cirebon, Majalengka",
      warranty: "1 Bulan Garansi Kebocoran",
      imageUrl: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
      isFeatured: true,
      tags: ["Las Pipa", "Freon R32/R410", "Uji Tekanan"]
    },
    {
      id: "srv-ac-6",
      name: "Perbaikan Modul PCB Elektronik AC",
      category: "AC",
      price: 350000,
      priceFormatted: "Rp 350.000*",
      priceUnit: "tergantung tipe AC",
      description: "Perbaikan motherboard / modul elektronik AC yang mengalami mati total, konslet karena lonjakan tegangan, sensor error, lampu indikator berkedip (blinking), atau relay fan mati.",
      coverageArea: "Indramayu, Cirebon, Majalengka",
      warranty: "1 Bulan Garansi Sparepart PCB",
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      isFeatured: false,
      tags: ["Elektronik", "Modul PCB", "Sensor Suhu"]
    },
    {
      id: "srv-ac-7",
      name: "Penggantian Modul Universal AC + Remote",
      category: "AC",
      price: 450000,
      priceFormatted: "Rp 450.000",
      priceUnit: "termasuk modul & remote",
      description: "Penggantian modul kontrol AC lama yang rusak parah dengan modul universal berkualitas tinggi yang awet, kompatibel dengan segala merk AC, sudah termasuk remote control baru yang praktis.",
      coverageArea: "Indramayu, Cirebon, Majalengka",
      warranty: "1 Bulan Garansi Unit Modul",
      imageUrl: "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80",
      isFeatured: false,
      tags: ["Modul Baru", "Termasuk Remote", "Solusi Cepat"]
    },
    {
      id: "srv-kulkas-1",
      name: "Service Kulkas 1 & 2 Pintu",
      category: "Kulkas",
      price: 150000,
      priceFormatted: "Rp 150.000*",
      priceUnit: "jasa pengecekan & perbaikan dasar",
      description: "Mengatasi masalah kulkas tidak dingin, bunga es menumpuk tebal, freezer dingin tapi bagian bawah tidak dingin, penggantian bimetal defrost, timer defrost, heater, sensor defrost, atau relay PTC kompresor.",
      coverageArea: "Indramayu, Cirebon, Majalengka",
      warranty: "1 Bulan Garansi Kerusakan Sama",
      imageUrl: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80",
      isFeatured: true,
      tags: ["Defrost System", "Kompresor", "Kulkas Dingin"]
    },
    {
      id: "srv-kulkas-2",
      name: "Service Kulkas Side By Side / Inverter",
      category: "Kulkas",
      price: 250000,
      priceFormatted: "Rp 250.000*",
      priceUnit: "jasa teknisi spesialis",
      description: "Penanganan profesional untuk kulkas inverter ukuran besar side-by-side (LG, Samsung, Sharp, Toshiba, dll). Mengatasi inverter PCB error, sistem sirkulasi udara twin cooling, kebocoran freon R600a, hingga suara bising kompresor.",
      coverageArea: "Indramayu, Cirebon, Majalengka",
      warranty: "1 Bulan Garansi Kerusakan Sama",
      imageUrl: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80",
      isFeatured: true,
      tags: ["Inverter", "Side By Side", "Teknologi Tinggi"]
    },
    {
      id: "srv-mc-1",
      name: "Service Mesin Cuci Front Loading",
      category: "Mesin Cuci",
      price: 200000,
      priceFormatted: "Rp 200.000*",
      priceUnit: "jasa perbaikan di tempat",
      description: "Perbaikan mesin cuci buka depan (front load): pintu macet terkunci, tabung bergetar keras (bearing/shockbreaker oblak), air tidak mau masuk/buang, penggantian solenoid valve, modul kontrol error (OE, DE, UE, dll).",
      coverageArea: "Indramayu, Cirebon, Majalengka",
      warranty: "1 Bulan Garansi Kerusakan Sama",
      imageUrl: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80",
      isFeatured: true,
      tags: ["Front Loading", "Ganti Bearing", "Modul Error"]
    },
    {
      id: "srv-mc-2",
      name: "Service Mesin Cuci Top Loading & 2 Tabung",
      category: "Mesin Cuci",
      price: 150000,
      priceFormatted: "Rp 150.000*",
      priceUnit: "jasa perbaikan di tempat",
      description: "Perbaikan mesin cuci 1 tabung atas maupun 2 tabung manual: dinamo pengering mati/lemah, dinamo pencuci dengung saja, gearbox rompal, selang drain bocor, timer rusak, atau tali rem pengering putus.",
      coverageArea: "Indramayu, Cirebon, Majalengka",
      warranty: "1 Bulan Garansi Kerusakan Sama",
      imageUrl: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=800&q=80",
      isFeatured: false,
      tags: ["Top Loading", "2 Tabung", "Dinamo & Gearbox"]
    },
    {
      id: "srv-showcase-1",
      name: "Service Showcase Pendingin Toko & Warung",
      category: "Showcase & Freezer",
      price: 200000,
      priceFormatted: "Rp 200.000*",
      priceUnit: "jasa teknisi panggilan",
      description: "Solusi cepat untuk showcase display minuman di minimarket, toko kelontong, resto yang kurang dingin. Pengecekan kipas blower kondensor, pengisian freon, perbaikan kelistrikan lampu LED display & thermostat temperatur.",
      coverageArea: "Indramayu, Cirebon, Majalengka",
      warranty: "1 Bulan Garansi Kerusakan Sama",
      imageUrl: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=800&q=80",
      isFeatured: true,
      tags: ["Showcase Usaha", "Blower Fan", "Dingin Cepat"]
    },
    {
      id: "srv-freezer-1",
      name: "Service Freezer Box Es Krim & Daging",
      category: "Showcase & Freezer",
      price: 200000,
      priceFormatted: "Rp 200.000*",
      priceUnit: "jasa teknisi panggilan",
      description: "Perbaikan freezer box kapasitas 100L hingga 1000L. Menangani freezer tidak membeku, pipa kapiler buntu/mampet, kebocoran freon, kompresor overload, dan setting thermostat pembeku.",
      coverageArea: "Indramayu, Cirebon, Majalengka",
      warranty: "1 Bulan Garansi Kerusakan Sama",
      imageUrl: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80",
      isFeatured: false,
      tags: ["Freezer Box", "Suhu Beku", "Pipa Buntu"]
    },
    {
      id: "srv-dispenser-1",
      name: "Service Dispenser Galon Bawah & Galon Atas",
      category: "Dispenser",
      price: 120000,
      priceFormatted: "Rp 120.000*",
      priceUnit: "jasa perbaikan",
      description: "Perbaikan dispenser air: pompa galon bawah tidak menyedot air, air panas/dingin mati, keran bocor/rembes, kebocoran selang silikon, modul switch galon error, penggantian element pemanas / thermoelectric cooling.",
      coverageArea: "Indramayu, Cirebon, Majalengka",
      warranty: "1 Bulan Garansi Kerusakan Sama",
      imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
      isFeatured: false,
      tags: ["Galon Bawah", "Pompa Air", "Panas & Dingin"]
    }
  ]
};

// Database helper functions
function readDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
      return initialData;
    }
    const content = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error('Error reading DB:', err);
    return initialData;
  }
}

function writeDb(data: any) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing DB:', err);
    return false;
  }
}

// Initialize DB if not present
if (!fs.existsSync(DB_FILE)) {
  writeDb(initialData);
}

async function startServer() {
  const app = express();

  // Middleware for JSON body parsing (with large limit for base64 image uploads)
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Static uploads directory
  app.use('/uploads', express.static(UPLOADS_DIR));

  // --- API ROUTES ---

  // 1. Get company info
  app.get('/api/company', (_req, res) => {
    const db = readDb();
    const { adminPassword, ...safeCompany } = db.company;
    res.json({ success: true, company: safeCompany });
  });

  // 2. Update company info (Admin only)
  app.put('/api/company', (req, res) => {
    const db = readDb();
    const updates = req.body;
    db.company = { ...db.company, ...updates };
    writeDb(db);
    const { adminPassword, ...safeCompany } = db.company;
    res.json({ success: true, company: safeCompany, message: "Informasi kontak berhasil diperbarui!" });
  });

  // 3. Admin Login
  app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    const db = readDb();
    if (
      username === db.company.adminUser &&
      password === db.company.adminPassword
    ) {
      // Simple signed auth token simulation
      const token = `auth_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      res.json({
        success: true,
        token,
        username: db.company.adminUser,
        message: "Login admin berhasil!"
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Username atau password admin salah!"
      });
    }
  });

  // 4. Update Admin Credentials
  app.put('/api/auth/credentials', (req, res) => {
    const { currentPassword, newUsername, newPassword } = req.body;
    const db = readDb();

    if (currentPassword !== db.company.adminPassword) {
      return res.status(401).json({
        success: false,
        message: "Password saat ini salah!"
      });
    }

    if (newUsername) db.company.adminUser = newUsername.trim();
    if (newPassword) db.company.adminPassword = newPassword.trim();
    writeDb(db);

    res.json({
      success: true,
      username: db.company.adminUser,
      message: "Kredensial admin berhasil diubah!"
    });
  });

  // 5. Services: GET all
  app.get('/api/services', (_req, res) => {
    const db = readDb();
    res.json({ success: true, services: db.services || [] });
  });

  // 6. Services: CREATE new service
  app.post('/api/services', (req, res) => {
    const db = readDb();
    const newService = {
      id: `srv-${Date.now()}`,
      name: req.body.name || "Layanan Service Baru",
      category: req.body.category || "Lainnya",
      price: Number(req.body.price) || 0,
      priceFormatted: req.body.priceFormatted || `Rp ${Number(req.body.price || 0).toLocaleString('id-ID')}`,
      priceUnit: req.body.priceUnit || "per unit",
      description: req.body.description || "",
      coverageArea: req.body.coverageArea || db.company.serviceArea || "Indramayu, Cirebon, Majalengka",
      warranty: req.body.warranty || "Garansi 1 Bulan",
      imageUrl: req.body.imageUrl || "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
      isFeatured: !!req.body.isFeatured,
      tags: Array.isArray(req.body.tags) ? req.body.tags : (req.body.tags ? String(req.body.tags).split(',').map(t => t.trim()) : [])
    };

    db.services = [newService, ...(db.services || [])];
    writeDb(db);
    res.json({ success: true, service: newService, message: "Layanan jasa berhasil dipublikasikan!" });
  });

  // 7. Services: UPDATE
  app.put('/api/services/:id', (req, res) => {
    const { id } = req.params;
    const db = readDb();
    const idx = (db.services || []).findIndex((s: any) => s.id === id);

    if (idx === -1) {
      return res.status(404).json({ success: false, message: "Layanan tidak ditemukan" });
    }

    const updated = {
      ...db.services[idx],
      ...req.body,
      price: req.body.price !== undefined ? Number(req.body.price) : db.services[idx].price,
      tags: Array.isArray(req.body.tags) ? req.body.tags : (req.body.tags ? String(req.body.tags).split(',').map(t => t.trim()) : db.services[idx].tags)
    };

    if (req.body.price && !req.body.priceFormatted) {
      updated.priceFormatted = `Rp ${Number(req.body.price).toLocaleString('id-ID')}`;
    }

    db.services[idx] = updated;
    writeDb(db);
    res.json({ success: true, service: updated, message: "Layanan jasa berhasil diperbarui!" });
  });

  // 8. Services: DELETE
  app.delete('/api/services/:id', (req, res) => {
    const { id } = req.params;
    const db = readDb();
    db.services = (db.services || []).filter((s: any) => s.id !== id);
    writeDb(db);
    res.json({ success: true, message: "Layanan jasa berhasil dihapus!" });
  });

  // 9. Banners: GET all
  app.get('/api/banners', (_req, res) => {
    const db = readDb();
    res.json({ success: true, banners: db.banners || [] });
  });

  // 10. Banners: CREATE new banner
  app.post('/api/banners', (req, res) => {
    const db = readDb();
    const newBanner = {
      id: `b-${Date.now()}`,
      title: req.body.title || "PROMO SERVICE TERBARU",
      subtitle: req.body.subtitle || "Layanan service bergaransi & teknisi siap datang",
      serviceName: req.body.serviceName || "Serviceku - Elektronik Terbaik",
      badge: req.body.badge || "Promo Terkini",
      highlight: req.body.highlight || "Hubungi WA: 0878-7441-7978",
      gradient: req.body.gradient || "from-blue-700 via-sky-600 to-indigo-900",
      accentColor: req.body.accentColor || "#0284c7",
      imageUrl: req.body.imageUrl || "",
      active: req.body.active !== undefined ? !!req.body.active : true,
      order: (db.banners || []).length + 1
    };

    db.banners = [...(db.banners || []), newBanner];
    writeDb(db);
    res.json({ success: true, banner: newBanner, message: "Banner infografis berhasil ditambahkan!" });
  });

  // 11. Banners: UPDATE banner
  app.put('/api/banners/:id', (req, res) => {
    const { id } = req.params;
    const db = readDb();
    const idx = (db.banners || []).findIndex((b: any) => b.id === id);

    if (idx === -1) {
      return res.status(404).json({ success: false, message: "Banner tidak ditemukan" });
    }

    const updated = {
      ...db.banners[idx],
      ...req.body
    };

    db.banners[idx] = updated;
    writeDb(db);
    res.json({ success: true, banner: updated, message: "Banner infografis berhasil diperbarui!" });
  });

  // 12. Banners: DELETE banner
  app.delete('/api/banners/:id', (req, res) => {
    const { id } = req.params;
    const db = readDb();
    db.banners = (db.banners || []).filter((b: any) => b.id !== id);
    writeDb(db);
    res.json({ success: true, message: "Banner infografis berhasil dihapus!" });
  });

  // 13. Image upload (Supports base64 data url from file reader)
  app.post('/api/upload', (req, res) => {
    try {
      const { dataUrl, filename } = req.body;
      if (!dataUrl || !dataUrl.includes('base64,')) {
        return res.status(400).json({ success: false, message: "Format gambar tidak valid" });
      }

      const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        return res.status(400).json({ success: false, message: "Data gambar rusak" });
      }

      const mimeType = matches[1];
      const buffer = Buffer.from(matches[2], 'base64');
      const ext = mimeType.split('/')[1] === 'jpeg' ? 'jpg' : mimeType.split('/')[1] || 'png';
      const cleanFileName = `upload_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;
      const filePath = path.join(UPLOADS_DIR, cleanFileName);

      fs.writeFileSync(filePath, buffer);

      const publicUrl = `/uploads/${cleanFileName}`;
      res.json({
        success: true,
        url: publicUrl,
        message: "Foto berhasil diunggah & disimpan permanen!"
      });
    } catch (err: any) {
      console.error('Upload error:', err);
      res.status(500).json({ success: false, message: "Gagal menyimpan foto di server" });
    }
  });

  // 14. Reset to Default DB (Admin recovery tool)
  app.post('/api/db/reset', (req, res) => {
    const { password } = req.body;
    const current = readDb();
    if (password !== current.company.adminPassword) {
      return res.status(401).json({ success: false, message: "Password salah!" });
    }
    writeDb(initialData);
    res.json({ success: true, message: "Database berhasil direset ke pengaturan awal Serviceku!" });
  });

  // Vite integration in dev or static serve in prod
  if (process.env.NODE_ENV === 'production' && fs.existsSync(path.join(__dirname, 'dist'))) {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
