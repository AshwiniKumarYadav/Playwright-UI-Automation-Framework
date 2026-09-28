import {Page, Locator, expect} from '@playwright/test';
import { BasePage } from './BasePage';

export class CurrencyPage extends BasePage
{
    readonly currencyDropDown: Locator;

    constructor(page:Page)
    {
        super(page);
        this.currencyDropDown = page.getByRole('combobox', {name:'Select Currency'});
    }

    async goto(): Promise<void>
    {
        await this.navigate('/'); //https://www.kapruka.com/
    }

    async isLoaded(): Promise<void> {
        await expect(this.currencyDropDown.waitFor({state: 'visible'}));
    }

    async selectCurrency(currency: 'INR' | 'USD'): Promise<void>
    {
        await this.currencyDropDown.waitFor({state:'visible'});
        await this.currencyDropDown.selectOption({label: currency});
        await this.page.waitForLoadState('load');
    }
    async verifyCurrency(expected: string): Promise<void>
    {
        await expect(this.currencyDropDown).toHaveValue(expected);
    }


}