import {test, expect} from '@playwright/test';

import {HomePage} from '../../pages/HomePage';

test.describe('Kapruka Electronics Page', () =>
{
    test('Verify Kitchen Appliances tooltip on hover', async ({page}) => 
    {
        const homePage = new HomePage(page);

        await homePage.goto();

        await homePage.isLoaded();

        await homePage.hoverKitchenAppliances();

        await homePage.verifyKitchenAppliancesToolTip();

        // Get the tooltip text
        const tooltipText = await homePage.getKitchenApplianceToolTip();

        // Print tooltip text
        console.log('Kitchen Appliances Tooltip:', tooltipText);

    });
});