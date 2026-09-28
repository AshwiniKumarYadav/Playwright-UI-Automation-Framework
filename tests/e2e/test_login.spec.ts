import { test } from '@playwright/test';
import { TestLoginPage } from '../../pages/Test_LoginPage';

const TEST_EMAIL = process.env.TEST_EMAIL ?? process.env.TEST_USERNAME;
const TEST_PASSWORD = process.env.TEST_PASSWORD;

if (!TEST_EMAIL || !TEST_PASSWORD) {
    throw new Error(
        'Missing TEST_EMAIL or TEST_PASSWORD environment variable. ' +
        'Set these in config/.env.qa or your CI/CD environment before running this test.'
    );
}

test.describe('Kapruka Login tests', () => {
    test('Valid Login Test', async ({ page }) => {
        const loginPage = new TestLoginPage(page);
        await loginPage.goto();
        await loginPage.isLoaded();
        await loginPage.login(TEST_EMAIL, TEST_PASSWORD);
        await loginPage.loginSuccessfull();
    });
});