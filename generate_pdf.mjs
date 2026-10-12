import puppeteer from 'puppeteer-core';
import { marked } from 'marked';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// System Chrome path (already installed)
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

// ── Read Markdown ──────────────────────────────────────────────────────────────
const mdPath = path.join(__dirname, 'PROPOSAL_ANATOMILAB_3D.md');
let mdContent = fs.readFileSync(mdPath, 'utf-8');

// Pre-process: extract LaTeX blocks before marked touches them
// Replace $$ ... $$ and $ ... $ with placeholders
const mathBlocks = [];
mdContent = mdContent.replace(/\$\$([^$]+)\$\$/gs, (_, tex) => {
  const idx = mathBlocks.length;
  mathBlocks.push({ type: 'block', tex: tex.trim() });
  return `MATHBLOCK_${idx}_MATHBLOCK`;
});
mdContent = mdContent.replace(/\$([^$\n]+)\$/g, (_, tex) => {
  const idx = mathBlocks.length;
  mathBlocks.push({ type: 'inline', tex: tex.trim() });
  return `MATHINLINE_${idx}_MATHINLINE`;
});

// ── Configure marked ───────────────────────────────────────────────────────────
marked.setOptions({ breaks: true, gfm: true });

let htmlBody = marked.parse(mdContent);

// Restore math placeholders as KaTeX data attributes (rendered client-side)
htmlBody = htmlBody.replace(/MATHBLOCK_(\d+)_MATHBLOCK/g, (_, idx) => {
  const { tex } = mathBlocks[parseInt(idx)];
  return `<div class="math-block" data-tex="${escapeAttr(tex)}"></div>`;
});
htmlBody = htmlBody.replace(/MATHINLINE_(\d+)_MATHINLINE/g, (_, idx) => {
  const { tex } = mathBlocks[parseInt(idx)];
  return `<span class="math-inline" data-tex="${escapeAttr(tex)}"></span>`;
});

