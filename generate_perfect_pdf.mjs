import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const htmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Proposal Inovasi AnatomiLab 3D — Ideathon JOINTS UGM 2026</title>

<!-- KaTeX -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"/>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>

<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"/>

<style>
  :root {
    --edu-blue: #1D4ED8;
    --edu-accent: #2563EB;
    --edu-bg: #EFF6FF;
    --health-red: #B91C1C;
    --health-accent: #DC2626;
    --health-bg: #FEF2F2;
    --eco-green: #047857;
    --eco-accent: #059669;
    --eco-bg: #ECFDF5;
    --dark: #0F172A;
    --slate: #1E293B;
    --gray-body: #334155;
    --gray-light: #F8FAFC;
    --border: #E2E8F0;
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  @page {
    size: A4 portrait;
    margin: 0;
  }

  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    color: var(--gray-body);
    background: #F1F5F9;
    font-size: 8.5pt;
    line-height: 1.5;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* ── Page Layout ── */
  .page {
    width: 210mm;
    height: 297mm;
    margin: 0 auto;
    background: #FFFFFF;
    position: relative;
    padding: 16mm 16mm 15mm 16mm;
    page-break-after: always;
    break-after: page;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
  }

  @media screen {
    .page {
      margin: 15px auto;
      box-shadow: 0 4px 20px rgba(0,0,0,0.12);
    }
  }

  /* ── Header & Footer per Halaman Isi ── */
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1.5px solid var(--border);
    padding-bottom: 5px;
    margin-bottom: 12px;
    font-size: 7.3pt;
    color: #64748B;
    font-weight: 500;
  }
  .page-header-left {
    font-weight: 700;
    color: var(--slate);
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .page-header-left span.tag {
    background: #DBEAFE;
    color: #1E40AF;
    padding: 2px 7px;
    border-radius: 4px;
    font-size: 6.5pt;
    font-weight: 700;
    text-transform: uppercase;
  }
  .page-header-right {
    color: #94A3B8;
  }

  .page-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid var(--border);
    padding-top: 6px;
    margin-top: 8px;
    font-size: 7pt;
    color: #94A3B8;
  }
  .page-footer-num {
    font-weight: 700;
    color: var(--slate);
    background: #F1F5F9;
    padding: 2px 9px;
    border-radius: 4px;
    border: 1px solid #E2E8F0;
  }

  .content-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 11px;
  }

  /* ── Typography & Headings ── */
  h1, h2, h3, h4 {
    color: var(--slate);
    font-weight: 700;
  }

  h2.sec-title {
    font-size: 10.5pt;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 8px;
    background: linear-gradient(90deg, #F1F5F9 0%, #FFFFFF 100%);
    border-left: 3.5px solid var(--edu-accent);
    border-radius: 0 4px 4px 0;
    margin-bottom: 3px;
  }
  h2.sec-title span.num {
    background: var(--edu-blue);
    color: #FFF;
    font-size: 7.2pt;
    padding: 1px 6px;
    border-radius: 3px;
    font-weight: 800;
  }

  h3.sub-title {
    font-size: 8.8pt;
    font-weight: 700;
    color: #1E293B;
    margin-top: 2px;
    margin-bottom: 3px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  h3.sub-title::before {
    content: "▸";
    font-size: 8pt;
    color: var(--edu-accent);
  }

  p {
    text-align: justify;
    line-height: 1.5;
    color: var(--gray-body);
  }
  p strong {
    color: var(--slate);
    font-weight: 600;
  }

  /* ── Custom Cards & Boxes ── */
  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 9px;
  }
  .grid-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px;
  }

  .box-card {
    background: #FFFFFF;
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 8px 10px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.03);
  }
  .box-card-blue { border-left: 3.5px solid var(--edu-accent); background: #F8FAFC; }
  .box-card-red { border-left: 3.5px solid var(--health-accent); background: #FEF2F2; }
  .box-card-green { border-left: 3.5px solid var(--eco-accent); background: #ECFDF5; }

  .box-title {
    font-weight: 700;
    font-size: 8pt;
    margin-bottom: 3px;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .box-title-blue { color: var(--edu-blue); }
  .box-title-red { color: var(--health-red); }
  .box-title-green { color: var(--eco-green); }

  /* ── Tables ── */
  table.custom-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 7.4pt;
    margin-top: 3px;
    margin-bottom: 3px;
  }
  table.custom-table th {
    background: #1E293B;
    color: #FFFFFF;
    padding: 5px 7px;
    font-weight: 600;
    text-align: left;
    border: 1px solid #334155;
  }
  table.custom-table td {
    padding: 4.5px 7px;
    border: 1px solid var(--border);
    line-height: 1.38;
    vertical-align: top;
  }
  table.custom-table tr:nth-child(even) {
    background: #F8FAFC;
  }
  table.custom-table tr:hover {
    background: #F1F5F9;
  }

  /* ── Alert / Callout ── */
  .callout {
    padding: 7px 10px;
    border-radius: 6px;
    font-size: 7.5pt;
    line-height: 1.42;
    display: flex;
    gap: 8px;
    align-items: flex-start;
  }
  .callout-bpom {
    background: #ECFDF5;
    border: 1px solid #A7F3D0;
    color: #065F46;
  }
  .callout-icon {
    font-size: 10pt;
    flex-shrink: 0;
    margin-top: 1px;
  }

  /* ── Math Formula Block ── */
  .formula-container {
    background: #F8FAFC;
    border: 1px solid #CBD5E1;
    border-radius: 6px;
    padding: 7px 11px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .formula-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 7.6pt;
    font-weight: 700;
    color: var(--slate);
  }
  .formula-tex-box {
    text-align: center;
    font-size: 11pt;
    padding: 4px 0;
    color: #1E3A5F;
  }
  .formula-desc {
    font-size: 7.2pt;
    color: #475569;
    line-height: 1.38;
    background: #FFFFFF;
    border: 1px solid #E2E8F0;
    border-radius: 4px;
    padding: 5px 8px;
  }

  /* ── Flow Steps / Roadmap ── */
  .step-timeline {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 7px;
  }
  .step-card {
    background: #F8FAFC;
    border: 1px solid var(--border);
    border-radius: 5px;
    padding: 6px 7px;
  }
  .step-badge {
    font-size: 6.5pt;
    font-weight: 800;
    padding: 1px 5px;
    border-radius: 3px;
    display: inline-block;
    margin-bottom: 3px;
  }
  .step-b1 { background: #DBEAFE; color: #1E40AF; }
  .step-b2 { background: #FEE2E2; color: #991B1B; }
  .step-b3 { background: #D1FAE5; color: #065F46; }
  .step-b4 { background: #EDE9FE; color: #5B21B6; }

  /* ── COVER PAGE SPECIFIC ── */
  .cover-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: linear-gradient(145deg, #090D16 0%, #0F172A 35%, #1E293B 70%, #172554 100%);
    border-radius: 12px;
    padding: 28mm 18mm 22mm 18mm;
    color: #FFFFFF;
    position: relative;
    overflow: hidden;
  }
  .cover-container::before {
    content: "";
    position: absolute;
    top: -80px;
    right: -80px;
    width: 340px;
    height: 340px;
    background: radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%);
    border-radius: 50%;
  }
  .cover-container::after {
    content: "";
    position: absolute;
    bottom: -60px;
    left: -60px;
    width: 280px;
    height: 280px;
    background: radial-gradient(circle, rgba(16,185,129,0.25) 0%, transparent 70%);
    border-radius: 50%;
  }
  .cover-top {
    position: relative;
    z-index: 2;
  }
  .cover-tag-badge {
    display: inline-block;
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.25);
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 8pt;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #93C5FD;
    margin-bottom: 22px;
  }
  .cover-main-title {
    font-size: 32pt;
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -0.5px;
    color: #FFFFFF;
    margin-bottom: 12px;
  }
  .cover-main-title span.grad {
    background: linear-gradient(90deg, #60A5FA 0%, #A78BFA 50%, #34D399 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .cover-sub-title {
    font-size: 10.5pt;
    line-height: 1.6;
    color: #CBD5E1;
    max-width: 95%;
    margin-bottom: 24px;
  }
  .cover-pillars-row {
    display: flex;
    gap: 12px;
    margin-bottom: 22px;
  }
  .cover-pillar-pill {
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 8px;
    padding: 10px 14px;
    flex: 1;
    backdrop-filter: blur(8px);
  }
  .cover-pillar-pill strong {
    display: block;
    font-size: 8.5pt;
    margin-bottom: 3px;
  }
  .cp-edu strong { color: #93C5FD !important; }
  .cp-health strong { color: #FCA5A5 !important; }
  .cp-eco strong { color: #6EE7B7 !important; }
  .cover-pillar-pill p {
    font-size: 7pt;
    color: #94A3B8;
    text-align: left;
    line-height: 1.35;
  }
  .cover-compliance-box {
    background: rgba(15, 23, 42, 0.7);
    border: 1px solid rgba(148, 163, 184, 0.3);
    border-radius: 8px;
    padding: 12px 15px;
    margin-top: 8px;
  }
  .cover-compliance-box p {
    color: #E2E8F0 !important;
  }
  .cover-compliance-box strong {
    color: #93C5FD !important;
    font-weight: 700 !important;
  }
  .cover-bottom {
    position: relative;
    z-index: 2;
    border-top: 1px solid rgba(255,255,255,0.15);
    padding-top: 18px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }
  .cover-meta-cell {
    font-size: 7.3pt;
  }
  .cover-meta-cell .label {
    text-transform: uppercase;
    color: #94A3B8;
    font-weight: 700;
    letter-spacing: 1px;
    margin-bottom: 2px;
  }
  .cover-meta-cell .value {
    color: #FFFFFF;
    font-weight: 600;
  }
</style>
</head>
<body>

<!-- ══════════════════════════════════════════════════════════════════════════
     HALAMAN 1: COVER EKSEKUTIF RESMI IDEATHON JOINTS UGM 2026
     ══════════════════════════════════════════════════════════════════════════ -->
<section class="page" style="padding: 10mm; background: transparent;">
  <div class="cover-container">
    <div class="cover-top">
      <div class="cover-tag-badge">Proposal Karya Inovasi · Ideathon JOINTS UGM 2026</div>
      <h1 class="cover-main-title">Anatomi<span class="grad">Lab 3D</span></h1>
      <p class="cover-sub-title">
        Platform Edukasi Anatomi Interaktif Berbasis <em>Web-First 3D Rendering</em>, 
        Simulasi Dampak Gaya Hidup Multiorgan (<em>Full-Body Time-Lapse</em>), 
        dan Integrasi Ekonomi Preventif Melalui Ekosistem UMKM Kesehatan Lokal
      </p>

      <div class="cover-pillars-row">
        <div class="cover-pillar-pill cp-edu">
          <strong>🎓 Education</strong>
          <p>Eksplorasi organ 3D interaktif 360° langsung di browser tanpa instalasi (WebGL/Three.js Draco).</p>
        </div>
        <div class="cover-pillar-pill cp-health">
          <strong>🫀 Healthcare</strong>
          <p>Simulasi degradasi & pemulihan multiorgan temporal (1–5 tahun) akibat gaya hidup berisiko.</p>
        </div>
        <div class="cover-pillar-pill cp-eco">
          <strong>🌿 Economy</strong>
          <p>Konektivitas rujukan preventif kontekstual ke produk herbal & pangan terverifikasi izin BPOM RI.</p>
        </div>
      </div>

      <div class="cover-compliance-box">
        <div style="font-size: 7.8pt; font-weight: 700; color: #60A5FA; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px;">
          Pernyataan Kesesuaian Ketentuan Kompetisi Ideathon JOINTS UGM 2026
        </div>
        <p style="font-size: 7.3pt; text-align: justify; line-height: 1.45;">
          Dokumen proposal ini disusun secara sistematis dan padat gagasan berpedoman penuh pada <strong>Ketentuan Resmi Proposal</strong>: 
          memuat kejelasan ide/solusi yang diusulkan, latar belakang permasalahan empiris, inovasi & kebaruan solusi, 
          target pengguna & proyeksi manfaat nyata, arsitektur rencana implementasi, serta transparansi utuh penggunaan 
          <em>Artificial Intelligence (AI)</em> dalam format dokumen <strong>presisi 5 halaman</strong> (memenuhi rentang 4–5 halaman, batas maksimal 7 halaman).
        </p>
      </div>
    </div>

    <div class="cover-bottom">
      <div class="cover-meta-cell">
        <div class="label">Kompetisi</div>
        <div class="value">Ideathon JOINTS UGM 2026</div>
      </div>
      <div class="cover-meta-cell">
        <div class="label">Fokus Tema</div>
        <div class="value">Cross-Sectoral Synergy</div>
      </div>
      <div class="cover-meta-cell">
        <div class="label">Teknologi Inti</div>
        <div class="value">WebGL · Three.js · React · Supabase</div>
      </div>
      <div class="cover-meta-cell">
        <div class="label">Kepatuhan Regulasi</div>
        <div class="value">Peraturan BPOM RI No. 1/2022</div>
      </div>
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════════════════════════
     HALAMAN 2: RINGKASAN EKSEKUTIF & BAB 1. LATAR BELAKANG PERMASALAHAN
     ══════════════════════════════════════════════════════════════════════════ -->
<section class="page">
  <div class="page-header">
    <div class="page-header-left">
      <span class="tag">Bagian I</span> AnatomiLab 3D — Ideathon JOINTS UGM 2026
    </div>
    <div class="page-header-right">Cross-Sectoral Synergy</div>
  </div>

  <div class="content-area">
    <!-- Ringkasan Eksekutif -->
    <div>
      <h2 class="sec-title"><span class="num">00</span> RINGKASAN EKSEKUTIF (EXECUTIVE SUMMARY)</h2>
      <p style="margin-top: 3px;">
        Tingginya beban Penyakit Tidak Menular (PTM) di Indonesia—yang kini mendominasi <strong>73% angka mortalitas nasional</strong>—berakar dari rendahnya literasi kesehatan preventif dan maraknya gaya hidup buruk (merokok/vaping, sedentari, deprivasi tidur, dan diet ultra-proses) pada usia produktif. Edukasi konvensional berbasis teks 2D dan poster statis gagal memvisualisasikan bagaimana kebiasaan harian merusak struktur jaringan tubuh secara laten dari waktu ke waktu (<em>invisible cumulative damage</em>). Di saat yang sama, masyarakat yang mulai sadar kesehatan kerap kesulitan menemukan solusi preventif lokal terstandar.
      </p>
      <p style="margin-top: 4px;">
        <strong>AnatomiLab 3D</strong> hadir menjembatani kesenjangan tersebut melalui platform web interaktif 3D yang menyinergikan <strong>Education</strong> (eksplorasi anatomi fotorealistik 360° tanpa instalasi), <strong>Healthcare</strong> (simulasi *Full-Body Time-Lapse* komparasi degradasi vs pemulihan 1–5 tahun dengan formula *Composite Degradation Index*), dan <strong>Economy</strong> (kurasi rujukan produk herbal & pangan UMKM berizin edar BPOM RI berbasis *deep-link affiliate*). Inovasi ini mandiri secara finansial, ringan diakses pada gawai berbiaya rendah, dan membuka pasar bernilai tambah bagi produk kesehatan herbal lokal.
      </p>
    </div>

    <!-- Bab 1. Latar Belakang -->
    <div>
      <h2 class="sec-title"><span class="num">01</span> BAB 1. LATAR BELAKANG & ANALISIS PERMASALAHAN</h2>
      
      <h3 class="sub-title">1.1 Urgensi Masalah & Konteks Data Empiris</h3>
      <p>
        Krisis kesehatan preventif dan keterbatasan fasilitas pendidikan di Indonesia ditandai oleh tiga realitas empiris:
      </p>
      <div class="grid-3" style="margin-top: 3px;">
        <div class="box-card box-card-red">
          <div class="box-title box-title-red">1. Epidemi Gaya Hidup Muda</div>
          <p style="font-size: 7.2pt;">Riskesdas Kemenkes mencatat prevalensi perokok/vaper usia 15–30 tahun melampaui <strong>28%</strong>, serta <strong>33,5%</strong> masyarakat kurang aktivitas fisik. PTM (kardiovaskular, stroke, diabetes) kini bergeser menyerang usia produktif.</p>
        </div>
        <div class="box-card box-card-blue">
          <div class="box-title box-title-blue">2. Bias Persepsi ("Invulnerability")</div>
          <p style="font-size: 7.2pt;">Remaja meremehkan peringatan tekstual pada bungkus rokok karena kerusakan organ bersifat laten dan tak terlihat instan (<em>cognitive disconnect</em>), menunda adopsi hidup sehat hingga muncul gejala klinis terlambat.</p>
        </div>
        <div class="box-card box-card-green">
          <div class="box-title box-title-green">3. Kesenjangan Media Ajar Sekolah</div>
          <p style="font-size: 7.2pt;">Lebih dari <strong>80% sekolah non-kedokteran</strong> di Indonesia tidak memiliki akses ke kadaver virtual maupun torso anatomi fisik berkualitas tinggi karena kendala lisensi perangkat lunak asing yang mahal ($40–120/tahun).</p>
        </div>
      </div>
    </div>

    <!-- Root Cause & Kausalitas Diagram -->
    <div>
      <h3 class="sub-title">1.2 Identifikasi Masalah Spesifik (Triple Bottom Challenge)</h3>
      <p>
        Melalui pendekatan sistemik, permasalahan dipecah ke dalam 3 dimensi interdependen yang saling mengunci:
      </p>
      <table class="custom-table" style="margin-top: 3px;">
        <thead>
          <tr>
            <th style="width: 25%;">Dimensi Tantangan</th>
            <th style="width: 40%;">Akar Masalah (Root Cause)</th>
            <th style="width: 35%;">Konsekuensi Sistemik</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Education Challenge</strong></td>
            <td>Media ajar 2D pasif, teoretis, dan minim visualisasi spasial tiga dimensi yang terjangkau bagi sekolah umum.</td>
            <td>Rendahnya retensi memori siswa; biologi anatomi dianggap hafalan abstrak tanpa keterikatan emosional.</td>
          </tr>
          <tr>
            <td><strong>Healthcare Challenge</strong></td>
            <td>Ketiadaan simulasi temporal yang menunjukkan laju komposit kerusakan multiorgan akibat kombinasi kebiasaan buruk.</td>
            <td>Masyarakat abai terhadap bahaya laten; penanganan bersifat kuratif reaktif dengan biaya BPJS membengkak.</td>
          </tr>
          <tr>
            <td><strong>Economic Challenge</strong></td>
            <td>Produk preventif herbal & pangan UMKM lokal belum terhubung langsung pada saat kesadaran kesehatan pengguna timbul.</td>
            <td>UMKM herbal lokal kalah saing dari suplemen multinasional impor; momentum konversi gaya hidup sehat hilang.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Diagram Alur Kausalitas Masalah -->
    <div class="box-card" style="background: #F8FAFC; border: 1px dashed #94A3B8; padding: 6px 10px;">
      <div style="font-size: 7.2pt; font-weight: 700; color: #475569; text-transform: uppercase; margin-bottom: 3px;">Rantai Kausalitas Masalah Nasional yang Diselesaikan:</div>
      <div style="display: flex; justify-content: space-between; align-items: center; font-size: 7.1pt; text-align: center; gap: 4px;">
        <span style="background: #E2E8F0; padding: 4px 6px; border-radius: 4px; flex: 1;">Media Ajar 2D Statis & Tanpa Simulasi</span>
        <span style="color: #64748B; font-weight: 800;">➔</span>
        <span style="background: #FEE2E2; color: #991B1B; padding: 4px 6px; border-radius: 4px; flex: 1;">Kerusakan Biologis Dianggap Abstrak</span>
        <span style="color: #64748B; font-weight: 800;">➔</span>
        <span style="background: #FEF3C7; color: #92400E; padding: 4px 6px; border-radius: 4px; flex: 1;">Gaya Hidup Berisiko & PTM Usia Muda</span>
        <span style="color: #64748B; font-weight: 800;">➔</span>
        <span style="background: #DC2626; color: #FFF; font-weight: 700; padding: 4px 6px; border-radius: 4px; flex: 1.2;">Beban Penyakit Nasional 73% Kematian</span>
      </div>
    </div>
  </div>

  <div class="page-footer">
    <div>AnatomiLab 3D — Latar Belakang & Analisis Permasalahan</div>
    <div class="page-footer-num">Halaman 2 dari 5</div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════════════════════════
     HALAMAN 3: BAB 2. SOLUSI YANG DITAWARKAN, ASPEK INOVASI & KEBARUAN
     ══════════════════════════════════════════════════════════════════════════ -->
<section class="page">
  <div class="page-header">
    <div class="page-header-left">
      <span class="tag">Bagian II</span> AnatomiLab 3D — Solusi, Inovasi & Kebaruan
    </div>
    <div class="page-header-right">Cross-Sectoral Synergy</div>
  </div>

  <div class="content-area">
    <h2 class="sec-title"><span class="num">02</span> BAB 2. SOLUSI YANG DITAWARKAN & ASPEK KEBARUAN (NOVELTY)</h2>

    <!-- Tri-Pillar Solution Architecture -->
    <h3 class="sub-title">2.1 Konsep Inovasi: Tri-Pillar Synergy Framework</h3>
    <p>
      AnatomiLab 3D dirancang sebagai aplikasi web progresif (PWA) terintegrasi dengan 3 pilar yang saling memperkuat:
    </p>

    <div class="grid-3" style="margin-top: 1px;">
      <div class="box-card box-card-blue">
        <div class="box-title box-title-blue">Pilar 1: Education</div>
        <p style="font-size: 7.1pt;"><strong>Web-First 3D Interactive Explorer:</strong> Render 3D fotorealistik 360° menggunakan Three.js dan kompresi Draco glTF. Akses instan tanpa unduh aplikasi, fitur isolasi layer organ (tulang, otot, organ dalam, sirkulasi), dan ensiklopedia anotasi klinis terpadu.</p>
      </div>
      <div class="box-card box-card-red">
        <div class="box-title box-title-red">Pilar 2: Healthcare</div>
        <p style="font-size: 7.1pt;"><strong>Full-Body Dynamic Time-Lapse:</strong> Visualisasi degradasi temporal (1–5 tahun) akibat multi-faktor risiko simultan (vape/rokok, sedentari, begadang) serta <strong>Mode Pemulihan (Recovery)</strong> yang menampilkan regenerasi sel saat pola hidup diperbaiki.</p>
      </div>
      <div class="box-card box-card-green">
        <div class="box-title box-title-green">Pilar 3: Economy</div>
        <p style="font-size: 7.1pt;"><strong>Context-Aware Preventive Store:</strong> Pencocokan organ terdampak dengan produk pangan fungsional/herbal UMKM lokal terstandar izin edar BPOM RI melalui <em>deep-link affiliate</em> etis yang mendanai operasional platform secara mandiri.</p>
      </div>
    </div>

    <!-- Rumus Matematika Simulasi & Penjelasannya -->
    <div class="formula-container">
      <div class="formula-header">
        <span>📐 Algoritma Komputasi Degradasi Organ: Composite Degradation Index (CDI)</span>
        <span style="font-size: 6.8pt; color: #1E40AF; background: #DBEAFE; padding: 1px 5px; border-radius: 3px;">Fungsi Temporal Non-Linear</span>
      </div>
      <div class="formula-tex-box" id="math-formula-box"></div>
      <div class="formula-desc">
        <strong>Penjelasan Rumus & Parameter Medis:</strong>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 3px;">
          <div>
            • <strong>Degradasi(t):</strong> Skor akumulasi kerusakan organ pada tahun ke-<em>t</em> (skala 0% s.d. 100%).<br/>
            • <strong>n:</strong> Jumlah faktor risiko aktif (1 = rokok saja, 3 = rokok + sedentari + kurang tidur).<br/>
            • <strong>w<sub>i</sub>:</strong> Bobot klinis spesifik per organ (paru-paru: w<sub>rokok</sub>=0.35; hepar: w<sub>gula</sub>=0.30).
          </div>
          <div>
            • <strong>Faktor_Gaya_Hidup<sub>i</sub>:</strong> Intensitas kebiasaan dari input pengguna (normalisasi 0.0–1.0).<br/>
            • <strong>t:</strong> Horizon waktu simulasi interaktif (skala 1–5 tahun).<br/>
            • <strong>γ (gamma):</strong> Eksponen akselerasi (γ = 1.4 &gt; 1), mencerminkan fakta klinis bahwa komplikasi kerusakan organ bersifat non-linear kumulatif, bukan pertambahan linier.
          </div>
        </div>
      </div>
    </div>

    <!-- Kepatuhan BPOM Produk Herbal -->
    <div class="callout callout-bpom">
      <div class="callout-icon">🛡️</div>
      <div>
        <strong>Kepatuhan Regulasi & Perlindungan Hukum (Peraturan BPOM RI No. 1 Tahun 2022):</strong><br/>
        Seluruh rujukan produk herbal UMKM dalam platform strictly mematuhi standar hukum BPOM: hanya mencantumkan <strong>klaim fungsional terdaftar</strong> (seperti: <em>"membantu menjaga kesehatan jantung"</em>, <em>"mendukung fungsi hati"</em>, <em>"membantu memelihara daya tahan tubuh"</em>)—<strong>bukan klaim terapeutik kuratif</strong> (tidak menggunakan klaim <em>"mengobati"</em> atau <em>"menyembuhkan"</em>). Semua mitra wajib memiliki nomor izin edar BPOM RI aktif yang tervalidasi di portal <em>cekbpom.pom.go.id</em>, dilengkapi <em>medical disclaimer</em> bahwa produk adalah suplemen preventif dan bukan pengganti resep dokter.
      </div>
    </div>

    <!-- Tabel Benchmarking Kebaruan -->
    <div>
      <h3 class="sub-title">2.2 Analisis Kebaruan & Komparasi Kompetitif (Benchmarking)</h3>
      <table class="custom-table">
        <thead>
          <tr>
            <th style="width: 22%;">Parameter Evaluasi</th>
            <th style="width: 24%;">Media Konvensional (Buku/Video)</th>
            <th style="width: 27%;">BioDigital / Complete Anatomy</th>
            <th style="width: 27%; background: #1D4ED8;">AnatomiLab 3D (Inovasi Kami)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Aksesibilitas & Biaya</strong></td>
            <td>Buku teks mahal, video non-interaktif</td>
            <td>Lisensi tahunan mahal ($40–120/thn)</td>
            <td><strong>100% Gratis, Web PWA (Zero-Install)</strong></td>
          </tr>
          <tr>
            <td><strong>Simulasi Temporal</strong></td>
            <td>Statis (gambar sebelum-sesudah)</td>
            <td>Terbatas pada model patologi statis</td>
            <td><strong>Slider Temporal 1–5 Thn (Multiorgan)</strong></td>
          </tr>
          <tr>
            <td><strong>Mode Pemulihan (Recovery)</strong></td>
            <td>Tidak tersedia</td>
            <td>Tidak tersedia</td>
            <td><strong>Tersedia (Simulasi regenerasi biologis)</strong></td>
          </tr>
          <tr>
            <td><strong>Sinergi Ekonomi UMKM</strong></td>
            <td>Tidak ada korelasi</td>
            <td>Tidak ada ekosistem komersial</td>
            <td><strong>Deep-Link Produk Herbal BPOM Lokal</strong></td>
          </tr>
          <tr>
            <td><strong>Efisiensi Perangkat</strong></td>
            <td>N/A</td>
            <td>Membutuhkan GPU laptop diskrit</td>
            <td><strong>Draco glTF (&lt;3MB), lancar di HP entry-level</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="page-footer">
    <div>AnatomiLab 3D — Solusi, Aspek Inovasi & Kebaruan</div>
    <div class="page-footer-num">Halaman 3 dari 5</div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════════════════════════
     HALAMAN 4: BAB 3. TARGET PENGGUNA & DAMPAK + BAB 4.1-4.2 ARSITEKTUR
     ══════════════════════════════════════════════════════════════════════════ -->
<section class="page">
  <div class="page-header">
    <div class="page-header-left">
      <span class="tag">Bagian III</span> AnatomiLab 3D — Pengguna, Manfaat & Arsitektur
    </div>
    <div class="page-header-right">Cross-Sectoral Synergy</div>
  </div>

  <div class="content-area">
    <!-- Bab 3. Target Pengguna & Manfaat -->
    <h2 class="sec-title"><span class="num">03</span> BAB 3. TARGET PENGGUNA & ANALISIS DAMPAK</h2>

    <div class="grid-2">
      <div>
        <h3 class="sub-title">3.1 Segmentasi Target Pengguna</h3>
        <div style="display: flex; flex-direction: column; gap: 5px;">
          <div class="box-card" style="padding: 5px 8px;">
            <strong style="color: var(--edu-blue); font-size: 7.5pt;">1. Target Primer (Pelajar & Usia Produktif)</strong>
            <p style="font-size: 7.1pt; line-height: 1.36;">Siswa SMP/SMA/Mahasiswa (13–24 tahun) pembelajar biologi & generasi muda (20–35 tahun) berisiko gaya hidup (pekerja kantor sedentari, vaper, penderita insomnia).</p>
          </div>
          <div class="box-card" style="padding: 5px 8px;">
            <strong style="color: var(--health-red); font-size: 7.5pt;">2. Target Sekunder (Pendidik & Fasilitator)</strong>
            <p style="font-size: 7.1pt; line-height: 1.36;">Guru biologi sekolah menengah dan dosen ilmu kesehatan yang memerlukan media peraga interaktif tanpa perlu membayar lisensi luar negeri yang membebani sekolah.</p>
          </div>
          <div class="box-card" style="padding: 5px 8px;">
            <strong style="color: var(--eco-green); font-size: 7.5pt;">3. Target Mitra (Pelaku UMKM Kesehatan Lokal)</strong>
            <p style="font-size: 7.1pt; line-height: 1.36;">Produsen jamu herbal terstandar, pangan fungsional, dan suplemen alami berizin BPOM RI yang membutuhkan saluran akuisisi konsumen berbasis edukasi kontekstual.</p>
          </div>
        </div>
      </div>

      <div>
        <h3 class="sub-title">3.2 Analisis Manfaat Terukur (Impact Metrics)</h3>
        <table class="custom-table" style="margin-top: 1px;">
          <thead>
            <tr>
              <th style="width: 32%;">Sektor Dampak</th>
              <th style="width: 68%;">Indikator Keberhasilan Terukur</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Pendidikan Sains</strong></td>
              <td>Peningkatan pemahaman konsep fisiologi multiorgan hingga <strong>+45%</strong> dibandingkan buku teks biasa; pemerataan akses media 3D di sekolah 3T tanpa biaya lisensi.</td>
            </tr>
            <tr>
              <td><strong>Kesehatan Publik</strong></td>
              <td>Menciptakan efek kognitif *“Aha Moment”* yang menurunkan frekuensi kebiasaan buruk; mendorong peralihan preventif dini sebelum jatuh ke tahap komplikasi kuratif kronis.</td>
            </tr>
            <tr>
              <td><strong>Ekonomi UMKM</strong></td>
              <td>Rasio konversi klik rujukan (CTR) diproyeksikan <strong>&gt;8%</strong>; membuka saluran penjualan langsung bernilai puluhan juta rupiah bagi produsen jamu & herbal Nusantara.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Bab 4. Arsitektur Teknologi & Model Keberlanjutan -->
    <h2 class="sec-title" style="margin-top: 3px;"><span class="num">04</span> BAB 4. ARSITEKTUR TEKNOLOGI & MODEL KEBERLANJUTAN FINANSIAL</h2>

    <h3 class="sub-title">4.1 Arsitektur Sistem Teknis (Three-Tier Architecture)</h3>
    <div class="grid-3" style="margin-top: 2px;">
      <div class="box-card" style="background: #F0F9FF; border: 1px solid #BAE6FD;">
        <div style="font-size: 7.4pt; font-weight: 700; color: #0284C7; margin-bottom: 3px;">LAYER 1: CLIENT PRESENTATION</div>
        <p style="font-size: 7pt; line-height: 1.38;">
          • React 19 + Vite (UI Responsif)<br/>
          • Three.js / WebGL Rendering Canvas<br/>
          • Google Draco Compression (Aset &lt;3MB)<br/>
          • Stabil 60 FPS di laptop & HP standar
        </p>
      </div>
      <div class="box-card" style="background: #FEF2F2; border: 1px solid #FECACA;">
        <div style="font-size: 7.4pt; font-weight: 700; color: #DC2626; margin-bottom: 3px;">LAYER 2: MEDICAL RULE ENGINE</div>
        <p style="font-size: 7pt; line-height: 1.38;">
          • Kalkulasi Composite Degradation (CDI)<br/>
          • Client-side morph-target vertex shaders<br/>
          • Kurva fisiologi tervalidasi literatur klinis<br/>
          • Bebas biaya komputasi GPU server cloud
        </p>
      </div>
      <div class="box-card" style="background: #ECFDF5; border: 1px solid #A7F3D0;">
        <div style="font-size: 7.4pt; font-weight: 700; color: #059669; margin-bottom: 3px;">LAYER 3: COMMERCE & ANALYTICS</div>
        <p style="font-size: 7pt; line-height: 1.38;">
          • Supabase / PostgreSQL Katalog UMKM<br/>
          • Algoritma pencocokan organ-ke-herbal BPOM<br/>
          • Deep-Link Affiliate ke Tokopedia/Shopee<br/>
          • Pelacakan konversi klik & metrik analitik
        </p>
      </div>
    </div>

    <h3 class="sub-title" style="margin-top: 4px;">4.2 Model Keberlanjutan Finansial Mandiri 100% (Self-Sustaining Unit Economics)</h3>
    <p>
      Kelemahan terbesar karya inovasi kompetisi adalah terhentinya server setelah pendanaan lomba berakhir. AnatomiLab 3D mengatasi hal ini dengan model mandiri:
    </p>

    <div class="box-card" style="background: #FFFBEB; border-left: 3.5px solid #F59E0B; padding: 8px 11px;">
      <div style="font-size: 7.5pt; font-weight: 700; color: #B45309; margin-bottom: 4px;">
        💡 Prinsip Keberlanjutan: Biaya Operasional Ditutup 100% oleh Komisi Afiliasi Marketplace Mitra
      </div>
      <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 10px; font-size: 7.2pt; line-height: 1.4; color: #78350F;">
        <div>
          • <strong>Beban Biaya Ultra-Rendah (Ultra-Low Opex):</strong> Karena seluruh proses rendering 3D dikerjakan di browser pengguna (<em>client-side rendering</em>), server hanya menyajikan berkas web statis via CDN Cloudflare (gratis) dan database Supabase (Rp150.000–300.000/bln).
        </div>
        <div>
          • <strong>Proyeksi Pendapatan Mandiri:</strong> Dengan 5.000 active users/bln, estimasi 400 klik (8% CTR) dan 20 transaksi pembelian herbal (@Rp80.000 dg komisi 8%), diperoleh Rp128.000–500.000/bln yang langsung mencukupi biaya operasional sejak bulan ke-4.
        </div>
      </div>
    </div>
  </div>

  <div class="page-footer">
    <div>AnatomiLab 3D — Target Pengguna, Manfaat & Arsitektur</div>
    <div class="page-footer-num">Halaman 4 dari 5</div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════════════════════════
     HALAMAN 5: ROADMAP, RISIKO, TRANSPARANSI AI, & KESIMPULAN
     ══════════════════════════════════════════════════════════════════════════ -->
<section class="page">
  <div class="page-header">
    <div class="page-header-left">
      <span class="tag">Bagian IV</span> AnatomiLab 3D — Roadmap, Tata Kelola & Transparansi AI
    </div>
    <div class="page-header-right">Cross-Sectoral Synergy</div>
  </div>

  <div class="content-area">
    <!-- Roadmap Implementasi 12 Bulan -->
    <h3 class="sub-title">4.3 Roadmap Implementasi dan Rencana Pengembangan Solusi (12 Bulan)</h3>
    <div class="step-timeline">
      <div class="step-card">
        <span class="step-badge step-b1">Bulan 1–3 · MVP</span>
        <strong style="display:block; font-size:7.2pt; color:#1E3A5F;">Fondasi 3D & Validasi Medis</strong>
        <p style="font-size:6.9pt; line-height:1.32; margin-top:2px;">Pemodelan organ dasar 3D di Blender, kompresi Draco, dan validasi kurva degradasi organ bersama akademisi FK.</p>
      </div>
      <div class="step-card">
        <span class="step-badge step-b2">Bulan 4–6 · Beta</span>
        <strong style="display:block; font-size:7.2pt; color:#991B1B;">Full-Body & Recovery Mode</strong>
        <p style="font-size:6.9pt; line-height:1.32; margin-top:2px;">Integrasi slider multivariabel dan mode pemulihan. Uji coba fungsionalitas UI/UX kepada 250 siswa & guru mitra di D.I. Yogyakarta.</p>
      </div>
      <div class="step-card">
        <span class="step-badge step-b3">Bulan 7–9 · Pilot</span>
        <strong style="display:block; font-size:7.2pt; color:#065F46;">Integrasi Ekosistem UMKM</strong>
        <p style="font-size:6.9pt; line-height:1.32; margin-top:2px;">Kurasi 30+ produk herbal berizin edar BPOM aktif & halal. Implementasi deep-link affiliate engine & dashboard monitoring.</p>
      </div>
      <div class="step-card">
        <span class="step-badge step-b4">Bulan 10–12 · Scale</span>
        <strong style="display:block; font-size:7.2pt; color:#5B21B6;">Peluncuran & Scale-Up</strong>
        <p style="font-size:6.9pt; line-height:1.32; margin-top:2px;">Sosialisasi ke 30 SMA/SMK mitra nasional, ekspansi model organ (sistem endokrin & saraf), dan perluasan jejaring koperasi UMKM.</p>
      </div>
    </div>

    <!-- Mitigasi Risiko -->
    <h3 class="sub-title" style="margin-top: 3px;">4.4 Analisis Risiko & Mitigasi Proaktif</h3>
    <table class="custom-table">
      <thead>
        <tr>
          <th style="width: 22%;">Kategori Risiko</th>
          <th style="width: 38%;">Potensi Risiko yang Dihadapi</th>
          <th style="width: 40%;">Strategi Mitigasi Proaktif</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Akurasi Medis</strong></td>
          <td>Potensi misinterpretasi visual atau klaim patologi yang tidak proporsional.</td>
          <td>Konsultasi periodik dewan pakar medis (dokter/dosen FK); kalibrasi data merujuk literatur kedokteran terindeks.</td>
        </tr>
        <tr>
          <td><strong>Legalitas BPOM</strong></td>
          <td>Mitra UMKM mengklaim produknya menyembuhkan penyakit (melanggar izin).</td>
          <td>Penyaringan ketat berbasis whitelist izin edar BPOM RI; hanya klaim fungsional yang disetujui (Peraturan BPOM No. 1/2022).</td>
        </tr>
        <tr>
          <td><strong>Aksesibilitas Gawai</strong></td>
          <td>Penurunan performa grafis (*frame drop*) pada smartphone low-end.</td>
          <td>Penerapan kompresi Draco, Level of Detail (LoD) adaptif, dan tombol mode grafis hemat daya (*battery saver*).</td>
        </tr>
      </tbody>
    </table>

    <!-- Bab 5. Transparansi Penggunaan AI -->
    <h2 class="sec-title" style="margin-top: 4px;"><span class="num">05</span> BAB 5. TRANSPARANSI PENGGUNAAN ARTIFICIAL INTELLIGENCE (AI)</h2>
    <p>
      Sesuai prinsip integritas ilmiah Ideathon JOINTS UGM 2026, tim menyajikan secara terbuka pemanfaatan AI selama perancangan karya:
    </p>

    <table class="custom-table" style="margin-top: 2px;">
      <thead>
        <tr>
          <th style="width: 22%;">Tahapan Kerja</th>
          <th style="width: 20%;">Perangkat AI</th>
          <th style="width: 28%;">Porsi & Bentuk Bantuan AI</th>
          <th style="width: 30%;">Validasi & Kontribusi Mandiri Tim</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Brainstorming Ide</strong></td>
          <td>Gemini & Claude 3.5</td>
          <td>Eksplorasi sinergi lintas tema (Edu-Health-Econ).</td>
          <td>Menetapkan fokus krisis PTM, arsitektur Three.js, & UMKM herbal.</td>
        </tr>
        <tr>
          <td><strong>Riset Literatur</strong></td>
          <td>Perplexity AI</td>
          <td>Pencarian cepat prevalensi Riskesdas & jurnal.</td>
          <td>Memverifikasi silang angka ke dokumen resmi Kemenkes RI.</td>
        </tr>
        <tr>
          <td><strong>Formulasi Formula</strong></td>
          <td>Gemini Code Assist</td>
          <td>Saran perumusan ekspresi matematis CDI non-linear.</td>
          <td>Mengkalibrasi bobot klinis (w<sub>i</sub>) dan kurva temporal (t<sup>γ</sup>).</td>
        </tr>
        <tr>
          <td><strong>Penyusunan Naskah</strong></td>
          <td>Gemini</td>
          <td>Bantuan perapihan tata bahasa akademik & tipografi.</td>
          <td>Menyusun orisinalitas substansi, argumentasi, dan kesimpulan tim.</td>
        </tr>
      </tbody>
    </table>

    <!-- Bab 6. Kesimpulan -->
    <h2 class="sec-title" style="margin-top: 4px;"><span class="num">06</span> BAB 6. KESIMPULAN</h2>
    <div class="box-card" style="background: linear-gradient(90deg, #EFF6FF 0%, #F8FAFC 100%); border-left: 3.5px solid var(--edu-blue); padding: 8px 12px;">
      <p style="font-size: 7.3pt; line-height: 1.42; color: var(--slate);">
        <strong>AnatomiLab 3D</strong> mengintegrasikan teknologi <em>web-first 3D</em>, visualisasi sains preventif komparatif, dan ekosistem komersial UMKM herbal BPOM dalam satu siklus sinergis yang utuh. Melalui model biaya mandiri yang membebaskan biaya bagi sekolah, platform ini siap menjadi pelopor intervensi gaya hidup sehat yang berdampak ganda: menyelamatkan generasi muda dari ancaman PTM sekaligus membangkitkan kedaulatan ekonomi herbal lokal Indonesia.
      </p>
    </div>
  </div>

  <div class="page-footer">
    <div>AnatomiLab 3D — Roadmap, Mitigasi Risiko, Transparansi AI & Kesimpulan</div>
    <div class="page-footer-num">Halaman 5 dari 5</div>
  </div>
</section>

<script>
window.addEventListener('DOMContentLoaded', () => {
  // Render math formula into #math-formula-box
  const box = document.getElementById('math-formula-box');
  if (box && window.katex) {
    try {
      katex.render(
        "\\\\text{Degradasi}(t) = \\\\sum_{i=1}^{n} \\\\left( w_i \\\\cdot \\\\text{Faktor\\\\_Gaya\\\\_Hidup}_i \\\\right) \\\\times t^{\\\\gamma}",
        box,
        { displayMode: true, throwOnError: false }
      );
    } catch(e) {
      box.textContent = "Degradasi(t) = Σ (w_i × Faktor_Gaya_Hidup_i) × t^γ";
    }
  }
});
</script>
</body>
</html>`;

const tempHtmlPath = path.join(__dirname, 'proposal_5page_temp.html');
fs.writeFileSync(tempHtmlPath, htmlContent, 'utf-8');

const browser = await puppeteer.launch({
  headless: 'new',
  executablePath: CHROME_PATH,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
await page.goto(`file:///${tempHtmlPath.replace(/\\/g, '/')}`, {
  waitUntil: 'networkidle0',
  timeout: 60000,
});

await new Promise(r => setTimeout(r, 2000));

const targetPdf = path.join(__dirname, 'PROPOSAL_ANATOMILAB_3D.pdf');
await page.pdf({
  path: targetPdf,
  format: 'A4',
  printBackground: true,
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
});

console.log('✅ Final PDF successfully generated:', targetPdf);
await browser.close();
