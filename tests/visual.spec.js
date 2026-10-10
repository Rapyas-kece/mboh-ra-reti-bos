import { test, expect } from '@playwright/test';

test.describe('BioDigital 1:1 Visual Regression Suite', () => {
  test('Verify /dashboard-2 matches target baseline', async ({ page }) => {
    await page.goto('/dashboard-2', { waitUntil: 'networkidle' });

    // Wait for fonts & assets
    await page.evaluate(async () => {
      await document.fonts.ready;
      window.scrollTo(0, 300);
      await new Promise((r) => setTimeout(r, 500));
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 500));
    });

    // Freeze animations
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-play-state: paused !important;
          transition: none !important;
        }
      `,
    });

    // Compare with baseline
    await expect(page).toHaveScreenshot('target.png', {
      maxDiffPixelRatio: 0.05,
      threshold: 0.2,
      animations: 'disabled',
    });
  });
});
