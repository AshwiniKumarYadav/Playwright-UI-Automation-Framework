// tests/currency.spec.ts
// AFTER - import `test`/`expect` from YOUR fixtures file, not
// '@playwright/test' directly. The test signature destructures
// `currencyPage` straight out of the fixtures object - no manual
// construction, no repeated goto()/isLoaded().
import { test, expect } from '../../fixtures/auth/pageFixtures';
// tests/currency.spec.ts


test.describe('Kapruka Currency Dropdown', () => {
    test('Switch from USD to INR', async ({ currencyPage }) => {
        await currencyPage.selectCurrency('USD');
        await currencyPage.verifyCurrency('USD');

        await currencyPage.selectCurrency('INR');
        await currencyPage.verifyCurrency('INR');
    });

    test('Switch from INR to USD', async ({ currencyPage }) => {
        await currencyPage.selectCurrency('INR');
        await currencyPage.verifyCurrency('INR');

        await currencyPage.selectCurrency('USD');
        await currencyPage.verifyCurrency('USD');

    });
     
   
});

/*
INTERVIEW TALKING POINT - waitUntil strategies:

'load'              - waits for the load event (all resources: images,
                       stylesheets, iframes, etc). Strictest, slowest,
                       and on real-world sites with ads/trackers, the
                       LEAST reliable - a single slow third-party script
                       can hang this indefinitely, or get aborted by a
                       redirect and throw ERR_ABORTED like we saw here.

'domcontentloaded'  - waits only for HTML to be parsed and the DOM tree
                       built. Fires much sooner, doesn't care about
                       images/ads still loading. GOOD DEFAULT for most
                       navigation waits, especially on real third-party
                       sites you don't control.

'networkidle'       - waits until there have been no network connections
                       for 500ms. Useful for SPA-style pages where content
                       loads via background XHR/fetch after the initial
                       HTML - but can be slow or never resolve on sites
                       with persistent background polling/analytics.

RULE OF THUMB: don't reach for 'load' by default on a real (non-test)
website. Prefer 'domcontentloaded' + an explicit wait for YOUR specific
element (via isLoaded() or a Locator wait) - that's more reliable than
trusting the whole page's load lifecycle, since you only actually care
about your own element being ready, not literally everything else.
*/