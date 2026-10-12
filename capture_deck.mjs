import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const browser = await puppeteer.launch({
  headless: 'new',
  executablePath: CHROME_PATH,
  args: ['--no-sandbox']
});

const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
await page.goto('file:///C:/Users/LENOVO/.gemini/antigravity-ide/scratch/mboh-ra-reti-bos/pitch_deck_temp.html', { waitUntil: 'networkidle0' });

const artifactDir = 'C:\\Users\\LENOVO\\.gemini\\antigravity-ide\\brain\\2fba31e4-a29f-4e9f-b706-23dec28d9fb3';
const slides = await page.$$('.slide');

for (let i = 0; i < slides.length; i++) {
  const outPath = path.join(artifactDir, `slide_${i + 1}_preview.png`);
  await slides[i].screenshot({ path: outPath });
  console.log(`Saved slide ${i + 1}`);
}

await browser.close();
