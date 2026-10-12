import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const browser = await puppeteer.launch({
  headless: 'new',
  executablePath: CHROME_PATH,
  args: ['--no-sandbox']
});

const page = await browser.newPage();
await page.setViewport({ width: 1400, height: 1800, deviceScaleFactor: 1.5 });
await page.goto('file:///C:/Users/LENOVO/.gemini/antigravity-ide/scratch/mboh-ra-reti-bos/proposal_5page_temp.html', { waitUntil: 'networkidle0' });

const pages = await page.$$('.page');
console.log('Found .page elements:', pages.length);

const artifactDir = 'C:\\Users\\LENOVO\\.gemini\\antigravity-ide\\brain\\2fba31e4-a29f-4e9f-b706-23dec28d9fb3';
for (let i = 0; i < pages.length; i++) {
  const p = pages[i];
  const outPath = path.join(artifactDir, `page_${i + 1}_preview.png`);
  await p.screenshot({ path: outPath });
  console.log(`Saved page ${i + 1} to ${outPath}`);
}

await browser.close();
