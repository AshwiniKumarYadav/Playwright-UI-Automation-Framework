import {Page, Locator, expect} from '@playwright/test';
import { BasePage } from './BasePage';  

export class ProductPage extends BasePage
{
    readonly searchProduct: Locator;
    readonly searchIcon: Locator;
    readonly firstProduct: Locator;
    
    constructor(page : Page)
    {
        super(page);
        this.searchProduct = page.getByRole('textbox', { name: 'SEARCH PRODUCTS..' });
        this.searchIcon = page.getByRole('button', { name: 'online search' });
        this.firstProduct = page.locator('a[href*="/buyonline/"]').first();
    }
    
    async goto(): Promise<void>
    {
        await this.navigate('https://www.kapruka.com/');
    }
    
    async isLoaded(): Promise<void> 
    {
        await expect(this.searchProduct).toBeVisible();    
        await expect(this.searchIcon).toBeVisible();
        await expect(this.firstProduct).toBeVisible();
    }

    async productSearch(product: string)
    {
        await this.fill(this.searchProduct, product);
        await this.click(this.searchIcon);

        const resultProduct = this.page.locator('a[href*="/buyonline/"]').first();
        await expect(resultProduct).toBeVisible();
        await resultProduct.click();
    }

    async verifyAddToCart(): Promise<void>
    {
        await expect(this.page).toHaveTitle(/Add to Cart|Cake|Kapruka/i);
    }
    
}