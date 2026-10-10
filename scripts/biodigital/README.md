# BioDigital Regional Assets Downloader & Catalog

Folder ini disiapkan agar Anda bisa memilih, melihat daftar lengkap, atau mendownload aset placeholder dari katalog **BioDigital Regional Anatomy** (`categoryId=regional`) sesuai kebutuhan.

---

### Isi File di Folder Ini:

1. **[`catalog.json`](file:///home/rayhan/Windows-D/project/ideathon-new/scripts/biodigital/catalog.json)**
   * Berisi metadata lengkap dari **107 modul** BioDigital:
     * `title`: Nama organ / struktur
     * `suggestedFilename`: Rekomendasi nama file lokal (misal: `heart.jpg`, `lungs.jpg`)
     * `thumbnailUrl`: Direct URL gambar preview (JPG ringan, ~10-25 KB)
     * `embedUrl`: URL 3D interactive embed BioDigital
     * `description`: Penjelasan anatomis
     * `tags`: Kategori anatomi & spesialisasi medis

2. **[`urls.txt`](file:///home/rayhan/Windows-D/project/ideathon-new/scripts/biodigital/urls.txt)**
   * Format sederhana tab-separated: `<url>\t<filename>` untuk 107 gambar.
   * Cocok untuk scripting manual atau `wget` / `curl`.

3. **[`download_all.sh`](file:///home/rayhan/Windows-D/project/ideathon-new/scripts/biodigital/download_all.sh)**
   * Script Bash siap pakai jika sewaktu-waktu Anda ingin mendownload semua 107 gambar sekaligus ke `public/assets/biodigital/`.

---

### Cara Penggunaan:

#### Opsi A: Download Satuan (Manual / Sesuai Pilihan)
Buka [`catalog.json`](file:///home/rayhan/Windows-D/project/ideathon-new/scripts/biodigital/catalog.json) atau [`urls.txt`](file:///home/rayhan/Windows-D/project/ideathon-new/scripts/biodigital/urls.txt), pilih URL yang diinginkan, lalu download ke `public/assets/biodigital/`:
```bash
curl -s "<URL_GAMBAR>" -o "public/assets/biodigital/<nama_file>.jpg"
```

#### Opsi B: Download Semua Sekaligus
Cukup jalankan script bash:
```bash
./scripts/biodigital/download_all.sh
```
File akan otomatis tersimpan rapi di folder `public/assets/biodigital/`.
