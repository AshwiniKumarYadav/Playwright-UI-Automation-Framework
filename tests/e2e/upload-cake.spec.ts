import {test, expect} from '@playwright/test';
import { PersonaliseCakePage } from '../../pages/PersonaliseCakePage';

test.describe ('PersonaliseCakePage -File Upload', () =>
{
    let cakePage: PersonaliseCakePage;

    test.beforeEach(async ({page}) =>
    {
        cakePage = new PersonaliseCakePage(page);
        await cakePage.goto(); //Navigate
        await cakePage.isLoaded();

    });

    test.afterEach(async ({page}, testInfo) =>
    {
        if (testInfo.status !== 'passed')
        {
            const screenshotPath = `test-results/failed-${testInfo.title}.png`;
            await page.screenshot({path: screenshotPath});
        }

        try
        {
            await cakePage.resetFileInput();
        }
        catch (error)
        {
            console.log(`Could not reset the file: ${error instanceof Error ? error.message : String(error)}`);
        }
    });

    test('should upload a JPG', async () =>
    {
        const srcBefore = await cakePage.getPreviewImageSrc();
        await cakePage.uploadCakeDesign('test-data/sample-cake-design.jpg');
        console.log('File Uploaded');

        await expect(cakePage.previewImage).toHaveAttribute('src', /^data:image/, {timeout: 5000});
    });

     test('should upload a JPG1', async () =>
    {
        const srcBefore = await cakePage.getPreviewImageSrc();
        await cakePage.uploadCakeDesign('test-data/sample1-cake-design.jpg');
        console.log('File Uploaded');

        await expect(cakePage.previewImage).toHaveAttribute('src', /^data:image/, {timeout: 5000});
    });
});

//BeforeEach
//Test case 1
//AfterEach
//BeforeEach
//Test case 2
//AfterEach