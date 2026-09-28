import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ShadowDomPage extends BasePage 
{
    readonly shadowInput: Locator;
    readonly nestedShadowInput: Locator;
    
    constructor(page: Page) 
    {
        super(page);
        // Shadow DOM elements (Playwright auto handles)
        this.shadowInput = page.locator('#kils'); // example id
        this.nestedShadowInput = page.locator('#pizza'); // nested shadow
    }
    
    async goto(): Promise<void> 
    {
        await this.navigate('https://selectorshub.com/xpath-practice-page/');
    }
    
    async isLoaded(): Promise<void>    
    {
        await this.page.waitForLoadState('domcontentloaded');
    }

    async enterShadowText(value: string): Promise<void> 
    {
        await this.shadowInput.fill(value);
    }

    async enterNestedShadowText(value: string): Promise<void> 
    {
        await this.nestedShadowInput.fill(value);
    }
}