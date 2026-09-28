import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import path from 'path';

export class PersonaliseCakePage extends BasePage {

    readonly page: Page;
    readonly fileInput: Locator;
    readonly fileInfoText: Locator;
    readonly previewImage: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;

        this.fileInput = page.locator('#imageFile');
        this.fileInfoText = page.locator('.file-info');
        this.previewImage = page.locator('#imageviewer');
    }

    async goto() {
        await this.page.goto('https://www.kapruka.com/shops/cakes/customCakes/personalise_cakes.jsp');
    }

    async isLoaded(): Promise<void> {
        // File input is likely visually styled/hidden behind the "Choose a file" button,
        // so check it's attached to the DOM rather than requiring visibility.
        await this.fileInput.waitFor({ state: 'attached', timeout: 20000 });
    }

    async uploadCakeDesign(relativeFilePath: string): Promise<void> {
        const absolutePath = path.resolve(__dirname, '../..', relativeFilePath);
        await this.fileInput.setInputFiles(absolutePath);
    }

    async getFileInfoText(): Promise<string> {
        return (await this.fileInfoText.textContent())?.trim() || '';
    }

    async getPreviewImageSrc(): Promise<string> {
        return (await this.previewImage.getAttribute('src')) || '';
    }

    /**
     * Reset the file input to its default state (no file selected).
     * Useful for cleaning up after tests to ensure the next test starts fresh.
     */
    async resetFileInput(): Promise<void> {
        // Clear the file input by setting it to an empty file list
        await this.fileInput.setInputFiles([]);
    }
}