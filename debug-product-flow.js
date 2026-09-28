const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto('https://www.kapruka.com/shops/customerAccounts/accountLogin.jsp');
    await page.locator('input[name="email"]').fill('veeryadav861997@gmail.com');
    await page.locator('input[name="password"]').fill('ashwini8697');
    await page.locator('input[type="submit"]').click();
    await page.waitForTimeout(4000);
    console.log('AFTER_LOGIN_URL=' + page.url());

    const search = page.getByRole('textbox', { name: 'SEARCH PRODUCTS..' });
    await search.fill('cake');
    await page.getByRole('button', { name: 'online search' }).click();
    await page.waitForTimeout(5000);
    console.log('AFTER_SEARCH_URL=' + page.url());

    const firstResult = page.locator('a[href*="/buyonline/"]').first();
    console.log('FIRST_RESULT_COUNT=' + await firstResult.count());
    await firstResult.click();
    await page.waitForTimeout(5000);
    console.log('AFTER_PRODUCT_URL=' + page.url());

    const addToCart = page.getByRole('button', { name: /add to cart/i });
    console.log('ADD_TO_CART_COUNT=' + await addToCart.count());
    await addToCart.click();
    await page.waitForTimeout(3000);
    console.log('AFTER_ADD_TO_CART_URL=' + page.url());
    console.log('AFTER_ADD_TO_CART_TITLE=' + await page.title());

    const viewCart = page.getByRole('link', { name: /view cart/i });
    console.log('VIEW_CART_COUNT=' + await viewCart.count());
    console.log('VIEW_CART_VISIBLE=' + await viewCart.isVisible().catch(() => 'ERR'));
  } catch (e) {
    console.error('SCRIPT_ERROR=' + e.message);
    console.error(e.stack);
  } finally {
    await browser.close();
  }
})();
