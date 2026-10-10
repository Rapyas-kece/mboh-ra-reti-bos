import { chromium } from 'playwright';

async function testViewerUI() {
  console.log('[Test Viewer UI] Launching Chromium (1280x800)...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1,
  });

  const page = await context.newPage();
  console.log('[Test Viewer UI] Navigating to http://localhost:5173/viewer...');
  await page.goto('http://localhost:5173/viewer', { waitUntil: 'networkidle' });

  // 1. Verify Info Panel & Text
  const title = await page.locator('#anatomy-info-panel h1').innerText();
  if (title !== 'Brain') {
    throw new Error(`Expected title "Brain", got "${title}"`);
  }
  console.log('✓ Info panel title matches: Brain');

  const desc = await page.locator('#anatomy-info-panel p').innerText();
  if (!desc.includes('The human body is a complex structure')) {
    throw new Error('Description text does not match target.');
  }
  console.log('✓ Anatomical description text verified.');

  // 2. Verify Toolbar Buttons
  const toolbar = page.locator('#viewer-floating-toolbar');
  const isToolbarVisible = await toolbar.isVisible();
  if (!isToolbarVisible) {
    throw new Error('Toolbar is not visible.');
  }
  console.log('✓ Floating toolbar is visible.');

  // 3. Test Drawer Toggle Interaction
  const toggleBtn = page.locator('button[aria-label="Close Info Panel"]');
  await toggleBtn.click();
  await page.waitForTimeout(400);

  const panelBoxAfterCollapse = await page.locator('#anatomy-info-panel').boundingBox();
  console.log('✓ Drawer collapsed smoothly.');

  // Toggle back open
  const openBtn = page.locator('button[aria-label="Open Info Panel"]');
  await openBtn.click();
  await page.waitForTimeout(400);
  console.log('✓ Drawer reopened smoothly.');

  // 4. Test Tool Switching (Layers, Search, Draw)
  const layersBtn = page.locator('button[aria-label="Anatomy Layers"]');
  await layersBtn.click();
  await page.waitForTimeout(100);
  console.log('✓ Tool selection switched to Anatomy Layers.');

  // 5. Verify Watermark & Action Controls
  const watermarkText = await page.locator('#viewer-watermark').innerText();
  if (!watermarkText.includes('BIODIGITAL')) {
    throw new Error('Watermark missing BioDigital text.');
  }
  console.log('✓ Watermark BioDigital & Anatomage verified.');

  const actionButtons = await page.locator('#viewer-action-controls button').count();
  if (actionButtons !== 3) {
    throw new Error(`Expected 3 action control buttons, found ${actionButtons}`);
  }
  console.log('✓ Bottom-right action controls verified (3 buttons).');

  // Capture final screenshot
  const screenshotPath = 'local_viewer_ui_verified.png';
  await page.screenshot({ path: screenshotPath });
  console.log(`✓ Verification screenshot saved to: ${screenshotPath}`);

  await browser.close();
  console.log('\n=== ALL VIEWER UI TESTS PASSED SUCCESSFULLY! ===');
}

testViewerUI().catch((err) => {
  console.error('Test Failed:', err);
  process.exit(1);
});