function escapeAttr(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ── Full HTML Template ─────────────────────────────────────────────────────────
const fullHtml = `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Proposal AnatomiLab 3D — JOINTS UGM 2026</title>

<!-- KaTeX for math rendering -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"/>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"
  onload="renderMathInElement(document.body)"></script>

<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet"/>

<style>
  /* ── CSS Variables ── */
  :root {
    --edu-blue:    #1D4ED8;
    --edu-light:   #EFF6FF;
    --health-red:  #B91C1C;
    --health-light:#FEF2F2;
    --eco-green:   #047857;
    --eco-light:   #ECFDF5;
    --accent:      #7C3AED;
    --text:        #111827;
    --muted:       #6B7280;
    --border:      #E5E7EB;
    --bg:          #FFFFFF;
    --code-bg:     #F8FAFC;
  }

  /* ── Reset & Base ── */
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { font-size: 10.5pt; }

  body {
    font-family: 'Inter', 'Segoe UI', sans-serif;
    color: var(--text);
    background: var(--bg);
    line-height: 1.75;
    padding: 0;
    margin: 0;
  }

  /* ── Cover Page ── */
  .cover-page {
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(135deg, #0F172A 0%, #1E293B 40%, #1D4ED8 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 80px;
    page-break-after: always;
    position: relative;
    overflow: hidden;
  }

  .cover-page::before {
    content: '';
    position: absolute;
    top: -100px; right: -100px;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%);
    border-radius: 50%;
  }

  .cover-page::after {
    content: '';
    position: absolute;
    bottom: -80px; left: -80px;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(4,120,87,0.25) 0%, transparent 70%);
    border-radius: 50%;
  }

  .cover-badge {
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    color: #94A3B8;
    font-size: 9pt;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 6px 20px;
    border-radius: 100px;
    margin-bottom: 32px;
    backdrop-filter: blur(10px);
    position: relative; z-index: 1;
  }

  .cover-title {
    font-size: 32pt;
    font-weight: 800;
    color: #FFFFFF;
    text-align: center;
    line-height: 1.2;
    margin-bottom: 8px;
    position: relative; z-index: 1;
    letter-spacing: -1px;
  }

  .cover-title span {
    background: linear-gradient(90deg, #60A5FA, #A78BFA, #34D399);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .cover-subtitle {
    font-size: 11pt;
    color: #94A3B8;
    text-align: center;
    max-width: 600px;
    margin: 20px auto 48px;
    line-height: 1.7;
    position: relative; z-index: 1;
  }

  .cover-pillars {
    display: flex;
    gap: 16px;
    margin-bottom: 60px;
    position: relative; z-index: 1;
  }

  .cover-pillar {
    padding: 14px 28px;
    border-radius: 12px;
    font-size: 9.5pt;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
  .pillar-edu   { background: rgba(29,78,216,0.4);  border: 1px solid rgba(96,165,250,0.5);  color: #93C5FD; }
  .pillar-health{ background: rgba(185,28,28,0.35); border: 1px solid rgba(252,165,165,0.4); color: #FCA5A5; }
  .pillar-eco   { background: rgba(4,120,87,0.35);  border: 1px solid rgba(52,211,153,0.4);  color: #6EE7B7; }

  .cover-meta {
    display: flex;
    gap: 40px;
    position: relative; z-index: 1;
    border-top: 1px solid rgba(255,255,255,0.1);
    padding-top: 28px;
    width: 100%;
    justify-content: center;
  }

  .cover-meta-item {
    text-align: center;
  }

  .cover-meta-label {
    font-size: 8pt;
    color: #64748B;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-bottom: 4px;
  }

  .cover-meta-value {
    font-size: 10pt;
    color: #CBD5E1;
    font-weight: 500;
  }

  /* ── Main Content ── */
  .main-content {
    max-width: 720px;
    margin: 0 auto;
    padding: 48px 40px 64px;
  }

  /* ── Headings ── */
  h1 {
    font-size: 22pt;
    font-weight: 800;
    color: #0F172A;
    margin-bottom: 8px;
    margin-top: 48px;
    letter-spacing: -0.5px;
    border-bottom: 3px solid var(--edu-blue);
    padding-bottom: 12px;
  }
  h1:first-child { margin-top: 0; }

  h2 {
    font-size: 14pt;
    font-weight: 700;
    color: #1E3A5F;
    margin-top: 40px;
    margin-bottom: 12px;
    padding: 10px 16px;
    background: linear-gradient(90deg, var(--edu-light), transparent);
    border-left: 4px solid var(--edu-blue);
    border-radius: 0 8px 8px 0;
  }

  h3 {
    font-size: 11.5pt;
    font-weight: 700;
    color: #1E293B;
    margin-top: 28px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  h3::before {
    content: '▸';
    color: var(--edu-blue);
    font-size: 9pt;
  }

  h4 {
    font-size: 10.5pt;
    font-weight: 600;
    color: #374151;
    margin-top: 20px;
    margin-bottom: 8px;
    padding: 6px 12px;
    border-left: 3px solid var(--accent);
    background: rgba(124,58,237,0.04);
    border-radius: 0 6px 6px 0;
  }

  /* ── Paragraphs ── */
  p { margin-bottom: 12px; text-align: justify; }

  /* ── Lists ── */
  ul, ol {
    padding-left: 24px;
    margin-bottom: 12px;
  }
  li {
    margin-bottom: 6px;
    line-height: 1.65;
  }
  li > ul, li > ol { margin-top: 6px; margin-bottom: 4px; }

  /* ── Strong / Em ── */
  strong { font-weight: 700; color: #0F172A; }
  em     { font-style: italic; color: #374151; }

  /* ── Code Blocks ── */
  pre {
    background: #0F172A;
    border-radius: 10px;
    padding: 20px 24px;
    margin: 16px 0;
    overflow-x: auto;
    border: 1px solid #1E293B;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  pre code {
    font-family: 'Fira Code', 'Courier New', monospace;
    font-size: 8pt;
    color: #E2E8F0;
    background: none;
    padding: 0;
    border: none;
    white-space: pre;
    line-height: 1.6;
  }

  code {
    font-family: 'Fira Code', 'Courier New', monospace;
    font-size: 8.5pt;
    background: var(--code-bg);
    border: 1px solid var(--border);
    color: #7C3AED;
    padding: 2px 6px;
    border-radius: 4px;
  }

  /* ── Tables ── */
  .table-wrapper {
    overflow-x: auto;
    margin: 20px 0;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08);
    border: 1px solid var(--border);
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 9pt;
  }
  thead tr {
    background: linear-gradient(90deg, #1E3A5F, #1D4ED8);
    color: white;
  }
  thead th {
    padding: 12px 14px;
    text-align: left;
    font-weight: 600;
    font-size: 8.5pt;
    letter-spacing: 0.3px;
    border: none;
  }
  tbody tr:nth-child(even) { background: #F8FAFC; }
  tbody tr:nth-child(odd)  { background: #FFFFFF; }
  tbody tr:hover           { background: var(--edu-light); }
  tbody td {
    padding: 10px 14px;
    border-bottom: 1px solid var(--border);
    vertical-align: top;
    line-height: 1.55;
  }
  tbody td:first-child { font-weight: 600; color: #1E293B; }

  /* ── Math ── */
  .math-block {
    text-align: center;
    padding: 20px;
    margin: 20px 0;
    background: linear-gradient(135deg, #F0F9FF, #EFF6FF);
    border: 1px solid #BFDBFE;
    border-radius: 12px;
    font-size: 11pt;
    overflow-x: auto;
  }
  .math-inline { display: inline; }

  /* ── Blockquotes ── */
  blockquote {
    margin: 16px 0;
    padding: 14px 20px;
    border-left: 4px solid var(--eco-green);
    background: var(--eco-light);
    border-radius: 0 8px 8px 0;
    font-size: 9.5pt;
    color: #065F46;
  }
  blockquote p { margin: 0; color: #065F46; }
  blockquote strong { color: #064E3B; }

  /* ── Horizontal Rule ── */
  hr {
    border: none;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--border), transparent);
    margin: 32px 0;
  }

  /* ── Pillar Cards (for headers) ── */
  .pilar-edu    { border-left-color: var(--edu-blue)   !important; background: var(--edu-light)   !important; }
  .pilar-health { border-left-color: var(--health-red) !important; background: var(--health-light) !important; }
  .pilar-eco    { border-left-color: var(--eco-green)  !important; background: var(--eco-light)    !important; }

  /* ── Footer ── */
  .footer {
    text-align: center;
    padding: 24px 0 16px;
    color: var(--muted);
    font-size: 8pt;
    border-top: 1px solid var(--border);
    margin-top: 48px;
  }

  /* ── Page Breaks ── */
  @media print {
    h2 { page-break-before: auto; }
    pre, table, blockquote { page-break-inside: avoid; }
    .cover-page { page-break-after: always; }
  }
</style>
</head>
<body>

<!-- ═══════════════ COVER PAGE ═══════════════ -->
<div class="cover-page">
  <div class="cover-badge">Ideathon JOINTS UGM 2026 — Cross-Sectoral Synergy</div>
  <div class="cover-title">Anatomi<span>Lab 3D</span></div>
  <div class="cover-subtitle">
    Platform Edukasi Anatomi Interaktif Berbasis Web-First 3D Rendering,
    Simulasi Dampak Gaya Hidup Multiorgan (Full-Body Time-Lapse),
    dan Integrasi Ekonomi Preventif Melalui Ekosistem UMKM Kesehatan Lokal
  </div>
  <div class="cover-pillars">
    <div class="cover-pillar pillar-edu">🎓 Education</div>
    <div class="cover-pillar pillar-health">🫀 Healthcare</div>
    <div class="cover-pillar pillar-eco">🌿 Economy</div>
  </div>
  <div class="cover-meta">
    <div class="cover-meta-item">
      <div class="cover-meta-label">Kategori</div>
      <div class="cover-meta-value">Ideathon JOINTS UGM 2026</div>
    </div>
    <div class="cover-meta-item">
      <div class="cover-meta-label">Tema</div>
      <div class="cover-meta-value">Cross-Sectoral Synergy</div>
    </div>
    <div class="cover-meta-item">
      <div class="cover-meta-label">Teknologi</div>
      <div class="cover-meta-value">WebGL · Three.js · React · Supabase</div>
    </div>
    <div class="cover-meta-item">
      <div class="cover-meta-label">Tahun</div>
      <div class="cover-meta-value">2026</div>
    </div>
  </div>
</div>

<!-- ═══════════════ PROPOSAL BODY ═══════════════ -->
<div class="main-content">
${htmlBody}

<div class="footer">
  AnatomiLab 3D — Ideathon JOINTS UGM 2026 &nbsp;|&nbsp; Sehatkan Generasi, Berdayakan Negeri
</div>
</div>

<script>
// Render KaTeX math after page loads
document.addEventListener('DOMContentLoaded', () => {
  // Block math
  document.querySelectorAll('.math-block').forEach(el => {
    try {
      katex.render(el.dataset.tex, el, { displayMode: true, throwOnError: false });
    } catch(e) { el.textContent = el.dataset.tex; }
  });
  // Inline math
  document.querySelectorAll('.math-inline').forEach(el => {
    try {
      katex.render(el.dataset.tex, el, { displayMode: false, throwOnError: false });
    } catch(e) { el.textContent = el.dataset.tex; }
  });

  // Wrap tables in wrapper div for styling
  document.querySelectorAll('table').forEach(t => {
    const wrapper = document.createElement('div');
    wrapper.className = 'table-wrapper';
    t.parentNode.insertBefore(wrapper, t);
    wrapper.appendChild(t);
  });

  // Color h4 pillar headers
  document.querySelectorAll('h4').forEach(h => {
    const txt = h.textContent.toLowerCase();
    if (txt.includes('education') || txt.includes('pilar a') || txt.includes('pilar edu'))
      h.classList.add('pilar-edu');
    else if (txt.includes('healthcare') || txt.includes('pilar b') || txt.includes('pilar health'))
      h.classList.add('pilar-health');
    else if (txt.includes('economy') || txt.includes('pilar c') || txt.includes('pilar eco'))
      h.classList.add('pilar-eco');
  });
});
</script>
</body>
</html>`;

// ── Write temp HTML ────────────────────────────────────────────────────────────
const htmlPath = path.join(__dirname, 'proposal_temp.html');
fs.writeFileSync(htmlPath, fullHtml, 'utf-8');
console.log('✅ HTML generated:', htmlPath);

// ── Launch Puppeteer & print PDF ──────────────────────────────────────────────
console.log('🚀 Launching Puppeteer...');
const browser = await puppeteer.launch({
  headless: 'new',
  executablePath: CHROME_PATH,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
});

const page = await browser.newPage();

// Load local HTML with file:// to allow local resource access + CDN
await page.goto(`file:///${htmlPath.replace(/\\/g, '/')}`, {
  waitUntil: 'networkidle0',
  timeout: 60000,
});

// Wait for KaTeX to render
await page.waitForFunction(() => {
  return document.querySelectorAll('.math-block[data-tex]').length === 0 ||
         document.querySelector('.katex') !== null ||
         true; // fallback: just wait networkidle
}, { timeout: 10000 }).catch(() => {});

// Extra wait for fonts & math
await new Promise(r => setTimeout(r, 2500));

const pdfPath = path.join(__dirname, 'PROPOSAL_ANATOMILAB_3D.pdf');
await page.pdf({
  path: pdfPath,
  format: 'A4',
  margin: { top: '15mm', right: '15mm', bottom: '18mm', left: '15mm' },
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate: `<div style="font-size:7pt; font-family:'Inter',sans-serif; color:#9CA3AF; width:100%; text-align:center; padding-top:4px;">
    AnatomiLab 3D — Proposal Ideathon JOINTS UGM 2026
  </div>`,
  footerTemplate: `<div style="font-size:7pt; font-family:'Inter',sans-serif; color:#9CA3AF; width:100%; text-align:center; padding-bottom:4px;">
    Halaman <span class="pageNumber"></span> dari <span class="totalPages"></span>
    &nbsp;|&nbsp; Rahasia — Hanya untuk Keperluan Kompetisi
  </div>`,
});

await browser.close();

// Cleanup temp HTML
fs.unlinkSync(htmlPath);

const stats = fs.statSync(pdfPath);
console.log(`\n✅ PDF berhasil dibuat!`);
console.log(`📄 File : ${pdfPath}`);
console.log(`📦 Ukuran: ${(stats.size / 1024).toFixed(1)} KB`);
