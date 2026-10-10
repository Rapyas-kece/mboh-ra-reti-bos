# AnatomiLab 3D — Inovasi Ideathon JOINTS UGM 2026

Repository ini berisi dokumen proposal lengkap, naskah video pitch, kerangka pitch deck, serta source code prototype web app untuk inovasi **AnatomiLab 3D** yang diikutsertakan dalam kompetisi **Ideathon JOINTS UGM 2026**.

---

## 📌 Ringkasan Proyek

* **Kategori Kompetisi:** Ideathon JOINTS UGM 2026
* **Kombinasi Tema:** *Cross-Sectoral Synergy* (Education × Healthcare × Economy)
* **Nama Inovasi:** **AnatomiLab 3D**
* **Deskripsi Singkat:**  
  Platform edukasi anatomi interaktif berbasis *Web-First 3D Rendering (WebGL/Three.js)*, simulasi dampak gaya hidup multiorgan (*Full-Body Time-Lapse*), dan integrasi ekonomi preventif melalui ekosistem produk herbal/kesehatan terkurasi BPOM dari UMKM lokal.

---

## 📂 Struktur Berkas dalam Repository

| Berkas / Direktori | Deskripsi | Format |
| :--- | :--- | :---: |
| **[`PROPOSAL_ANATOMILAB_3D.md`](./PROPOSAL_ANATOMILAB_3D.md)** | Naskah proposal lengkap (sesuai ketentuan **4–5 halaman**). Memuat Latar Belakang (data empiris Riskesdas Kemenkes), Solusi & Novelty 3D, User Persona & Manfaat, Arsitektur Sistem, Roadmap 12 Bulan, serta Transparansi AI. | Markdown / Siap cetak PDF |
| **[`PITCH_VIDEO_SCRIPT_DAN_DECK.md`](./PITCH_VIDEO_SCRIPT_DAN_DECK.md)** | Panduan naskah video pitch YouTube (maksimal **3 menit** dengan cue visual, audio, & timestamp) serta kerangka slide **Pitch Deck (10 Slide)**. | Markdown / Panduan Tim |
| **[`src/`](./src/)** | Source code antarmuka dan interaktivitas aplikasi AnatomiLab 3D. | React + Tailwind CSS |
| **[`public/`](./public/)** | Aset publik, font kustom, dan ikon web application. | Aset Statis |

---

## 💡 3 Pilar Utama AnatomiLab 3D

1. **Pilar Education (Interactive 3D Anatomy Explorer):**
   * Eksplorasi organ & sistem tubuh 360° secara fotorealistik langsung dari browser (*zero-installation*).
   * Kartu anotasi ensiklopedi cerdas berbasis terminologi medis ramah pelajar.

2. **Pilar Healthcare (Time-Lapse Health Impact Simulation):**
   * *Slider temporal (1–5 tahun)* untuk memvisualisasikan degradasi kumulatif multiorgan (paru-paru, jantung, otak, hati, ginjal) akibat kebiasaan buruk (vape/rokok, sedentari, begadang, diet tinggi lemak/gula).
   * *Full-Body System Simulation* dan *Recovery Timeline* untuk memperlihatkan proses regenerasi organ saat gaya hidup sehat diadopsi.

3. **Pilar Economy (Context-Aware Preventive Marketplace & UMKM):**
   * Rekomendasi solusi preventif kontekstual sesuai organ yang disimulasikan.
   * *Deep-link affiliate* langsung ke official store UMKM lokal terstandar BPOM di marketplace nasional (Shopee/Tokopedia).

---

## 🛠️ Arsitektur Teknologi

* **Frontend & Render:** WebGL, Three.js, React.js / Vite, Tailwind CSS.
* **Logic & Medis:** Morph target interpolation shaders, validated medical progression curves.
* **Data & Afiliasi:** Supabase / PostgreSQL, Contextual Recommendation Engine.

---

## 🚀 Menjalankan Prototype Lokal

```bash
# 1. Install dependencies
npm install

# 2. Jalankan development server
npm run dev

# 3. Build untuk produksi
npm run build
```

---

## ⚖️ Transparansi Penggunaan AI

Penggunaan *Artificial Intelligence* (Google Gemini & Claude) dalam penyusunan proposal ini bersifat transparan untuk eksplorasi sintesis ide (*brainstorming*), sintesis literatur, dan penyusunan struktur bahasa formal. Seluruh ide pokok, kurasi fitur, validasi data, dan orisinalitas dianalisis dan dipertanggungjawabkan secara mandiri oleh tim.

---
*JOINTS UGM 2026 — Sehatkan Generasi, Berdayakan Negeri bersama AnatomiLab 3D.*
