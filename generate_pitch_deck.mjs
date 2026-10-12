import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const deckHtml = `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Pitch Deck AnatomiLab 3D — Ideathon JOINTS UGM 2026</title>

<!-- KaTeX -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"/>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>

<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet"/>

<style>
  :root {
    --bg-dark: #0A0F1D;
    --card-dark: rgba(17, 24, 39, 0.75);
    --border-dark: rgba(255, 255, 255, 0.12);
    --edu-blue: #3B82F6;
    --edu-cyan: #06B6D4;
    --health-red: #EF4444;
    --health-pink: #F43F5E;
    --eco-green: #10B981;
    --eco-emerald: #059669;
    --accent-purple: #8B5CF6;
    --text-white: #FFFFFF;
    --text-muted: #94A3B8;
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  @page {
    size: 297mm 167.0625mm; /* Exact 16:9 Landscape */
    margin: 0;
  }

  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: #000000;
    color: #F1F5F9;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* ── 16:9 Slide Canvas ── */
  .slide {
    width: 297mm;
    height: 167.0625mm;
    position: relative;
    background: radial-gradient(circle at 80% 20%, #172554 0%, #0B1120 45%, #050811 100%);
    padding: 12mm 16mm;
    page-break-after: always;
    break-after: page;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
  }

  @media screen {
    .slide {
      margin: 20px auto;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }
  }

  /* ── Slide Header ── */
  .slide-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    padding-bottom: 8px;
    z-index: 2;
  }
  .slide-header-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .slide-pill-badge {
    background: rgba(59, 130, 246, 0.2);
    border: 1px solid rgba(59, 130, 246, 0.4);
    color: #60A5FA;
    font-size: 8pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    padding: 3px 10px;
    border-radius: 20px;
  }
  .slide-main-title {
    font-size: 14pt;
    font-weight: 800;
    letter-spacing: -0.3px;
    color: #FFFFFF;
  }
  .slide-header-right {
    font-size: 8pt;
    color: #64748B;
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  /* ── Slide Footer ── */
  .slide-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(255,255,255,0.08);
    padding-top: 6px;
    font-size: 7.5pt;
    color: #64748B;
    z-index: 2;
  }
  .slide-num {
    background: rgba(255,255,255,0.08);
    color: #CBD5E1;
    font-weight: 700;
    padding: 2px 9px;
    border-radius: 4px;
    font-size: 7.5pt;
  }

  /* ── Slide Body ── */
  .slide-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 12px;
    padding: 10px 0;
    z-index: 2;
  }

  /* ── Grid Layouts ── */
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }
  .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }

  /* ── Visual Cards ── */
  .deck-card {
    background: rgba(15, 23, 42, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 10px;
    padding: 12px 14px;
    backdrop-filter: blur(10px);
  }
  .deck-card-blue { border-top: 3px solid var(--edu-blue); }
  .deck-card-red { border-top: 3px solid var(--health-red); }
  .deck-card-green { border-top: 3px solid var(--eco-green); }
  .deck-card-purple { border-top: 3px solid var(--accent-purple); }

  .card-label {
    font-size: 8pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .cl-blue { color: #60A5FA; }
  .cl-red { color: #F87171; }
  .cl-green { color: #34D399; }
  .cl-purple { color: #C084FC; }

  .stat-huge {
    font-size: 26pt;
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 4px;
    letter-spacing: -1px;
  }
  .stat-huge-red { color: #EF4444; }
  .stat-huge-blue { color: #38BDF8; }
  .stat-huge-green { color: #34D399; }

  p.card-desc {
    font-size: 8pt;
    line-height: 1.45;
    color: #CBD5E1;
  }

  /* ── Tables ── */
  table.deck-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 8pt;
  }
  table.deck-table th {
    background: rgba(30, 41, 59, 0.8);
    color: #93C5FD;
    padding: 7px 10px;
    text-align: left;
    font-weight: 700;
    border: 1px solid rgba(255,255,255,0.1);
  }
  table.deck-table td {
    padding: 6px 10px;
    border: 1px solid rgba(255,255,255,0.08);
    color: #E2E8F0;
    line-height: 1.35;
  }
  table.deck-table tr:nth-child(even) {
    background: rgba(255,255,255,0.03);
  }

  /* ── Glow Circles ── */
  .glow-top-right {
    position: absolute;
    top: -100px;
    right: -100px;
    width: 450px;
    height: 450px;
    background: radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 1;
  }
  .glow-bottom-left {
    position: absolute;
    bottom: -80px;
    left: -80px;
    width: 380px;
    height: 380px;
    background: radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 1;
  }

  /* ── SLIDE 1 SPECIFIC (COVER) ── */
  .cover-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 16px;
    height: 100%;
    z-index: 2;
  }
  .cover-hero-title {
    font-size: 38pt;
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -1px;
  }
  .cover-hero-title span {
    background: linear-gradient(90deg, #60A5FA 0%, #C084FC 50%, #34D399 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .cover-hero-desc {
    font-size: 12pt;
    color: #94A3B8;
    max-width: 820px;
    line-height: 1.6;
  }
  .cover-pillars-badges {
    display: flex;
    gap: 14px;
    margin-top: 6px;
  }
  .cover-p-badge {
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 8px;
    padding: 8px 18px;
    font-size: 9pt;
    font-weight: 700;
  }
</style>
</head>
<body>

<!-- ══════════════════════════════════════════════════════════════════════════
     SLIDE 1: COVER SLIDE
     ══════════════════════════════════════════════════════════════════════════ -->
<section class="slide">
  <div class="glow-top-right"></div>
  <div class="glow-bottom-left"></div>

  <div class="slide-header">
    <div class="slide-header-left">
      <div class="slide-pill-badge">Ideathon JOINTS UGM 2026</div>
      <div style="font-size: 8.5pt; color: #94A3B8;">Tema: Cross-Sectoral Synergy</div>
    </div>
    <div class="slide-header-right">PITCH DECK PRESENTASI</div>
  </div>

  <div class="cover-body">
    <div style="font-size: 9.5pt; font-weight: 700; color: #38BDF8; letter-spacing: 2px; text-transform: uppercase;">
      Platform Edukasi & Kesehatan Berbasis Sinergi Lintas Sektor
    </div>
    <h1 class="cover-hero-title">Anatomi<span>Lab 3D</span></h1>
    <p class="cover-hero-desc">
      Sinergi Web-Based 3D Anatomy Rendering, Dynamic Full-Body Lifestyle Simulation (1–5 Tahun), 
      dan Integrasi Ekonomi Preventif Melalui Ekosistem UMKM Kesehatan Herbal Lokal Berizin BPOM
    </p>

    <div class="cover-pillars-badges">
      <div class="cover-p-badge" style="border-color: #3B82F6; color: #93C5FD;">🎓 Education · Web-First 3D Explorer</div>
      <div class="cover-p-badge" style="border-color: #EF4444; color: #FCA5A5;">🫀 Healthcare · Time-Lapse & Recovery</div>
      <div class="cover-p-badge" style="border-color: #10B981; color: #6EE7B7;">🌿 Economy · UMKM BPOM Marketplace</div>
    </div>

    <div style="margin-top: 10px; font-size: 8pt; color: #64748B;">
      Tim AnatomiLab 3D · Universitas Gadjah Mada (UGM) 2026
    </div>
  </div>

  <div class="slide-footer">
    <div>AnatomiLab 3D — Official Pitch Deck</div>
    <div class="slide-num">Slide 1 / 10</div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════════════════════════
     SLIDE 2: THE PROBLEM (BOBOT 20%)
     ══════════════════════════════════════════════════════════════════════════ -->
<section class="slide">
  <div class="glow-top-right"></div>
  <div class="slide-header">
    <div class="slide-header-left">
      <div class="slide-pill-badge" style="border-color: #EF4444; color: #F87171; background: rgba(239,68,68,0.15);">01 · The Problem</div>
      <div class="slide-main-title">Krisis Laten Penyakit Tidak Menular (PTM) & Jurang Edukasi</div>
    </div>
    <div class="slide-header-right">Bobot Penilaian: 20%</div>
  </div>

  <div class="slide-body">
    <div class="grid-3">
      <div class="deck-card deck-card-red">
        <div class="card-label cl-red">🚨 Epidemi Gaya Hidup Muda</div>
        <div class="stat-huge stat-huge-red">73%</div>
        <p class="card-desc">
          <strong>Kematian nasional akibat PTM</strong> (Kardiovaskular, stroke, diabetes). Prevalensi merokok/vape usia muda melampaui <strong>28%</strong>, dan <strong>33,5%</strong> masyarakat kurang aktivitas fisik (Riskesdas).
        </p>
      </div>

      <div class="deck-card deck-card-blue">
        <div class="card-label cl-blue">🧠 Bias Persepsi Kognitif</div>
        <div class="stat-huge stat-huge-blue">Laten</div>
        <p class="card-desc">
          <strong>The Illusion of Invulnerability:</strong> Generasi muda mengabaikan peringatan kesehatan teks/2D konvensional karena kerusakan organ bersifat laten, tidak bergejala instan, dan abstrak.
        </p>
      </div>

      <div class="deck-card deck-card-purple">
        <div class="card-label cl-purple">🏫 Kesenjangan Media Ajar</div>
        <div class="stat-huge" style="color: #C084FC;">&gt;80%</div>
        <p class="card-desc">
          <strong>Sekolah non-kedokteran tanpa alat peraga:</strong> Kadaver virtual komersial luar negeri berbiaya sangat mahal ($40–120/thn per siswa), meninggalkan sekolah umum dalam keterbatasan media buku cetak usang.
        </p>
      </div>
    </div>

    <div class="deck-card" style="background: rgba(30, 41, 59, 0.6); padding: 8px 14px;">
      <div style="font-size: 7.5pt; font-weight: 700; color: #94A3B8; text-transform: uppercase; margin-bottom: 3px;">The Missing Link (Rantai yang Terputus):</div>
      <div style="font-size: 8pt; color: #E2E8F0;">
        Edukasi kesehatan yang ada saat ini <strong>terputus dari tindakan pencegahan nyata</strong>: saat masyarakat mulai sadar, tidak ada rekomendasi terpercaya ke produk preventif lokal alami UMKM yang telah terverifikasi BPOM.
      </div>
    </div>
  </div>

  <div class="slide-footer">
    <div>AnatomiLab 3D — Analisis Permasalahan & Urgensi Nasional</div>
    <div class="slide-num">Slide 2 / 10</div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════════════════════════
     SLIDE 3: THE SOLUTION (BOBOT 30%)
     ══════════════════════════════════════════════════════════════════════════ -->
<section class="slide">
  <div class="glow-top-right"></div>
  <div class="slide-header">
    <div class="slide-header-left">
      <div class="slide-pill-badge" style="border-color: #3B82F6; color: #60A5FA;">02 · The Solution</div>
      <div class="slide-main-title">Tri-Pillar Ecosystem AnatomiLab 3D</div>
    </div>
    <div class="slide-header-right">Bobot Penilaian: 30%</div>
  </div>

  <div class="slide-body">
    <div class="grid-3">
      <div class="deck-card deck-card-blue">
        <div class="card-label cl-blue">🎓 1. Education Pillar</div>
        <div style="font-size: 10pt; font-weight: 700; color: #FFFFFF; margin-bottom: 4px;">Web-First 3D Explorer</div>
        <p class="card-desc">
          • Render 3D 360° fotorealistik langsung di browser.<br/>
          • <strong>Zero-Install:</strong> Berjalan di HP & laptop spek standar.<br/>
          • Pembongkaran multi-layer (tulang, otot, organ dalam).<br/>
          • Ensiklopedia medis cerdas penjelasan fungsi klinis.
        </p>
      </div>

      <div class="deck-card deck-card-red">
        <div class="card-label cl-red">🫀 2. Healthcare Pillar</div>
        <div style="font-size: 10pt; font-weight: 700; color: #FFFFFF; margin-bottom: 4px;">Time-Lapse & Recovery Simulation</div>
        <p class="card-desc">
          • <strong>Slider Temporal 1–5 Tahun:</strong> Visualisasi dampak komposit rokok/vape, sedentari, & begadang.<br/>
          • <strong>Algoritma CDI:</strong> Kerusakan non-linear berbasis sains.<br/>
          • <strong>Mode Pemulihan (Recovery):</strong> Bukti visual bahwa regenerasi seluler terjadi saat pola hidup diperbaiki.
        </p>
      </div>

      <div class="deck-card deck-card-green">
        <div class="card-label cl-green">🌿 3. Economy Pillar</div>
        <div style="font-size: 10pt; font-weight: 700; color: #FFFFFF; margin-bottom: 4px;">Preventive UMKM Marketplace</div>
        <p class="card-desc">
          • Rekomendasi kontekstual sesuai organ terdampak.<br/>
          • <strong>Kepatuhan BPOM No. 1/2022:</strong> Hanya klaim fungsional terdaftar (bukan klaim obat terapeutik).<br/>
          • <strong>Deep-Link Affiliate:</strong> Mengalirkan pembelian ke toko resmi UMKM di Shopee/Tokopedia.
        </p>
      </div>
    </div>

    <div class="deck-card" style="border-left: 4px solid #10B981; background: rgba(6, 78, 59, 0.3); padding: 8px 14px;">
      <div style="font-size: 8pt; font-weight: 700; color: #6EE7B7;">
        ✨ Nilai Kebaruan Utama (Novelty):
      </div>
      <div style="font-size: 7.8pt; color: #D1FAE5; margin-top: 2px;">
        Satu-satunya platform di Indonesia yang menutup siklus preventif: dari pemahaman sains (Education) ➔ kesadaran risiko biologis emosional (Healthcare) ➔ aksi pencegahan riil memberdayakan UMKM lokal (Economy).
      </div>
    </div>
  </div>

  <div class="slide-footer">
    <div>AnatomiLab 3D — Konsep Inovasi & Tri-Pillar Ecosystem</div>
    <div class="slide-num">Slide 3 / 10</div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════════════════════════
     SLIDE 4: PRODUCT DEMO & KEY FEATURES
     ══════════════════════════════════════════════════════════════════════════ -->
<section class="slide">
  <div class="glow-top-right"></div>
  <div class="slide-header">
    <div class="slide-header-left">
      <div class="slide-pill-badge">03 · Product Demo</div>
      <div class="slide-main-title">Bagaimana AnatomiLab 3D Bekerja?</div>
    </div>
    <div class="slide-header-right">Live Web Prototype</div>
  </div>

  <div class="slide-body">
    <div class="grid-3">
      <div class="deck-card" style="border-top: 3px solid #38BDF8;">
        <div style="font-size: 8pt; font-weight: 700; color: #38BDF8; margin-bottom: 3px;">FITUR 1 · 3D INTERACTIVE EXPLORER</div>
        <div style="background: #020617; border-radius: 6px; padding: 10px; text-align: center; margin: 6px 0; border: 1px solid #1E293B;">
          <div style="font-size: 24pt;">🫁 🫀 🧠</div>
          <div style="font-size: 7pt; color: #94A3B8;">WebGL Draco Compression (&lt;3MB)</div>
        </div>
        <p class="card-desc">
          Eksplorasi organ 360°, pembongkaran layer anatomi, anotasi klinis instan, dan performa mulus 60 FPS di laptop maupun smartphone.
        </p>
      </div>

      <div class="deck-card" style="border-top: 3px solid #EF4444;">
        <div style="font-size: 8pt; font-weight: 700; color: #F87171; margin-bottom: 3px;">FITUR 2 · MULTI-HABIT TIME-LAPSE</div>
        <div style="background: #020617; border-radius: 6px; padding: 8px 10px; margin: 6px 0; border: 1px solid #1E293B;">
          <div style="font-size: 7.5pt; color: #CBD5E1; margin-bottom: 4px;">Slider Temporal Waktu:</div>
          <div style="background: #1E293B; height: 6px; border-radius: 3px; position: relative;">
            <div style="background: linear-gradient(90deg, #10B981, #EF4444); width: 70%; height: 100%; border-radius: 3px;"></div>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 6.5pt; color: #94A3B8; margin-top: 3px;">
            <span>Thn 0 (Sehat)</span><span>Thn 3 (Inflamasi)</span><span>Thn 5 (Fibrosis)</span>
          </div>
        </div>
        <p class="card-desc">
          Mengamati akumulasi tar pada paru-paru, penyempitan arteri kardiovaskular, dan perlambatan perfusi korteks otak akibat begadang.
        </p>
      </div>

      <div class="deck-card" style="border-top: 3px solid #10B981;">
        <div style="font-size: 8pt; font-weight: 700; color: #34D399; margin-bottom: 3px;">FITUR 3 · RECOVERY MODE & UMKM</div>
        <div style="background: #020617; border-radius: 6px; padding: 10px; text-align: center; margin: 6px 0; border: 1px solid #1E293B;">
          <div style="font-size: 20pt;">✨ 🍵 🌿</div>
          <div style="font-size: 7pt; color: #34D399;">Regenerasi Biologis + Produk Herbal BPOM</div>
        </div>
        <p class="card-desc">
          Simulasi visual pemulihan seluler saat gaya hidup sehat diadopsi, dilengkapi rekomendasi produk herbal terkurasi dari UMKM mitra.
        </p>
      </div>
    </div>

    <!-- Formula Box -->
    <div class="deck-card" style="background: rgba(15, 23, 42, 0.9); padding: 8px 14px; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <span style="font-size: 7.5pt; color: #93C5FD; font-weight: 700;">FORMULA SAINS CDI: </span>
        <span style="font-family: 'JetBrains Mono', monospace; font-size: 8.5pt; color: #F1F5F9;">Degradasi(t) = Σ (w_i × Faktor_Gaya_Hidup_i) × t^1.4</span>
      </div>
      <div style="font-size: 7.2pt; color: #94A3B8;">
        Refleksi klinis: Kerusakan bersifat non-linear & kumulatif akseleratif
      </div>
    </div>
  </div>

  <div class="slide-footer">
    <div>AnatomiLab 3D — Fitur Utama & Validasi Cara Kerja</div>
    <div class="slide-num">Slide 4 / 10</div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════════════════════════
     SLIDE 5: ASPEK EKONOMI & INTEGRASI UMKM LOKAL
     ══════════════════════════════════════════════════════════════════════════ -->
<section class="slide">
  <div class="glow-bottom-left"></div>
  <div class="slide-header">
    <div class="slide-header-left">
      <div class="slide-pill-badge" style="border-color: #10B981; color: #34D399; background: rgba(16,185,129,0.15);">04 · Pilar Ekonomi</div>
      <div class="slide-main-title">Mengubah Kesadaran Menjadi Penggerak Ekonomi Mandiri</div>
    </div>
    <div class="slide-header-right">Kemitraan UMKM & Kepatuhan Legal BPOM</div>
  </div>

  <div class="slide-body">
    <div class="grid-2">
      <div class="deck-card deck-card-green">
        <div class="card-label cl-green">🛒 Context-Aware Preventive Marketplace Flow</div>
        <div style="display: flex; flex-direction: column; gap: 7px; margin-top: 6px;">
          <div style="background: rgba(255,255,255,0.05); padding: 7px 10px; border-radius: 6px; font-size: 7.6pt;">
            <strong>1. Deteksi Kebutuhan:</strong> Simulasi mendeteksi degradasi pada organ (misal: hepar / kardiovaskular).
          </div>
          <div style="background: rgba(255,255,255,0.05); padding: 7px 10px; border-radius: 6px; font-size: 7.6pt;">
            <strong>2. Kurasi BPOM Terdaftar:</strong> Sistem merekomendasikan produk herbal/pangan fungsional (temulawak, madu hutan, teh daun salam).
          </div>
          <div style="background: rgba(255,255,255,0.05); padding: 7px 10px; border-radius: 6px; font-size: 7.6pt;">
            <strong>3. Deep-Link Affiliate:</strong> Pengguna dialihkan langsung ke toko resmi UMKM di Tokopedia/Shopee (pembelian nyata).
          </div>
        </div>
      </div>

      <div class="deck-card deck-card-blue">
        <div class="card-label cl-blue">🛡️ Kepatuhan Hukum Terhadap Peraturan BPOM No. 1/2022</div>
        <div style="font-size: 7.8pt; line-height: 1.45; color: #CBD5E1; margin-top: 4px;">
          • <strong>Hanya Klaim Fungsional:</strong> Menggunakan frasa legal yang diizinkan (<em>"membantu menjaga kesehatan jantung"</em>, <em>"mendukung fungsi hati"</em>).<br/>
          • <strong>Anti-Klaim Terapeutik:</strong> Platform secara tegas melarang klaim penyembuhan (tidak ada klaim <em>"mengobati"</em> atau <em>"menyembuhkan penyakit"</em>).<br/>
          • <strong>Whitelist Verifikasi Izin Edar:</strong> Nomor registrasi BPOM wajib tervalidasi via database <em>cekbpom.pom.go.id</em>.<br/>
          • <strong>Medical Disclaimer:</strong> Suplemen preventif, bukan pengganti resep/konsultasi dokter.
        </div>

        <div style="background: rgba(30, 58, 138, 0.4); border: 1px solid rgba(59,130,246,0.3); border-radius: 6px; padding: 6px 10px; margin-top: 8px; font-size: 7.3pt; color: #93C5FD;">
          💰 <strong>Bagi Hasil Afiliasi 5–10%:</strong> Menghasilkan revenue mandiri untuk menutup 100% biaya server, tanpa menarik biaya dari sekolah/siswa.
        </div>
      </div>
    </div>
  </div>

  <div class="slide-footer">
    <div>AnatomiLab 3D — Ekosistem Ekonomi Preventif & Pemberdayaan UMKM</div>
    <div class="slide-num">Slide 5 / 10</div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════════════════════════
     SLIDE 6: TARGET PENGGUNA & ANALISIS DAMPAK (BOBOT 15%)
     ══════════════════════════════════════════════════════════════════════════ -->
<section class="slide">
  <div class="glow-top-right"></div>
  <div class="slide-header">
    <div class="slide-header-left">
      <div class="slide-pill-badge">05 · Dampak & Manfaat</div>
      <div class="slide-main-title">Target Pengguna & Potensi Dampak Nyata Terukur</div>
    </div>
    <div class="slide-header-right">Bobot Penilaian: 15%</div>
  </div>

  <div class="slide-body">
    <div class="grid-3">
      <div class="deck-card deck-card-blue">
        <div class="card-label cl-blue">🎓 Sektor Pendidikan</div>
        <div class="stat-huge stat-huge-blue">+45%</div>
        <div style="font-weight: 700; color: #FFF; font-size: 8.5pt; margin-bottom: 2px;">Retensi Pemahaman Konsep</div>
        <p class="card-desc">
          Eksplorasi kinestetik 3D meningkatkan daya ingat siswa SMP/SMA/Mahasiswa terhadap materi fisiologi multiorgan, serta pemerataan media sains di sekolah 3T tanpa beban lisensi.
        </p>
      </div>

      <div class="deck-card deck-card-red">
        <div class="card-label cl-red">🫀 Sektor Kesehatan Publik</div>
        <div class="stat-huge stat-huge-red">“Aha!”</div>
        <div style="font-weight: 700; color: #FFF; font-size: 8.5pt; margin-bottom: 2px;">Efek Kesadaran Preventif</div>
        <p class="card-desc">
          Memicu *cognitive breakthrough* pada usia muda (20–35 th) bahwa kebiasaan buruk merusak tubuh secara nyata; mendorong pergeseran gaya hidup sebelum jatuh ke fase kuratif kronis.
        </p>
      </div>

      <div class="deck-card deck-card-green">
        <div class="card-label cl-green">🌿 Sektor Ekonomi UMKM</div>
        <div class="stat-huge stat-huge-green">&gt;8%</div>
        <div style="font-weight: 700; color: #FFF; font-size: 8.5pt; margin-bottom: 2px;">Proyeksi Konversi Klik (CTR)</div>
        <p class="card-desc">
          Membuka kanal pemasaran digital berbasis edukasi kredibel bagi produsen jamu & pangan herbal lokal bersertifikat BPOM, meningkatkan omzet UMKM melawan produk suplemen impor.
        </p>
      </div>
    </div>

    <div class="grid-3" style="font-size: 7.5pt; color: #CBD5E1;">
      <div class="deck-card" style="padding: 7px 10px;">
        <strong>Target Primer:</strong> Pelajar biologi (13–24 th) & pekerja usia produktif berisiko sedentari/vape.
      </div>
      <div class="deck-card" style="padding: 7px 10px;">
        <strong>Target Sekunder:</strong> Guru & dosen biologi/kesehatan yang butuh media interaktif gratis.
      </div>
      <div class="deck-card" style="padding: 7px 10px;">
        <strong>Target Mitra:</strong> UMKM herbal terstandar BPOM & koperasi pangan fungsional daerah.
      </div>
    </div>
  </div>

  <div class="slide-footer">
    <div>AnatomiLab 3D — Target Pengguna & Matriks Dampak Terukur</div>
    <div class="slide-num">Slide 6 / 10</div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════════════════════════
     SLIDE 7: KEUNGGULAN KOMPETITIF (BENCHMARKING & NOVELTY)
     ══════════════════════════════════════════════════════════════════════════ -->
<section class="slide">
  <div class="glow-top-right"></div>
  <div class="slide-header">
    <div class="slide-header-left">
      <div class="slide-pill-badge">06 · Benchmarking</div>
      <div class="slide-main-title">Mengapa AnatomiLab 3D Lebih Unggul?</div>
    </div>
    <div class="slide-header-right">Analisis Kebaruan & Komparasi</div>
  </div>

  <div class="slide-body">
    <table class="deck-table">
      <thead>
        <tr>
          <th style="width: 20%;">Parameter Evaluasi</th>
          <th style="width: 25%;">Buku Teks & Video 2D</th>
          <th style="width: 27%;">BioDigital / Complete Anatomy</th>
          <th style="width: 28%; background: #1D4ED8; color: #FFF;">AnatomiLab 3D (Inovasi Kami)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Aksesibilitas & Biaya</strong></td>
          <td>Murah, namun statis & pasif</td>
          <td>Lisensi mahal ($40–120/thn/siswa)</td>
          <td><strong>100% Gratis, Web PWA (Zero-Install)</strong></td>
        </tr>
        <tr>
          <td><strong>Simulasi Temporal Waktu</strong></td>
          <td>Tidak ada (statis)</td>
          <td>Terbatas pada patologi statis terisolasi</td>
          <td><strong>Slider 1–5 Tahun (Multi-Habit Komposit)</strong></td>
        </tr>
        <tr>
          <td><strong>Mode Pemulihan (Recovery)</strong></td>
          <td>Tidak tersedia</td>
          <td>Tidak tersedia</td>
          <td><strong>Tersedia (Simulasi regenerasi seluler)</strong></td>
        </tr>
        <tr>
          <td><strong>Konektivitas Ekonomi Lokal</strong></td>
          <td>Nol</td>
          <td>Nol</td>
          <td><strong>Integrasi Afiliasi UMKM Herbal BPOM</strong></td>
        </tr>
        <tr>
          <td><strong>Beban Perangkat Keras</strong></td>
          <td>N/A</td>
          <td>Butuh laptop spesifikasi tinggi</td>
          <td><strong>Draco glTF (&lt;3MB), ringan di HP murah</strong></td>
        </tr>
        <tr>
          <td><strong>Keberlanjutan Finansial</strong></td>
          <td>N/A</td>
          <td>Paywall komersial tertutup</td>
          <td><strong>Mandiri via komisi afiliasi marketplace</strong></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="slide-footer">
    <div>AnatomiLab 3D — Komparasi Kompetitif & Kebaruan Produk</div>
    <div class="slide-num">Slide 7 / 10</div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════════════════════════
     SLIDE 8: KELAYAKAN TEKNIS & KEBERLANJUTAN MANDIRI (BOBOT 25%)
     ══════════════════════════════════════════════════════════════════════════ -->
<section class="slide">
  <div class="glow-top-right"></div>
  <div class="slide-header">
    <div class="slide-header-left">
      <div class="slide-pill-badge" style="border-color: #8B5CF6; color: #C084FC;">07 · Feasibility & Tech</div>
      <div class="slide-main-title">Arsitektur Teknis & Kemandirian Finansial 100%</div>
    </div>
    <div class="slide-header-right">Bobot Penilaian: 25%</div>
  </div>

  <div class="slide-body">
    <div class="grid-2">
      <!-- Arsitektur -->
      <div class="deck-card deck-card-purple">
        <div class="card-label cl-purple">⚙️ Arsitektur Tiga Tingkat (Ultra-Low Opex)</div>
        <div style="font-size: 7.7pt; line-height: 1.45; color: #E2E8F0; margin-top: 4px;">
          • <strong>Presentation (Client Browser):</strong> React 19 + Three.js rendering via WebGL. Kompresi Draco memastikan unduhan 3D &lt;3MB.<br/>
          • <strong>Medical Rule Engine (Client-Side):</strong> Perhitungan rumus degradasi CDI dan morph-target shader dieksekusi di perangkat pengguna (nol biaya GPU cloud).<br/>
          • <strong>Commerce & Data (Supabase):</strong> Database PostgreSQL untuk katalog produk UMKM BPOM dan pelacakan konversi klik afiliasi.
        </div>
      </div>

      <!-- Financial Sustainability -->
      <div class="deck-card deck-card-green">
        <div class="card-label cl-green">💰 Model Finansial Mandiri (Self-Sustaining)</div>
        <div style="font-size: 7.7pt; line-height: 1.45; color: #E2E8F0; margin-top: 4px;">
          • <strong>Biaya Server Ringan:</strong> Hanya Rp150.000–300.000/bln (Cloudflare CDN gratis + Supabase cloud).<br/>
          • <strong>Proyeksi Pendapatan Afiliasi:</strong> Asumsi 5.000 user/bln ➔ 400 klik (8% CTR) ➔ 20 transaksi (@Rp80.000 dg komisi 8%) = <strong>Rp128.000–500.000/bln</strong>.<br/>
          • <strong>Hasil:</strong> Server tertutup 100% secara mandiri sejak bulan ke-4, platform selamanya <strong>100% gratis bagi sekolah</strong>.
        </div>
      </div>
    </div>

    <!-- Mitigasi Risiko -->
    <div class="deck-card" style="background: rgba(15, 23, 42, 0.9); padding: 7px 12px; font-size: 7.4pt; color: #CBD5E1;">
      <strong>🛡️ Mitigasi Risiko Utama:</strong> Validasi fisiologi bersama akademisi FK (akurasi medis) · Whitelist ketat hanya produk berizin edar BPOM aktif (legalitas) · Privacy by design tanpa kewajiban login data pribadi (keamanan).
    </div>
  </div>

  <div class="slide-footer">
    <div>AnatomiLab 3D — Kelayakan Teknis & Model Keberlanjutan Finansial</div>
    <div class="slide-num">Slide 8 / 10</div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════════════════════════
     SLIDE 9: ROADMAP EKSEKUSI 12 BULAN
     ══════════════════════════════════════════════════════════════════════════ -->
<section class="slide">
  <div class="glow-top-right"></div>
  <div class="slide-header">
    <div class="slide-header-left">
      <div class="slide-pill-badge">08 · Implementation</div>
      <div class="slide-main-title">Roadmap Eksekusi 12 Bulan Menuju Skalabilitas Nasional</div>
    </div>
    <div class="slide-header-right">Rencana Pengembangan Terukur</div>
  </div>

  <div class="slide-body">
    <div class="grid-4">
      <div class="deck-card" style="border-top: 3px solid #3B82F6;">
        <div style="font-size: 7.5pt; font-weight: 800; color: #60A5FA; margin-bottom: 2px;">Q1 · BULAN 1–3</div>
        <div style="font-size: 8.5pt; font-weight: 700; color: #FFF; margin-bottom: 4px;">MVP & Validasi Medis</div>
        <p class="card-desc">
          • Pemodelan 3D 5 organ utama di Blender & kompresi Draco.<br/>
          • Kalibrasi kurva degradasi CDI bersama dewan penasihat medis (FK).
        </p>
      </div>

      <div class="deck-card" style="border-top: 3px solid #EF4444;">
        <div style="font-size: 7.5pt; font-weight: 800; color: #F87171; margin-bottom: 2px;">Q2 · BULAN 4–6</div>
        <div style="font-size: 8.5pt; font-weight: 700; color: #FFF; margin-bottom: 4px;">Full-Body & Recovery</div>
        <p class="card-desc">
          • Integrasi slider multivariabel dan mode regenerasi seluler.<br/>
          • Uji coba usability UI/UX pada 250 siswa & guru mitra di Yogyakarta.
        </p>
      </div>

      <div class="deck-card" style="border-top: 3px solid #10B981;">
        <div style="font-size: 7.5pt; font-weight: 800; color: #34D399; margin-bottom: 2px;">Q3 · BULAN 7–9</div>
        <div style="font-size: 8.5pt; font-weight: 700; color: #FFF; margin-bottom: 4px;">Integrasi UMKM Herbal</div>
        <p class="card-desc">
          • Kurasi 30+ produk herbal berizin edar BPOM aktif & Halal MUI.<br/>
          • Peluncuran automated deep-link affiliate engine & dashboard analitik.
        </p>
      </div>

      <div class="deck-card" style="border-top: 3px solid #8B5CF6;">
        <div style="font-size: 7.5pt; font-weight: 800; color: #C084FC; margin-bottom: 2px;">Q4 · BULAN 10–12</div>
        <div style="font-size: 8.5pt; font-weight: 700; color: #FFF; margin-bottom: 4px;">Scale-Up Nasional</div>
        <p class="card-desc">
          • Sosialisasi & adopsi di 30 SMA/SMK mitra nasional.<br/>
          • Ekspansi model organ (sistem endokrin & saraf) dan kerja sama koperasi jamu.
        </p>
      </div>
    </div>

    <div class="deck-card" style="background: rgba(30, 41, 59, 0.6); padding: 8px 14px; display: flex; justify-content: space-between; align-items: center;">
      <div style="font-size: 7.8pt; color: #CBD5E1;">
        📍 <strong>Fase Kesiapan Saat Ini:</strong> Prototype interaktif 3D WebGL telah aktif berjalan dan siap diujicobakan.
      </div>
      <div style="font-size: 7.5pt; color: #60A5FA; font-weight: 700;">
        Ready for Beta Deployment
      </div>
    </div>
  </div>

  <div class="slide-footer">
    <div>AnatomiLab 3D — Rencana Implementasi & Roadmap Pengembangan</div>
    <div class="slide-num">Slide 9 / 10</div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════════════════════════
     SLIDE 10: TIM, TRANSPARANSI AI, & CLOSING CTA (BOBOT 10%)
     ══════════════════════════════════════════════════════════════════════════ -->
<section class="slide">
  <div class="glow-top-right"></div>
  <div class="glow-bottom-left"></div>
  <div class="slide-header">
    <div class="slide-header-left">
      <div class="slide-pill-badge">09 · Team & Ethics</div>
      <div class="slide-main-title">Tim Pengembang, Transparansi AI & Komitmen Eksekusi</div>
    </div>
    <div class="slide-header-right">Bobot Penilaian: 10%</div>
  </div>

  <div class="slide-body">
    <div class="grid-2">
      <!-- Tim -->
      <div class="deck-card deck-card-blue">
        <div class="card-label cl-blue">👥 Struktur Tim Multidisiplin</div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 6px;">
          <div style="background: rgba(255,255,255,0.04); padding: 6px 8px; border-radius: 6px; font-size: 7.3pt;">
            <strong style="color: #60A5FA;">Product & Strategy Lead:</strong><br/>Riset pasar, sinergi tema, & kemitraan UMKM.
          </div>
          <div style="background: rgba(255,255,255,0.04); padding: 6px 8px; border-radius: 6px; font-size: 7.3pt;">
            <strong style="color: #60A5FA;">3D & WebGL Developer:</strong><br/>Three.js, Draco shaders, & integrasi PWA.
          </div>
          <div style="background: rgba(255,255,255,0.04); padding: 6px 8px; border-radius: 6px; font-size: 7.3pt;">
            <strong style="color: #60A5FA;">Medical Content Lead:</strong><br/>Validasi kurva CDI & standar literatur FK.
          </div>
          <div style="background: rgba(255,255,255,0.04); padding: 6px 8px; border-radius: 6px; font-size: 7.3pt;">
            <strong style="color: #60A5FA;">UI/UX & Regulatory Lead:</strong><br/>Desain interaksi & audit kepatuhan BPOM.
          </div>
        </div>
      </div>

      <!-- Transparansi AI -->
      <div class="deck-card deck-card-purple">
        <div class="card-label cl-purple">🤖 Transparansi Penggunaan Artificial Intelligence (AI)</div>
        <div style="font-size: 7.5pt; line-height: 1.45; color: #CBD5E1; margin-top: 4px;">
          • <strong>Peralatan:</strong> Gemini & Claude 3.5 (Brainstorming tema) · Perplexity (Pencarian literatur Riskesdas) · Gemini Code Assist (Struktur rumus).<br/>
          • <strong>Validasi Mandiri:</strong> Seluruh data diverifikasi langsung ke dokumen Kemenkes RI, formulasi CDI dikalibrasi sendiri, dan naskah merupakan karya orisinal tim.<br/>
          • <strong>Etika:</strong> Mematuhi penuh integritas akademik JOINTS UGM 2026.
        </div>
      </div>
    </div>

    <!-- Slogan Penutup -->
    <div class="deck-card" style="text-align: center; background: linear-gradient(90deg, rgba(30,58,138,0.5) 0%, rgba(6,78,59,0.5) 100%); border: 1px solid rgba(255,255,255,0.2); padding: 12px 18px;">
      <div style="font-size: 13pt; font-weight: 800; color: #FFFFFF; letter-spacing: -0.3px;">
        “Sehatkan Generasi, Berdayakan Negeri bersama AnatomiLab 3D!”
      </div>
      <div style="font-size: 8pt; color: #93C5FD; margin-top: 3px;">
        Terima kasih kepada Dewan Juri Ideathon JOINTS UGM 2026 · Bersama Kita Bangun Indonesia Emas 2045
      </div>
    </div>
  </div>

  <div class="slide-footer">
    <div>AnatomiLab 3D — Tim Pengembang, Transparansi AI & Penutup</div>
    <div class="slide-num">Slide 10 / 10</div>
  </div>
</section>

</body>
</html>`;

const tempHtmlPath = path.join(__dirname, 'pitch_deck_temp.html');
fs.writeFileSync(tempHtmlPath, deckHtml, 'utf-8');
console.log('✅ Pitch Deck HTML written to:', tempHtmlPath);

const browser = await puppeteer.launch({
  headless: 'new',
  executablePath: CHROME_PATH,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
});

const page = await browser.newPage();
// 16:9 Viewport
await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });
await page.goto(`file:///${tempHtmlPath.replace(/\\/g, '/')}`, {
  waitUntil: 'networkidle0',
  timeout: 60000,
});

await new Promise(r => setTimeout(r, 2000));

const targetPdf = path.join(__dirname, 'PITCH_DECK_ANATOMILAB_3D.pdf');
await page.pdf({
  path: targetPdf,
  width: '297mm',
  height: '167.0625mm',
  printBackground: true,
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
});

console.log('✅ Pitch Deck PDF generated successfully:', targetPdf);
await browser.close();
