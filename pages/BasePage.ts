import{Page, Locator} from '@playwright/test';

export abstract class BasePage
{
    readonly page: Page;

    constructor(page: Page)
    {
        this.page = page; //    store this.page
    }

    async click(locator: Locator): Promise<void>
    {
        await locator.waitFor({state: 'visible'});
        await locator.click();
    }

    async navigate(url: string): Promise<void>
    {
        await this.page.goto(url, {waitUntil: 'load'});
    }

    async fill(locator: Locator, value: string): Promise<void>
    {
        await locator.waitFor({state: 'visible'});
        await locator.fill(value);
    }

    abstract isLoaded(): Promise<void>;

    // Option 1 : Scroll Using Pixel
    async scrollElement(locator:Locator): Promise<void>
    {
        await this.page.mouse.wheel(0,1500);
       // await this.page.waitForTimeout(1000);
    }
    
    // Option 2: Scroll Using Element Locator
    async scrollDirectlyToelement(locator:Locator): Promise<void>
    {
        await locator.scrollIntoViewIfNeeded();
    }

    // Option 3: Scroll Using JavaScript
    async scrollUsingJavaScript(): Promise<void>
    {
        await this.page.evaluate(()=> window.scrollBy(0,1500));
    }
}