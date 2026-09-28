import {test, expect} from '@playwright/test';


// Single iFrame:

test('Handel iFrom in Playwright', async({page}) =>
{
    // Step-1 : Open the Website
    await page.goto('https://demoqa.com/frames');

    // Step-2 : Locating the Frame
    const frame = page.frameLocator('#frame1');

    // Step-3 : Locate the element inside the frame and Extract the Text
    const headingText = await frame.locator('#sampleHeading').textContent();

    // Step-4 : Verify the Extracted Text
    await expect(headingText).toBe('This is a sample page');

}); 


// Nested iFrame

test('Nested Handel iFrame in Playwright', async({page}) =>
{
    // Step-1 : Open the Website
    await page.goto('https://demo.automationtesting.in/Frames.html');

    // Step-2 : Locating the Button to Switch
    await page.locator('a[href="#Multiple"]').click();

    // Step-3 : Switch to Outer Frame
    const outterFrame = page.frameLocator('iframe[src="MultipleFrames.html"]');

    // Switch to Inner Frame
    const inneerFrame = outterFrame.frameLocator('iframe[src="SingleFrame.html"]');

    // Enter text inside Second iFrame
    await inneerFrame.locator('input[type="text"]').fill('August2026');

    //await page.frameLocator('iframe[src="MultipleFrames.html"]').frameLocator('iframe[src="SingleFrame.html"]').locator('input[type="text"]').fill('August2026');

});
