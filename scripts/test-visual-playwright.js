import { chromium } from 'playwright';
import fs from 'fs';
import { execSync } from 'child_process';

async function runVisualTest() {
  console.log('[Playwright Test] Launching Chromium (1852x997)...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1852, height: 997 },
    deviceScaleFactor: 1,
  });

  const page = await context.newPage();
  console.log('[Playwright Test] Navigating to http://localhost:5173/dashboard-2...');
  await page.goto('http://localhost:5173/dashboard-2', { waitUntil: 'networkidle' });

  // Stabilize fonts & animations
  await page.evaluate(async () => {
    await document.fonts.ready;
    window.scrollTo(0, 200);
    await new Promise((r) => setTimeout(r, 400));
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });

  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-play-state: paused !important;
        transition: none !important;
      }
    `,
  });

  const screenshotPath = '/tmp/playwright_current_dashboard2.png';
  await page.screenshot({ path: screenshotPath });
  console.log(`[Playwright Test] Screenshot captured to: ${screenshotPath}`);
  await browser.close();

  // Python pixel diff analysis
  console.log('[Playwright Test] Running diff cluster analysis...');
  const pyCode = `
from PIL import Image
import numpy as np

target = Image.open('tests/visual.spec.js-snapshots/target.png')
local = Image.open('/tmp/playwright_current_dashboard2.png')

t_arr = np.array(target)[:, :, :3].astype(np.float32)
l_arr = np.array(local)[:, :, :3].astype(np.float32)

diff = np.abs(t_arr - l_arr)
mean_diff = diff.mean()
match_35 = (diff.max(axis=2) < 35).mean() * 100

print(f'=== PLAYWRIGHT VISUAL TEST RESULTS ===')
print(f'Mean pixel error: {mean_diff:.2f} / 255')
print(f'Overall Match Rate: {match_35:.2f}%')

# Subregion breakdown
top_match = (diff[:69, :, :].max(axis=2) < 35).mean() * 100
sb_match = (diff[69:, :295, :].max(axis=2) < 35).mean() * 100
tb_match = (diff[69:225, 295:, :].max(axis=2) < 35).mean() * 100
cards_match = (diff[225:, 295:, :].max(axis=2) < 35).mean() * 100

print(f'Top Header Match:  {top_match:.2f}%')
print(f'Sidebar Match:     {sb_match:.2f}%')
print(f'Toolbar Match:     {tb_match:.2f}%')
print(f'Cards Grid Match:  {cards_match:.2f}%')
`;

  execSync(`python3 -c "${pyCode}"`, { stdio: 'inherit' });
}

runVisualTest().catch(console.error);
