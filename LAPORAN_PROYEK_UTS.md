# LAPORAN TUGAS UJIAN TENGAH SEMESTER (UTS)
## Pengembangan Aplikasi Web E-Commerce Sederhana "KomersMu"

---

### **DATA MAHASISWA & MATA KULIAH**
- **Mata Kuliah / Kegiatan**: Pemrograman Web / Ujian Tengah Semester (UTS) - UKM Software Development
- **Nama Proyek**: KomersMu (E-Commerce Web Application)
- **Framework & Bahasa**: Next.js (App Router), TypeScript, Tailwind CSS
- **Repository / Direktori**: `komersmu`

---

## 1. PENDAHULUAN

### 1.1 Latar Belakang
Perkembangan teknologi web modern menuntut performa aplikasi yang cepat, arsitektur kode yang terstruktur dan mudah dirawat (*maintainable*), serta antarmuka pengguna (*UI/UX*) yang fungsional dan intuitif. Proyek ini dibangun sebagai pemenuhan tugas Ujian Tengah Semester (UTS) untuk membuat aplikasi e-commerce sederhana dengan tiga kemampuan inti: pengambilan data produk dari Web API eksternal, pencarian produk interaktif, dan pengelolaan keranjang belanja (*Add to Cart*).

### 1.2 Tujuan Proyek
1. Mengimplementasikan konsep modern web development menggunakan framework **Next.js (App Router)** dan **TypeScript**.
2. Mengintegrasikan REST API untuk pengambilan data katalog produk secara dinamis.
3. Membangun sistem pencarian dan pemfilteran kategori produk secara instan di sisi klien (*client-side*).
4. Menerapkan manajemen *state* global keranjang belanja yang reaktif menggunakan **Zustand**.
5. Menerapkan desain antarmuka bersih, fungsional, dan ramah pengguna dengan inspirasi gaya Skandinavia/IKEA (warna solid biru-kuning, tipografi modern *Plus Jakarta Sans*).

---

## 2. ARSITEKTUR & STACK TEKNOLOGI

| Lapisan / Komponen | Teknologi | Alasan Pemilihan |
| :--- | :--- | :--- |
| **Framework Utama** | Next.js 15+ (App Router) | Mendukung *Server Components* untuk pengambilan data efisien dan SEO yang baik. |
| **Bahasa Pemrograman** | TypeScript | Menjamin keamanan tipe data (*type safety*), meminimalisir *runtime error*, dan memudahkan skalabilitas. |
| **Styling & Desain** | Tailwind CSS v4 & shadcn/ui | Utilitas CSS modern yang fleksibel dipadu komponen dasar UI aksesibel dan bersih. |
| **Tipografi** | Plus Jakarta Sans | Font sans-serif geometris modern berstandar industri untuk meningkatkan keterbacaan (*readability*). |
| **State Management** | Zustand | Solusi *global state management* yang sangat ringan, minim *boilerplate*, dan performan tinggi untuk keranjang belanja. |
| **Sumber Data API** | DummyJSON Products API | Sumber REST API publik andal dengan respon JSON terstruktur (menggantikan Fake Store API yang mengalami *downtime*). |
| **Icon Library** | Lucide React | Ikon SVG bersih, konsisten, dan ringan. |

---

## 3. FITUR UTAMA & IMPLEMENTASI TEKNIS

