# Serviceku - Website Promosi Jasa Service Elektronik Terbaik

Website profesional untuk promosi dan pemesanan jasa service elektronik panggilan terpercaya (**AC, Kulkas, Mesin Cuci, Showcase, Freezer Box, Dispenser**) dengan pemesanan langsung via WhatsApp, slideshow banner infografis, dan dashboard admin interaktif untuk publikasi jasa & foto secara permanen.

---

## 🌟 Fitur Utama

1. **Logo & Identitas Brand Serviceku**:
   - Logo vektor presisi: ikon *snowflake* (pendingin), roda gerigi (*gear*), kunci inggris (*wrench*), dan gelombang air (*wave*).
   - Teks: *"Serviceku - ELEKTRONIK TERBAIK - Spesialis Pendingin dan Mesin Elektronik"*.

2. **Slide Show Banner Infografis**:
   - Tampilan gradasi modern (*Ocean Blue*, *Ice Cool Cyan*, *Deep Electric*, dll).
   - Label promo, garansi 1 bulan, dan jangkauan wilayah.
   - **Nama Jasa Serviceku di bawah banner** yang dapat ditambah, diedit, atau dihapus oleh admin.
   - Tombol klik langsung order via WhatsApp.

3. **Katalog Jasa Elektronik Modern**:
   - Kartu katalog interaktif dengan filter kategori: **AC, Kulkas, Mesin Cuci, Showcase & Freezer, Dispenser**.
   - Dilengkapi foto jelas, rincian biaya, satuan harga, deskripsi pengerjaan, jaminan garansi, dan cakupan wilayah.
   - **Order WhatsApp Langsung**: Mengklik tombol WhatsApp pada kartu langsung membuka chat ke nomor `+62 878-7441-7978` dengan pesan otomatis terisi sesuai jasa yang dipilih.

4. **Akun User Admin**:
   - Tombol **Admin Login** di navigasi bar atas.
   - Modal login dengan form username dan password custom, dilengkapi **icon mata** untuk melihat / menyembunyikan password.
   - Akses admin aman dengan verifikasi kredensial terlindungi.

5. **Dashboard Admin & Publikasi Permanen**:
   - **Publikasikan Jasa Baru**: Masukkan nama jasa, kategori, harga, satuan, deskripsi, alamat/wilayah jangkauan, dan foto.
   - **Upload & Ganti Foto Langsung**: Unggah foto dari galeri/kamera atau pilih dari daftar foto rekomendasi; foto langsung tampil dan tersimpan permanen di server (`data/database.json` & `data/uploads/`).
   - **Kelola Banner Infografis**: Tambah banner baru, ubah gradasi warna, edit nama jasa Serviceku, atau hapus banner.
   - **Pengaturan Profil & WhatsApp**: Ubah nomor WhatsApp tujuan order, alamat bengkel (*Jl. by pass Binaria-bondan*), dan jangkauan (*Indramayu, Cirebon, Majalengka*).
   - **Ganti Password Admin**: Dilengkapi icon mata lihat password.

---

## 🚀 Panduan Push ke GitHub

Untuk mengunggah (push) seluruh kode proyek ini ke akun GitHub Anda:

```bash
# 1. Inisialisasi git di folder proyek
git init

# 2. Tambahkan semua file
git add .

# 3. Buat commit pertama
git commit -m "Initial commit: Website Promosi Jasa Serviceku"

# 4. Arahkan branch utama ke main
git branch -M main

# 5. Hubungkan ke repository GitHub Anda (ganti USERNAME_ANDA dengan username GitHub Anda)
git remote add origin https://github.com/USERNAME_ANDA/serviceku-website.git

# 6. Push kode ke GitHub
git push -u origin main
```

---

## 💻 Menjalankan di Komputer Lokal

```bash
# 1. Install dependencies
npm install

# 2. Jalankan server pengembangan (Express + Vite)
npm run dev

# 3. Buka di browser
# http://localhost:3000
```

---

## 🌐 Opsi Hosting & Deploy Gratis

- **Vercel / Netlify**: Hubungkan akun GitHub, pilih repositori `serviceku-website`, build command: `npm run build`, output directory: `dist`.
- **Render / Railway / VPS**: Untuk menjalankan backend Express secara penuh dengan database JSON permanen.
