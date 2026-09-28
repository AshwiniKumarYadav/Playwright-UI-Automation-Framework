import {Page, Locator, expect} from '@playwright/test';
import { BasePage } from './BasePage';

export class ScrollPage extends BasePage
{
    readonly bestSellingGifts:Locator;

    constructor(page:Page)
    {
        super(page);
        this.bestSellingGifts = page.getByText('Popular Searches Today:', {exact:true});
    }

    async goto(): Promise<void>
    {
        await this.navigate('/shops/events_home.jsp');
    }

    async isLoaded(): Promise<void> 
    {
        await expect(this.bestSellingGifts).toBeVisible();
    }

    // Scroll Using Element Locator (Recommended)
    async scrollToBestSellingGifts(): Promise<void>
    {
        await this.scrollDirectlyToelement(this.bestSellingGifts); 
    }
}