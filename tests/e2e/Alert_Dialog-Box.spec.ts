import { test, expect } from '@playwright/test';

test('Handle Alert PopUp', async({page})=>
{
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    // Listen For Alert
    page.on('dialog', async(dialog)=>
    {
        console.log(dialog.message()); // Print Alert Text

        await dialog.accept(); // Click on the OK Button
    });
});