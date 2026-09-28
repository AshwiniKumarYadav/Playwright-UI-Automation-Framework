import {test, expect} from '@playwright/test';
import { CurrencyPage } from '../../pages/CurrencyPage';

test.describe('Kapruka Currency Dropdown', () => 
{
    test('Switch from USD to INR', async ({page}) =>
    {
         const currencyPage = new CurrencyPage(page);
         
         await currencyPage.goto();
         await currencyPage.isLoaded();
         await currencyPage.selectCurrency('USD');
         await currencyPage.verifyCurrency('USD');

         await currencyPage.selectCurrency('INR');
         await currencyPage.verifyCurrency('INR');
    });
});