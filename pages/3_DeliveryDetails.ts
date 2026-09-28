import {Page, Locator, expect} from '@playwright/test';
import { BasePage } from './BasePage';  

export interface DeliveryDetailsFields
{
    name: string;
    phone: string;
    address: string;
    instructions: string;
    message: string;
    senderName?: string;
}

export class DeliveryDetails extends BasePage //implements DeliveryDetailsFields
{
    readonly recipientName: Locator;
    readonly recipientPhone: Locator;
    readonly addressInSriLanka: Locator;
    readonly deliveryCity: Locator;
    readonly locationType: Locator;
    readonly deliveryDate: Locator;
    readonly deliveryInstructions: Locator;
    readonly senderName: Locator;
    readonly personalMessage: Locator;
    readonly continue: Locator;
    readonly proceedToPayment: Locator;
        
    constructor(page : Page)
    {
        super(page);
        this.recipientName = page.locator('#to_name_field');
        this.recipientPhone = page.locator('#to_phone_field');
        this.addressInSriLanka = page.locator('#to_address_field');
        this.deliveryCity = page.locator('#select2-city_field-container');
        this.locationType = page.locator('#select2-type_of_location_field-container');
        this.deliveryDate = page.locator('#delivery_date');
        this.deliveryInstructions = page.locator('#special_istructions');
        this.senderName = page.getByRole('textbox', { name: 'Your Name', exact: true });
        this.personalMessage = page.locator('#personalMessage');
        this.continue = page.getByRole('button',{name: 'Continue'});
        this.proceedToPayment = page.getByRole('button',{name: 'PROCEED TO PAYMENT ➔'});

    }
    
    async isLoaded(): Promise<void> 
    {
        await expect(this.recipientName).toBeVisible();
        await expect(this.recipientPhone).toBeVisible();
        await expect(this.addressInSriLanka).toBeVisible();
        await expect(this.deliveryCity).toBeVisible();
        await expect(this.locationType).toBeVisible();
        await expect(this.deliveryDate).toBeVisible();
        await expect(this.deliveryInstructions).toBeVisible();
        await expect(this.senderName).toBeVisible();
        await expect(this.personalMessage).toBeVisible();
        await expect(this.continue).toBeVisible();

    }

    // async fillRecipientInformation(info : DeliveryDetailsFields): Promise<void>
    async fillRecipientInformation(data: DeliveryDetailsFields): Promise<void>
    {
        await this.fill(this.recipientName, data.name);
        await this.fill(this.recipientPhone, data.phone);
        await this.fill(this.addressInSriLanka, data.address);

        // Delivery City DropDown
        await this.deliveryCity.waitFor({state:'visible'});
        await this.deliveryCity.click();
        await this.page.locator('.select2-results__option:visible').first().click();

        // Location Type DropDown
        await this.locationType.waitFor({state:'visible'});
        await this.locationType.click();
        await this.page.locator('.select2-results__option:visible').first().click();

        await this.fill(this.deliveryInstructions, data.instructions);
        await this.fill(this.senderName, data.senderName ?? data.name);
        await this.fill(this.personalMessage , data.message);
    }

    async selectDeliveryDate(): Promise<void>
    {
        const today = new Date();
        const targetDate = new Date();
        targetDate.setDate(today.getDate() + 3);
        const targetValue = [
            targetDate.getFullYear(),
            String(targetDate.getMonth() + 1).padStart(2, '0'),
            String(targetDate.getDate()).padStart(2, '0'),
        ].join('-');

        await this.deliveryDate.fill(targetValue);
        await expect(this.deliveryDate).toHaveValue(targetValue);
    }

    async continueToPayment(): Promise<void>
    {
        await this.click(this.continue);
        await expect(this.proceedToPayment).toBeVisible({ timeout: 15000 });
        await this.click(this.proceedToPayment);
    }

    async verifyDeliverySummaryPage(): Promise<void>
    {
        await expect(this.page).toHaveTitle(/SSL Secure Payment Page/);
    }

    async verifyPaymentMethodPage(): Promise<void>
    {
        await expect(this.page.getByRole('heading', { name: 'Payment Methods', exact: true })).toBeVisible();
    }
}