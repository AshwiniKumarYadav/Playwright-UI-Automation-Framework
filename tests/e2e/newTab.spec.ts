import { test, expect } from '@playwright/test';

test('Handle new tab', async ({ page, context }) => {

    await page.goto('https://the-internet.herokuapp.com/windows');

    // Wait for new tab and click the link
    const [newTab] = await Promise.all([
        context.waitForEvent('page'),
        page.getByText('Click Here').click()
    ]);

    // Wait for new tab to load
    await newTab.waitForLoadState();

    // Verify URL
    console.log('New Tab URL:', newTab.url());

    // Verify heading in new tab
    await expect(newTab.getByRole('heading', { name: 'New Window' })).toBeVisible();
    
    // Close the NewTab
    await newTab.close();
});