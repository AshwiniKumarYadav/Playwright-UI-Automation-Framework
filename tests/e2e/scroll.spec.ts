import {test, expect} from '@playwright/test';
import { ScrollPage } from '../../pages/ScrollPage';

test.describe('Kapruka Scroll to Element Screen', () => 
{
    test('Scroll to Popular Search Today', async({page}) => 
    {
        const scrollPage = new ScrollPage(page);

        await scrollPage.goto();

        await scrollPage.scrollToBestSellingGifts();

        // Take ScrrenShot After Scrolling

        //await page.screenshot({path: 'dist/full-page.png', fullPage: true});

        //await page.screenshot({path: 'dist/afterscroll.png'});
    });
})