### 3.1 Fetching Data Produk (Server-Side)
- **Implementasi**: Dilakukan pada komponen server [`src/app/page.tsx`](file:///d:/UKM%20SOFTDEV/komersmu/src/app/page.tsx).
- **Mekanisme**: Mengambil data produk secara asinkron dari endpoint `https://dummyjson.com/products?limit=30` dengan strategi *caching* dan *revalidation* berkala. Data produk kemudian diteruskan sebagai *props* ke komponen klien untuk dirender.

### 3.2 Pencarian Real-Time & Filter Kategori Produk
- **Implementasi**: Terdapat pada [`src/components/ProductList.tsx`](file:///d:/UKM%20SOFTDEV/komersmu/src/components/ProductList.tsx).
- **Mekanisme**: 
  - Kolom pencarian input reaktif yang menyaring judul dan kategori produk secara instan tanpa perlu memuat ulang halaman (*zero page reload*).
  - Tombol filter kategori dinamis (*All*, *Beauty*, *Fragrances*, *Furniture*, *Groceries*) diekstrak secara otomatis dari daftar produk aktif.
  - Tersedia tombol *Reset Filter* jika hasil pencarian tidak ditemukan.

### 3.3 Pengelolaan Keranjang Belanja (*Add to Cart & Cart Drawer*)
- **Implementasi**: 
  - State Management: [`src/store/useCartStore.ts`](file:///d:/UKM%20SOFTDEV/komersmu/src/store/useCartStore.ts) menggunakan Zustand.
  - Tampilan Keranjang: [`src/components/CartSheet.tsx`](file:///d:/UKM%20SOFTDEV/komersmu/src/components/CartSheet.tsx) menggunakan komponen *Sheet* (drawer geser samping).
- **Fitur Keranjang**:
  - Penambahan produk ke keranjang belanja dengan feedback tombol berubah status secara reaktif.
  - Indikator jumlah barang (*badge counter*) pada ikon keranjang di bilah navigasi atas (*Navbar*).
  - Pengaturan kuantitas produk (*tambah (+)*, *kurang (-)*, serta tombol hapus per item).
  - Perhitungan subtotal dan total harga secara otomatis.
  - Tombol pengosongan keranjang (*Clear Cart*).

### 3.4 Desain Antarmuka (*UI/UX Design*)
- **Konsep**: Terinspirasi dari kesederhanaan dan fungsionalitas desain ritel modern ala IKEA.
- **Karakteristik Visual**:
  - Menghindari gradasi yang berlebihan demi keterbacaan tinggi.
  - Menggunakan kombinasi warna kontras: Biru Solid (`#0058a3`) dan Kuning Emas (`#eab308` & `#ffdb00`).
  - *Logo Teks Murni*: Logo dua warna `KomersMu` yang elegan tanpa kotak atau ikon pembatas.
  - *Grid Responsif Proporsional*: Menggunakan susunan 2 kolom pada *mobile* hingga 5 kolom pada layar desktop besar, memastikan kartu produk tidak melebar secara berlebihan.
  - *Label Promo Fungsional*: Label diskon kotak kuning tebal (`HEMAT X%`) dan harga produk berukuran tebal (*bold*).

---

## 4. STRUKTUR DIREKTORI PROYEK

```text
komersmu/
├── public/                 # Aset statis publik
├── src/
│   ├── app/
│   │   ├── globals.css     # Konfigurasi Tailwind, CSS variable, dan styling dasar
│   │   ├── layout.tsx      # Root Layout & konfigurasi font Plus Jakarta Sans
│   │   └── page.tsx        # Halaman utama (Server Component fetching API)
│   ├── components/
│   │   ├── ui/             # Komponen dasar shadcn (button, card, badge, sheet, input)
│   │   ├── CartSheet.tsx   # Drawer interaktif keranjang belanja
│   │   ├── Navbar.tsx      # Header navigasi & logo teks KomersMu
│   │   ├── ProductCard.tsx # Komponen kartu produk individual
│   │   └── ProductList.tsx # Komponen pencarian, filter kategori, dan grid produk
│   ├── store/
│   │   └── useCartStore.ts # Global state keranjang belanja menggunakan Zustand
│   └── types/
│       └── product.ts      # Definisi interface TypeScript untuk model produk
├── package.json            # Daftar dependensi dan script npm
├── tsconfig.json           # Konfigurasi compiler TypeScript
└── next.config.ts          # Konfigurasi Next.js (remote image domain)
```

---

## 5. HASIL PENGUJIAN SISTEM (TESTING)

| No | Skenario Uji | Tindakan Pengguna | Hasil yang Diharapkan | Status |
| :-: | :--- | :--- | :--- | :-: |
| 1 | **Fetching Data Produk** | Membuka halaman utama aplikasi | Produk dari API berhasil ditampilkan lengkap dengan gambar, judul, harga, dan rating. | **BERHASIL (PASS)** |
| 2 | **Pencarian Produk** | Mengetik kata kunci (misal: "Mascara") pada kotak pencarian | Hanya produk yang memiliki kecocokan nama/kategori yang ditampilkan. | **BERHASIL (PASS)** |
| 3 | **Filter Kategori** | Mengklik tombol kategori "Fragrances" | Katalog menyaring otomatis hanya produk dengan kategori wewangian. | **BERHASIL (PASS)** |
| 4 | **Reset Filter** | Mengetik kata acak lalu menekan tombol "Reset Filter" | Input dibersihkan dan semua produk kembali ditampilkan. | **BERHASIL (PASS)** |
| 5 | **Add to Cart** | Menekan tombol "Beli" pada kartu produk | Tombol berubah menjadi "Ditambah", dan badge angka di navbar bertambah. | **BERHASIL (PASS)** |
| 6 | **Buka Drawer Keranjang** | Mengklik ikon keranjang pada navbar | Drawer samping terbuka memperlihatkan item yang dimasukkan. | **BERHASIL (PASS)** |
| 7 | **Ubah Kuantitas Item** | Menekan tombol (+) atau (-) pada keranjang | Jumlah kuantitas berubah dan total harga terkalkulasi otomatis. | **BERHASIL (PASS)** |
| 8 | **Hapus Item Keranjang** | Menekan tombol ikon tempat sampah | Item dihapus dari daftar keranjang belanja. | **BERHASIL (PASS)** |
| 9 | **Cek Type Safety** | Menjalankan `npx tsc --noEmit` | Tidak ada error kompilasi TypeScript (0 errors). | **BERHASIL (PASS)** |

---

## 6. CARA MENJALANKAN PROYEK LOKAL

1. Pastikan **Node.js** (versi 18.x atau lebih baru) telah terpasang di komputer.
2. Buka terminal pada direktori proyek:
   ```bash
   cd "komersmu"
   ```
3. Pasang semua dependensi proyek:
   ```bash
   npm install
   ```
4. Jalankan server pengembang lokal:
   ```bash
   npm run dev
   ```
5. Buka peramban (browser) dan akses alamat:
   ```
   http://localhost:3000
   ```

---

## 7. KESIMPULAN

Aplikasi e-commerce **KomersMu** telah berhasil dibangun sesuai dengan spesifikasi penugasan Ujian Tengah Semester (UTS). Seluruh fitur wajib (Fetching API, Pencarian, dan Add to Cart) berfungsi secara terintegrasi dengan baik. Arsitektur kode terbukti rapi berkat pemisahan tanggung jawab yang jelas antara komponen antarmuka, model data bertipe ketat (*TypeScript*), serta manajemen *state* terpusat (*Zustand*). Desain antarmuka yang bersih (*clean*), fungsional, dan bebas dari ornamen berlebihan memberikan pengalaman pengguna (*user experience*) yang optimal.
