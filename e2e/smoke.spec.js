import { test, expect } from '@playwright/test';

// Skip the 4-second splash, like a returning visitor (harmless if you don't use that script)
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('splashSeen', '1'));
});

// The header and tabs hydrate after the page loads, so retry until the click takes effect
async function clickUntil(locator, check) {
  await expect(async () => {
    await locator.click();
    await check();
  }).toPass({ timeout: 20_000 });
}

test('home page renders its sections', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Fernando Vazquez');
  for (const name of ['About', 'Experience', 'Contact']) {
    await expect(page.getByRole('heading', { name, exact: true })).toBeAttached();
  }
  await expect(page.getByRole('heading', { name: /^Projects/ })).toBeAttached();
});

test('resume and favicon are served', async ({ request }) => {
  const pdf = await request.get('/Vazquez_Fernando.pdf');
  expect(pdf.ok()).toBeTruthy();
  expect(pdf.headers()['content-type']).toContain('pdf');
  expect((await request.get('/favicon.svg')).ok()).toBeTruthy();
});

test('experience tabs switch', async ({ page }) => {
  await page.goto('/');
  const nisum = page.getByRole('tab', { name: 'Nisum' });
  await clickUntil(nisum, () =>
    expect(nisum).toHaveAttribute('aria-selected', 'true', { timeout: 1000 }),
  );
  await expect(page.getByRole('tabpanel')).toContainText('DevOps Engineer, Nisum');
});

test('burger opens and closes the menu', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile only');
  await page.goto('/');
  const burger = page.getByRole('button', { name: 'Menu' });
  const menu = page.locator('#menu');

  await clickUntil(burger, () => expect(burger).toHaveAttribute('aria-expanded', 'true'));
  await expect(menu.getByRole('link', { name: 'About' })).toBeInViewport();

  // Playwright refuses to click a covered element, so this fails if the panel hides the burger
  await burger.click();
  await expect(burger).toHaveAttribute('aria-expanded', 'false');
  await expect(menu).toHaveAttribute('data-open', 'false');
});

test('no horizontal scrolling on mobile', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile only');
  await page.goto('/');
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});
