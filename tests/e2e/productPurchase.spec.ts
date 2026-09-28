import {test} from '../../fixtures/auth/pageFixtures';

const product = process.env.PRODUCT;

if (!product) {
    throw new Error(
        'Missing PRODUCT environment variable. ' +
        'Set these in config/.env.qa or your CI/CD environment before running this test.'
    );
}

test.describe('Kapruka End to End Scenario: ', () =>
{

    test('Select First Cake and Payment Page', async({productPage, addToCart, deliveryDetails}) =>
    {
        test.setTimeout(90000);
        // Product Page
        await productPage.productSearch(product);
        await productPage.verifyAddToCart();

        // Add To Cart Page
        await addToCart.productIntoCart();
        await addToCart.verifyDeliveryDetailPage();

        // Delivery Details Page
        await deliveryDetails.isLoaded();
        await deliveryDetails.fillRecipientInformation({
            name: 'Test_Name',
            phone: '1234657890',
            address: 'Test_Address',
            instructions: 'Test_Instructions',
            message: 'Test_Message',
            senderName: 'Test_Sender',
        });
        await deliveryDetails.selectDeliveryDate();
        await deliveryDetails.continueToPayment();
        await deliveryDetails.verifyDeliverySummaryPage();
        await deliveryDetails.verifyPaymentMethodPage();


    });

});