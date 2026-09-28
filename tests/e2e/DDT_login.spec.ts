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

test.describe('Login using data-driven testing', () => {
    const cases = [
        { label: 'Wrong Password', email: TEST_EMAIL, password: 'wrongpass' },
        { label: 'Wrong Email', email: 'abcd@gamil.com', password: TEST_PASSWORD },
        { label: 'Empty Field', email: '', password: '' },
        { label: 'Valid Credentials', email: TEST_EMAIL, password: TEST_PASSWORD },
    ];

    for (const { label, email, password } of cases) {
        test(`Login with: ${label}`, async ({ page }) => {
            const loginPage = new LoginPage(page);
            await loginPage.goto();
            await loginPage.isLoaded();
            await loginPage.login(email, password);
        });
    }
});