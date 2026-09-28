// fixtures/pageFixtures.ts
import { test as base } from '@playwright/test';
import { CurrencyPage } from '../../pages/CurrencyPage';
import { HomePage } from '../../pages/HomePage';
import { ComboGiftsPage } from '../../pages/ComboGiftsPage';
import { ProductPage } from '../../pages/1_ProductPage';
import { AddToCart } from '../../pages/2_AddToCart';
import { DeliveryDetails } from '../../pages/3_DeliveryDetails';
import { LoginPage } from '../../pages/LoginPage';
import { TablePage } from '../../pages/TablePage';
import { ShadowDomPage } from '../../pages/ShadowDomPage';

// Describes what NEW fixtures this file adds on top of Playwright's
// built-in ones ({ page }, { context }, { browser }, etc).
type PageFixtures = {
    loginPage: LoginPage;
    currencyPage: CurrencyPage;
    comboPage: ComboGiftsPage;
    productPage: ProductPage;
    addToCart: AddToCart;
    deliveryDetails: DeliveryDetails;
    tablePage: TablePage;
    shadowPage: ShadowDomPage;
};

// base.extend() creates a NEW `test` function that knows about our custom
// fixture, while still having every built-in fixture Playwright provides.
export const test = base.extend<PageFixtures>({

    // Fixture name 'currencyPage' matches the key in PageFixtures above -
    // this is what test bodies will destructure to get an instance.
    currencyPage: async ({ page }, use) => {
        // ---- SETUP (runs before the test body) ----
        const currencyPage = new CurrencyPage(page);
        await currencyPage.goto();
        await currencyPage.isLoaded();
        // ---- HAND CONTROL TO THE TEST ----
        // Whatever is passed to use() is what the test receives as
        // `currencyPage`. Execution pauses here until the test finishes.
        await use(currencyPage);
        // ---- TEARDOWN (runs after the test body, even if it failed) ----
        // Nothing needed here for this page, but this is where you'd put
        // cleanup - e.g. deleting a test account created during setup.
    },
    //  ---- ComboPage Fixture (Sibling, Not Nested) ------ 
    comboPage: async ({ page }, use ) => 
    {
        const comboPage = new ComboGiftsPage(page);
        await comboPage.goto();
        await use(comboPage);
        // Teardown here if neaded
    },

    loginPage: async ({ page }, use ) => 
    {
        const loginPage = new LoginPage(page);
        await use(loginPage);
        // Teardown here if neaded
    },

    productPage: async ({ page }, use ) => 
    {
        const productPage = new ProductPage(page);
        await productPage.goto();
        await productPage.isLoaded();
        await use(productPage);
        // Teardown here if neaded
    },

    addToCart: async ({ page }, use ) => 
    {
        const addToCart = new AddToCart(page);
        await use(addToCart);
        // Teardown here if neaded
    },

    deliveryDetails: async ({ page }, use ) => 
    {
        const deliveryDetails = new DeliveryDetails(page);
        await use(deliveryDetails);
        // Teardown here if neaded
    },

    tablePage: async ({ page }, use ) => 
    {
        const tablePage = new TablePage(page);
        await tablePage.goto();
        await tablePage.isLoaded();
        await use(tablePage);
        // Teardown here if neaded
    },

    shadowPage: async ({ page }, use) => 
    {
        const shadowPage = new ShadowDomPage(page);
        await shadowPage.goto();
        await use(shadowPage); // test runs here
    },
});

// Re-export expect so spec files only need ONE import line, not two.
export { expect } from '@playwright/test';

// one object - one fixture - across your framework
// two object/ multiple - one fixture - across your framework
// multiple fixtures object level, API level - authentication - Token - pass to the other spec.ts APIs