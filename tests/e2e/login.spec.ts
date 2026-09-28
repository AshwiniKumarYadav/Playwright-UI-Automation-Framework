import {test, expect} from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";


const TEST_EMAIL = process.env.TEST_EMAIL;
const TEST_PASSWORD = process.env.TEST_PASSWORD;

if (!TEST_EMAIL || !TEST_PASSWORD) {
    throw new Error(
        'Missing TEST_EMAIL or TEST_PASSWORD environment variable. ' +
        'Set these in config/.env.qa or your CI/CD environment before running this test.'
    );
}

test.describe('Kapruka Login tests', () => {
    test('Valid login', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.isLoaded();
        await loginPage.login(TEST_EMAIL, TEST_PASSWORD);
        await loginPage.loginSuccessfull();
    });
});