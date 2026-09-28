import { test } from '@playwright/test';
import { CurrencyPage } from '../../pages/CurrencyPage';

test.describe('Kapruka Login Test', () =>
{
    test('Valid user should login successfully and select currency', async ({page}) => 
    {
        const currencyPage = new CurrencyPage(page);
        await currencyPage.goto();
        await currencyPage.isLoaded();
        await currencyPage.selectCurrency('INR');
        await currencyPage.verifyCurrency('INR');
    });
});