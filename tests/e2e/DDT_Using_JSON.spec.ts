import { test } from '@playwright/test';
import loginData from '../../test-Data/loginData.json';

test('Login with first user', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.locator('#user-name').fill(loginData[0].username);

    await page.locator('#password').fill(loginData[0].password);

    await page.locator('#login-button').click();
});
//loginData - Object 0 - user name, password
//login Data - Object 1 - username, password

//login Data - firstobject[0] - username
//loginData - secondobject[1] - username

/*
import { test } from '@playwright/test';
import loginData from '../../test-Data/loginData.json';

for (const user of loginData) 
{
    test(`Login with ${user.username}`, async ({ page }) => {

        await page.goto('https://www.saucedemo.com/');

        await page.locator('#user-name').fill(user.username);

        await page.locator('#password').fill(user.password);

        await page.locator('#login-button').click();
    });
}
*/
