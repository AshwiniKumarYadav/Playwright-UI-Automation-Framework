import {Page, Locator, expect} from '@playwright/test';
import { BasePage } from './BasePage';  

export class AddToCart extends BasePage
{
    readonly addToCart: Locator;
    readonly viewCart: Locator;
    readonly popupText: Locator;
    readonly continueToDelivery: Locator;
    readonly continueAsGuest: Locator;

    constructor(page:Page)
    {
        super(page);
        this.addToCart = page.getByRole('button', { name: /add to cart/i });
        this.viewCart = page.getByRole('link', { name: 'View Cart', exact: true });
        this.popupText = page.locator('.wpHead');
        this.continueToDelivery = page.getByRole('button', { name: 'Continue to Delivery', exact: true });
        this.continueAsGuest = page.getByText('Continue as Guest', { exact: true }).first();
    }
    
    async isLoaded(): Promise<void>
    {
        await expect(this.addToCart).toBeVisible();
    }

    async productIntoCart(): Promise<void>
    {
        await this.page.waitForLoadState('load');
        await expect(this.addToCart).toBeEnabled();
        await this.page.waitForTimeout(1000);
        await this.click(this.addToCart);
        await expect(this.viewCart).toBeVisible({ timeout: 45000 });
        await this.click(this.viewCart);
        await expect(this.page).toHaveURL(/cart|shopping/i);
        await expect(this.continueToDelivery).toBeVisible({ timeout: 15000 });
        await this.click(this.continueToDelivery);
        await this.page.goto('/shops/checkout/deliveryCartAccountLogin.jsp', { waitUntil: 'load' });
        await expect(this.continueAsGuest).toBeVisible({ timeout: 20000 });
        await this.click(this.continueAsGuest);
        await expect(this.page.locator('#to_name_field')).toBeVisible({ timeout: 20000 });
    }

    async verifyDeliveryDetailPage(): Promise<void>
    {
        await expect(this.page.locator('#to_name_field')).toBeVisible();
    }

}