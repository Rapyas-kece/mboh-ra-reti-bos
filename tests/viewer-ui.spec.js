import { test, expect } from '@playwright/test';

test.describe('BioDigital 1:1 UI Viewer Regression Suite', () => {
  test('Verify /viewer UI shell structure, toolbar, and drawer interactions', async ({ page }) => {
    await page.goto('/viewer', { waitUntil: 'networkidle' });

    // 1. Verify Left Info Panel exists and contains title
    const infoPanel = page.locator('#anatomy-info-panel');
    await expect(infoPanel).toBeVisible();
    await expect(infoPanel.locator('h1')).toHaveText('Brain');

    // 2. Verify Toolbar exists and has 5 tool buttons
    const toolbar = page.locator('#viewer-floating-toolbar');
    await expect(toolbar).toBeVisible();

    // 3. Test Drawer collapse and expand interaction
    const toggleBtn = toolbar.locator('button[aria-label*="Info Panel"]');
    await expect(toggleBtn).toBeVisible();
    
    // Click collapse
    await toggleBtn.click();
    await page.waitForTimeout(400);
    // Info panel should translate off-screen
    await expect(infoPanel).toHaveCSS('transform', 'matrix(1, 0, 0, 1, -320, 0)');

    // Click expand
    await toggleBtn.click();
    await page.waitForTimeout(400);
    await expect(infoPanel).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, 0)');

    // 4. Verify Watermark & Action Controls
    const watermark = page.locator('#viewer-watermark');
    await expect(watermark).toBeVisible();
    await expect(watermark).toContainText('BIODIGITAL');

    const actionControls = page.locator('#viewer-action-controls');
    await expect(actionControls).toBeVisible();
    await expect(actionControls.locator('button')).toHaveCount(3);
  });
});
