# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\login.spec.ts >> Kapruka Login tests >> Valid login
- Location: tests\e2e\login.spec.ts:16:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('input[name="email"]')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('input[name="email"]')

```

```yaml
- link "logo area":
  - /url: https://www.kapruka.com
  - img "logo area"
- textbox "SEARCH PRODUCTS.."
- button "online search":
  - img "Search"
- combobox "Select Currency":
  - option "INR" [selected]
  - option "USD"
- combobox "Select language":
  - option "Lang"
  - option "සිං"
  - option "Eng" [selected]
- link:
  - /url: /shops/checkout/deliveryCartViewPage.jsp
  - img
- link "Check Order Status":
  - /url: https://www.kapruka.com/contactUs/orderStatus.jsp
  - img "status"
- link "Login to Your Account":
  - /url: https://www.kapruka.com/shops/customerAccounts/accountLogin.jsp
  - img
  - text: (Ashwi.)
- list:
  - listitem: All Categories
  - listitem:
    - link "Ask Aloka, Kapruka's personal shopping assistant":
      - /url: https://www.kapruka.com/aloka/?src=menu
      - text: Ask Aloka NEW
  - listitem:
    - 'link "Event Icon World Boss`s Day offers"':
      - /url: https://www.kapruka.com/online/world_boss_day
      - img "Event Icon"
      - text: "World Boss`s Day offers"
  - listitem:
    - link "Same Day Rush delivery":
      - /url: https://www.kapruka.com/online/samedaydelivery
      - img "Same Day"
      - text: Rush delivery
  - listitem:
    - link "On Sale":
      - /url: https://www.kapruka.com/online/promotions
  - listitem:
    - link "Events":
      - /url: https://www.kapruka.com/shops/events_home.jsp
  - listitem:
    - link "Brands":
      - /url: https://www.kapruka.com/online_brands.jsp
  - listitem:
    - link "For You":
      - /url: https://www.kapruka.com/online/combogifts
- complementary:
  - text: AY
  - paragraph: Ashwini Yadav
  - navigation:
    - link "Dashboard":
      - /url: accountView.jsp
      - img
      - text: Dashboard
    - link "My Orders":
      - /url: accountShowAllOrders.jsp
      - img
      - text: My Orders
    - link "Profile & Security":
      - /url: accountProfileSecurity.jsp
      - img
      - text: Profile & Security
    - link "Payment Methods":
      - /url: addCreditCard.jsp
      - img
      - text: Payment Methods
    - link "Address Book":
      - /url: address_manager.jsp
      - img
      - text: Address Book
    - link "Reward Points":
      - /url: account_reward_points.jsp
      - img
      - text: Reward Points
    - link "Notifications":
      - /url: accountSubscribe.jsp
      - img
      - text: Notifications
    - link "↪ Log Out":
      - /url: accountLogin.jsp?error=lg
- main:
  - paragraph: Welcome back,
  - heading "Ashwini Yadav 👋" [level=1]
  - link "Continue Shopping ›":
    - /url: https://www.kapruka.com
  - link "📦 All orders Reorder / explore your past orders":
    - /url: accountShowAllOrders.jsp
  - link "👥 My Address Book View / add / edit your address book":
    - /url: address_manager.jsp
  - link "💡 How to use points Learn how reward points work":
    - /url: faq.jsp
  - link "💳 Add Payment Method Add a saved card":
    - /url: addCreditCard.jsp
  - link "🔔 Notification Settings Edit notification settings":
    - /url: accountSubscribe.jsp
- contentinfo:
  - paragraph:
    - text: Kapruka.com -
    - link "Sri Lanka's":
      - /url: https://www.kapruka.com/contactUs/about.html
    - text: Largest Online Shop
  - navigation:
    - link "About Kapruka":
      - /url: https://www.kapruka.com/contactUs/about.html
    - text: "|"
    - link "Contact Us":
      - /url: https://www.kapruka.com/contactUs/onlineHelpForm.jsp
    - text: "|"
    - link "Order Tracking":
      - /url: https://www.kapruka.com/contactUs/orderStatus.jsp
```

# Test source

```ts
  1  | import { Page, Locator, expect } from "@playwright/test";
  2  | import { BasePage } from "./BasePage";
  3  | 
  4  | //import { config } from "../config/environment";
  5  | 
  6  | export class LoginPage extends BasePage
  7  | {
  8  |     readonly emailInput : Locator;
  9  |     readonly passwordInput : Locator;
  10 |     readonly loginButton : Locator;
  11 | 
  12 |     constructor(page : Page)
  13 |     {
  14 |         super(page);
  15 |         this.emailInput = page.locator('input[name="email"]'); //css selector
  16 |         this.passwordInput = page.locator('input[name="password"]');
  17 |         this.loginButton = page.locator('input[type="submit"]');
  18 |     }
  19 | 
  20 |     async goto() : Promise<void>
  21 |     {
  22 |         //await this.navigate(`${config.baseUrl}${config.loginPath}`);
  23 |         await this.navigate('/shops/customerAccounts/accountLogin.jsp');
  24 |     }
  25 | 
  26 |     async isLoaded(): Promise<void> 
  27 |     {
> 28 |         await expect(this.emailInput).toBeVisible();    
     |                                       ^ Error: expect(locator).toBeVisible() failed
  29 |         await expect(this.passwordInput).toBeVisible();
  30 |         await expect(this.loginButton).toBeVisible();
  31 |     }
  32 | 
  33 |     async login(email:string, password:string) : Promise<void>
  34 |     {
  35 |         await this.fill(this.emailInput, email);
  36 |         await this.fill(this.passwordInput, password);
  37 |         await this.click(this.loginButton);
  38 |     }
  39 | 
  40 |     async loginSuccessfull() : Promise<void>
  41 |     {
  42 |         const currentUrl = this.page.url();
  43 |         
  44 |         if(currentUrl.includes('error'))
  45 |         {
  46 |             throw new Error('Login failed');
  47 |         }
  48 | 
  49 |         await expect(this.page).not.toHaveURL(/accountLogin/);
  50 |     }
  51 | 
  52 | }
```