import { Page, Locator, expect } from "@playwright/test";

import { BasePage } from "./BasePage";

export class HomePage extends BasePage
{
    readonly kitchenAppliances: Locator;

    constructor(page: Page)
    {
        super(page);

        this.kitchenAppliances = page.getByRole('link',{name:/Kitchen Appliances/});
    }

    async goto(): Promise<void>
    {
        await this.navigate('/online/electronics');
    }

    async isLoaded(): Promise<void> 
    {
        await expect(this.kitchenAppliances).toBeVisible();    
    }

    async hoverKitchenAppliances(): Promise<void>
    {
        await this.kitchenAppliances.hover();
    }
    // Datatype can be String or Null
    async getKitchenApplianceToolTip(): Promise<string | null>
    {   
        // Fetch ToolTip using getAttribute where title is the Attribute
        return await this.kitchenAppliances.getAttribute('title');
    }

    async verifyKitchenAppliancesToolTip(): Promise<void>
    {   
        await expect(this.kitchenAppliances).toHaveAttribute('title', /Shop For Kitchen Appliances/);
    }
};